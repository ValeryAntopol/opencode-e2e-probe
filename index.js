import { createHash } from "node:crypto";

// Loaded by OpenCode on a Fluence cloud agent. The fluence-e2e-test suite installs it
// with `env: { E2E_PROBE_LITERAL }` and `secret_env: { E2E_PROBE_SECRET }`, asks the
// agent to call `e2e_probe`, and compares the answer with what it configured. The
// secret itself never leaves the machine: only its SHA-256 is reported.
function report() {
  const secret = process.env.E2E_PROBE_SECRET;
  return JSON.stringify({
    probe: "opencode-e2e-probe",
    literal: process.env.E2E_PROBE_LITERAL ?? null,
    secret_sha256: secret
      ? createHash("sha256").update(secret).digest("hex")
      : null,
  });
}

const description =
  "Report the fluence-e2e probe: the E2E_PROBE_LITERAL value and the SHA-256 of E2E_PROBE_SECRET.";

// OpenCode 2: a default definition with an id and a setup that registers the tool.
export default {
  id: "opencode-e2e-probe",
  async setup(context) {
    await context.tool.transform((tools) =>
      tools.add({
        name: "e2e_probe",
        description,
        input: { type: "object", properties: {}, additionalProperties: false },
        execute: async () => ({ content: report() }),
      }),
    );
  },
};

// OpenCode 1.x: a named plugin function returning the tool.
export const E2EProbe = async () => ({
  tool: {
    e2e_probe: { description, args: {}, execute: async () => report() },
  },
});
