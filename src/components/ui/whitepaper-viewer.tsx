"use client";

import { useState } from "react";
import {
  ArrowsOutSimple,
  BookOpenText,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  X,
} from "@phosphor-icons/react";

const zoomLevels = [75, 100, 125, 150, 175, 200];

export function WhitepaperViewer({
  title,
  pdfUrl,
}: {
  title: string;
  pdfUrl: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(1);
  const zoom = zoomLevels[zoomIndex];
  const viewerUrl = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&zoom=${zoom}`;

  const canZoomOut = zoomIndex > 0;
  const canZoomIn = zoomIndex < zoomLevels.length - 1;
  const zoomOut = () => setZoomIndex((current) => Math.max(0, current - 1));
  const zoomIn = () =>
    setZoomIndex((current) => Math.min(zoomLevels.length - 1, current + 1));

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

  const viewer = (
    <div
      className={
        isFullscreen
          ? "flex h-full flex-col overflow-hidden bg-white"
          : "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      }
    >
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700">{title}</p>
            <p className="mt-1 text-xs text-slate-500">
              In-browser preview. Download links are not provided.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={zoomOut}
              disabled={!canZoomOut}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors duration-150 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Zoom out"
            >
              <MagnifyingGlassMinus size={17} />
            </button>
            <span className="min-w-14 text-center text-xs font-medium text-slate-500">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={!canZoomIn}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors duration-150 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Zoom in"
            >
              <MagnifyingGlassPlus size={17} />
            </button>
            {isFullscreen ? (
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors duration-150 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                aria-label="Close full screen reader"
              >
                <X size={17} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors duration-150 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                aria-label="Open full screen reader"
              >
                <ArrowsOutSimple size={17} />
              </button>
            )}
          </div>
        </div>
      </div>
      <iframe
        title={`${title} PDF preview`}
        src={viewerUrl}
        className={
          isFullscreen
            ? "min-h-0 flex-1 bg-slate-100"
            : "h-[72vh] w-full bg-slate-100"
        }
      />
    </div>
  );

  if (isFullscreen) {
    return (
      <div
        className="fixed inset-0 z-[100] bg-white"
        role="dialog"
        aria-modal="true"
        aria-label={`${title} full screen PDF reader`}
      >
        {viewer}
      </div>
    );
  }

  return viewer;
}
