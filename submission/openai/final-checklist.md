# Final Submission Readiness Checklist

This checklist follows the current OpenAI public Plugin submission flow for a Skills-only Plugin.

## Ready

- [x] Submission type is `Skills only`.
- [x] Final packaged skill tree is available at `skills/press-print/`.
- [x] Packaged `SKILL.md` contains trigger conditions, task instructions, missing-image handling, and OpenAI host behavior.
- [x] Referenced prompt and quality rubric are bundled with the Skill.
- [x] Public listing name, short description, long description, category, and publisher copy are prepared.
- [x] Production-ready logo / icon assets are present in the repository.
- [x] Public website, privacy, terms, and support URLs have been prepared.
- [x] Starter prompts are prepared.
- [x] Five positive review test cases are prepared.
- [x] Three negative review test cases are prepared.
- [x] Initial-submission release notes are prepared.
- [x] Availability recommendation is prepared.
- [x] Local Plugin packaging was tested in ChatGPT Desktop.
- [x] Direct image generation from the installed Plugin was verified.
- [x] Chinese invocation, indirect invocation, missing-image behavior, multiple source categories, and negative routing were exercised.
- [x] Codex can discover and read the installed Press-Print Skill.
- [x] MCP server fields are not applicable.
- [x] MCP authentication, tool annotations, CSP, domain verification, and reviewer credentials are not applicable to this Skills-only submission.

## Human-only blockers before submission

- [ ] Confirm the OpenAI Platform organization used for submission.
- [ ] Confirm the submitter has `Apps Management: Write` permission in that organization. Organization owners already have the required permission according to OpenAI's current submission documentation.
- [ ] Complete or confirm individual developer verification for `Fan Jiale`, or choose a verified business identity if the publisher strategy changes.
- [ ] Confirm that the verified identity selected in the submission portal matches the public publisher information, website, support contact, privacy policy, and terms.
- [ ] Open the Plugin submission portal and create a new draft with submission type `Skills only`.
- [ ] Upload the exact `skills/press-print/` bundle tested locally.
- [ ] Copy the prepared listing details, starter prompts, five positive tests, three negative tests, availability selection, and release notes into the portal.
- [ ] Review and personally confirm all policy attestations before selecting `Submit for Review`.

## Go / no-go status

**Status: READY EXCEPT FOR PLATFORM IDENTITY / SUBMISSION-PERMISSION CONFIRMATION.**

Do not submit until the developer identity and Apps Management write access are visibly confirmed in the same OpenAI Platform organization used to create the Plugin draft.
