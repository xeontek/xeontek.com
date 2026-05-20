import {
  json,
  options,
  sendBrevoEmail,
  validateContactPayload,
  verifyTurnstile,
  type ContactPayload,
  type Env,
} from "../_lib/forms";

type PagesContext = {
  request: Request;
  env: Env;
};

export function onRequestOptions({ request }: PagesContext): Response {
  return options(request);
}

export async function onRequestPost({
  request,
  env,
}: PagesContext): Promise<Response> {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return json({ success: false, message: "Invalid request." }, 400, request);
  }

  const validation = validateContactPayload(payload);
  if (!validation.ok) {
    return json({ success: false, message: validation.message }, 400, request);
  }

  const tokenOk = await verifyTurnstile(
    String(payload.turnstileToken),
    env.TURNSTILE_SECRET_KEY,
    request.headers.get("CF-Connecting-IP") ?? undefined,
  );

  if (!tokenOk) {
    return json({ success: false, message: "Verification failed." }, 400, request);
  }

  const replyTo = String(payload.email);
  const subject = String(payload.subject || "New enquiry from xeontek.com");
  const body = [
    `Name: ${payload.name}`,
    `Email: ${replyTo}`,
    `Subject: ${subject}`,
    "",
    String(payload.message),
  ].join("\n");

  const sent = await sendBrevoEmail(env, {
    subject,
    replyTo: {
      email: replyTo,
      name: String(payload.name),
    },
    textContent: body,
  });

  if (!sent) {
    return json(
      { success: false, message: "Unable to send message." },
      502,
      request,
    );
  }

  return json({ success: true }, 200, request);
}

export function onRequestGet({ request }: PagesContext): Response {
  return json({ success: false, message: "Method not allowed." }, 405, request);
}
