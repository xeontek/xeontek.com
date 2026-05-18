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

type TurnstileResult = {
  success: boolean;
  "error-codes"?: string[];
};

const DEFAULT_FROM = "website@xeontek.com";
const DEFAULT_TO = "enquiries@xeontek.com";
const MAX_FIELD_LENGTH = 5000;

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
}: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  body: string;
}): string {
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
