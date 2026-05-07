# User Management System Dashboard

A modern, portfolio-quality **User Management System** dashboard built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. It consumes the public API at `https://dummyjson.com/users` and showcases production-ready UI patterns: responsive sidebar layout, searchable/sortable/paginated users table, skeleton loading, empty states, and rich user details.

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Theme**: `next-themes` (dark/light/system)
- **Icons**: Lucide

## Features

- **Dashboard shell**
  - Modern sidebar navigation
  - Sticky top header
  - Mobile drawer navigation using `Sheet`
  - Dark/light/system theme toggle

- **Users list**
  - Fetch users from DummyJSON
  - Search by name/email (debounced)
  - Sort by name and age
  - Client-side pagination
  - Responsive: table on desktop, cards on mobile
  - Sticky table header
  - Empty results state

- **User details**
  - Dedicated details page per user
  - Clean card-based sections
  - Address, company, education, hair/eye/blood info, crypto, bank details

- **Quality**
  - Strong TypeScript models
  - Reusable components (layout + user UI)
  - Simple, maintainable folder structure

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or your preferred package manager)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Then open:

- `http://localhost:3000`

Note: the dev server is configured to bind to `0.0.0.0:3000` for VPN/network-adapter friendliness.

### Production build

```bash
npm run build
npm run start
```

## Folder Structure

```txt
src/
  app/
    dashboard/
      page.tsx
      layout.tsx
      users/
        page.tsx
        [id]/
          page.tsx
          not-found.tsx
  components/
    dashboard/
      app-header.tsx
      app-sidebar.tsx
      mode-toggle.tsx
      nav-items.ts
      stat-card.tsx
    users/
      user-detail-section.tsx
      users-empty-state.tsx
      users-skeleton.tsx
      users-table.tsx
    ui/
      ...shadcn components
    theme-provider.tsx
  hooks/
    use-debounced-value.ts
  services/
    users.ts
  types/
    dummyjson.ts
    user.ts
  lib/
    utils.ts
```

## Design Decisions (Why this architecture)

- **App Router + server components**: pages fetch data server-side and pass it to focused client components for interactivity (search/sort/pagination).
- **Separation of concerns**:
  - `services/` handles API access
  - `types/` defines the contract
  - `components/` focuses on UI composition and reusability
- **Mobile-first UX**: cards on mobile, table on desktop, and a sidebar drawer for small screens.

## Screenshots

- Dashboard overview: _(add screenshot here)_
- Users list: _(add screenshot here)_
- User details: _(add screenshot here)_

## Future Improvements

- Add URL-synced table state (query/sort/page) for shareable views
- Add virtualization for very large user lists
- Add filters (gender, age range, department)
- Add optimistic UI mutations (edit user, activate/deactivate)
- Add tests (Playwright + component tests)
