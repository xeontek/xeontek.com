"use client";

import { useState } from "react";
import { BookOpenText } from "@phosphor-icons/react";

export function WhitepaperViewer({
  title,
  pdfUrl,
}: {
  title: string;
  pdfUrl: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const viewerUrl = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;

  if (!isVisible) {
    return (
      <button
        type="button"
        onClick={() => setIsVisible(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
      >
        <BookOpenText size={16} />
        View more
      </button>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-sm font-medium text-slate-700">{title}</p>
        <p className="mt-1 text-xs text-slate-500">
          In-browser preview. Download links are not provided.
        </p>
      </div>
      <iframe
        title={`${title} PDF preview`}
        src={viewerUrl}
        className="h-[72vh] w-full bg-slate-100"
      />
    </div>
  );
}
