import {
  fileToBase64,
  json,
  options,
  parseApplication,
  safeFilename,
  sendBrevoEmail,
  verifyTurnstile,
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
    return json({ success: false, message: "Verification failed." }, 400, request);
  }

  const replyTo = application.payload.email;
  const subject = `Application: ${application.payload.role}`;
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

  const sent = await sendBrevoEmail(env, {
    subject,
    replyTo: {
      email: replyTo,
      name: application.payload.name,
    },
    textContent: body,
    attachment: [
      {
        name: safeFilename(application.payload.cv.name),
        content: await fileToBase64(application.payload.cv),
      },
    ],
  });

  if (!sent) {
    return json(
      { success: false, message: "Unable to send application." },
      502,
      request,
    );
  }

  return json({ success: true }, 200, request);
}

export function onRequestGet({ request }: PagesContext): Response {
  return json({ success: false, message: "Method not allowed." }, 405, request);
}
