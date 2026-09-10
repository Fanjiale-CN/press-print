# Final Submission Readiness Checklist — Press-Print 2.0

This checklist is the release gate for Press-Print 2.0. Do not merge the 2.0 feature branch into `main` or submit the new version until the required runtime and reviewer paths are proven.

## Repository and product definition

- [x] Active Skill upgraded to Press-Print 2.0 orchestration.
- [x] Established v1 visual reconstruction prompt retained as the rendering authority rather than rewritten.
- [x] Core product constitution added under `docs/system/`.
- [x] Visual grammar added under `docs/system/`.
- [x] Shared system schema added and aligned to the 2.0 failure taxonomy.
- [x] Art-direction policy aligned to the real 2.0 interaction model.
- [x] Tool/capability contract distinguishes model-native capabilities from externally exposed MCP tools.
- [x] Regression benchmark added.
- [x] Product manifest updated to version `2.0.0`.
- [x] Press-Print 2.0 light and dark SVG product marks added.
- [x] `BRAND.md` updated so Press-Print has its own mark while Galok remains the publisher identity.

## MCP App implementation

- [x] `render_direction_picker` implemented.
- [x] `render_result_actions` implemented.
- [x] Inline direction picker widget implemented.
- [x] Inline result-actions widget implemented.
- [x] Widget follow-up messaging wired to the host conversation.
- [x] Widget state updates wired for selected direction/action.
- [x] Light/dark host adaptation implemented.
- [x] Mobile single-column direction layout implemented.
- [x] Stateless Streamable HTTP `/mcp` endpoint implemented.
- [x] `/health` endpoint implemented.
- [x] Production TypeScript build implemented.
- [x] Multi-stage production Dockerfile implemented.

## Automated validation

- [x] GitHub Actions CI installs dependencies.
- [x] TypeScript typecheck passes.
- [x] Production server build passes.
- [x] Server starts successfully in CI.
- [x] `/health` responds successfully in CI.
- [x] MCP SDK client can connect to `/mcp`.
- [x] MCP tool discovery returns the expected UI tools.
- [x] MCP resource discovery returns both widget resources.
- [x] Both MCP tools can be called with representative structured inputs.
- [x] Both widget resources can be read through MCP.
- [ ] Reconfirm all automated checks after the final pre-deployment code change.

## Required 2.0 user-flow tests

- [ ] **Vague request:** attach a photograph and ask `@Press-Print 处理一下这张。`; verify source-specific directions appear only when useful.
- [ ] Select a direction card; verify the selection returns to the same conversation and generation proceeds without asking the same question again.
- [ ] Verify `Surprise me` chooses a source-specific direction rather than randomizing style.
- [ ] **Explicit request:** ask for a specific reconstruction with hard locks; verify Press-Print executes directly without forcing a direction picker.
- [ ] **Revision:** keep the current crop/subject and request one or two changes; verify successful decisions survive rather than rerolling.
- [ ] Verify result-action buttons change one clear axis at a time.
- [ ] Verify direction picker and result actions on mobile.
- [ ] Verify direction picker and result actions in both light and dark ChatGPT themes.

## Visual regression gates

- [ ] Run a representative 2.0 gold subset before first release.
- [ ] Confirm semantic preservation remains at or above the accepted threshold.
- [ ] Confirm Press-Print identity remains at or above the accepted threshold.
- [ ] Confirm reconstruction strength and editorial hierarchy do not regress from accepted v1 outputs.
- [ ] Check portrait identity preservation.
- [ ] Check architecture / structural rhythm preservation.
- [ ] Check dense-signage source-text handling.
- [ ] Check restrained variation does not remain over-textured.
- [ ] Check aggressive variation does not collapse semantic identity.
- [ ] Reject generic AI polish, cinematic realism drift, template sameness, and materiality without cause.

## Source-text regressions carried forward

- [ ] Zero new typography when the user did not request text.
- [ ] No pseudo-text or filler editorial copy.
- [ ] No translation or bilingual duplication of monolingual source text.
- [ ] No hallucinated replacement for identity-critical source text.
- [ ] Exact user-requested text remains exact and receives no extra invented copy.

## Privacy, terms, and infrastructure

- [x] Repository privacy policy updated for the Press-Print 2.0 MCP architecture.
- [x] Repository terms updated for Press-Print 2.0.
- [x] Current MCP schema does not accept raw source-image files.
- [x] Current MCP implementation has no persistent user-content database.
- [ ] Select and connect a production hosting provider.
- [ ] Deploy the MCP App to a stable public HTTPS endpoint.
- [ ] Verify the production `/health` endpoint.
- [ ] Verify the production `/mcp` endpoint with the MCP smoke client.
- [ ] Confirm production logs do not intentionally record tool-call request bodies.
- [ ] Record the selected infrastructure provider in the privacy policy and deployment documentation if required for accurate disclosure.
- [ ] Synchronize the updated privacy policy to the public `galok.me/press-print/privacy/` route.
- [ ] Synchronize the updated Terms to the public `galok.me/press-print/terms/` route.
- [ ] Confirm public support and product pages accurately describe 2.0.

## OpenAI listing and reviewer material

- [x] Listing copy updated to `2.0.0` positioning.
- [x] Starter prompts updated to demonstrate vague and explicit paths.
- [x] Review test cases updated for 2.0 interaction, reconstruction, revision, UI, and negative routing.
- [x] Release notes updated for 2.0.
- [ ] Confirm the final OpenAI submission/package format and current logo asset requirements in the portal.
- [ ] Replace the manifest's temporary PNG icon reference if the final portal/runtime asset format requires the new 2.0 SVG assets or new raster exports.
- [ ] Confirm verified developer identity and publisher relationship remain correct in the portal.
- [ ] Enter the production MCP endpoint and any required MCP metadata.
- [ ] Test the exact packaged build that will be submitted.
- [ ] Review and personally confirm all policy attestations before `Submit for Review`.

## Merge gate

Do **not** merge the 2.0 PR into `main` until all of the following are true:

1. production MCP is reachable over stable HTTPS;
2. the vague, explicit, and revision flows pass in real ChatGPT;
3. public privacy / terms pages match the deployed architecture;
4. the final automated CI run is green;
5. representative visual and source-text regression tests pass.

## Current status

**Status: 2.0 CODE + MCP PROTOCOL FOUNDATION READY; PRODUCTION DEPLOYMENT AND CHATGPT END-TO-END VALIDATION PENDING.**
