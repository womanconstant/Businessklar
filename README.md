# BusinessKlar

**Business setup cockpit for foreigners, freelancers and small founders in Germany.**

BusinessKlar is a multilingual web application that helps future founders understand the first practical steps of starting a business in Germany: business form selection, registration path, compliance checklist, cost/risk orientation, personalized report generation and specialist matching.

The current version is an MVP built as a static Vanilla JS + HTML application with Supabase for authentication, data storage, sharing, leads, specialist profiles and marketplace conversations.

> Status: MVP / public prototype
> Live domain: [https://businessklar.de](https://businessklar.de)
> Repository: [https://github.com/womanconstant/Businessklar](https://github.com/womanconstant/Businessklar)

---

## Why BusinessKlar exists

Starting a business in Germany is difficult for newcomers because the process is fragmented across authorities, tax offices, chambers, legal forms, local rules and professional advice providers.

BusinessKlar gives users a structured path:

1. answer business setup questions;
2. receive a personalized business setup orientation;
3. understand registration and compliance steps;
4. save or share a business case;
5. connect with relevant specialists.

The product is especially relevant for expats, migrants, freelancers, self-employed professionals and small business founders who need a practical, multilingual entry point into the German business system.

---

## Core features

### Founder flow

* Business setup questionnaire
* Business form and registration orientation
* Compliance checklist logic
* Germany-focused city and authority data
* Personalized report pages
* Shareable business case links
* Dashboard for saved cases
* Lead capture for report access or follow-up

### Marketplace flow

* Specialist directory
* Specialist onboarding page
* Specialist dashboard
* Consultant profile data
* Client-specialist conversations
* Inbox and conversation pages
* Supabase Row Level Security policies for marketplace access control

### Platform foundation

* Static multi-page architecture
* Vanilla JavaScript modules
* Supabase authentication
* Supabase SQL migrations / setup files
* PWA-style manifest and service worker
* Custom domain via `CNAME`

---

## Tech stack

| Area              | Technology                                                        |
| ----------------- | ----------------------------------------------------------------- |
| Frontend          | HTML, CSS, Vanilla JavaScript                                     |
| Backend / BaaS    | Supabase                                                          |
| Auth              | Supabase Auth                                                     |
| Database          | PostgreSQL via Supabase                                           |
| Security          | Supabase Row Level Security policies                              |
| PWA               | `manifest.json`, `sw.js`, app icons                               |
| Deployment target | Static hosting, GitHub Pages, Netlify, Vercel or Cloudflare Pages |
| Domain            | `businessklar.de`                                                 |

---

## Repository structure

```txt
Businessklar/
├── index.html                         # Main landing / calculator entry
├── dashboard.html                     # User dashboard
├── share.html                         # Shared business case view
├── contact.html                       # Contact page
├── recovery.html                      # Auth recovery page
├── specialists.html                   # Specialist directory / marketplace
├── specialists-home.html              # Specialist landing page
├── become-specialist.html             # Specialist onboarding page
├── specialist-dashboard.html          # Specialist profile/dashboard
├── inbox.html                         # Conversation inbox
├── conversation.html                  # Client-specialist conversation page
├── bk-auth.js                         # Supabase auth helpers and auth UI logic
├── compliance-rules.js                # Business/compliance rule logic
├── compliance-locales.js              # Compliance translations/localized content
├── report-i18n.js                     # Report translations
├── satellite-i18n.js                  # Additional i18n content
├── city-authorities.js                # Local authority mapping
├── city-to-bl.js                      # City to Bundesland mapping
├── cities246.json                     # City data
├── consultants_directory.sql          # Consultant directory schema/data setup
├── supabase_mvp.sql                   # MVP share/leads/business cases policies
├── supabase_marketplace.sql           # Marketplace, conversations and RLS setup
├── supabase_refactor_v2.sql           # Supabase refactor migration
├── supabase_security_hardening_share.sql
├── supabase_migrations_first_public_v1.sql
├── manifest.json                      # PWA manifest
├── sw.js                              # Service worker
├── icon-192.png
├── icon-512.png
├── favicon.ico
├── CNAME                              # businessklar.de
└── scripts/                           # Data generation / maintenance scripts
```

---

## Local development

Because the project is currently a static multi-page application, no bundler is required for the MVP.

### Option 1: run with Python

```bash
python -m http.server 8080
```

Open:

```txt
http://localhost:8080
```

### Option 2: run with Node.js

```bash
npx serve .
```

or:

```bash
npx http-server .
```

---

## Supabase setup

BusinessKlar uses Supabase for authentication, saved business cases, leads, specialist profiles and conversations.

### 1. Create a Supabase project

Create a new project in Supabase and copy:

* Project URL
* anon public key

The anon key is expected to be used client-side. Do not expose service role keys in frontend code.

### 2. Apply SQL files

Apply the SQL files in the Supabase SQL editor. Recommended order:

```txt
1. consultants_directory.sql
2. supabase_mvp.sql
3. supabase_marketplace.sql
4. supabase_security_hardening_share.sql
5. supabase_refactor_v2.sql, if needed for the current database state
```

Check each file before applying it to an existing database. Some migrations may assume that previous tables or columns already exist.

### 3. Verify Row Level Security

Before production use, verify RLS policies for:

* `business_cases`
* `leads`
* `consultants`
* `conversations`
* `conversation_participants`
* `conversation_messages`

Minimum expected behavior:

* users can read and update only their own business cases;
* shared cases are accessed only through the intended share mechanism;
* users can only read conversations where they are participants;
* users can only send messages as themselves;
* unpublished consultant profiles are visible only to their owners;
* public consultant profiles do not expose private fields unless intentionally designed.

---

## Environment variables

The current MVP may use Supabase configuration directly in frontend JavaScript. For production, prefer a generated config file or deployment environment variables during build.

Recommended `.env.example` for future bundler-based setup:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-public-anon-key
SITE_URL=https://businessklar.de
```

Never commit:

```txt
.env
.env.local
*.secret
service-role keys
private API keys
```

---

## Deployment

BusinessKlar can be deployed to any static hosting provider.

### GitHub Pages

The repository already contains a `CNAME` file for:

```txt
businessklar.de
```

For GitHub Pages:

1. open repository settings;
2. go to Pages;
3. select the deployment branch;
4. confirm custom domain;
5. enable HTTPS.

### Netlify / Vercel / Cloudflare Pages

Use the repository root as the publish directory.

No build command is required for the current static MVP.

```txt
Build command: empty
Publish directory: .
```

---

## PWA notes

The project includes:

* `manifest.json`
* `sw.js`
* `icon-192.png`
* `icon-512.png`

Before production, verify:

* service worker cache invalidation;
* offline behavior;
* icon paths;
* screenshots in the manifest;
* installability in Chrome DevTools Lighthouse.

---

## SEO roadmap

BusinessKlar is a search-driven product. Before scaling content or paid traffic, the following SEO layer should be added:

* page-specific `<title>` and `<meta name="description">`;
* Open Graph and Twitter/X preview tags;
* canonical URLs;
* `robots.txt`;
* `sitemap.xml`;
* `hreflang` for German, Russian and English versions;
* Schema.org structured data for service pages;
* optimized landing pages for key search intents:

  * business in Germany for foreigners;
  * Gewerbe anmelden;
  * self-employment in Germany;
  * GmbH vs Einzelunternehmen;
  * freelance taxes in Germany;
  * business registration checklist Germany.

---

## Security checklist

Before using this project with real users, run a dedicated security review.

Important checks:

* Supabase anon key permissions;
* RLS coverage on all public tables;
* share token entropy and access logic;
* whether published consultant profiles expose private data;
* spam protection for contact and specialist onboarding forms;
* abuse protection for conversations/messages;
* email confirmation and password recovery redirects;
* GDPR-compliant privacy policy;
* cookie and analytics disclosure;
* backups and database migration strategy.

Recommended additions:

* Cloudflare Turnstile or another bot protection layer;
* Sentry or equivalent frontend error tracking;
* privacy-friendly analytics such as Umami or Plausible;
* basic CI checks for broken links and HTML validation.

---

## Current limitations

This repository represents an MVP. Known limitations:

* no bundler or build pipeline yet;
* limited automated testing;
* limited CI/CD automation;
* large HTML files should be split into reusable modules;
* SEO metadata needs expansion;
* service worker caching strategy is basic;
* legal/compliance rules require regular review;
* AI-assisted matching is planned but should be clearly separated from current rule-based logic unless a production LLM integration is added.

---

## Product roadmap

### Short term

* Add full SEO metadata to all pages
* Add `robots.txt` and `sitemap.xml`
* Improve README and project documentation
* Add `.env.example`
* Add `.gitignore`
* Add basic analytics and error tracking
* Harden Supabase RLS policies
* Add spam protection to public forms
* Improve landing page CTA and funnel tracking

### Medium term

* Move shared UI logic into reusable modules
* Introduce Vite or another lightweight bundler
* Split large inline CSS/JS blocks
* Add structured i18n management
* Improve PWA caching with safer update behavior
* Add automated tests for core questionnaire and report logic
* Add GitHub Actions for validation checks

### Long term

* AI-assisted specialist matching through secure backend functions
* Verified specialist onboarding workflow
* Admin moderation dashboard
* Content hub for Germany business setup guides
* Paid report/export options
* Partner/referral model for specialists
* Multi-country expansion after Germany is validated

---

## Legal and compliance note

BusinessKlar provides structured orientation and workflow support. It should not be presented as a replacement for legal, tax or immigration advice.

For marketplace use, specialists should be clearly categorized by qualification, jurisdiction, verification status and service scope.

---

## Contributing

The project is in MVP stage. Contributions should focus on:

* security hardening;
* SEO improvements;
* accessibility;
* frontend structure;
* Supabase policy review;
* performance;
* multilingual content quality;
* Germany-specific business setup data accuracy.

Suggested workflow:

```bash
git checkout -b feature/your-feature-name
# make changes
git commit -m "Describe your change"
git push origin feature/your-feature-name
```

Then open a pull request with:

* summary of changes;
* affected pages/files;
* screenshots if UI changed;
* Supabase migration notes if database logic changed;
* security implications if policies or auth flows changed.

---

## License

No license has been defined yet.

Until a license is added, all rights are reserved by the repository owner. If open-source collaboration is intended, add a license such as MIT, Apache-2.0 or AGPL-3.0 depending on the intended usage model.

---

## Maintainer

BusinessKlar is maintained by the repository owner.

For questions, partnerships or specialist onboarding, use the contact flow on the live site once available.
