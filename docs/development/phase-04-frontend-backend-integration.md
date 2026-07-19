# Sprint 4 Report: Frontend-Backend Integration

## Sprint Objective
Connect the UrbanFlow AI frontend dashboard to the backend API layer, replacing placeholder widget data with live metrics derived from vehicles, traffic, incidents, and routes. Establish a scalable data-loading architecture with loading and error states.

## Dashboard Data Layer
- Added centralized `loadDashboardData()` async function in `Dashboard.tsx`.
- Fetches vehicles, traffic, incidents, and routes on component mount via a single `useEffect`.
- Stores raw responses in React state: `vehicles`, `traffic`, `incidents`, `routes`.
- Derived values are computed from raw state and exposed through a single `dashboardMetrics` object.

## Service Layer
- Created shared Axios instance in `frontend/src/services/api.ts` with base URL `http://localhost:8000` and 10s timeout.
- Implemented service modules:
  - `vehicleService.ts` — `getVehicles()`, `getVehicle(vehicleId)`, `createVehicle(data)`
  - `trafficService.ts` — `getTraffic()`, `getTrafficById(id)`, `createTraffic(data)`
  - `incidentService.ts` — `getIncidents()`, `getIncidentById(id)`, `createIncident(data)`
  - `routeService.ts` — `getRoutes()`, `getRoute(routeId)`, `createRoute(data)`
- Services return raw Axios responses; components remain responsible for data extraction.

## Widget Integrations
- **KpiCard**: Fleet Status card now displays `totalVehicles` from `vehicles.length`. Other cards display live values from `dashboardMetrics`.
- **FleetStatus**: Receives `activeVehicles`, `idleVehicles`, `maintenanceVehicles` derived by filtering `vehicles` by `status`.
- **TrafficOverview**: Receives `congestionLevel` from first traffic record, `avgSpeed` computed as mean of `average_speed` values, and `incidents` from `traffic.length`.
- **PredictionWidget**: Receives `accuracy` (percentage of routes where `optimized_time_min < estimated_time_min`), `predictedDelay` (average time savings), and `optimizedRoutes` from `routes.length`.
- **AlertPanel**: Receives `totalAlerts`, `criticalAlerts`, and `warningAlerts` derived by filtering `incidents` by `severity`.
- **MapPlaceholder**: Left unchanged (title-only prop). Added map-related metrics to `dashboardMetrics` (`vehicleCount`, `routeCount`, `incidentCount`) to prepare for future live map integration.

## dashboardMetrics Architecture
- Single `dashboardMetrics` object centralizes all derived values.
- Eliminates scattered derived-state variables across the component.
- Provides a predictable interface for widgets and future map integration.
- Computed on every render from current state.

## Loading State
- `loading` state initialized to `true`.
- Set to `false` in the `finally` block of `loadDashboardData()`.
- Displays "Loading dashboard data..." placeholder while loading.
- Dashboard widgets render only after loading completes.

## Error Handling
- `error` state initialized to `null`.
- `loadDashboardData()` wrapped in `try/catch`.
- Errors captured as strings and displayed in red when present.
- Loading state preserved; widgets do not render if an error occurs.

## Files Created
- `frontend/src/services/api.ts`
- `frontend/src/services/vehicleService.ts`
- `frontend/src/services/trafficService.ts`
- `frontend/src/services/incidentService.ts`
- `frontend/src/services/routeService.ts`
- `docs/development/phase-04-frontend-backend-integration.md`

## Files Modified
- `frontend/src/pages/Dashboard.tsx`
- `frontend/package.json` (added `axios` dependency)

## Technical Decisions
- **HTTP Client**: Axios for promise-based API calls with centralized configuration.
- **Data Fetching**: Single async function called from one `useEffect` to avoid duplicate requests.
- **State Management**: React `useState` for raw data; derived values computed inline within `dashboardMetrics`.
- **Error Boundary**: Local `try/catch` with user-facing error message; no global error boundary implemented yet.
- **Loading UX**: Simple text placeholder; no skeleton screens or spinners implemented.
- **Type Safety**: Uses `any[]` for API response arrays due to missing TypeScript interfaces for backend payloads.

## Validation Results
- **TypeScript**: `npx tsc -b` passes with no errors.
- **Production Build**: `npx vite build` completes successfully.
  - `dist/index.html` — 0.45 kB
  - `dist/assets/index-*.css` — 13.38 kB
  - `dist/assets/index-*.js` — 284.83 kB
- **Axios Dependency**: Installed and available in `frontend/package.json`.

## Known Limitations
- No retry logic for failed API requests.
- No request cancellation on component unmount.
- No global API error handling or toast notifications.
- Dashboard uses `any[]` for API data; TypeScript interfaces for backend payloads are not yet defined.
- No offline caching or persistence.
- Map widget remains a placeholder; no live map library integrated.
- No pagination or filtering for large datasets.

## Next Sprint
- Define TypeScript interfaces for all backend response payloads.
- Implement global API error handling and toast notifications.
- Add retry logic and request cancellation.
- Integrate live map library (Leaflet or Google Maps) using prepared `dashboardMetrics` map data.
- Add skeleton loading screens for better UX.
- Implement pagination and filtering for dashboard tables.
- Add unit and integration tests for service layer and Dashboard component.
