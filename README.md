# User Management System Dashboard

Portfolio-quality **User Management System** built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. It fetches users from DummyJSON and focuses on real SaaS dashboard UX: responsive layout, searchable/sortable/paginated user directory, rich profile details, skeleton loading, and error/empty states.

## Live Demo

- **Online**: `https://modern-user-management-dashboard-wi.vercel.app/`

### Demo Video

<video src="https://github.com/user-attachments/assets/878c0f7e-c84f-4768-8f19-af6d1011674d" controls muted playsinline style="max-width: 100%; border-radius: 12px;"></video>

If the video doesn’t render in your Markdown viewer, open it here: `https://github.com/user-attachments/assets/878c0f7e-c84f-4768-8f19-af6d1011674d`

## Tech Stack (and why)

- **Next.js (App Router)**: Server Components + nested layouts provide fast initial loads and a clean routing architecture for dashboards.
- **React + TypeScript**: Strong typing for API contracts + safer refactors for scalable UI.
- **Tailwind CSS**: Design-system friendly styling with consistent spacing, typography, and responsive utilities.
- **shadcn/ui (Radix primitives)**: Accessible, composable components with full styling control (no heavy UI framework lock-in).
- **next-themes**: Dark/light/system theme switching with minimal code.
- **Lucide**: Consistent icon set that matches modern admin UI patterns.

## Core Features

### Dashboard layout

- Sidebar navigation with selected state
- Sticky top header
- Mobile drawer navigation (`Sheet`)
- Dark/light/system toggle

### Dashboard overview

- Stat cards:
  - Total users
  - Male users
  - Female users
  - Average age

### Users directory

- Data source: `https://dummyjson.com/users` (all users fetched via pagination)
- Search (debounced): name + email
- Sorting: name + age
- Pagination: page numbers, first/last, page size
- Responsive presentation:
  - Table on desktop
  - Cards on mobile
- Empty results state

### User details

`/dashboard/users/[id]` shows a clean card-based profile:

- Identity + contact
- Address and company details
- University, birth date, blood group, eye/hair info
- Crypto + bank info

### Loading, empty, and error states

- **Skeleton screens (App Router route-level)**:
  - `src/app/dashboard/loading.tsx`
  - `src/app/dashboard/users/loading.tsx`
- Empty state for search results
- Graceful API error state if the network/VPN blocks requests

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

Note: the dev server binds to `0.0.0.0:3000` to be VPN/network-adapter friendly.

### Build & start production

```bash
npm run build
npm run start
```

## Architecture / Folder Structure

```txt
src/
  app/
    dashboard/
      layout.tsx
      page.tsx
      loading.tsx
      users/
        page.tsx
        loading.tsx
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
      api-error-state.tsx
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

## Design Decisions

- **Server-first data fetching**: pages fetch data server-side and pass it to focused client components for interactivity (search/sort/pagination), keeping UI snappy and code easy to reason about.
- **Separation of concerns**:
  - `services/` for API calls (server-only)
  - `types/` for API models and helpers
  - `components/` for reusable UI building blocks
- **Mobile-first UX**: cards on small screens, table on larger screens, sidebar drawer for mobile navigation.

## Screenshots

- Dashboard overview: _(add screenshot here)_
- Users directory: _(add screenshot here)_
- User details: _(add screenshot here)_

## Future Improvements

- URL-synced table state (query/sort/page) for shareable views
- Filters (gender, age range, department)
- Virtualized table for very large datasets
- Editing workflows (activate/deactivate, inline edits) with optimistic UI
- Tests (Playwright + component tests)
