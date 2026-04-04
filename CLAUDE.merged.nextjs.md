# CLAUDE.md — Frontend Website Rules (Next.js)

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- Assume the project uses **Next.js App Router + TypeScript** unless the repo clearly shows otherwise.
- Follow existing repo conventions before introducing new tools or patterns.

## Development Environment
- **Language**: TypeScript
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Component Library**: `shadcn/ui` for standard UI primitives when appropriate
- **Package Manager**: `pnpm` preferred when the repo uses it
- **Linting**: ESLint
- **Formatting**: Prettier

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Project Structure
Use this structure unless the repo already has an established alternative:

```text
.
├── app/                     # App Router structure
│   ├── layout.tsx
│   ├── page.tsx
│   ├── api/
├── components/              # UI components (shadcn or custom)
├── hooks/                   # Custom React hooks
├── lib/                     # Helpers, API wrappers, utils
│   ├── api/
├── public/                  # Static assets
├── styles/                  # Tailwind extensions or scoped styles if needed
├── tests/                   # Unit and integration tests
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── README.md
```

## Local Development
- **Always run a local dev server** — never rely on `file:///`
- Preferred dev command:
  ```bash
  pnpm dev
  ```
- If the repo does not use `pnpm`, use the existing package manager instead.
- Default local URL: `http://localhost:3000`
- If the server is already running, do not start another instance.

## Screenshot Workflow
- Always screenshot from localhost.
- Use the existing screenshot tooling in the repo when available.
- After screenshotting, analyze visual mismatches and fix them.
- When comparing, be specific: spacing, padding, font size, font weight, line-height, colors, alignment, border-radius, shadows, image sizing.

## Output Defaults
- Use **Next.js App Router** (`app/` directory)
- Main route: `app/page.tsx`
- Root layout: `app/layout.tsx`
- Use **React functional components**
- Split into components when it improves clarity or reusability
- Prefer server components by default; add `"use client"` only when interactivity is required
- Use Tailwind CSS for styling by default
- Do not output `index.html` unless the user explicitly asks for a static HTML file

## Brand Assets
- Always check the `brand_assets/` folder before designing.
- If assets exist there, use them.
- If a logo is present, use it.
- If a color palette is defined, use those exact values.

## Images
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Store project images in `/public`
- Use Next.js `<Image />` when it makes sense
- If the design depends on exact visual behavior and plain `<img>` is simpler, that is acceptable

## Navigation
- Use Next.js `<Link>` for internal navigation
- Use raw `<a>` only for external links or anchor jumps where appropriate

## Interactivity
- Use React state and hooks (`useState`, `useEffect`, etc.)
- Do not use direct DOM scripting unless there is a strong reason
- Avoid:
  - `document.getElementById`
  - manual `addEventListener`
  - imperative DOM mutation for normal UI behavior

## Forms
- Use controlled inputs when form state or validation requires it
- Keep simple forms simple; do not over-engineer
- Validate user input clearly
- Show error states conditionally in React
- For production submissions, validate again on the server

## Components
- Use `shadcn/ui` components by default for common UI patterns:
  - buttons
  - inputs
  - selects
  - dialogs
  - cards
  - sheets
- If the reference design is highly custom, build custom components instead of forcing `shadcn/ui`
- Keep components small and reusable where it helps readability

## Data Fetching
- Prefer Next.js-native patterns first
- Use server-side fetching where practical
- Use **React Query / TanStack Query** only when the project genuinely benefits from:
  - client-side caching
  - repeated API fetching
  - mutations
  - infinite loading
  - stale/refetch management
- If React Query is used:
  - initialize it cleanly in the app shell
  - keep API logic in `lib/api/`
  - use stable query keys such as `['user', id]`

## API Routes
- Put route handlers under `app/api/`
- Keep request/response logic thin
- Put shared API helpers in `lib/api/`
- Use API routes for things like:
  - form submissions
  - Stripe session creation
  - newsletter signup
  - server-side integrations

## Testing
- Use testing where logic justifies it
- For simple landing pages, do not add unnecessary test overhead
- Add tests for:
  - reusable hooks
  - utility functions
  - complex interactive components
  - business-critical flows
- Preferred tools:
  - Jest
  - React Testing Library
- Tests may live in `/tests` or alongside components, following repo conventions

## Code Style Standards
- Prefer arrow functions where sensible
- Annotate return types on exported functions when useful
- Destructure props
- Avoid `any`; prefer proper types, `unknown`, or generics
- Group imports in this order:
  1. react
  2. next
  3. third-party libraries
  4. local files
- Keep naming clear and consistent
- Do not introduce unnecessary abstraction

## Documentation
- Keep `README.md` updated when project setup or usage changes materially
- Add short comments only where they improve clarity
- Document non-obvious hooks, providers, and configuration files

## Security
- Validate all server-side inputs
- Do not trust client-side validation alone
- Use secure cookies and CSRF protection when applicable
- Protect sensitive routes with middleware or session logic when applicable
- Never expose secrets in client-side code

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (`indigo-500`, `blue-600`, etc.) as the primary brand color. Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never use `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as a primary brand color
- Do not output a monolithic static `index.html` for a Next.js project
- Do not force React Query, tests, or `shadcn/ui` into places where they add complexity without value
- Do not make major implementation changes until you have high confidence in what needs to be built

## Practical Defaults for This Repo Style
- Use `app/page.tsx` for page entry
- Use `app/layout.tsx` for providers and global layout
- Put reusable UI in `components/`
- Put hooks in `hooks/`
- Put helpers and integrations in `lib/`
- Put public assets in `public/`
- Prefer `pnpm dev`, `pnpm build`, `pnpm lint`
