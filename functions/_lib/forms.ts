type BrevoAttachment = {
  name: string;
  content: string;
};

type BrevoMessage = {
  subject: string;
  replyTo: {
    email: string;
    name?: string;
  };
  textContent: string;
  attachment?: BrevoAttachment[];
};

export type Env = {
  BREVO_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_FROM?: string;
  CONTACT_TO?: string;
};

export type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  turnstileToken?: unknown;
};

export type ApplicationPayload = {
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

export function validateContactPayload(
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

export function parseApplication(
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

export async function verifyTurnstile(
  token: string,
  secret: string | undefined,
  remoteIp?: string,
): Promise<boolean> {
  if (!secret) return false;

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

export async function sendBrevoEmail(
  env: Env,
  message: BrevoMessage,
): Promise<boolean> {
  if (!env.BREVO_API_KEY) return false;

  const from = env.CONTACT_FROM ?? DEFAULT_FROM;
  const to = env.CONTACT_TO ?? DEFAULT_TO;
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "XeonTek Website",
        email: from,
      },
      to: [{ email: to }],
      replyTo: message.replyTo,
      subject: cleanHeader(message.subject),
      textContent: message.textContent,
      attachment: message.attachment,
    }),
  });

  return response.ok;
}

export async function fileToBase64(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

export function safeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "cv";
}

export function json(
  body: unknown,
  status: number,
  request: Request,
): Response {
  return Response.json(body, {
    status,
    headers: corsHeaders(request),
  });
}

export function options(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request),
  });
}

function stringValue(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function isAcceptedCv(file: File): boolean {
  const filename = file.name.toLowerCase();

  return (
    ACCEPTED_CV_TYPES.has(file.type) ||
    ACCEPTED_CV_EXTENSIONS.some((extension) => filename.endsWith(extension))
  );
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

function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("Origin");
  const allowed =
    origin &&
    /^https:\/\/((www\.)?xeontek\.com|xeontek\.pages\.dev)$/.test(origin)
      ? origin
      : "https://www.xeontek.com";

  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}
