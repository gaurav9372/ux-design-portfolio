# About Legacy Square

Legacy Square is a personal **legacy planning dashboard** whose primary purpose is to help users create their **Will**. Surrounding that goal is a **Digital Vault** for assets, liabilities, accounts, and cards, plus **Contacts**, a **Family Tree**, and supporting modules (Activities, Trash, Resources). The product positioning is "Safe your legacy, make your will."

---

## Brand & Visual Language
- **Brand:** Legacy Square — infinity-loop logo in red/black.
- **Theme:** Warm, off-white/peach background with maroon/red as the primary action colour.
- **Typography:** Clean serif-style heading on the logo + sans-serif throughout the UI.
- **Accent style:** 3D / soft-illustrated module icons (vault, assets bag, liabilities, accounts, cards, contacts, family tree, trash) — gives a friendly, non-intimidating feel to a heavy subject (estate planning).
- **Persistent UI:** A green floating "guide" avatar in the bottom-right corner across screens (likely an assistant/helper).

---

## Global Layout

### Left Sidebar (persistent navigation)
1. **Home**
2. **EXPLORE** section:
   - **Digital Vault** (expandable) → Overview, Assets, Liabilities, Accounts, Cards
   - **My Will**
   - **My Contacts**
   - **Family Tree**
   - **My Activities** (with a notification count badge)
   - **Trash**

### Top Bar (persistent)
- Sidebar toggle
- Global search ("Type to search…")
- Notifications bell
- **Resources** dropdown which contains FAQS and Blogs
- User profile (e.g., "Amit Gupta") with a circular progress ring around the avatar — likely the **overall Will / profile completion %**.

---

## Screen-by-Screen Analysis

### 1. Home (Dashboard)
The landing screen. Three stacked cards:
- **My Items** — quick counters for each vault category and module:
  - Assets, Liabilities, Cards, Accounts, Contacts (76), Family Members (08).
- **Safe your Legacy, Make your will** — primary CTA card with a progress bar ("Overall progress 0%") and a **"Make my will"** button. Tagline notes the will only takes a few minutes.
- **Upgrade and get more** — "Spouse bundle" upsell pushing Premium / *Consultation* plans, with a **View Plans** button.
- **Insights** panel:
  - Time-range toggles (Day / Month / Week / All time) and a year scrubber.
  - **Assets Allocation** breakdown: Financial / Immovable / Digital / Other Assets — colour-coded bar + legend.
  - **Assets vs Liabilities** donut chart with a net figure (₹0 / 48).

### 2. Digital Vault — Assets
- Sub-tab navigation across the vault: **Overview, Assets, Liabilities, Accounts, Cards**.
- Header card: "My Assets — List of all the assets you own" + **New Asset** button.
- Assets are grouped by type with collapsible sections:
  - **Immovable Assets** (e.g., *Immovable property* tag) — table columns: Name, Type of Property, Survey/Khata Number, Property Area.
  - **Financial Assets** (e.g., *Bank Accounts* tag) — same table pattern.
  - **Digital Asset** and **Other Asset** sections (collapsed).
- Each table has checkbox selection, pagination, and likely supports bulk actions.

### 3. Digital Vault — Liabilities
- Header: "My Liabilities" + **New Liability** button.
- Grouped by type:
  - **Loans → Institutional Loans** — table: Name of Institution, PAN, Contact Number of Lender, Email I'd of Lender (e.g., HDFC Loan, Kotak Loan).
  - **Loans → Other Loans** — table: Name of Lender, PAN, Contact, Email (individual lenders).
- Same checkbox + pagination pattern as Assets.

### 4. Digital Vault — Accounts (Digital Accounts)
- Header: "My Digital Accounts — Access Your Accounts Securely" + **New Account** button.
- A flat table (4 Accounts) with columns: Account name + email, **URL** (clickable, with arrow icon), Date Added, Last Updated, action menu.
- Examples: All Indian Stocks (Groww), US Stocks (IndMoney), Google Photos, Personal Facebook.
- "Last Updated" highlights stale entries in red (e.g., "1y 2m 5d ago").

### 5. Digital Vault — Cards
- Header: "My Cards — Manage Your Cards Easily" + **New Card** button.
- Table columns: masked card number + bank, **Type** (Credit Card / Debit Card pill), **Brand** (Visa / Mastercard logo), **Expiry Date**, **Last Updated**, **Date Added**, action menu.
- Expired or near-expiry dates are surfaced in red — a small but useful nudge.

### 6. My Will (Will hub)
- Top alert banner: "Need help with guidance and execution? Buy Our Premium or Consultation plan" → **View Plans**.
- Primary CTA card identical to home ("Safe your Legacy, Make your will" + progress bar + **Make my will**).
- Upsell card for the Spouse bundle.
- **"Get updates and insights from our expert team!"** — a horizontal carousel of educational article cards (What is a Will?, Which Will is best for you?, Create your will… etc.) under a "Helpful Resources" tag.
- **Commonly Asked Questions (FAQ)** section with a **left-side filter** by stage:
  - Before Making Will / During Will Making / After Making Your Will
  - Right side lists ~11 questions (What is a Will?, Who should create a Will?, Why do I need a Will?, etc.) as expandable accordions.
- Footer prompt: "Didn't find the answer you are looking for? **Contact our support**".

### 7. KYC Verification (Will Editor — first step)
This screen reveals the **Will creation flow** as a stepped wizard.
- Top: "**Will Editor** — Manage your will, beneficiaries, and more" with a back arrow + **Your Will Progress 18%** ring on the right.
- **Left rail** is a vertical stepper, each step shows its own % completion and estimated time:
  1. **KYC** (20%, 5 min) — current step
  2. **Personal Details** (30%, 5 min)
  3. **Assets & Liabilities** (0%, 5 min) — sub-items: Assets, Liabilities
  4. **People** (0%, 5 min) — sub-items: My Beneficiaries, Will Executors, Children & Guardians, Witnesses
  5. **Asset Distribution** (0%, 5 min)
  6. **Review Will** (0%, 5 min)
  7. **Final Will**
- **Main panel — KYC Verification:**
  - "Verify your ID before generating your will"
  - **Steps to follow:** (1) Keep your ID proof ready → (2) Enter your information → (3) Verify your details
  - Compliance note about disclosing personal/financial info.
  - **Continue** CTA + a **Guide** pill (top-right) for inline help.

This is the central authoring flow — every other module either feeds into it (Vault → Assets/Liabilities, Contacts → Beneficiaries/Executors/Witnesses/Guardians) or surrounds it.

### 8. My Contacts
- Header: "My Contacts — 24 Contacts added" + filter icon + **+ New contact** button.
- Tab filters: **All Contacts, Favorites, Family, Friends, Will Members** + a contact-specific search.
- Table columns: favorite star, **Name + role/profession** (avatar + subtitle like "Software Dev", "CEO", "Lawyer"), **Gender** (M/F badge), **Relationship** (Father, Friend, Other…), **Will Role** (pill: Beneficiary / Executor / Guardian — colour-coded), **Phone**, **Linked Assets** (count with cube icon).
- Confirms contacts are first-class entities reused across modules: each contact carries a **Will Role**, a **Relationship**, and a **count of vault items** they're linked to.

### 9. Family Tree
- Header: "My Family Tree — Keep your family connections structured, updated, and easy to access" + **Link Family Member** button.
- A canvas-style tree on a dotted background with **fullscreen, zoom-in, zoom-out** controls.
- Member nodes show avatar, name, age (e.g., "72yo"), DOB, and a **relationship pill** (Me / Wife / Son / Daughter…). Lines connect spouses horizontally and parents to children vertically.
- Each node has a kebab menu (likely edit/delete/link).

### 10. My Activities
- Header: "My Activities" with tab filters: **All, Vault, Will, Contacts, Family Tree** + activity search.
- A reverse-chronological feed of user actions:
  - "You added new family member Subha Gupta in family tree"
  - "You added new contact Anish Yadav"
  - "You added new asset ICICI Bank Account in my Financial Assets"
- Each row has a category icon, the action sentence (with the entity name bolded), and a date + timestamp on the right.
- Acts as the audit log / history.

### 11. Trash
- Header: "Trash — All your deleted items are shown here" + **Empty Bin** button.
- Tabs with counts: **All (5), Assets (1), Liabilities (1), Accounts (1), Cards (1), Contacts (1)** + a Trash search.
- Table: Name, **Type** (colour pill: Bank Account, Institutional Loan, Card, Account, Contacts), **From** (origin module — e.g., Vault - Assets, Vault - Liabilities, Contacts), **Date Deleted**, **Restore** action.
- Confirms a soft-delete pattern across every module — items can be restored from a single unified bin.

---

## Cross-Module Relationships (confirmed by the designs)

```
                 ┌──────────────────────┐
                 │      My Will         │
                 │  (Will Editor wizard)│
                 └──────────┬───────────┘
                            │ pulls from
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
 ┌────────────┐      ┌────────────┐     ┌─────────────┐
 │Digital Vault│      │ Contacts   │     │ Family Tree │
 │ • Assets   │◄────►│ • Will Role│◄───►│ • Relations │
 │ • Liabili. │ link │ • Linked   │     │             │
 │ • Accounts │      │   Assets ct│     │             │
 │ • Cards    │      └────────────┘     └─────────────┘
 └─────┬──────┘
       │
       ▼
   Trash (soft-delete from all modules) ◄── My Activities (audit log)
```

- **Vault → Will:** Assets and Liabilities are pulled into the will's "Assets & Liabilities" wizard step.
- **Contacts → Will:** Contacts populate Beneficiaries, Executors, Children & Guardians, Witnesses (the four "People" sub-steps).
- **Contacts ↔ Vault:** Each contact tracks a **Linked Assets count** — contacts can be attached to vault items (e.g., a lender to a liability).
- **Family Tree ↔ Contacts:** Family members likely overlap with the Family/Will Members tabs in Contacts.
- **Trash:** Every deletable entity across the four vault sub-modules + Contacts flows here, with a "From" column tracking origin.
- **Activities:** Logs creates/edits across Vault, Will, Contacts, Family Tree (matches the tab set on the activities page).

---

## Monetisation
Two upsell surfaces are visible on Home and My Will:
- **Premium / Consultation plan** — for guidance and execution help.
- **Spouse bundle** — described as "Get your Partner to also make Cohorinous Will" (likely *Coterminous*).

---

## Key Product Patterns Observed
- **Wizard-driven Will creation** with per-step % completion and time estimates — reduces overwhelm for a complex task.
- **Reusable entities** (vault items, contacts, family members) that feed into the will rather than re-entry.
- **Stale-data nudges** (red "1y 2m 5d ago" timestamps on Accounts; expired dates highlighted on Cards).
- **Soft-delete + Restore** across all data types, with unified Trash.
- **Audit trail** via My Activities, scoped per module.
- **Educational content** baked into the Will hub (carousel + FAQ accordion grouped by Will lifecycle stage).
- **Ambient assistant** — the floating green helper avatar present on every screen.

---
*Analysis based on 11 design screens in `/screens/🟡Design/`: Home, Assets, Liabilities, Accounts, Cards, My Will, KYC Verification (Will Editor), My Contacts, Family Tree, My Activities, Trash.*
