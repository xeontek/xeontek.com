import { config, fields, collection } from "@keystatic/core";

// https://keystatic.com/docs/local-mode
// Set storage mode: "local" or "github"
let KEYSTATIC_STORAGE_MODE = "local";

// GitHub repository details (required for GitHub mode)
const GITHUB_REPO_OWNER = "REPO_OWNER";
const GITHUB_REPO_NAME = "REPO_NAME";

export default config({
  storage:
    (KEYSTATIC_STORAGE_MODE as "github") === "github"
      ? {
          kind: "github",
          repo: `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`,
        }
      : {
          kind: "local",
        },

  collections: {   
    whitepapers: collection({
      label: "Whitepapers",
      slugField: "title",
      path: "src/data/whitepapers/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Whitepaper Name" } }),
        description: fields.text({ label: "Description" }),
        readLink: fields.url({ label: "Read Link" }),
        btnTitle: fields.text({ label: "Button Title" }),
        btnLink: fields.url({ label: "Button Link" }),
      },
    }),
  },
});
