"use client";

import Script from "next/script";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle, Paperclip } from "@phosphor-icons/react";
import type { FormState } from "@/lib/schemas";

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
  }
}

type CareerJob = {
  slug: string;
  title: string;
  description: string;
  location?: string;
  type?: string;
  focus?: string;
  responsibilities?: string[];
  requirements?: string[];
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const maxCvSize = 4 * 1024 * 1024;
const acceptedCvTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const acceptedCvExtensions = [".pdf", ".doc", ".docx"];

export function CareersBoard({ jobs }: { jobs: CareerJob[] }) {
  const [selectedSlug, setSelectedSlug] = useState(jobs[0]?.slug ?? "");
  const selectedJob = jobs.find((job) => job.slug === selectedSlug) ?? jobs[0];

  if (!selectedJob) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center sm:p-12">
        <p className="text-slate-600">
          We don&apos;t have open positions at the moment.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Follow XeonTek on{" "}
          <a
            href="https://www.linkedin.com/company/xeontek"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-teal-800 hover:text-teal-700"
          >
            LinkedIn
          </a>{" "}
          for future roles.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        {jobs.map((job) => {
          const selected = job.slug === selectedJob.slug;

          return (
            <button
              key={job.slug}
              type="button"
              onClick={() => setSelectedSlug(job.slug)}
              className={`w-full rounded-xl border p-6 text-left transition-all duration-200 ${
                selected
                  ? "border-teal-300 bg-teal-50/60 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl">{job.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {job.description}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className={`mt-1 shrink-0 ${
                    selected ? "text-teal-700" : "text-slate-300"
                  }`}
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {[job.location, job.type, job.focus]
                  .filter(Boolean)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        <JobDetails job={selectedJob} />
        <ApplicationForm job={selectedJob} />
      </div>
    </div>
  );
}

function JobDetails({ job }: { job: CareerJob }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-medium tracking-wider text-teal-700 uppercase">
        Open position
      </p>
      <h2 className="mt-3 text-2xl">{job.title}</h2>
      <p className="mt-3 leading-relaxed text-slate-600">{job.description}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          ["Location", job.location],
          ["Type", job.type],
          ["Focus", job.focus],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
              {label}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <JobList title="What you'll do" items={job.responsibilities ?? []} />
        <JobList
          title="What we're looking for"
          items={job.requirements ?? []}
        />
      </div>
    </article>
  );
}

function JobList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-lg">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <CheckCircle
              size={18}
              className="mt-0.5 shrink-0 text-teal-700"
              weight="duotone"
            />
            <span className="text-sm leading-relaxed text-slate-600">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ApplicationForm({ job }: { job: CareerJob }) {
  const [state, setState] = useState<FormState>({ success: false });
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setPending(true);
    setState({ success: false });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const turnstileToken = formData.get("cf-turnstile-response");
    const cv = formData.get("cv");

    if (!turnstileToken) {
      setPending(false);
      setState({
        success: false,
        message: "Please complete the verification.",
      });
      return;
    }

    if (!(cv instanceof File) || cv.size === 0) {
      setPending(false);
      setState({ success: false, message: "Please attach your CV." });
      return;
    }

    if (cv.size > maxCvSize) {
      setPending(false);
      setState({
        success: false,
        message: "Please attach a CV smaller than 4 MB.",
      });
      return;
    }

    if (!isAcceptedCv(cv)) {
      setPending(false);
      setState({
        success: false,
        message: "Please attach your CV as a PDF, DOC, or DOCX file.",
      });
      return;
    }

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setState({ success: true });
        form.reset();
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
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-6">
        <p className="text-sm font-medium text-teal-900">
          Application sent. We&apos;ll review it and get back to you where
          relevant.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <input type="hidden" name="role" value={job.title} />
      <h2 className="text-2xl">Apply for this role</h2>
      <p className="mt-2 text-sm text-slate-500">
        Attach your CV and add a short note about why this role fits your
        experience.
      </p>

      <div className="mt-6 space-y-5">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Field
          label="LinkedIn or portfolio"
          name="profile"
          type="url"
          placeholder="https://"
        />
        <div>
          <label
            htmlFor="coverNote"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Short note
          </label>
          <textarea
            id="coverNote"
            name="coverNote"
            required
            rows={5}
            className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:outline-none"
            placeholder="Tell us about your relevant experience."
          />
        </div>

        <div>
          <label
            htmlFor="cv"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            CV
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm text-slate-600 transition-colors hover:border-teal-300 hover:bg-teal-50/50">
            <Paperclip size={18} className="text-teal-700" />
            <span>Attach PDF, DOC, or DOCX. Maximum 4 MB.</span>
            <input
              id="cv"
              name="cv"
              type="file"
              required
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="sr-only"
            />
          </label>
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
            Application form verification is not configured.
          </p>
        )}

        {state.message && (
          <p className="text-sm text-red-600">{state.message}</p>
        )}

        <p className="text-xs leading-relaxed text-slate-500">
          We use your application details to review and respond to your enquiry.
          See our{" "}
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
          {pending ? "Sending application..." : "Send application"}
        </button>
      </div>
    </form>
  );
}

function isAcceptedCv(file: File) {
  const filename = file.name.toLowerCase();

  return (
    acceptedCvTypes.includes(file.type) ||
    acceptedCvExtensions.some((extension) => filename.endsWith(extension))
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:outline-none"
      />
    </div>
  );
}
