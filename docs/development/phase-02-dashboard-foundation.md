# Sprint 2 – Dashboard Foundation

## Sprint Objective

Establish the core application layout and a functional Dashboard page foundation using reusable components, clean spacing, and Tailwind CSS styling.

## Scope Completed

- Application layout shell with fixed Sidebar and Header
- Dashboard page with responsive KPI grid and supporting widgets
- Reusable dashboard component library

## Components Created

- `MainLayout` — semantic `<main>` wrapper with `<Outlet />`
- `Sidebar` — fixed vertical sidebar, 72px width, text placeholders
- `Header` — fixed top bar, 64px height, title/search/notification/avatar placeholders
- `KpiCard` — reusable card with `title`, `value`, `subtitle` props
- `FleetStatus` — reusable widget with `active`, `idle`, `maintenance` props
- `TrafficOverview` — reusable widget with `congestionLevel`, `avgSpeed`, `incidents` props
- `PredictionWidget` — reusable widget with `accuracy`, `predictedDelay`, `optimizedRoutes` props
- `AlertPanel` — reusable widget with `totalAlerts`, `criticalAlerts`, `warningAlerts` props
- `MapPlaceholder` — reusable placeholder with `title` prop and minimum height 320px

## Components Integrated

- `MainLayout` integrates `Sidebar`, `Header`, and `<Outlet />`
- `Dashboard` integrates `KpiCard`, `FleetStatus`, `TrafficOverview`, `PredictionWidget`, `AlertPanel`, and `MapPlaceholder`

## Files Created

- `frontend/src/layouts/MainLayout.tsx`
- `frontend/src/components/Sidebar.tsx`
- `frontend/src/components/Header.tsx`
- `frontend/src/pages/Dashboard.tsx`
- `frontend/src/components/dashboard/KpiCard.tsx`
- `frontend/src/components/dashboard/FleetStatus.tsx`
- `frontend/src/components/dashboard/TrafficOverview.tsx`
- `frontend/src/components/dashboard/PredictionWidget.tsx`
- `frontend/src/components/dashboard/AlertPanel.tsx`
- `frontend/src/components/dashboard/MapPlaceholder.tsx`

## Files Modified

- `frontend/src/layouts/MainLayout.tsx`
- `frontend/src/pages/Dashboard.tsx`

## Architecture Summary

The layout follows a fixed sidebar + scrollable content pattern. The `MainLayout` wraps routed pages, rendering the `Sidebar` at a fixed left offset and the `Header` at the top of the content area. The `Dashboard` page is composed of a responsive KPI grid (`grid-cols-1 md:grid-cols-2 xl:grid-cols-4`) followed by vertically stacked widget sections.

## UI Layout Overview

- Sidebar: fixed, left, 72px
- Header: fixed, top, 64px
- Content area: offset by sidebar width, cleared below header
- Dashboard sections: KPI grid → FleetStatus → TrafficOverview → PredictionWidget → AlertPanel → MapPlaceholder

## Technical Decisions

- Layout uses Tailwind utility classes exclusively
- Components are presentational and prop-driven
- No routing logic, API calls, charts, icons, or status-based colors were introduced
- Reusable widgets are co-located under `frontend/src/components/dashboard/`

## Validation

- TypeScript: Passed
- Build: Passed

## Folder Structure Added

```
frontend/src/
├── components/
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── dashboard/
│       ├── KpiCard.tsx
│       ├── FleetStatus.tsx
│       ├── TrafficOverview.tsx
│       ├── PredictionWidget.tsx
│       ├── AlertPanel.tsx
│       └── MapPlaceholder.tsx
├── layouts/
│   └── MainLayout.tsx
└── pages/
    └── Dashboard.tsx
```

## Known Limitations

- Sidebar items are text placeholders without navigation logic
- Header search input, notification button, and avatar are static placeholders
- Map widget is a placeholder without map integration (Leaflet/Google Maps)
- No responsive behavior beyond the KPI grid breakpoints
- No animations or transitions

## Next Sprint

Sprint 3 – Backend Foundation