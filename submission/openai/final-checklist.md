# Final Submission Readiness Checklist

This checklist follows the current OpenAI public Plugin submission flow for a Skills-only Plugin.

## Ready

- [x] Submission type is `Skills only`.
- [x] Final packaged skill tree is available at `skills/press-print/`.
- [x] Packaged `SKILL.md` contains trigger conditions, task instructions, missing-image handling, and OpenAI host behavior.
- [x] Referenced prompt and quality rubric are bundled with the Skill.
- [x] Public listing metadata is finalized: `Press-Print`, category `Creativity`, short description `Editorial photo reconstruction`, and version `1.0.2`.
- [x] Final long description and three starter prompts are prepared.
- [x] Production-ready logo / icon assets are present in the repository.
- [x] Public website, privacy, terms, and support URLs are prepared and aligned to the same publisher identity.
- [x] Privacy and terms copy are synchronized between the repository and the public `galok.me` routes.
- [x] Six positive review test cases are prepared.
- [x] Three negative review test cases are prepared.
- [x] Initial-submission release notes are prepared.
- [x] Availability recommendation is prepared.
- [ ] Re-test the v1.0.2 local Plugin package in ChatGPT Desktop.
- [ ] Verify direct image generation against the v1.0.2 text and visual regression checks.
- [x] Chinese invocation, indirect invocation, missing-image behavior, multiple source categories, and negative routing were exercised.
- [x] Codex can discover and read the installed Press-Print Skill.
- [x] MCP server fields are not applicable.
- [x] MCP authentication, tool annotations, CSP, domain verification, and reviewer credentials are not applicable to this Skills-only submission.
- [x] Individual developer identity for `Fan Jiale` is verified in OpenAI Platform.

## Remaining portal actions

- [ ] Confirm the submitter has `Apps Management: Write` permission in the same OpenAI Platform organization used for submission. Organization owners already have this permission according to OpenAI's current submission documentation.
- [ ] Open the Plugin submission portal and create a new draft with submission type `Skills only`.
- [ ] Select the verified `Fan Jiale` developer identity and confirm it matches the public Galok publisher relationship shown on the website, support page, privacy policy, and terms.
- [ ] Upload the exact `skills/press-print/` bundle tested locally.
- [ ] Copy the finalized listing details and three starter prompts into the portal.
- [ ] Add the six positive tests and three negative tests from `test-cases.md`.
- [ ] Choose country / region availability only where the publisher, support process, legal pages, and relevant OpenAI capabilities are ready.
- [ ] Add the initial-submission release notes.
- [ ] Review and personally confirm all policy attestations before selecting `Submit for Review`.

## Go / no-go status

**Status: GITHUB v1.0.2 CONTENT READY; PLATFORM PACKAGE TESTING AND UPLOAD PENDING.**

The v1.0.2 repository content is prepared for GitHub. Before an OpenAI Platform submission, re-test the local package, confirm `Apps Management: Write` in the target organization, create the required ZIP, and complete the portal steps above.
