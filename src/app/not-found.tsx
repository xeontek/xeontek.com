import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 pt-32 pb-20 text-center sm:pt-40">
      <p className="text-sm font-medium text-slate-400">404</p>
      <h1 className="mt-2 text-3xl sm:text-4xl">Page not found</h1>
      <p className="mt-4 text-slate-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-slate-800"
      >
        Go home
      </Link>
    </div>
  );
}
