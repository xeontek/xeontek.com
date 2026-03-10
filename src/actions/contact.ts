"use server";

import { contactFormSchema, type FormState } from "@/lib/schemas";

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    subject: formData.get("subject") || undefined,
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const apiKey = process.env.WEB3FORM_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      message: "Form configuration error. Please try again later.",
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: apiKey,
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
        subject: parsed.data.subject ?? "New enquiry from xeontek.com",
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Failed to send message. Please try again.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
