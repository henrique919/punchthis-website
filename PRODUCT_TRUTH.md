# PunchThis — Product Truth Matrix

Source of truth: `henrique919/audit-snap-663` (Expo/React Native app), branch `main` @ `6c3e202` (2026-07-19), cross-checked against `docs/launch/LAUNCH_STATUS.md`, `docs/launch/DECISIONS.md`, `expo/types/models.ts`, `expo/lib/legalCopy.ts`, `expo/constants/theme.ts` and `expo/app.json` in that repo.

Every marketing claim on punchthis-website must trace to a row below. Categories: **Shipped** (real, in the current app), **Beta** (present but not final), **Planned** (roadmap, do not present as current), **Do not claim** (no evidence, or explicitly false).

## Issue lifecycle

| Claim | Status | Evidence |
|---|---|---|
| Issues have a status: **Open → Assigned → In Progress → Completed** (4 states) | **Shipped** | `expo/types/models.ts:76` — `type IssueStatus = "open" \| "assigned" \| "in_progress" \| "completed"`. `ISSUE_STATUSES` array confirms exactly these 4. |
| A **"For Review"** status exists, awaiting contractor sign-off | **Do not claim** | Not in `IssueStatus`. `constants/colors.ts:50` labels the `review` colour token *"For-review (reserved for future status)"* — explicitly not implemented. |
| A **"Verified"** status exists, distinct from Completed | **Do not claim** | Not in `IssueStatus`. Marking an issue "Completed" is the only terminal state. |
| A contractor/assignee marks their own work done in-app (two-party handoff) | **Do not claim** | No contractor portal, login, or write access exists. `Assignee` is a local contact record (name/company/email/phone/trade) attached for context only — status changes are made by the single app user, not the assignee. |
| Priority: Low / Medium / High | **Shipped** | `expo/types/models.ts:77` `IssuePriority`. |
| Issues carry a due date / can be "Overdue" | **Do not claim** | No `dueDate` field on `Issue` in `models.ts`. Do not show "Overdue" counts anywhere. |

## Markup

| Claim | Status | Evidence |
|---|---|---|
| Arrow, Circle (ellipse), Box (rect), Pen (freehand), Number (callout), Text, Blur (redaction) annotation tools | **Shipped** | `expo/types/models.ts:146-155` `AnnotationElement` union. |
| Annotations are layered, editable, movable/resizable after creation, non-destructive to the original photo | **Shipped** | Same file, doc comment lines 128-138. |
| Blur is a real privacy redaction, permanently applied only on export | **Shipped** | `expo/lib/legalCopy.ts` `BLUR_REDACTION`. |

## Reports

| Claim | Status | Evidence |
|---|---|---|
| Configurable PDF report: cover page, summary, details, original/annotated photos, timestamps, page numbers, photo locations, signature, include-completed, group by location/assignee, sort, image size | **Shipped** | `expo/types/models.ts:172-204` `ReportOptions`/`DEFAULT_REPORT_OPTIONS`. |
| Preset report themes: Client, Site Walk, Handover ("Executive" is the internal key for the Client preset) | **Shipped** | `docs/launch/LAUNCH_STATUS.md` LP-22; `Project.lastReportThemeKey`. |
| Preview the PDF before sharing | **Shipped** | Report builder → PDF Preview screen flow (existing app routes). |
| Report summary can break counts down by "Verified" or "Overdue" | **Do not claim** | Follows from the issue-lifecycle truth above — only open/assigned/in_progress/completed exist. |

## Storage, sync and collaboration

| Claim | Status | Evidence |
|---|---|---|
| Local-first: projects, photos, reports stored only on-device | **Shipped** | `expo/lib/legalCopy.ts` `LOCAL_STORAGE_WARNING`; `docs/launch/LAUNCH_STATUS.md` "Known limitations: Local-first only; no team features; no cloud backup." |
| Cloud backup / sync | **Do not claim** | No such feature exists. `SyncStatus` field exists in the schema only as a future-proofing placeholder (`local_only` is the only value ever set today). |
| Team / multi-user collaboration | **Do not claim** | Explicitly listed as not present ("no team features"). |
| Export-all creates a local zip archive of every record and photo | **Shipped** | LP-05, `expo/lib/exportArchive.ts`. |
| Export-all is a restore/backup mechanism | **Do not claim** | Archival only — "not restorable in-app" (LP-01/LP-05 evidence). |
| "Clear all data" permanently deletes local projects/audits/issues + owned media | **Shipped** | LP-01, `expo/lib/wipe.ts`. Does not affect anything already exported/shared elsewhere. |

## Accounts, platforms, availability

| Claim | Status | Evidence |
|---|---|---|
| User accounts / sign-in exist | **Do not claim** | `docs/launch/DECISIONS.md` L11/L12: "no accounts exist." Marketing "Sign in" link must be removed, not just re-pointed. |
| iOS and Android apps are in development | **Shipped (in development)** | `expo/app.json`: `com.punchthis.app` bundle/package configured for both platforms. Not yet store-submitted (blocked on name clearance + developer accounts — LP-09/LP-10/LP-11, external). |
| Currently usable today via invite-only web/PWA early access | **Beta** | `docs/launch/DECISIONS.md` L7: "Gate A ships as controlled web/PWA early access on the existing Render deploy (invite-only, founder-supported)." |
| App Store / Play Store listing is live | **Do not claim** | Not yet submitted. |
| Pricing is announced | **Do not claim** | `docs/launch/DECISIONS.md` L15: hypotheses only ("no paywall built now; pricing never blocks Gate A"). FAQ copy "Pricing has not been announced yet" is correct — keep it. |

## Legal, privacy, support

| Claim | Status | Evidence |
|---|---|---|
| Provisional Privacy / Terms / Support / Data-deletion wording, pending formal legal review | **Beta (provisional, labelled)** | `expo/lib/legalCopy.ts` — `PROVISIONAL_NOTICE`, `PRODUCT_SCOPE`, `RETENTION_DELETION`, `EXPORT_SHARING`, etc. Ship the same wording on the marketing site, same "provisional" label, never stronger. |
| PunchThis is encrypted / has secure cloud storage / guarantees retention | **Do not claim** | `expo/lib/legalCopy.ts` header comment: "Rule: never claim cloud backup, encryption, secure storage, or guaranteed retention." |
| Support contact | **Beta** | App's in-app mailto uses a provisional personal address (`expo/lib/legalCopy.ts SUPPORT_EMAIL`, flagged "confirm" by the operator in LP-04). Marketing site keeps its own existing `hello@punchthis.app` convention pending a single confirmed address — do not publish the personal address on the public site. |

## Accessibility

| Claim | Status | Evidence |
|---|---|---|
| Shared accessibility primitives + WCAG AA contrast tokens (web scope) | **Shipped** | LP-06, `docs/launch/LAUNCH_STATUS.md`: "a11y tree populated; contrast ≥4.5:1" (web scope). |
| Native VoiceOver / TalkBack verified | **Planned** | LP-09, blocked on physical devices (external). Do not claim native screen-reader certification. |

---
*Generated 2026-07-19 for the PunchThis marketing design-engineering loop. Re-derive after any app-repo change that touches the tables above — do not hand-edit claims without updating the matching row here first.*
