const required = ["NEXT_PUBLIC_TURNSTILE_SITE_KEY"];

const missing = required.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error(
    `Missing required build environment variable(s): ${missing.join(", ")}`,
  );
  process.exit(1);
}
