import { EmailMessage } from "cloudflare:email";

type Env = {
  CONTACT_EMAIL: SendEmail;
  TURNSTILE_SECRET_KEY: string;
  CONTACT_FROM?: string;
  CONTACT_TO?: string;
};

type SendEmail = {
  send: (message: EmailMessage) => Promise<void>;
};

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  turnstileToken?: unknown;
};

type ApplicationPayload = {
  role: string;
  name: string;
  email: string;
  profile: string;
  coverNote: string;
  turnstileToken: string;
  cv: File;
};

type TurnstileResult = {
  success: boolean;
  "error-codes"?: string[];
};

const DEFAULT_FROM = "website@xeontek.com";
const DEFAULT_TO = "enquiries@xeontek.com";
const MAX_FIELD_LENGTH = 5000;
const MAX_CV_SIZE = 4 * 1024 * 1024;
const ACCEPTED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ACCEPTED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    if (request.method !== "POST") {
      return json(
        { success: false, message: "Method not allowed." },
        405,
        request,
      );
    }

    const url = new URL(request.url);
    if (url.pathname === "/api/apply") {
      return handleApplication(request, env);
    }

    if (url.pathname !== "/api/contact") {
      return json({ success: false, message: "Not found." }, 404, request);
    }

    let payload: ContactPayload;
    try {
      payload = await request.json();
    } catch {
      return json(
        { success: false, message: "Invalid request." },
        400,
        request,
      );
    }

    const validation = validatePayload(payload);
    if (!validation.ok) {
      return json(
        { success: false, message: validation.message },
        400,
        request,
      );
    }

    const tokenOk = await verifyTurnstile(
      String(payload.turnstileToken),
      env.TURNSTILE_SECRET_KEY,
      request.headers.get("CF-Connecting-IP") ?? undefined,
    );

    if (!tokenOk) {
      return json(
        { success: false, message: "Verification failed." },
        400,
        request,
      );
    }

    const from = env.CONTACT_FROM ?? DEFAULT_FROM;
    const to = env.CONTACT_TO ?? DEFAULT_TO;
    const subject = cleanHeader(
      String(payload.subject || "New enquiry from xeontek.com"),
    );
    const replyTo = String(payload.email);
    const body = [
      `Name: ${payload.name}`,
      `Email: ${replyTo}`,
      `Subject: ${subject}`,
      "",
      String(payload.message),
    ].join("\n");

    const message = new EmailMessage(
      from,
      to,
      buildEmail({
        from,
        to,
        replyTo,
        subject,
        body,
      }),
    );

    try {
      await env.CONTACT_EMAIL.send(message);
    } catch {
      return json(
        { success: false, message: "Unable to send message." },
        502,
        request,
      );
    }

    return json({ success: true }, 200, request);
  },
};

async function handleApplication(
  request: Request,
  env: Env,
): Promise<Response> {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return json(
      { success: false, message: "Invalid application." },
      400,
      request,
    );
  }

  const application = parseApplication(formData);

  if (!application.ok) {
    return json({ success: false, message: application.message }, 400, request);
  }

  const tokenOk = await verifyTurnstile(
    application.payload.turnstileToken,
    env.TURNSTILE_SECRET_KEY,
    request.headers.get("CF-Connecting-IP") ?? undefined,
  );

  if (!tokenOk) {
    return json(
      { success: false, message: "Verification failed." },
      400,
      request,
    );
  }

  const from = env.CONTACT_FROM ?? DEFAULT_FROM;
  const to = env.CONTACT_TO ?? DEFAULT_TO;
  const replyTo = application.payload.email;
  const subject = cleanHeader(`Application: ${application.payload.role}`);
  const cvBytes = await application.payload.cv.arrayBuffer();
  const body = [
    `Role: ${application.payload.role}`,
    `Name: ${application.payload.name}`,
    `Email: ${replyTo}`,
    application.payload.profile
      ? `Profile: ${application.payload.profile}`
      : "Profile: Not provided",
    "",
    "Cover note:",
    application.payload.coverNote,
  ].join("\n");

  const message = new EmailMessage(
    from,
    to,
    buildEmail({
      from,
      to,
      replyTo,
      subject,
      body,
      attachment: {
        filename: safeFilename(application.payload.cv.name),
        contentType: application.payload.cv.type || "application/octet-stream",
        bytes: cvBytes,
      },
    }),
  );

  try {
    await env.CONTACT_EMAIL.send(message);
  } catch {
    return json(
      { success: false, message: "Unable to send application." },
      502,
      request,
    );
  }

  return json({ success: true }, 200, request);
}

function validatePayload(
  payload: ContactPayload,
): { ok: true } | { ok: false; message: string } {
  if (!isNonEmptyString(payload.name) || String(payload.name).length > 100) {
    return { ok: false, message: "Name is required." };
  }

  if (!isEmail(payload.email)) {
    return { ok: false, message: "A valid email is required." };
  }

  if (
    !isNonEmptyString(payload.message) ||
    String(payload.message).length > MAX_FIELD_LENGTH
  ) {
    return { ok: false, message: "Message is required." };
  }

  if (!isNonEmptyString(payload.turnstileToken)) {
    return { ok: false, message: "Verification is required." };
  }

  return { ok: true };
}

function parseApplication(
  formData: FormData,
): { ok: true; payload: ApplicationPayload } | { ok: false; message: string } {
  const role = stringValue(formData.get("role"));
  const name = stringValue(formData.get("name"));
  const email = stringValue(formData.get("email"));
  const profile = stringValue(formData.get("profile"));
  const coverNote = stringValue(formData.get("coverNote"));
  const turnstileToken = stringValue(formData.get("cf-turnstile-response"));
  const cv = formData.get("cv");

  if (!role || role.length > 160) {
    return { ok: false, message: "Role is required." };
  }

  if (!name || name.length > 100) {
    return { ok: false, message: "Name is required." };
  }

  if (!isEmail(email)) {
    return { ok: false, message: "A valid email is required." };
  }

  if (profile && profile.length > 500) {
    return { ok: false, message: "Profile link is too long." };
  }

  if (!coverNote || coverNote.length > MAX_FIELD_LENGTH) {
    return { ok: false, message: "A short note is required." };
  }

  if (!turnstileToken) {
    return { ok: false, message: "Verification is required." };
  }

  if (!(cv instanceof File) || cv.size === 0) {
    return { ok: false, message: "CV is required." };
  }

  if (cv.size > MAX_CV_SIZE) {
    return { ok: false, message: "CV must be smaller than 4 MB." };
  }

  if (!isAcceptedCv(cv)) {
    return { ok: false, message: "CV must be a PDF, DOC, or DOCX file." };
  }

  return {
    ok: true,
    payload: {
      role,
      name,
      email,
      profile,
      coverNote,
      turnstileToken,
      cv,
    },
  };
}

async function verifyTurnstile(
  token: string,
  secret: string,
  remoteIp?: string,
): Promise<boolean> {
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        remoteip: remoteIp,
      }),
    },
  );

  if (!response.ok) return false;

  const result = (await response.json()) as TurnstileResult;
  return result.success;
}

function buildEmail({
  from,
  to,
  replyTo,
  subject,
  body,
  attachment,
}: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  body: string;
  attachment?: {
    filename: string;
    contentType: string;
    bytes: ArrayBuffer;
  };
}): string {
  if (attachment) {
    const boundary = `xeontek-${crypto.randomUUID()}`;

    return [
      `From: XeonTek Website <${from}>`,
      `To: ${to}`,
      `Reply-To: ${replyTo}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 7bit",
      "",
      body,
      "",
      `--${boundary}`,
      `Content-Type: ${attachment.contentType}; name="${attachment.filename}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${attachment.filename}"`,
      "",
      base64Lines(attachment.bytes),
      "",
      `--${boundary}--`,
      "",
    ].join("\r\n");
  }

  return [
    `From: XeonTek Website <${from}>`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    body,
  ].join("\r\n");
}

function stringValue(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function safeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "cv";
}

function isAcceptedCv(file: File): boolean {
  const filename = file.name.toLowerCase();

  return (
    ACCEPTED_CV_TYPES.has(file.type) ||
    ACCEPTED_CV_EXTENSIONS.some((extension) => filename.endsWith(extension))
  );
}

function base64Lines(bytes: ArrayBuffer): string {
  const uint8 = new Uint8Array(bytes);
  let binary = "";
  const chunkSize = 0x8000;

  for (let i = 0; i < uint8.length; i += chunkSize) {
    binary += String.fromCharCode(...uint8.subarray(i, i + chunkSize));
  }

  return btoa(binary)
    .replace(/.{1,76}/g, "$&\r\n")
    .trim();
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 320 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

function cleanHeader(value: string): string {
  return value.replace(/[\r\n]/g, " ").slice(0, 160);
}

function json(body: unknown, status: number, request: Request): Response {
  return Response.json(body, {
    status,
    headers: corsHeaders(request),
  });
}

function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("Origin");
  const allowed =
    origin && /^https:\/\/(www\.)?xeontek\.com$/.test(origin)
      ? origin
      : "https://www.xeontek.com";

  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}
