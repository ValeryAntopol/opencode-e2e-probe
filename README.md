# opencode-e2e-probe

A tiny OpenCode plugin used by `fluencelabs/fluence-e2e-test` to check, on a live Fluence
cloud agent, that a plugin from an environment is installed and that its `env` and
`secret_env` reach it. It adds one tool, `e2e_probe`, which returns
`E2E_PROBE_LITERAL` and the SHA-256 of `E2E_PROBE_SECRET` — never the secret itself.
Releases carry the `npm pack` tarball the suite installs by URL.
