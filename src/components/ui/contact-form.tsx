"use client";

import Script from "next/script";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { contactFormSchema, type FormState } from "@/lib/schemas";

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
  const [state, setState] = useState<FormState>({ success: false });
  const [pending, setPending] = useState(false);
  const [subject, setSubject] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSubject(params.get("subject"));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setPending(true);
    setState({ success: false });

    const formData = new FormData(event.currentTarget);
    const turnstileToken = formData.get("cf-turnstile-response");

    if (!turnstileToken) {
      setPending(false);
      setState({
        success: false,
        message: "Please complete the verification.",
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          subject: parsed.data.subject ?? "New enquiry from xeontek.com",
          message: parsed.data.message,
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setState({ success: true });
      } else {
        setState({
          success: false,
          message: result.message ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setState({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setPending(false);
      window.turnstile?.reset();
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
    <form onSubmit={handleSubmit} className="space-y-5">
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
          <p className="mt-1 text-xs text-red-600">{state.errors.message[0]}</p>
        )}
      </div>

      {turnstileSiteKey ? (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
          />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
        </>
      ) : (
        <p className="text-sm text-red-600">
          Contact form verification is not configured.
        </p>
      )}

      {state.message && <p className="text-sm text-red-600">{state.message}</p>}

      <p className="text-xs leading-relaxed text-slate-500">
        We use the details you provide to respond to your enquiry, including
        recruitment or application enquiries. See our{" "}
        <Link
          href="/privacy"
          className="font-medium text-teal-800 underline underline-offset-2 hover:text-teal-700"
        >
          Privacy Policy
        </Link>
        .
      </p>

      <button
        type="submit"
        disabled={pending || !turnstileSiteKey}
        className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
