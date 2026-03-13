"use client";

import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { contactFormSchema, type FormState } from "@/lib/schemas";

interface ContactFormProps {
  subject?: string | null;
}

export function ContactForm({ subject }: ContactFormProps) {
  const [state, setState] = useState<FormState>({ success: false });
  const [pending, setPending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setState({ success: false });

    if (!captchaToken) {
      setPending(false);
      setState({
        success: false,
        message: "Please complete the captcha.",
      });
      return;
    }

    const raw = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      subject: formData.get("subject") || undefined,
    };

    const parsed = contactFormSchema.safeParse(raw);

    if (!parsed.success) {
      setPending(false);
      setState({
        success: false,
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORM_API_KEY,
          name: parsed.data.name,
          email: parsed.data.email,
          subject: parsed.data.subject ?? "New enquiry from xeontek.com",
          message: parsed.data.message,
          "h-captcha-response": captchaToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setState({ success: true });
      } else {
        setState({
          success: false,
          message: "Something went wrong. Please try again.",
        });
      }
    } catch {
      setState({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setPending(false);
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    }
  }

  if (state.success) {
    return (
      <div className="rounded-lg border border-teal-200 bg-teal-50 p-6">
        <p className="text-sm font-medium text-teal-900">
          Message sent. We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-5">
      {subject && <input type="hidden" name="subject" value={subject} />}

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:outline-none"
          placeholder="Your name"
        />
        {state.errors?.name && (
          <p className="mt-1 text-xs text-red-600">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:outline-none"
          placeholder="you@example.com"
        />
        {state.errors?.email && (
          <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:outline-none"
          placeholder="How can we help?"
        />
        {state.errors?.message && (
          <p className="mt-1 text-xs text-red-600">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      <HCaptcha
        sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
        reCaptchaCompat={false}
        ref={captchaRef}
        onVerify={setCaptchaToken}
      />

      {state.message && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
