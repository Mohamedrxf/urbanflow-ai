# Navigation Design

## Introduction

The navigation system is the backbone of the UrbanFlow AI platform, serving as the primary mechanism through which Fleet Managers access critical information, monitor operations, and make time-sensitive decisions. An intuitive, efficient navigation system is essential for reducing cognitive load, minimizing time-to-insight, and enabling rapid operational response.

**Why Intuitive Navigation is Critical for Fleet Managers:**

1. **Time-Sensitive Operations**: Fleet Managers operate in a dynamic environment where delays can cascade into significant operational costs. Every second spent searching for information is a second lost from decision-making.

2. **High Information Volume**: The platform consolidates data from multiple sources—vehicle GPS, traffic APIs, weather services, delivery systems, and AI engines. Effective navigation prevents information overload.

3. **Multi-Tasking Requirements**: Fleet Managers simultaneously monitor fleet health, traffic conditions, delivery progress, and alerts. Navigation must support rapid context switching without losing orientation.

4. **Emergency Response**: When critical incidents occur (vehicle breakdowns, traffic accidents, severe weather), Fleet Managers need immediate access to relevant information and action buttons.

5. **Cognitive Load Management**: With 7 major sections and numerous subsections, the navigation system must organize complexity into a simple, predictable structure.

**Design Philosophy:**

> **"Users should reach any important information within three clicks."**

This principle guides every navigation decision in the UrbanFlow AI platform. Whether accessing vehicle details, traffic incidents, route recommendations, or analytics reports, the navigation system ensures that critical information is never more than three interactions away. This philosophy balances depth of functionality with speed of access, ensuring that the platform remains powerful yet efficient.

The navigation system is designed to be:
- **Invisible when not needed**: Navigation fades into the background during normal operation
- **Immediately accessible when required**: Critical actions are always one click away
- **Consistently predictable**: Patterns remain the same across all sections
- **Scalable for growth**: Architecture supports future expansion without restructuring

---

# Navigation Principles

The UrbanFlow AI navigation system is built on nine core principles that ensure usability, efficiency, and scalability.

## 1. Simplicity

**Principle**: Present only necessary navigation options at any given time. Avoid cluttering the interface with rarely-used features.

**Implementation**:
- Primary navigation limited to 7 main sections
- Secondary navigation shows only relevant subsections
- Progressive disclosure for advanced features
- Clean, uncluttered interface with ample white space
- Minimal visual elements in navigation components

**Rationale**: Fleet Managers need to focus on operations, not navigation. A simple interface reduces learning time and prevents decision paralysis.

## 2. Consistency

**Principle**: Navigation patterns, terminology, and behavior remain uniform across all sections of the application.

**Implementation**:
- Same sidebar behavior on all pages
- Consistent iconography and labeling
- Uniform button placement and styling
- Predictable hover, active, and selected states
- Standardized breadcrumb format

**Rationale**: Consistency builds muscle memory, allowing Fleet Managers to navigate instinctively without conscious thought. Once they learn the pattern in one section, they know it everywhere.

## 3. Predictability

**Principle**: Users should always know where they are, where they can go, and how to get back.

**Implementation**:
- Clear visual indication of current location (active state)
- Breadcrumb trail showing navigation path
- Consistent back button behavior
- Hover states preview navigation destinations
- Disabled states clearly indicate unavailable actions

**Rationale**: Predictability eliminates uncertainty and reduces anxiety. Fleet Managers working under pressure need to trust that navigation will behave as expected.

## 4. Accessibility

**Principle**: Navigation must be usable by all users, including those with disabilities, and across all devices and input methods.

**Implementation**:
- Full keyboard navigation support
- Screen reader compatibility with ARIA labels
- High contrast mode support
- Minimum 44x44px touch targets
- Logical tab order
- Focus indicators on all interactive elements
- WCAG 2.1 AA compliance

**Rationale**: Accessibility is not optional. Fleet Managers may have diverse abilities, and the platform must serve all users effectively while complying with accessibility standards.

## 5. Minimal Cognitive Load

**Principle**: Navigation should require minimal mental effort. Users should never have to think about how to navigate.

**Implementation**:
- Clear, descriptive labels (no jargon)
- Intuitive iconography with text labels
- Logical grouping of related items
- Visual hierarchy guides attention
- Contextual help and tooltips
- Familiar patterns (standard web conventions)

**Rationale**: Fleet Managers already have high cognitive loads managing operations. Navigation should reduce, not add to, mental effort.

## 6. Fast Decision Support

**Principle**: Navigation should enable rapid decision-making by providing immediate access to actionable information.

**Implementation**:
- Critical information accessible within 3 clicks
- Quick action buttons on every relevant page
- Notification center for time-sensitive alerts
- Global search for direct access
- Recent pages for quick return
- Keyboard shortcuts for power users

**Rationale**: The platform's purpose is to enable fast decisions. Navigation is the conduit to decision-support information and must be optimized for speed.

## 7. Clear Information Hierarchy

**Principle**: Navigation should communicate the relative importance and relationship of different sections and pages.

**Implementation**:
- Primary navigation (sidebar) for major sections
- Secondary navigation for subsections
- Tertiary navigation (tabs, breadcrumbs) for context
- Visual weight indicates importance
- Grouping shows relationships
- Progressive disclosure reveals depth

**Rationale**: A clear hierarchy helps users understand the application structure and makes it easier to find information through logical exploration.

## 8. Responsive Design

**Principle**: Navigation must adapt seamlessly to different screen sizes and devices while maintaining functionality and usability.

**Implementation**:
- Desktop: Full sidebar + top navigation
- Tablet: Collapsible sidebar + top navigation
- Mobile: Hamburger menu + full-screen overlays
- Touch-friendly controls on all devices
- Appropriate spacing for input method
- Breakpoint-based adaptation

**Rationale**: Fleet Managers may access the platform from various devices in different contexts (office, vehicle, field). Navigation must work everywhere.

## 9. Scalable Architecture

**Principle**: Navigation structure must accommodate future growth without requiring complete restructuring.

**Implementation**:
- Modular component architecture
- Route-based code splitting
- Dynamic menu generation from configuration
- Support for role-based navigation (future)
- Extensible for new sections
- Backward-compatible routing

**Rationale**: The platform will evolve with business needs. Navigation architecture must support expansion from MVP to enterprise-scale without technical debt.

---

# Overall Navigation Structure

The UrbanFlow AI application uses a multi-layered navigation architecture that combines several complementary navigation systems. These systems work together to provide comprehensive orientation and access while maintaining simplicity.

## Navigation Components

### 1. Top Navigation Bar

**Purpose**: Provides global access to application-wide features and user-specific functions.

**Position**: Fixed at the top of the viewport, always visible.

**Contains**:
- Application Logo (click to return to Dashboard)
- Global Search (Ctrl+K shortcut)
- Notification Center (bell icon with badge)
- Quick Actions dropdown
- User Profile menu
- Theme Toggle (future)
- Help Button (future)

**Behavior**:
- Remains fixed during scrolling
- Collapses on mobile to essential elements only
- Provides consistent access regardless of current page
- Height: 64px on desktop, 56px on mobile

### 2. Left Sidebar

**Purpose**: Primary navigation providing access to all major application sections.

**Position**: Fixed on the left side of the viewport.

**Contains**:
- Application Logo (collapsed state)
- Navigation menu items (7 primary sections)
- Collapse/Expand toggle button
- User info at bottom (collapsed state)

**Behavior**:
- Expanded: 260px width, shows icon + text labels
- Collapsed: 72px width, shows icons only with tooltips
- Persists across all pages
- Highlights active section
- Smooth transition animation (300ms)
- Scrollable if menu items exceed viewport height

### 3. Main Content Area

**Purpose**: Displays the current page content and secondary navigation.

**Position**: Fills remaining space between sidebar and right edge.

**Contains**:
- Page header with title and actions
- Breadcrumb navigation
- Secondary navigation (tabs or sub-menu)
- Page content
- Pagination, filters, etc.

**Behavior**:
- Scrolls independently of sidebar and top bar
- Adapts to sidebar state (expanded/collapsed)
- Responsive padding and spacing
- Maximum width constraint for readability (1440px)

### 4. Breadcrumb Navigation

**Purpose**: Shows current location within application hierarchy and enables quick back navigation.

**Position**: Below top navigation, above page content.

**Contains**:
- Hierarchical path (Dashboard > Fleet > Vehicle Details)
- Clickable parent pages
- Current page (non-clickable, bold)

**Behavior**:
- Auto-generated based on route hierarchy
- Updates on navigation
- Click any parent to navigate up
- Hidden on Dashboard (root level)
- Truncated with ellipsis if path too long

### 5. Notification Center

**Purpose**: Centralized hub for alerts, notifications, and system messages.

**Position**: Accessed via bell icon in top navigation.

**Contains**:
- Notification list grouped by category
- Filter and sort options
- Mark as read/dismiss actions
- Clear all button
- Notification count badge

**Behavior**:
- Dropdown panel (320px wide)
- Shows 10 most recent notifications
- Real-time updates
- Click notification to navigate to source
- Mark as read on click
- Persistent unread count on bell icon

### 6. User Profile Menu

**Purpose**: Provides access to user-specific settings and account management.

**Position**: Accessed via user avatar/name in top navigation.

**Contains**:
- User name and email
- Profile link
- Preferences link
- Notification Settings link
- Help link
- About link
- Logout button

**Behavior**:
- Dropdown menu (240px wide)
- Click outside to close
- Keyboard accessible (Escape to close)
- Logout requires confirmation

## How Components Work Together

```
┌─────────────────────────────────────────────────────────────┐
│  Top Navigation Bar (Logo | Search | Notifications | Profile)│
├──────────┬──────────────────────────────────────────────────┤
│          │  Breadcrumb: Dashboard > Fleet > Vehicle Details  │
│ Sidebar  ├──────────────────────────────────────────────────┤
│          │                                                  │
│ [Icons]  │         Main Content Area                        │
│          │         (Page Content)                            │
│          │                                                  │
│          │                                                  │
│          │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

**Interaction Flow**:

1. **Primary Navigation**: User clicks sidebar item → navigates to section landing page
2. **Secondary Navigation**: User clicks subsection → navigates within section
3. **Drill-Down**: User clicks item in content → navigates to detail page
4. **Breadcrumb**: User clicks parent → navigates up hierarchy
5. **Global Search**: User searches → navigates directly to result
6. **Notification**: User clicks notification → navigates to source
7. **Quick Actions**: User clicks action button → performs action or navigates

**State Synchronization**:

- Sidebar highlights active section based on current route
- Breadcrumb updates on every navigation
- Notification badge updates in real-time
- Page title updates in browser tab
- Browser back/forward buttons work correctly
- Deep linking works from any entry point

---

# Sidebar Navigation

The sidebar is the primary navigation mechanism, providing persistent access to all major application sections. It is designed for speed, clarity, and minimal cognitive load.

## Navigation Menu Structure

| Menu Item | Icon | Purpose | Destination | Priority |
|-----------|------|---------|-------------|----------|
| **Dashboard** | `LayoutDashboard` | Main operational overview with KPIs, fleet health, and critical alerts | `/dashboard` | Critical |
| **Fleet** | `Truck` | Vehicle and driver management, real-time monitoring, and detailed information | `/fleet` | Critical |
| **Traffic** | `MapPin` | Traffic conditions, incidents, congestion analysis, and weather impact | `/traffic` | Critical |
| **Routes** | `Route` | Route management, AI optimization recommendations, and performance tracking | `/routes` | Critical |
| **Alerts** | `BellRing` | Alert management, critical issue monitoring, and resolution tracking | `/alerts` | Critical |
| **Analytics** | `BarChart3` | Historical analysis, performance trends, and operational insights | `/analytics` | Medium |
| **Settings** | `Settings` | User preferences, notification settings, and account management | `/settings` | Medium |

## Detailed Menu Item Specifications

### Dashboard

**Description**: The operational command center providing at-a-glance visibility into fleet health, delivery performance, and critical issues.

**Page Opened**: `/dashboard` (default landing page)

**Primary User Actions**:
- Review KPI cards (7 critical metrics)
- Acknowledge critical alerts
- Accept route recommendations
- Drill down to specific modules
- Filter by time range
- Export dashboard snapshot

**Related Modules**:
- Fleet (vehicle metrics)
- Traffic (live map)
- Routes (recommendations)
- Alerts (critical alerts)

**Default Behavior**: Loads automatically after login. Click logo/brand to return from any page.

---

### Fleet

**Description**: Comprehensive vehicle and driver management with real-time monitoring, detailed information, and performance tracking.

**Page Opened**: `/fleet` (Live Fleet - default view)

**Primary User Actions**:
- Monitor all vehicles in real-time
- Filter and search vehicles
- View vehicle details
- Contact drivers
- Reassign deliveries
- View vehicle on map

**Related Modules**:
- Vehicle Details (`/fleet/:vehicleId`)
- Driver Details (`/fleet/:vehicleId/driver`)
- Traffic (view on map)
- Routes (active routes)
- Alerts (vehicle alerts)

**Subsections**:
- Live Fleet (default)
- Vehicle Details (accessed by clicking vehicle)
- Driver Details (accessed by clicking driver)

---

### Traffic

**Description**: Real-time traffic monitoring, incident tracking, congestion analysis, and weather impact assessment.

**Page Opened**: `/traffic` (Live Traffic - default view)

**Primary User Actions**:
- View real-time traffic map
- Monitor incidents and closures
- Analyze congestion patterns
- Assess weather impact
- Reroute vehicles around issues
- View affected deliveries

**Related Modules**:
- Congestion (`/traffic/congestion`)
- Incidents (`/traffic/incidents`)
- Weather (`/traffic/weather`)
- Routes (route optimization)
- Alerts (traffic alerts)

**Subsections**:
- Live Traffic (default)
- Congestion
- Incidents
- Weather

---

### Routes

**Description**: AI-powered route optimization, active route monitoring, and historical performance analysis.

**Page Opened**: `/routes` (Recommendations - default view)

**Primary User Actions**:
- Review AI route recommendations
- Accept optimized routes
- Compare current vs. recommended routes
- Monitor active route progress
- View route history
- Batch optimize multiple routes

**Related Modules**:
- Recommendations (`/routes/recommendations`)
- Active Routes (`/routes/active`)
- Route History (`/routes/history`)
- Traffic (traffic conditions)
- Fleet (vehicle assignments)

**Subsections**:
- Recommendations (default)
- Active Routes
- Route History

---

### Alerts

**Description**: Centralized alert management with critical issue highlighting, filtering, and resolution tracking.

**Page Opened**: `/alerts` (Active Alerts - default view)

**Primary User Actions**:
- Review active alerts
- Prioritize critical issues
- Take corrective action
- Mark alerts as resolved
- Filter by severity or type
- View alert history

**Related Modules**:
- Active Alerts (default)
- Critical (filtered view)
- History (past alerts)
- Fleet (vehicle-related alerts)
- Traffic (traffic-related alerts)

**Subsections**:
- Active Alerts (default)
- Critical
- History

---

### Analytics

**Description**: Historical analysis and reporting for fleet performance, delivery trends, traffic patterns, and route optimization savings.

**Page Opened**: `/analytics` (Fleet Performance - default view)

**Primary User Actions**:
- Review performance metrics
- Analyze delivery trends
- Export reports
- Compare time periods
- Identify optimization opportunities
- Track improvement over time

**Related Modules**:
- Fleet Performance (default)
- Delivery Trends
- Traffic Trends
- Route Optimization
- All operational modules (data sources)

**Subsections**:
- Fleet Performance (default)
- Delivery Trends
- Traffic Trends
- Route Optimization

---

### Settings

**Description**: User account management, notification preferences, dashboard customization, and system configuration.

**Page Opened**: `/settings` (Profile - default view)

**Primary User Actions**:
- Update profile information
- Configure notification preferences
- Customize dashboard layout
- Manage account security
- Configure integrations (future)
- View system information

**Related Modules**:
- Profile (default)
- Notifications
- Preferences
- System (future)

**Subsections**:
- Profile (default)
- Notifications
- Preferences
- System

---

# Sidebar Behavior

The sidebar adapts to different contexts and user interactions while maintaining consistent behavior patterns.

## Expanded Sidebar

**State**: Default state on desktop (viewport width ≥ 1024px).

**Visual Characteristics**:
- Width: 260px
- Shows icon + text label for each menu item
- Full menu item text visible
- Section dividers between logical groups
- Collapse button at bottom (chevron left icon)
- User info section at bottom (avatar, name, role)

**Behavior**:
- All navigation items fully visible
- Hover shows subtle background highlight
- Active item shows colored background + left border accent
- Tooltip appears on hover with description
- Smooth expand/collapse animation (300ms ease-in-out)
- Content area adjusts width dynamically

**Use Cases**:
- Desktop workflows
- Complex navigation tasks
- New users learning the system
- Detailed exploration of features

**Accessibility**:
- All items keyboard accessible
- Screen reader announces item name and state
- Focus indicator clearly visible
- Collapse button has ARIA label

---

## Collapsed Sidebar

**State**: User-initiated collapse or default on smaller desktops (viewport width 768px - 1023px).

**Visual Characteristics**:
- Width: 72px
- Shows icon only (no text labels)
- Centered icons with consistent spacing
- Tooltip appears on hover showing item name
- Collapse button at bottom (chevron right icon)
- User avatar only at bottom (no name/role)

**Behavior**:
- Maximizes content area width
- Hover displays tooltip with menu item name
- Click navigates to section
- Active item shows colored background
- Tooltip disappears after 2 seconds or on click
- Content area expands to fill space

**Use Cases**:
- Maximizing screen real estate
- Focused work in single section
- Experienced users familiar with navigation
- Multi-window workflows

**Accessibility**:
- Tooltip announced by screen readers
- Icons have ARIA labels
- Keyboard navigation still functional
- Focus indicator visible on icons

---

## Hover Behavior

**Trigger**: Mouse pointer enters navigation item area.

**Visual Feedback**:
- Background color change (subtle highlight)
- Slight scale increase (1.02x) on icon
- Tooltip appears (expanded sidebar: description, collapsed sidebar: item name)
- Cursor changes to pointer
- Transition duration: 150ms

**Tooltip Content**:
- **Expanded Sidebar**: Brief description of section (e.g., "Monitor vehicles and drivers in real-time")
- **Collapsed Sidebar**: Menu item name (e.g., "Fleet")
- **Disabled Items**: Reason for disable (e.g., "Coming soon")

**Behavior**:
- Tooltip follows mouse cursor (collapsed sidebar) or appears to the right (expanded sidebar)
- Tooltip disappears on mouse leave (300ms delay)
- Multiple rapid hovers queue tooltips
- Tooltip has z-index above all other elements

**Accessibility**:
- Tooltip content announced by screen readers
- Tooltip dismissible via Escape key
- Tooltip doesn't trap focus

---

## Active State

**Definition**: Indicates the current section the user is viewing.

**Visual Characteristics**:
- Background color: Primary color at 10% opacity
- Left border: 3px solid primary color
- Icon color: Primary color
- Text color: Primary color (expanded sidebar)
- Slight font weight increase (500)

**Behavior**:
- Automatically set based on current route
- Only one item active at a time
- Persists across page refreshes
- Updates on navigation
- Smooth transition between states (200ms)

**Implementation**:
- Matches route prefix to menu item
- `/dashboard` → Dashboard active
- `/fleet/*` → Fleet active
- `/traffic/*` → Traffic active
- `/routes/*` → Routes active
- `/alerts/*` → Alerts active
- `/analytics/*` → Analytics active
- `/settings/*` → Settings active

**Accessibility**:
- `aria-current="page"` attribute set
- Screen reader announces "current page"
- High contrast mode increases visibility

---

## Selected State

**Definition**: Temporary state indicating user selection before navigation completes.

**Visual Characteristics**:
- Background color: Primary color at 20% opacity
- Slight scale increase (1.02x)
- Icon and text briefly pulse (optional)

**Behavior**:
- Applied on click before navigation
- Lasts 200ms or until navigation completes
- Replaced by active state on new page
- Cancelled if navigation fails
- Prevents double-clicks (button disabled during transition)

**Use Cases**:
- Click feedback
- Loading indication
- Prevents accidental double-navigation

**Accessibility**:
- Announced as "selected" by screen readers
- Focus remains on clicked item

---

## Disabled State

**Definition**: Indicates navigation items that are unavailable (future features, insufficient permissions).

**Visual Characteristics**:
- Opacity: 50%
- Cursor: Not-allowed
- No hover effects
- Grayscale icon
- Strikethrough text (optional)

**Behavior**:
- Click does nothing
- Tooltip shows reason (e.g., "Coming in Phase 2", "Requires admin access")
- Not focusable via keyboard (removed from tab order)
- Not announced by screen readers (or announced as disabled)

**Use Cases**:
- Future features not yet implemented
- Features requiring higher permissions
- Features disabled in current deployment
- Maintenance mode

**Implementation**:
- Configuration-based enable/disable
- Role-based visibility (future)
- Feature flag support

**Accessibility**:
- `aria-disabled="true"` attribute
- Screen reader announces "disabled"
- Not included in keyboard navigation

---

## Scrolling Behavior

**Trigger**: Menu items exceed viewport height.

**Visual Characteristics**:
- Scrollbar appears on right edge of sidebar
- Scrollbar styled to match theme (thin, 4px wide)
- Fades in when scrolling starts
- Fades out after scrolling stops (1 second)

**Behavior**:
- Smooth scrolling (CSS scroll-behavior: smooth)
- Scroll position maintained across navigation
- Scrolls to active item on page load
- Mouse wheel scrolling supported
- Touch scrolling supported on tablet
- Keyboard scrolling supported (Page Up/Down)

**Scroll-to-Active**:
- On page load, scrolls to show active item
- Smooth scroll animation (300ms)
- Active item positioned in upper third of visible area
- Doesn't scroll if active item already visible

**Accessibility**:
- Scrollbar keyboard accessible
- Screen reader announces scroll position
- Focus management during scroll

---

## Section Grouping

**Organization**: Menu items grouped by functional area with visual separators.

**Groups**:

1. **Core Operations** (no header)
   - Dashboard
   - Fleet
   - Traffic
   - Routes
   - Alerts

2. **Analysis & Configuration** (header: "Analysis & Settings")
   - Analytics
   - Settings

**Visual Characteristics**:
- Group header: Small, uppercase, gray text
- Divider line below header
- Increased spacing between groups (16px)
- Consistent alignment

**Behavior**:
- Groups are static (not collapsible in MVP)
- Headers not interactive
- Headers not focusable
- Headers not announced by screen readers (decorative)

**Future Enhancements**:
- Collapsible groups
- Custom group ordering
- User-defined groups
- Role-based group visibility

**Accessibility**:
- Group headers have `aria-hidden="true"`
- Logical grouping aids screen reader navigation
- Visual separators have sufficient contrast

---

# Top Navigation Bar

The top navigation bar provides global access to application-wide features and remains fixed at the top of the viewport for consistent access.

## Component Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ [Logo]  [🔍 Global Search (Ctrl+K)]  [🔔 (3)] [⚡] [👤] [🌙] [❓]│
└──────────────────────────────────────────────────────────────────┘

Left Side          Center/Right Side
```

**Height**: 64px on desktop, 56px on mobile

**Background**: White (light mode) / Dark gray (dark mode)

**Border**: Bottom border (1px solid, light gray)

**Z-Index**: 1000 (above sidebar and content)

---

## Application Logo

**Purpose**: Brand identity and quick return to Dashboard.

**Visual Elements**:
- UrbanFlow AI logo (icon + text)
- Icon: Stylized traffic flow or city grid
- Text: "UrbanFlow AI" in brand font
- Size: 140px wide (expanded sidebar), 40px icon only (collapsed sidebar)

**Behavior**:
- Click navigates to `/dashboard`
- Hover shows subtle scale animation (1.05x)
- Always visible in top navigation
- Also visible in sidebar (duplicate for convenience)

**Interaction**:
- Single click returns to Dashboard
- No confirmation required
- Smooth transition animation
- Browser history updated

**Accessibility**:
- Alt text: "UrbanFlow AI - Return to Dashboard"
- Keyboard accessible (Tab + Enter)
- Screen reader announces purpose

---

## Global Search

**Purpose**: Rapid, direct access to any item in the system without navigating through menus.

**Trigger**: Click search icon/field or press `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac).

**Visual Elements**:
- Search input field (400px wide on desktop)
- Search icon (magnifying glass) on left
- Keyboard shortcut hint (Ctrl+K) on right
- Placeholder text: "Search vehicles, drivers, routes, alerts..."

**Behavior**:
- Click or Ctrl+K opens search modal/overlay
- Search modal covers entire screen (mobile) or centered panel (desktop)
- Real-time search as user types (300ms debounce)
- Shows results grouped by category
- Keyboard navigation within results (Arrow keys + Enter)
- Escape closes search
- Recent searches displayed when empty

**Search Capabilities**:

| Search Target | Example Query | Expected Results | Navigation Destination |
|---------------|---------------|------------------|------------------------|
| **Vehicle ID** | "VH-1234" | Vehicle details card | `/fleet/:vehicleId` |
| **Driver Name** | "John Smith" | Driver details card | `/fleet/:vehicleId/driver` |
| **Route** | "Route A15" | Route details card | `/routes/active/:routeId` |
| **Delivery** | "DEL-5678" | Delivery details card | `/routes/active/:routeId` |
| **Alert** | "Vehicle breakdown" | Alert details card | `/alerts/:alertId` |
| **Region** | "Downtown" | Region overview | `/traffic?region=downtown` |
| **Traffic Incident** | "Highway accident" | Incident details card | `/traffic/incidents/:incidentId` |

**Search Suggestions**:
- Auto-complete as user types
- Shows matching items in real-time
- Categorized results (Vehicles, Drivers, Routes, etc.)
- Maximum 10 results per category
- "See all results" link if more than 10 matches

**Recent Searches**:
- Stores last 10 searches (localStorage)
- Displayed when search input is empty
- Click to re-run search
- X button to remove individual search
- "Clear all" button to clear history

**Empty Results**:
- Message: "No results found for '[query]'"
- Suggestion: "Try searching for vehicle ID, driver name, route, or alert"
- Option to clear search and try again
- No results animation (optional)

**Loading State**:
- Spinner in search input
- "Searching..." text
- Debounced input (300ms delay)
- Skeleton loaders for results (optional)

**Error State**:
- Message: "Search unavailable. Please try again."
- Retry button
- Fallback to manual navigation

**Accessibility**:
- Search input has ARIA label
- Results announced by screen readers
- Keyboard navigation (Arrow keys, Enter, Escape)
- Focus trap in search modal
- Ctrl+K announced as shortcut

---

## Notifications

**Purpose**: Real-time alert system for critical issues, warnings, and system messages.

**Visual Elements**:
- Bell icon with notification badge
- Badge shows unread count (max 99+, then "99+")
- Red dot indicator for critical notifications
- Badge color: Red (critical), Orange (warning), Blue (info)

**Behavior**:
- Click bell icon opens notification dropdown
- Dropdown shows 10 most recent notifications
- Real-time updates (new notifications appear instantly)
- Badge count updates automatically
- Click notification navigates to source
- Mark as read on click
- "Mark all as read" button
- "Clear all" button (archives old notifications)

**Notification Categories**:

| Category | Severity | Color | Examples |
|----------|----------|-------|----------|
| **Critical** | High | Red | Vehicle breakdown, severe accident, route failure |
| **Warning** | Medium | Orange | Traffic congestion, delayed delivery, low fuel |
| **Information** | Low | Blue | Route optimization available, maintenance due |
| **Resolved** | None | Green | Issue resolved, delivery completed |
| **Dismissed** | None | Gray | User dismissed notification |

**Notification Structure**:

Each notification includes:

- **Title**: Brief description (e.g., "Vehicle VH-1234 Breakdown")
- **Description**: Detailed information (e.g., "Vehicle reported mechanical issue on Route A15")
- **Timestamp**: Relative time (e.g., "2 minutes ago", "1 hour ago")
- **Severity**: Critical, Warning, Information, Resolved, Dismissed
- **Action Button**: Context-specific (e.g., "View Vehicle", "Reroute", "Dismiss")
- **Source Module**: Fleet, Traffic, Routes, Alerts, System
- **Navigation Target**: Direct link to relevant page

**Notification Actions**:

| Action | Behavior | Navigation |
|--------|----------|------------|
| **View** | Opens detail view | Navigates to source page |
| **Dismiss** | Removes notification | No navigation |
| **Snooze** | Hides for specified time | No navigation |
| **Take Action** | Performs suggested action | May navigate or show modal |

**Filtering**:
- Filter by category (All, Critical, Warning, Information)
- Filter by source module (Fleet, Traffic, Routes, Alerts, System)
- Filter by time range (Last hour, Last 24 hours, Last 7 days)
- Filter by read/unread status

**Sorting**:
- Sort by timestamp (newest first - default)
- Sort by severity (critical first)
- Sort by source module

**Grouping**:
- Grouped by date (Today, Yesterday, Last 7 days, Older)
- Grouped by category (Critical, Warning, Information)
- Collapsible groups

**Mark as Read**:
- Automatic on click
- Manual via checkbox selection
- "Mark all as read" button
- Visual indicator (bold for unread, normal for read)

**Dismiss**:
- Individual dismiss (X button)
- Batch dismiss (select multiple)
- Dismissed notifications move to "Dismissed" filter
- Can be restored (optional)

**Clear All**:
- Archives notifications older than 7 days
- Requires confirmation
- Keeps unread notifications
- Can be undone within 5 seconds (undo button)

**Accessibility**:
- Bell icon has ARIA label with count (e.g., "Notifications, 3 unread")
- Notifications announced by screen readers
- Keyboard navigation within dropdown
- Escape closes dropdown
- Focus returns to bell icon on close

---

## Quick Actions

**Purpose**: Context-aware actions for common Fleet Manager tasks.

**Visual Elements**:
- Lightning bolt icon or "Actions" text
- Dropdown menu on click
- Icons + text labels for each action

**Behavior**:
- Click opens dropdown with quick actions
- Actions vary by current page context
- Most frequently used actions prioritized
- Keyboard accessible

**Quick Actions by Context**:

| Current Page | Available Actions |
|--------------|-------------------|
| **Dashboard** | - Refresh Data<br>- Export Dashboard<br>- Schedule Report<br>- Add Widget |
| **Fleet** | - Add Vehicle<br>- Export Fleet List<br>- Contact All Drivers<br>- Schedule Maintenance |
| **Traffic** | - Refresh Map<br>- Export Traffic Report<br>- Set Region Alert<br>- Toggle Layers |
| **Routes** | - Optimize All Routes<br>- Export Routes<br>- Batch Reroute<br>- Schedule Optimization |
| **Alerts** | - Mark All Read<br>- Export Alerts<br>- Create Custom Alert<br>- Escalate Critical |
| **Analytics** | - Export Report<br>- Schedule Report<br>- Compare Periods<br>- Share Dashboard |
| **Settings** | - Export Settings<br>- Import Settings<br>- Reset to Default<br>- Check for Updates |

**Implementation**:
- Configuration-based action list
- Context detection based on current route
- Actions can open modals, navigate, or perform operations
- Icons from standard icon library

**Accessibility**:
- Button has ARIA label
- Dropdown keyboard accessible
- Actions announced by screen readers

---

## User Profile

**Purpose**: User account information and access to profile management.

**Visual Elements**:
- User avatar (circle, 40px diameter)
- User name and role below avatar
- Dropdown arrow indicator

**Default Avatar**:
- Generated from user initials
- Background color based on user ID
- Fallback to generic user icon

**Behavior**:
- Click opens profile dropdown
- Dropdown shows user info and menu items
- Click outside closes dropdown
- Escape key closes dropdown

**Profile Menu Items**:

| Menu Item | Icon | Destination | Description |
|-----------|------|-------------|-------------|
| **Profile** | `User` | `/settings/profile` | View and edit profile information |
| **Preferences** | `SlidersHorizontal` | `/settings/preferences` | Dashboard and display preferences |
| **Notification Settings** | `Bell` | `/settings/notifications` | Configure alert preferences |
| **Help** | `HelpCircle` | `/help` | Documentation and support |
| **About** | `Info` | `/about` | Application version and information |
| **Logout** | `LogOut` | N/A | Logout from application |

**User Info Section**:
- Full name
- Email address
- Role (Fleet Manager)
- Organization (future)
- Last login timestamp

**Logout Behavior**:
- Click shows confirmation dialog
- "Are you sure you want to logout?"
- Buttons: "Cancel", "Logout"
- Confirms logout and redirects to login page
- Session cleared
- Optional: "Remember me" checkbox (future)

**Accessibility**:
- Avatar has ARIA label with user name
- Dropdown keyboard accessible
- Menu items announced by screen readers
- Focus management on open/close

---

## Theme Toggle (Future)

**Purpose**: Switch between light and dark themes.

**Visual Elements**:
- Sun/Moon icon
- Toggle switch or icon button

**Behavior**:
- Click toggles theme
- Persists preference in localStorage
- Applies immediately across application
- Smooth transition (300ms)

**Implementation**:
- CSS custom properties for theming
- System preference detection (prefers-color-scheme)
- Manual override option

**Status**: Not in MVP, planned for Phase 2

---

## Help Button (Future)

**Purpose**: Quick access to documentation, tutorials, and support.

**Visual Elements**:
- Question mark icon or "?" button
- Dropdown or modal on click

**Behavior**:
- Click opens help menu
- Links to documentation
- Video tutorials (future)
- Contact support form
- Keyboard shortcuts reference

**Content**:
- Getting Started guide
- Feature documentation
- Video tutorials
- FAQ
- Contact support
- Keyboard shortcuts reference

**Status**: Not in MVP, planned for Phase 2

---

# Global Search

Global search is a powerful navigation tool that enables Fleet Managers to access any item in the system directly, bypassing hierarchical navigation. It is designed for speed and precision.

## Search Interface

**Trigger Methods**:
1. Click search icon in top navigation
2. Press `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac)
3. Click search bar on mobile

**Visual Design**:
- **Desktop**: Centered modal overlay (600px wide, max-height 80vh)
- **Mobile**: Full-screen overlay
- Backdrop blur effect (optional)
- Search input at top
- Results below
- Keyboard shortcut hint in input

**Search Input**:
- Placeholder: "Search vehicles, drivers, routes, alerts..."
- Clear button (X) on right
- Search icon on left
- Auto-focus on open
- Minimum width: 300px

---

## Search Targets

### Vehicle ID

**Query Examples**: "VH-1234", "Vehicle 1234", "VH-"

**Expected Search Results**:
- Vehicle ID (primary match)
- Vehicle status (active, idle, delayed)
- Driver name
- Current location
- Vehicle type/model

**Navigation Destination**: `/fleet/:vehicleId`

**Search Suggestions**:
- Auto-complete vehicle IDs
- Show recent vehicle searches
- Filter by status (active, idle, etc.)

**Result Card**:
```
┌─────────────────────────────────┐
│ 🚛 VH-1234                      │
│ Driver: John Smith | Active      │
│ Location: Downtown, Route A15    │
└─────────────────────────────────┘
```

---

### Driver Name

**Query Examples**: "John Smith", "Smith", "Driver John"

**Expected Search Results**:
- Driver name (primary match)
- Driver ID
- Assigned vehicle
- Current status
- Performance score

**Navigation Destination**: `/fleet/:vehicleId/driver`

**Search Suggestions**:
- Auto-complete driver names
- Show recent driver searches
- Filter by vehicle assignment

**Result Card**:
```
┌─────────────────────────────────┐
│ 👤 John Smith                   │
│ Driver ID: DR-567 | On-Time: 94%│
│ Vehicle: VH-1234 | Active        │
└─────────────────────────────────┘
```

---

### Route

**Query Examples**: "Route A15", "A15", "Downtown Route"

**Expected Search Results**:
- Route name/number
- Route status (active, completed, planned)
- Assigned vehicle
- Progress percentage
- ETA

**Navigation Destination**: `/routes/active/:routeId`

**Search Suggestions**:
- Auto-complete route names
- Show recent route searches
- Filter by status

**Result Card**:
```
┌─────────────────────────────────┐
│ 🗺️ Route A15                    │
│ Vehicle: VH-1234 | 65% Complete │
│ ETA: 2:30 PM | 8 stops remaining│
└─────────────────────────────────┘
```

---

### Delivery

**Query Examples**: "DEL-5678", "Delivery 5678", "Order 5678"

**Expected Search Results**:
- Delivery ID
- Customer name
- Delivery address
- Status (pending, in-transit, delivered)
- Assigned vehicle/driver

**Navigation Destination**: `/routes/active/:routeId` (with delivery highlighted)

**Search Suggestions**:
- Auto-complete delivery IDs
- Show recent delivery searches
- Filter by status

**Result Card**:
```
┌─────────────────────────────────┐
│ 📦 DEL-5678                     │
│ Customer: ABC Corp | In-Transit  │
│ Address: 123 Main St | ETA: 2PM │
└─────────────────────────────────┘
```

---

### Alert

**Query Examples**: "Vehicle breakdown", "Traffic accident", "Alert 123"

**Expected Search Results**:
- Alert title
- Alert type (critical, warning, info)
- Timestamp
- Source module
- Status (active, resolved)

**Navigation Destination**: `/alerts/:alertId`

**Search Suggestions**:
- Auto-complete alert titles
- Show recent alert searches
- Filter by severity

**Result Card**:
```
┌─────────────────────────────────┐
│ 🔔 Vehicle Breakdown             │
│ Critical | 2 min ago | Active    │
│ Vehicle: VH-1234 | Route A15     │
└─────────────────────────────────┘
```

---

### Region

**Query Examples**: "Downtown", "North Zone", "Industrial District"

**Expected Search Results**:
- Region name
- Vehicle count
- Active alerts
- Traffic status
- Average delivery time

**Navigation Destination**: `/traffic?region={regionName}`

**Search Suggestions**:
- Auto-complete region names
- Show all regions list
- Filter by vehicle count

**Result Card**:
```
┌─────────────────────────────────┐
│ 📍 Downtown                     │
│ 45 vehicles | 3 alerts | Heavy  │
│ Avg delivery: 35 min             │
└─────────────────────────────────┘
```

---

### Traffic Incident

**Query Examples**: "Highway accident", "Road closure", "Construction"

**Expected Search Results**:
- Incident type
- Location
- Severity
- Time of incident
- Affected roads

**Navigation Destination**: `/traffic/incidents/:incidentId`

**Search Suggestions**:
- Auto-complete incident types
- Show recent incident searches
- Filter by severity

**Result Card**:
```
┌─────────────────────────────────┐
│ ⚠️ Highway Accident              │
│ Major | I-95 North | 30 min ago │
│ 2 lanes closed | Est. 2hr clear  │
└─────────────────────────────────┘
```

---

## Search Features

### Search Suggestions

**Auto-Complete**:
- Triggers after 2+ characters
- Shows top 5 suggestions
- Keyboard navigable (Arrow keys + Enter)
- Click to select

**Recent Searches**:
- Stores last 10 searches (localStorage)
- Displayed when input is empty
- Click to re-run
- X button to remove
- "Clear all" to clear history

**Popular Searches** (Future):
- Trending searches
- Suggested based on time of day
- Context-aware suggestions

---

### Empty Results

**Message**: "No results found for '[query]'"

**Suggestions**:
- "Try searching for:"
  - Vehicle ID (e.g., VH-1234)
  - Driver name (e.g., John Smith)
  - Route (e.g., Route A15)
  - Alert (e.g., vehicle breakdown)
- "Or browse:"
  - Fleet
  - Traffic
  - Routes
  - Alerts

**Actions**:
- Clear search button
- Try different keywords
- Browse manually

---

### Loading State

**Visual Indicators**:
- Spinner in search input
- "Searching..." text
- Skeleton loaders for results (optional)

**Behavior**:
- Debounced input (300ms delay)
- Cancel previous request on new input
- Show loading after 200ms (avoid flash)
- Minimum display time 500ms (prevent flicker)

---

### Error State

**Message**: "Search unavailable. Please try again."

**Causes**:
- Network error
- API timeout
- Service unavailable

**Actions**:
- Retry button
- Fallback to manual navigation
- Error logging

---

# Notification Center

The notification center is the central hub for all alerts, warnings, and system messages. It ensures Fleet Managers never miss critical information.

## Notification Categories

### Critical

**Severity**: High

**Color**: Red (#EF4444)

**Examples**:
- Vehicle breakdown or mechanical failure
- Severe traffic accident blocking route
- Driver emergency or safety incident
- System failure affecting operations
- Delivery failure with high customer impact

**Behavior**:
- Immediate notification (real-time)
- Sound alert (optional, configurable)
- Persistent badge (doesn't auto-clear)
- Requires acknowledgment or action
- Snooze available (5, 15, 30 minutes)

**Notification Structure**:
```
┌─────────────────────────────────────┐
│ 🔴 Vehicle Breakdown - CRITICAL     │
│ Vehicle VH-1234 reported mechanical │
│ failure on Route A15. Driver safe.  │
│                                     │
│ 2 minutes ago                       │
│ [View Vehicle] [Reroute] [Dismiss]  │
└─────────────────────────────────────┘
```

---

### Warning

**Severity**: Medium

**Color**: Orange (#F97316)

**Examples**:
- Traffic congestion detected
- Delivery delayed (>15 minutes)
- Low fuel or battery level
- Maintenance due soon
- Route deviation detected
- Weather alert

**Behavior**:
- Notification within 1 minute
- No sound by default (configurable)
- Badge auto-clears after 24 hours if unread
- Action recommended but not required
- Can be snoozed or dismissed

**Notification Structure**:
```
┌─────────────────────────────────────┐
│ 🟠 Traffic Congestion - WARNING     │
│ Heavy congestion on I-95 North.     │
│ Estimated delay: 25 minutes.        │
│                                     │
│ 15 minutes ago                      │
│ [View Traffic] [Reroute] [Dismiss]  │
└─────────────────────────────────────┘
```

---

### Information

**Severity**: Low

**Color**: Blue (#3B82F6)

**Examples**:
- Route optimization available
- Delivery completed successfully
- Maintenance completed
- New feature available
- System update scheduled
- Weekly report ready

**Behavior**:
- Notification within 5 minutes
- No sound
- Badge auto-clears after 7 days if unread
- Informational only, no action required
- Can be dismissed

**Notification Structure**:
```
┌─────────────────────────────────────┐
│ 🔵 Route Optimization - INFO        │
│ New optimized route available for   │
│ 3 vehicles. Potential savings: 45   │
│ minutes total.                       │
│                                     │
│ 1 hour ago                          │
│ [View Recommendations] [Dismiss]    │
└─────────────────────────────────────┘
```

---

### Resolved

**Severity**: None

**Color**: Green (#10B981)

**Examples**:
- Vehicle breakdown resolved
- Traffic incident cleared
- Delivery completed
- Alert acknowledged and resolved
- Maintenance completed

**Behavior**:
- Notification when issue resolved
- No sound
- Auto-clears after 3 days
- Read-only (no actions)
- Archived in history

**Notification Structure**:
```
┌─────────────────────────────────────┐
│ ✅ Vehicle Breakdown - RESOLVED     │
│ Vehicle VH-1234 is back online.     │
│ Maintenance completed.              │
│                                     │
│ 1 hour ago                          │
│ [View Details]                      │
└─────────────────────────────────────┘
```

---

### Dismissed

**Severity**: None

**Color**: Gray (#6B7280)

**Examples**:
- User dismissed notification
- Notification expired
- Notification archived

**Behavior**:
- Hidden from default view
- Accessible via "Dismissed" filter
- No actions available
- Auto-clears after 30 days

**Notification Structure**:
```
┌─────────────────────────────────────┐
│ ⚪ Traffic Congestion - DISMISSED   │
│ You dismissed this notification.    │
│                                     │
│ 2 hours ago                         │
│ [View Details]                      │
└─────────────────────────────────────┘
```

---

## Notification Actions

### Mark as Read

**Behavior**:
- Automatic on notification click
- Manual via checkbox or "Mark as read" button
- Visual change: bold → normal text
- Removes from unread count
- Can be undone (mark as unread)

**Implementation**:
- Toggle read/unread status
- Update UI immediately
- Sync with backend (future)

---

### Dismiss

**Behavior**:
- Click X button or "Dismiss" action button
- Notification moves to "Dismissed" category
- Removed from active list
- Can be restored (optional)
- Undo option within 5 seconds

**Implementation**:
- Archive notification (don't delete)
- Update UI immediately
- Sync with backend (future)

---

### Clear All

**Behavior**:
- Button in notification dropdown header
- Archives all notifications older than 7 days
- Keeps unread notifications
- Requires confirmation dialog
- Undo option within 5 seconds

**Confirmation Dialog**:
```
┌─────────────────────────────────────┐
│ Clear All Notifications?            │
│                                     │
│ This will archive 47 notifications  │
│ older than 7 days. Unread           │
│ notifications will be kept.         │
│                                     │
│ [Cancel] [Clear All]                │
└─────────────────────────────────────┘
```

---

## Filtering

**Filter Options**:

| Filter | Options | Description |
|--------|---------|-------------|
| **Category** | All, Critical, Warning, Information, Resolved, Dismissed | Filter by notification type |
| **Source** | All, Fleet, Traffic, Routes, Alerts, System | Filter by originating module |
| **Time Range** | Last hour, Last 24 hours, Last 7 days, Last 30 days | Filter by timestamp |
| **Status** | All, Unread, Read | Filter by read status |

**Behavior**:
- Filters apply immediately (no submit button)
- Multiple filters can be combined
- Filter state persists across sessions (localStorage)
- Clear filters button to reset
- Filter count shown (e.g., "3 filters active")

**Implementation**:
- URL query parameters (optional)
- localStorage for persistence
- Real-time filter application

---

## Sorting

**Sort Options**:

| Sort By | Order | Description |
|---------|-------|-------------|
| **Timestamp** | Newest first (default) | Most recent notifications first |
| **Timestamp** | Oldest first | Oldest notifications first |
| **Severity** | High to low | Critical → Warning → Information |
| **Severity** | Low to high | Information → Warning → Critical |
| **Source** | A-Z | Alphabetical by source module |

**Behavior**:
- Dropdown selector in header
- Applies immediately
- Persists across sessions (localStorage)
- Visual indicator of current sort

---

## Grouping

**Group By**:

| Group By | Description |
|----------|-------------|
| **Date** (default) | Today, Yesterday, Last 7 days, Older |
| **Category** | Critical, Warning, Information, Resolved, Dismissed |
| **Source** | Fleet, Traffic, Routes, Alerts, System |

**Behavior**:
- Dropdown selector in header
- Collapsible groups
- Group header shows count (e.g., "Today (5)")
- Click header to expand/collapse
- Persists across sessions (localStorage)

**Visual Design**:
- Group header: Bold, uppercase, gray text
- Divider line below header
- Indented notifications within group
- Chevron icon for collapse/expand

---

# Breadcrumb Navigation

Breadcrumb navigation provides context and enables quick upward navigation within the application hierarchy.

## Breadcrumb Structure

**Format**: `Dashboard > Fleet > Vehicle Details`

**Components**:
- Separator: `>` (chevron right icon)
- Clickable parent pages
- Current page (non-clickable, bold)
- Maximum 4 levels shown (truncate with ellipsis if longer)

**Examples**:

| Current Page | Breadcrumb |
|--------------|------------|
| Dashboard | *(hidden - root level)* |
| Fleet > Live Fleet | `Dashboard > Fleet` |
| Fleet > Vehicle Details | `Dashboard > Fleet > Vehicle Details` |
| Traffic > Live Traffic | `Dashboard > Traffic` |
| Traffic > Incidents | `Dashboard > Traffic > Incidents` |
| Traffic > Incident Detail | `Dashboard > Traffic > Incidents > INC-1234` |
| Routes > Recommendations | `Dashboard > Routes` |
| Routes > Active Routes | `Dashboard > Routes > Active Routes` |
| Routes > Route Detail | `Dashboard > Routes > Active Routes > RT-5678` |
| Alerts > Active Alerts | `Dashboard > Alerts` |
| Alerts > Alert Detail | `Dashboard > Alerts > Active Alerts > ALT-9012` |
| Analytics > Fleet Performance | `Dashboard > Analytics` |
| Settings > Profile | `Dashboard > Settings` |
| Settings > Notifications | `Dashboard > Settings > Notifications` |

---

## Generation Logic

**Algorithm**:
1. Parse current route path
2. Match route segments to navigation hierarchy
3. Build breadcrumb array from root to current
4. Apply truncation if depth > 4 levels
5. Render with separators

**Route Mapping**:

| Route Pattern | Breadcrumb Level 1 | Level 2 | Level 3 | Level 4 |
|---------------|-------------------|---------|---------|---------|
| `/dashboard` | *(hidden)* | - | - | - |
| `/fleet` | Dashboard | Fleet | - | - |
| `/fleet/:vehicleId` | Dashboard | Fleet | Vehicle Details | - |
| `/fleet/:vehicleId/driver` | Dashboard | Fleet | Vehicle Details | Driver Details |
| `/traffic` | Dashboard | Traffic | - | - |
| `/traffic/incidents` | Dashboard | Traffic | Incidents | - |
| `/traffic/incidents/:id` | Dashboard | Traffic | Incidents | INC-1234 |
| `/routes` | Dashboard | Routes | - | - |
| `/routes/recommendations` | Dashboard | Routes | Recommendations | - |
| `/routes/active/:id` | Dashboard | Routes | Active Routes | RT-5678 |
| `/alerts` | Dashboard | Alerts | - | - |
| `/alerts/:id` | Dashboard | Alerts | Active Alerts | ALT-9012 |
| `/analytics` | Dashboard | Analytics | - | - |
| `/settings` | Dashboard | Settings | - | - |
| `/settings/notifications` | Dashboard | Settings | Notifications | - |

**Dynamic Labels**:
- `:vehicleId` → "Vehicle Details" or actual vehicle ID
- `:driverId` → "Driver Details" or actual driver name
- `:routeId` → Route name or ID
- `:alertId` → Alert title or ID
- `:incidentId` → Incident type and location

---

## Navigation Rules

**Clickable Items**:
- All parent pages are clickable links
- Current page is non-clickable (bold text)
- Separators are non-clickable

**Navigation Behavior**:
- Click parent navigates to that page
- Browser history updated
- Page reloads with new data
- Scroll position reset to top
- Active sidebar item updates

**Truncation Rules**:
- If breadcrumb depth > 4 levels, truncate middle
- Show first 2 levels and last 2 levels
- Insert ellipsis (...) between
- Example: `Dashboard > Fleet > ... > Driver Details`

**Edge Cases**:
- Direct access to deep link: Show full breadcrumb
- Refresh on detail page: Maintain breadcrumb
- Navigation error: Maintain previous breadcrumb
- 404 page: Show breadcrumb to parent

---

## Back Navigation

**Browser Back Button**:
- Works as expected (browser history)
- Breadcrumb updates on back navigation
- Page state restored (filters, scroll position)
- Active sidebar item updates

**Breadcrumb Back**:
- Click parent in breadcrumb
- Equivalent to browser back
- Faster than browser back button
- Visual feedback on hover

**Alternative Back Methods**:
- Browser back button
- Breadcrumb parent click
- Back button in page header (if present)
- Keyboard shortcut (Alt+Left Arrow)

**Behavior Consistency**:
- All back methods behave identically
- Page state preserved where possible
- Confirmation dialogs for unsaved changes (future)

---

# User Profile Menu

The user profile menu provides access to account management, preferences, and application information.

## Menu Structure

```
┌─────────────────────────────┐
│ 👤 Mohamed Rafee            │
│ Fleet Manager               │
│ mohamed.rafee@example.com   │
├─────────────────────────────┤
│ 👤 Profile                  │
│ ⚙️ Preferences              │
│ 🔔 Notification Settings    │
│ ❓ Help                     │
│ ℹ️ About                    │
├─────────────────────────────┤
│ 🚪 Logout                   │
└─────────────────────────────┘
```

**Width**: 240px

**Position**: Right-aligned below user avatar in top navigation

**Behavior**:
- Click user avatar/name to open
- Click outside to close
- Escape key to close
- Focus trap within menu (optional)

---

## Menu Items

### Profile

**Icon**: `User`

**Destination**: `/settings/profile`

**Description**: View and edit personal profile information.

**Content**:
- Full name
- Email address
- Phone number (future)
- Role and permissions
- Organization (future)
- Profile picture (future)
- Account creation date
- Last login timestamp

**Actions**:
- Edit profile
- Change password (future)
- Upload profile picture (future)
- View activity log (future)

---

### Preferences

**Icon**: `SlidersHorizontal`

**Destination**: `/settings/preferences`

**Description**: Customize dashboard and display settings.

**Content**:
- Dashboard layout (grid density, widget arrangement)
- Default time range (today, week, month)
- Default map view (satellite, street, terrain)
- Date format (MM/DD/YYYY, DD/MM/YYYY)
- Time format (12-hour, 24-hour)
- Language (future)
- Timezone
- Units (metric, imperial)

**Actions**:
- Save preferences
- Reset to defaults
- Export preferences (future)
- Import preferences (future)

---

### Notification Settings

**Icon**: `Bell`

**Destination**: `/settings/notifications`

**Description**: Configure alert and notification preferences.

**Content**:
- Notification channels (in-app, email, SMS - future)
- Notification categories (critical, warning, information)
- Quiet hours (future)
- Do not disturb mode (future)
- Notification grouping preferences
- Sound settings
- Desktop notifications (future)

**Actions**:
- Save settings
- Test notification
- Reset to defaults
- Enable/disable categories

---

### Help

**Icon**: `HelpCircle`

**Destination**: `/help` or external documentation

**Description**: Access documentation, tutorials, and support.

**Content**:
- Getting Started guide
- Feature documentation
- Video tutorials (future)
- FAQ
- Keyboard shortcuts reference
- Contact support form
- Community forum (future)

**Actions**:
- Open documentation
- Watch tutorials
- Contact support
- Report bug
- Request feature

**Status**: Not in MVP, placeholder link in MVP

---

### About

**Icon**: `Info`

**Destination**: `/about` or modal

**Description**: Application version and system information.

**Content**:
- Application name: UrbanFlow AI
- Version number
- Build number
- Release date
- Copyright information
- Third-party licenses
- System status (future)
- Check for updates (future)

**Actions**:
- View licenses
- Check for updates (future)
- View release notes (future)

---

### Logout

**Icon**: `LogOut`

**Destination**: N/A (performs logout action)

**Description**: Logout from the application.

**Behavior**:
- Click shows confirmation dialog
- "Are you sure you want to logout?"
- Buttons: "Cancel", "Logout"
- Confirms logout and redirects to login page
- Session cleared
- Optional: "Remember me" (future)

**Confirmation Dialog**:
```
┌─────────────────────────────────────┐
│ Logout                              │
│                                     │
│ Are you sure you want to logout?    │
│                                     │
│ [Cancel]            [Logout]        │
└─────────────────────────────────────┘
```

**Post-Logout**:
- Redirect to login page
- Clear session data
- Clear temporary data (optional)
- Show logout success message

---

# Navigation Flows

This section documents common user workflows to ensure navigation supports real-world use cases.

## Morning Operations Review

**User Goal**: Start the day by reviewing overall fleet status, checking for issues, and planning the day's operations.

**Flow**:

```
Login
  ↓
Dashboard (default landing page)
  ↓
[Review KPIs]
  - Active Vehicles: 45
  - Deliveries Today: 128
  - On-Time Delivery: 94%
  - Predicted Delays: 3
  ↓
[Check Alerts]
  - 2 critical alerts
  - 5 warning alerts
  - Click alert to view details
  ↓
Fleet (sidebar)
  ↓
Live Fleet
  - Review vehicle status
  - Check delayed vehicles
  - Contact drivers if needed
  ↓
Traffic (sidebar)
  ↓
Live Traffic
  - Review traffic conditions
  - Check for incidents
  - Identify congestion hotspots
  ↓
Routes (sidebar)
  ↓
Recommendations
  - Review AI suggestions
  - Accept optimizations
  - Plan route adjustments
```

**Navigation Actions**:
- Total clicks: 6 (login → dashboard → fleet → traffic → routes)
- Keyboard shortcuts: Ctrl+K for search, Ctrl+N for notifications
- Time estimate: 5-10 minutes

**Success Criteria**:
- Fleet Manager has complete situational awareness
- All critical issues identified
- Action plan for the day established

---

## Investigate Delayed Delivery

**User Goal**: Investigate a specific delayed delivery, understand the cause, and take corrective action.

**Flow**:

```
Dashboard
  ↓
[See delayed delivery alert]
  - Alert: "Delivery DEL-5678 delayed by 25 minutes"
  ↓
Alerts (sidebar)
  ↓
Active Alerts
  - Find delivery alert
  - Click alert to view details
  ↓
[Alert Detail]
  - Shows affected vehicle: VH-1234
  - Shows driver: John Smith
  - Shows route: Route A15
  ↓
[Click vehicle link]
Fleet
  ↓
Vehicle Details (/fleet/VH-1234)
  - View vehicle status
  - Check current location
  - Review delivery progress
  ↓
[Click route link]
Routes
  ↓
Active Routes
  - View route progress
  - Check remaining stops
  - Review ETA
  ↓
[View AI recommendation]
Routes
  ↓
Recommendations
  - See if reroute suggested
  - Accept optimization if available
```

**Navigation Actions**:
- Total clicks: 8 (dashboard → alerts → vehicle → route → recommendations)
- Direct navigation via alert: 4 clicks
- Time estimate: 2-3 minutes

**Success Criteria**:
- Root cause identified
- Corrective action taken
- Customer notified (future)
- Delivery back on track or rescheduled

---

## Traffic Investigation

**User Goal**: Investigate a traffic incident, assess fleet impact, and implement solutions.

**Flow**:

```
Dashboard
  ↓
[See traffic alert]
  - Alert: "Accident on I-95 North, 2 lanes closed"
  ↓
Traffic (sidebar)
  ↓
Live Traffic
  - View incident on map
  - Assess severity
  - Identify affected area
  ↓
[Click incident marker]
Incident Details
  - View incident details
  - Check clearance estimate
  - Review affected roads
  ↓
[Assess fleet impact]
Fleet
  ↓
Live Fleet
  - Filter by affected region
  - Identify vehicles in area
  - Check delivery status
  ↓
[Implement solution]
Routes
  ↓
Recommendations
  - Review AI reroute suggestions
  - Accept optimizations
  - Notify affected drivers
```

**Navigation Actions**:
- Total clicks: 7 (dashboard → traffic → fleet → routes)
- Direct navigation via alert: 5 clicks
- Time estimate: 3-5 minutes

**Success Criteria**:
- Incident impact assessed
- Affected vehicles identified
- Reroutes implemented
- Customers notified (future)
- Minimal delivery delays

---

## Analytics Review

**User Goal**: Review operational performance, identify trends, and export reports.

**Flow**:

```
Dashboard
  ↓
Analytics (sidebar)
  ↓
Fleet Performance (default)
  - Review vehicle utilization
  - Check driver performance
  - Identify trends
  ↓
[Select time range]
  - Last 7 days
  - Compare to previous week
  ↓
[Drill down]
Delivery Trends
  - Review on-time delivery rate
  - Identify delay patterns
  - Analyze peak times
  ↓
[Export report]
  - Click "Export" button
  - Select format (PDF, Excel, CSV)
  - Download report
  ↓
[Share insights]
  - Export dashboard snapshot
  - Schedule recurring report (future)
  - Share with team (future)
```

**Navigation Actions**:
- Total clicks: 4 (dashboard → analytics → delivery trends → export)
- Time estimate: 10-15 minutes

**Success Criteria**:
- Performance trends identified
- Insights documented
- Report exported
- Action items defined

---

## Profile Management

**User Goal**: Update profile information and configure preferences.

**Flow**:

```
Dashboard
  ↓
[Click user avatar]
User Profile Menu
  ↓
Profile
  ↓
Settings
  ↓
Profile (/settings/profile)
  - Update name, email, phone
  - Change password (future)
  - Upload profile picture (future)
  ↓
[Configure preferences]
  - Click "Preferences" in profile menu
  ↓
Settings
  ↓
Preferences (/settings/preferences)
  - Set dashboard layout
  - Configure default time range
  - Set date/time format
  - Choose units (metric/imperial)
  ↓
[Configure notifications]
  - Click "Notification Settings"
  ↓
Settings
  ↓
Notifications (/settings/notifications)
  - Enable/disable notification categories
  - Set quiet hours (future)
  - Configure sound settings
  ↓
[Save changes]
  - Click "Save" button
  - Confirmation message
  - Return to Dashboard
```

**Navigation Actions**:
- Total clicks: 6 (dashboard → profile → preferences → notifications → save)
- Time estimate: 5-10 minutes

**Success Criteria**:
- Profile information updated
- Preferences configured
- Notifications customized
- Changes saved and applied

---

# Navigation State Management

Proper state management ensures navigation behaves predictably and maintains context across user interactions.

## Current Page

**State**: Tracks the currently active page/route.

**Implementation**:
- Derived from React Router location
- Stored in context or state management (Redux, Zustand)
- Updated on route change
- Used to highlight active sidebar item
- Used to generate breadcrumb

**Persistence**:
- Not persisted across sessions
- Reset on login/logout
- Updated in real-time

**Usage**:
- Sidebar active state
- Breadcrumb generation
- Page title update
- Analytics tracking

---

## Previous Page

**State**: Tracks the previously visited page for back navigation.

**Implementation**:
- Stored in navigation history stack
- Updated on every navigation
- Used for "Back" button behavior
- Used for breadcrumb parent links

**Behavior**:
- Browser back button uses browser history
- Custom back button uses previous page state
- Previous page state cleared on logout

**Edge Cases**:
- Direct link access: No previous page
- First page visit: No previous page
- Session timeout: Clear history

---

## Browser Back/Forward

**Behavior**: Standard browser navigation behavior.

**Implementation**:
- React Router handles browser history
- `useNavigate()` and `useLocation()` hooks
- Browser back/forward buttons work automatically
- Page state restored where possible

**Considerations**:
- Form data: Prompt to save before leaving (future)
- Filters: Persist in URL query parameters
- Scroll position: Restore on back navigation (optional)
- Modal state: Close on navigation

---

## Deep Linking

**Definition**: Direct navigation to specific pages via URL.

**Support**:
- All pages accessible via direct URL
- URL structure matches navigation hierarchy
- Example: `/fleet/VH-1234` opens vehicle details directly

**Implementation**:
- React Router route definitions
- Dynamic routes for detail pages (`:id`)
- Query parameters for filters (`?status=active`)
- Hash fragments for anchors (optional)

**Validation**:
- Validate route parameters
- Handle invalid IDs (404 page)
- Redirect to parent if detail not found

**Examples**:
- `/dashboard` → Dashboard
- `/fleet` → Live Fleet
- `/fleet/VH-1234` → Vehicle Details
- `/traffic/incidents/INC-5678` → Incident Details
- `/routes/recommendations` → Route Recommendations

---

## Refresh Behavior

**Behavior**: Page refresh maintains current page and state.

**Implementation**:
- React Router preserves route on refresh
- Page reloads with fresh data
- Sidebar active state maintained
- Breadcrumb regenerated
- Filters reset to default (or persisted in URL)

**State Restoration**:
- URL parameters: Preserved
- Form data: Lost (future: auto-save)
- Scroll position: Reset to top
- Modal state: Closed
- Notification dropdown: Closed

**Loading State**:
- Show loading spinner during data fetch
- Skeleton loaders for content
- Maintain navigation structure

---

## Session Restoration

**Behavior**: Restore user session after browser close/reopen.

**Implementation**:
- JWT token stored in localStorage or httpOnly cookie
- Token validated on app load
- If valid, restore session and navigate to last page or dashboard
- If invalid, redirect to login

**Session Data**:
- User authentication state
- User preferences (localStorage)
- Recent searches (localStorage)
- Notification preferences (localStorage)
- Theme preference (localStorage)

**Restoration Flow**:
1. App loads
2. Check for auth token
3. Validate token with backend
4. If valid:
   - Restore user state
   - Navigate to last page or dashboard
   - Restore preferences
5. If invalid:
   - Clear session data
   - Redirect to login

---

## Navigation History

**State**: Tracks navigation history for analytics and smart features.

**Implementation**:
- Store last 50 visited pages (localStorage)
- Timestamp for each visit
- Used for "Recent Pages" feature (future)
- Used for analytics (most visited pages)

**Data Structure**:
```javascript
[
  { path: '/dashboard', timestamp: 2026-07-08T10:30:00Z },
  { path: '/fleet', timestamp: 2026-07-08T10:32:00Z },
  { path: '/fleet/VH-1234', timestamp: 2026-07-08T10:33:00Z },
  // ... up to 50 entries
]
```

**Usage**:
- Recent pages quick access (future)
- Personalized suggestions (future)
- Analytics and reporting

**Privacy**:
- Stored locally only
- Not synced to backend (MVP)
- Can be cleared by user
- Respects incognito mode

---

# Responsive Navigation

The navigation system adapts to different screen sizes and devices while maintaining functionality and usability.

## Desktop (≥ 1024px)

**Viewport Width**: 1024px and above

**Layout**:
- Sidebar: Expanded (260px), always visible
- Top navigation: Full, always visible
- Content area: Remaining width (minimum 760px)
- Maximum content width: 1440px (centered)

**Behavior**:
- Sidebar persists across all pages
- Hover effects enabled
- Tooltips on hover
- Full keyboard navigation
- Multi-column layouts supported

**Breakpoint**: 1024px

**Example Layout**:
```
┌──────────┬────────────────────────────────────┐
│ Sidebar  │ Top Navigation                     │
│ 260px    │ 64px height                        │
│          ├────────────────────────────────────┤
│          │                                    │
│          │ Content Area                       │
│          │ (max 1440px, centered)             │
│          │                                    │
│          │                                    │
└──────────┴────────────────────────────────────┘
```

---

## Tablet (768px - 1023px)

**Viewport Width**: 768px to 1023px

**Layout**:
- Sidebar: Collapsed by default (72px), toggle to expand
- Top navigation: Full, always visible
- Content area: Remaining width
- Maximum content width: 100% (no constraint)

**Behavior**:
- Sidebar collapsed by default to maximize space
- Toggle button to expand/collapse
- Expanded sidebar overlays content (z-index above content)
- Click outside or press Escape to collapse
- Touch-friendly controls (minimum 44x44px)
- Swipe gesture to open/close sidebar (optional)

**Breakpoint**: 768px - 1023px

**Example Layout**:
```
┌────────┬────────────────────────────────────┐
│ Sidebar│ Top Navigation                     │
│ 72px   │ 56px height                        │
│ (icon  ├────────────────────────────────────┤
│  only) │                                    │
│        │ Content Area                       │
│ [≡]    │ (full width)                       │
│        │                                    │
│        │                                    │
└────────┴────────────────────────────────────┘

Expanded State (overlay):
┌────────┬────────────────────────────────────┐
│ Sidebar│ Top Navigation                     │
│ 260px  │ 56px height                        │
│ (over- ├────────────────────────────────────┤
│  lay)  │                                    │
│        │ Content Area (dimmed)              │
│        │                                    │
│        │                                    │
└────────┴────────────────────────────────────┘
```

**Touch Optimizations**:
- Minimum touch target: 44x44px
- Increased spacing between items
- Larger icons (24px minimum)
- Swipe gestures for common actions
- No hover-dependent interactions

---

## Mobile (< 768px)

**Viewport Width**: Less than 768px

**Layout**:
- Sidebar: Hidden by default, accessible via hamburger menu
- Top navigation: Condensed (logo, hamburger, notifications, profile)
- Content area: Full width
- Bottom navigation (optional, future)

**Behavior**:
- Hamburger menu (≡) in top navigation
- Click hamburger opens full-screen sidebar overlay
- Sidebar slides in from left (300ms animation)
- Backdrop overlay behind sidebar
- Click backdrop or press Escape to close
- Touch-optimized interactions
- Full-screen modals for detail pages

**Breakpoint**: < 768px

**Example Layout**:
```
Default State:
┌──────────────────────────────────────────┐
│ [≡] UrbanFlow AI  [🔔] [👤]             │
│ 56px height                               │
├──────────────────────────────────────────┤
│                                          │
│ Content Area                             │
│ (full width)                             │
│                                          │
│                                          │
│                                          │
└──────────────────────────────────────────┘

Sidebar Open (overlay):
┌──────────┬───────────────────────────────┐
│ Sidebar  │ Backdrop (dimmed)             │
│ (full    │                               │
│  screen) │ Content Area (hidden)         │
│          │                               │
│ [Icons]  │                               │
│ + Labels │                               │
│          │                               │
│          │                               │
└──────────┴───────────────────────────────┘
```

**Mobile-Specific Features**:
- Hamburger menu with animation
- Full-screen sidebar overlay
- Swipe to open/close sidebar
- Bottom sheet for detail views (optional)
- Bottom navigation bar (future)
- Touch-optimized form inputs
- Larger buttons and touch targets
- Simplified layouts for small screens

**Content Adaptations**:
- Stack columns vertically
- Hide less important information
- Collapsible sections
- Bottom sheets for filters
- Full-screen modals for forms

---

## Responsive Breakpoints Summary

| Breakpoint | Device | Sidebar | Top Navigation | Content Width |
|------------|--------|---------|----------------|---------------|
| ≥ 1024px | Desktop | Expanded (260px) | Full | Max 1440px |
| 768px - 1023px | Tablet | Collapsed (72px), toggle | Full | 100% |
| < 768px | Mobile | Hidden, hamburger menu | Condensed | 100% |

**Implementation**:
- CSS media queries for layout changes
- React hooks for breakpoint detection (useMediaQuery)
- Conditional rendering based on breakpoint
- Smooth transitions between breakpoints

---

# Keyboard Navigation

Keyboard navigation ensures accessibility and enables power users to work efficiently.

## Global Shortcuts

| Shortcut | Action | Context |
|----------|--------|---------|
| `Ctrl + K` or `Cmd + K` | Open global search | Everywhere |
| `Ctrl + N` or `Cmd + N` | Open notifications | Everywhere |
| `Ctrl + ,` or `Cmd + ,` | Open settings | Everywhere |
| `Ctrl + /` or `Cmd + /` | Show keyboard shortcuts help | Everywhere |
| `Escape` | Close modal/dropdown/menu | Modals, dropdowns, menus |
| `Tab` | Move focus forward | Everywhere |
| `Shift + Tab` | Move focus backward | Everywhere |
| `Enter` | Activate focused element | Buttons, links, menu items |
| `Space` | Activate button/checkbox | Buttons, checkboxes |
| `Arrow Keys` | Navigate within list/menu | Lists, menus, search results |

**Platform Notes**:
- Windows/Linux: Use `Ctrl` key
- Mac: Use `Cmd` key
- Shortcuts adapt to platform automatically

---

## Navigation Shortcuts

| Shortcut | Action | Context |
|----------|--------|---------|
| `Alt + 1` | Navigate to Dashboard | Everywhere |
| `Alt + 2` | Navigate to Fleet | Everywhere |
| `Alt + 3` | Navigate to Traffic | Everywhere |
| `Alt + 4` | Navigate to Routes | Everywhere |
| `Alt + 5` | Navigate to Alerts | Everywhere |
| `Alt + 6` | Navigate to Analytics | Everywhere |
| `Alt + 7` | Navigate to Settings | Everywhere |
| `Alt + Left` | Go back | Everywhere |
| `Alt + Right` | Go forward | Everywhere |
| `Alt + Home` | Go to Dashboard | Everywhere |

**Number Keys**:
- Correspond to sidebar menu item order
- 1 = Dashboard, 2 = Fleet, etc.
- Works when not in input field

---

## Page-Specific Shortcuts

| Shortcut | Action | Page |
|----------|--------|------|
| `Ctrl + F` or `Cmd + F` | Focus search/filter | List pages |
| `Ctrl + E` or `Cmd + E` | Export data | Analytics, Reports |
| `Ctrl + R` or `Cmd + R` | Refresh data | All pages |
| `N` | Create new item (future) | List pages |
| `E` | Edit selected item (future) | Detail pages |
| `Delete` | Delete selected item (future) | List pages |
| `?` | Show keyboard shortcuts | Everywhere |

---

## Focus Management

**Focus Indicators**:
- Visible focus ring on all interactive elements
- 2px solid outline, 2px offset
- High contrast color (blue or brand color)
- Never remove focus indicator (accessibility)

**Focus Trap**:
- Modals trap focus within
- Tab cycles through modal elements
- Escape closes modal
- Focus returns to trigger on close

**Skip Links**:
- "Skip to main content" link
- Visible on focus only
- Allows keyboard users to bypass navigation
- Essential for accessibility

**Logical Tab Order**:
- Top to bottom, left to right
- Follows visual layout
- Sidebar → Top navigation → Content
- Within content: Header → Filters → Data → Actions

---

## Accessibility Behavior

**Screen Reader Support**:
- All interactive elements have ARIA labels
- Navigation landmarks (`<nav>`, `<main>`, `<header>`)
- Live regions for dynamic content (notifications)
- Announcements for navigation changes

**ARIA Attributes**:
- `aria-label`: Descriptive label for icon buttons
- `aria-current="page"`: Current page in navigation
- `aria-expanded`: Menu/dropdown state
- `aria-haspopup`: Indicates popup menu
- `aria-disabled`: Disabled state
- `aria-live`: Dynamic content updates

**Announcements**:
- Page title changes announced
- Navigation changes announced
- Notification arrivals announced
- Loading states announced
- Error messages announced

---

# Accessibility Requirements

The navigation system complies with WCAG 2.1 AA standards and ensures usability for all users.

## WCAG Compliance

**Level**: WCAG 2.1 AA (minimum), AAA where possible

**Key Requirements**:
1. **Perceivable**: Information presented in ways users can perceive
2. **Operable**: Interface components operable by all users
3. **Understandable**: Information and operation understandable
4. **Robust**: Content robust enough for assistive technologies

**Compliance Areas**:
- Color contrast ratios (minimum 4.5:1 for text)
- Text resizing up to 200% without loss of content
- Images have alt text
- Keyboard accessible (all functionality)
- No keyboard traps
- Sufficient time to read and use content
- Seizure-safe (no flashing > 3 times/second)
- Navigable (skip links, logical order)
- Readable (contrast, font size)
- Predictable (consistent navigation)
- Input assistance (error identification, suggestions)
- Compatible (assistive technology support)

---

## Screen Reader Support

**Supported Screen Readers**:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (Mac, iOS)
- TalkBack (Android)
- Orca (Linux)

**Implementation**:
- Semantic HTML (`<nav>`, `<main>`, `<header>`)
- ARIA labels and roles
- Live regions for dynamic content
- Descriptive link text (no "click here")
- Alt text for images and icons
- Headings hierarchy (H1 → H2 → H3)

**Testing**:
- Test with NVDA and VoiceOver
- Verify all content accessible
- Verify navigation logical
- Verify announcements clear

---

## Keyboard Navigation

**Requirements**:
- All functionality available via keyboard
- No keyboard traps
- Logical tab order
- Visible focus indicators
- Skip links for bypassing blocks

**Implementation**:
- All interactive elements focusable
- Tab order follows visual layout
- Enter/Space to activate
- Escape to close modals/menus
- Arrow keys for lists/menus
- Home/End for first/last item

**Testing**:
- Navigate entire app without mouse
- Verify all features accessible
- Verify focus indicators visible
- Verify no keyboard traps

---

## ARIA Labels

**Usage**:
- Icon-only buttons: `aria-label="Open notifications"`
- Icon + text: `aria-label` optional (text sufficient)
- Menu items: `aria-label` if icon-only
- Status indicators: `aria-label="3 unread notifications"`
- Loading states: `aria-live="polite"` with "Loading..."
- Error messages: `aria-live="assertive"`

**Best Practices**:
- Concise, descriptive labels
- Avoid redundancy (don't repeat text)
- Update dynamically (e.g., notification count)
- Localize for multi-language support (future)

---

## Focus Indicators

**Requirements**:
- Visible on all interactive elements
- High contrast (WCAG AA)
- Minimum 2px thickness
- Offset from element (2px)
- Never remove for aesthetics

**Implementation**:
- CSS `:focus` pseudo-class
- `outline: 2px solid #0066CC`
- `outline-offset: 2px`
- Custom focus styles for brand consistency
- High contrast mode support

**Examples**:
- Buttons: Blue outline
- Links: Blue underline
- Menu items: Blue background
- Inputs: Blue border

---

## High Contrast Support

**Requirements**:
- Support Windows High Contrast Mode
- Support browser high contrast settings
- Sufficient color contrast (WCAG AA)
- Don't rely on color alone

**Implementation**:
- Use `prefers-contrast: high` media query
- Test in Windows High Contrast Mode
- Provide text labels for color-coded items
- Use patterns/icons in addition to color

**Testing**:
- Enable Windows High Contrast Mode
- Verify all content visible
- Verify all functionality works
- Verify text readable

---

## Minimum Click Target Size

**Requirements**:
- Minimum 44x44px (WCAG 2.5.5 Level AAA)
- Minimum 24x24px with spacing (WCAG 2.5.8 Level AA)
- Adequate spacing between targets

**Implementation**:
- Buttons: Minimum 44x44px
- Icon buttons: Minimum 44x44px (with padding)
- Menu items: Minimum 44px height
- Links in text: Minimum 24x24px with spacing
- Adequate padding around small icons

**Mobile Considerations**:
- Larger targets for touch (48x48px recommended)
- More spacing between targets
- Avoid small, closely-spaced buttons

---

## Logical Tab Order

**Requirements**:
- Tab order follows visual layout
- Top to bottom, left to right
- Logical grouping
- No unexpected tab stops

**Implementation**:
- Semantic HTML structure
- Proper heading hierarchy
- Logical DOM order
- Avoid CSS `tabindex` manipulation
- Test with keyboard only

**Tab Order Example** (Dashboard):
1. Skip to main content link
2. Logo (link to Dashboard)
3. Search button
4. Notifications button
5. Quick Actions button
6. User Profile button
7. Sidebar: Dashboard
8. Sidebar: Fleet
9. Sidebar: Traffic
10. ... (remaining sidebar items)
11. Main content: Page title
12. Main content: Filters
13. Main content: Data table
14. Main content: Action buttons

---

# Error Handling

The navigation system gracefully handles errors and edge cases while maintaining usability.

## 404 Page

**Trigger**: User navigates to non-existent route.

**Behavior**:
- Display 404 error page
- Show friendly error message
- Provide navigation options
- Log error for debugging

**404 Page Content**:
```
┌─────────────────────────────────────┐
│          404                         │
│   Page Not Found                     │
│                                     │
│   Sorry, the page you're looking    │
│   for doesn't exist or has been     │
│   moved.                            │
│                                     │
│   [Return to Dashboard]             │
│   [Go Back]                         │
│                                     │
│   Or try:                           │
│   - Check the URL for typos         │
│   - Use the search bar              │
│   - Browse from the sidebar         │
└─────────────────────────────────────┘
```

**Navigation Options**:
- "Return to Dashboard" button → `/dashboard`
- "Go Back" button → browser back
- Search bar to find content
- Sidebar navigation
- Sitemap link (future)

**Technical Implementation**:
- Catch-all route (`*`) in React Router
- Log 404 errors to analytics
- Suggest similar pages (future)
- Maintain navigation structure

---

## Unauthorized Access

**Trigger**: User attempts to access page without required permissions.

**Behavior**:
- Display 403 error page
- Explain lack of permissions
- Provide options
- Log access attempt

**403 Page Content**:
```
┌─────────────────────────────────────┐
│          403                         │
│   Access Denied                      │
│                                     │
│   You don't have permission to      │
│   access this page.                 │
│                                     │
│   [Return to Dashboard]             │
│   [Request Access] (future)         │
│                                     │
│   If you believe this is an error,  │
│   contact your administrator.       │
└─────────────────────────────────────┘
```

**Navigation Options**:
- "Return to Dashboard" button → `/dashboard`
- "Request Access" button → support form (future)
- Contact administrator message
- Sidebar navigation (to accessible pages only)

**Implementation**:
- Route guards in React Router
- Permission checking middleware
- Redirect to dashboard or 403 page
- Log unauthorized access attempts

---

## Expired Session

**Trigger**: User session expires due to inactivity or timeout.

**Behavior**:
- Display session expired message
- Auto-redirect to login page
- Preserve attempted URL (optional)
- Clear sensitive data

**Session Expired Modal**:
```
┌─────────────────────────────────────┐
│   Session Expired                    │
│                                     │
│   Your session has expired due to   │
│   inactivity. Please login again.   │
│                                     │
│   [Login]                            │
└─────────────────────────────────────┘
```

**Implementation**:
- Detect token expiration
- Show modal or redirect
- Clear session state
- Redirect to login with return URL
- Preserve unsaved data warning (future)

**Auto-Logout**:
- After 30 minutes of inactivity (configurable)
- Warning at 25 minutes: "Session expiring in 5 minutes"
- Option to extend session
- Auto-logout after timeout

---

## Offline Mode

**Trigger**: Network connectivity lost.

**Behavior**:
- Display offline indicator
- Disable features requiring network
- Show cached data where available
- Queue actions for retry (future)

**Offline Indicator**:
- Banner at top: "You are currently offline. Some features may be unavailable."
- Yellow/Orange background
- Dismissible
- Shows when connectivity restored

**Affected Features**:
- Global search: Limited to cached data
- Notifications: Show cached notifications
- Data refresh: Disabled
- Actions: Queued for retry (future)

**Available Features**:
- Navigation between cached pages
- View cached data
- Access documentation (if cached)

**Implementation**:
- Detect online/offline status
- Show/hide offline banner
- Disable network-dependent features
- Cache data for offline access (service worker - future)

---

## Slow Network

**Trigger**: Network requests taking longer than expected.

**Behavior**:
- Show loading indicators
- Provide progress feedback
- Allow cancellation (optional)
- Timeout after 30 seconds

**Loading States**:
- Skeleton loaders for content
- Spinner for actions
- Progress bar for long operations
- "Loading..." text

**Timeout Handling**:
- Show error after 30 seconds
- "Request timed out. Please try again."
- Retry button
- Fallback to cached data (if available)

**Optimization**:
- Lazy loading for non-critical data
- Pagination for large datasets
- Image optimization
- Code splitting

---

## Missing Data

**Trigger**: Expected data not available from API.

**Behavior**:
- Display empty state
- Explain why data is missing
- Provide action to retry or refresh
- Don't show broken UI

**Empty State Examples**:

**No Vehicles**:
```
┌─────────────────────────────────────┐
│         🚛                          │
│   No Vehicles Found                  │
│                                     │
│   There are no vehicles in the      │
│   fleet yet.                         │
│                                     │
│   [Add Vehicle] (future)            │
└─────────────────────────────────────┘
```

**No Alerts**:
```
┌─────────────────────────────────────┐
│         ✅                          │
│   All Clear!                         │
│                                     │
│   There are no active alerts.       │
│   Great job!                         │
│                                     │
│   [View Alert History]              │
└─────────────────────────────────────┘
```

**API Error**:
```
┌─────────────────────────────────────┐
│         ⚠️                          │
│   Unable to Load Data                │
│                                     │
│   Something went wrong. Please      │
│   try again.                         │
│                                     │
│   [Retry]                            │
└─────────────────────────────────────┘
```

**Implementation**:
- Check for empty arrays
- Check for null/undefined data
- Show appropriate empty state
- Provide retry action
- Log errors for debugging

---

# Navigation Component Inventory

This section catalogs all navigation components for consistent implementation.

## Component Table

| Component | Purpose | Reusable | Priority |
|-----------|---------|----------|----------|
| **Sidebar** | Primary navigation menu | Yes | Critical |
| **TopBar** | Top navigation bar with global features | Yes | Critical |
| **Breadcrumb** | Hierarchical navigation path | Yes | High |
| **SearchBar** | Global search input | Yes | Critical |
| **SearchModal** | Search results overlay | Yes | Critical |
| **NotificationBell** | Notification access button | Yes | Critical |
| **NotificationDropdown** | Notification list panel | Yes | Critical |
| **NotificationItem** | Individual notification card | Yes | High |
| **ProfileMenu** | User profile dropdown | Yes | High |
| **PageHeader** | Page title and actions | Yes | High |
| **BackButton** | Navigate to previous page | Yes | Medium |
| **QuickActions** | Context-aware action menu | Yes | High |
| **SidebarItem** | Individual sidebar menu item | Yes | Critical |
| **SidebarGroup** | Grouped sidebar sections | Yes | Medium |
| **MobileMenu** | Hamburger menu for mobile | Yes | High |
| **SkipLink** | Skip to main content (accessibility) | Yes | High |
| **Error404** | 404 error page | Yes | Medium |
| **Error403** | 403 unauthorized page | Yes | Medium |
| **OfflineBanner** | Offline mode indicator | Yes | Medium |

---

## Component Specifications

### Sidebar

**Purpose**: Primary navigation container.

**Props**:
- `collapsed`: boolean (sidebar state)
- `onToggle`: function (toggle handler)
- `activeItem`: string (current section)

**Reusability**: Yes, used in all layouts.

**Priority**: Critical

---

### TopBar

**Purpose**: Top navigation bar with global features.

**Props**:
- `onSearchClick`: function
- `notificationCount`: number
- `user`: object

**Reusability**: Yes, used in all layouts.

**Priority**: Critical

---

### Breadcrumb

**Purpose**: Hierarchical navigation path.

**Props**:
- `items`: array [{label, path}]
- `currentPage`: string

**Reusability**: Yes, used on all pages except Dashboard.

**Priority**: High

---

### SearchBar

**Purpose**: Global search input trigger.

**Props**:
- `onClick`: function
- `shortcut`: string (e.g., "Ctrl+K")

**Reusability**: Yes, used in TopBar.

**Priority**: Critical

---

### SearchModal

**Purpose**: Search interface with results.

**Props**:
- `isOpen`: boolean
- `onClose`: function
- `onSearch`: function

**Reusability**: Yes, global component.

**Priority**: Critical

---

### NotificationBell

**Purpose**: Notification access button with badge.

**Props**:
- `count`: number
- `onClick`: function
- `hasCritical`: boolean

**Reusability**: Yes, used in TopBar.

**Priority**: Critical

---

### NotificationDropdown

**Purpose**: Notification list panel.

**Props**:
- `notifications`: array
- `onClose`: function
- `onMarkRead`: function
- `onDismiss`: function

**Reusability**: Yes, global component.

**Priority**: Critical

---

### NotificationItem

**Purpose**: Individual notification card.

**Props**:
- `notification`: object
- `onClick`: function
- `onDismiss`: function

**Reusability**: Yes, used in NotificationDropdown.

**Priority**: High

---

### ProfileMenu

**Purpose**: User profile dropdown menu.

**Props**:
- `user`: object
- `onClose`: function
- `onLogout`: function

**Reusability**: Yes, used in TopBar.

**Priority**: High

---

### PageHeader

**Purpose**: Page title and action buttons.

**Props**:
- `title`: string
- `actions`: array of buttons
- `breadcrumb`: array

**Reusability**: Yes, used on all pages.

**Priority**: High

---

### BackButton

**Purpose**: Navigate to previous page.

**Props**:
- `onClick`: function
- `label`: string (optional)

**Reusability**: Yes, used on detail pages.

**Priority**: Medium

---

### QuickActions

**Purpose**: Context-aware action menu.

**Props**:
- `actions`: array
- `context`: string (current page)

**Reusability**: Yes, used in TopBar.

**Priority**: High

---

### SidebarItem

**Purpose**: Individual sidebar menu item.

**Props**:
- `icon`: component
- `label`: string
- `path`: string
- `active`: boolean
- `collapsed`: boolean
- `onClick`: function

**Reusability**: Yes, used in Sidebar.

**Priority**: Critical

---

### SidebarGroup

**Purpose**: Grouped sidebar sections.

**Props**:
- `title`: string
- `items`: array
- `collapsed`: boolean

**Reusability**: Yes, used in Sidebar.

**Priority**: Medium

---

### MobileMenu

**Purpose**: Hamburger menu for mobile.

**Props**:
- `isOpen`: boolean
- `onClose`: function
- `items`: array

**Reusability**: Yes, used in TopBar (mobile).

**Priority**: High

---

### SkipLink

**Purpose**: Skip to main content (accessibility).

**Props**:
- `targetId`: string

**Reusability**: Yes, used in all layouts.

**Priority**: High

---

### Error404

**Purpose**: 404 error page.

**Props**:
- `onGoBack`: function
- `onGoHome`: function

**Reusability**: Yes, global error page.

**Priority**: Medium

---

### Error403

**Purpose**: 403 unauthorized error page.

**Props**:
- `onGoBack`: function
- `onGoHome`: function

**Reusability**: Yes, global error page.

**Priority**: Medium

---

### OfflineBanner

**Purpose**: Offline mode indicator.

**Props**:
- `isOnline`: boolean
- `onDismiss`: function

**Reusability**: Yes, global component.

**Priority**: Medium

---

# React Navigation Architecture

Recommended folder structure for navigation components and layouts.

## Folder Structure

```
src/
├── components/
│   └── navigation/
│       ├── Sidebar/
│       │   ├── Sidebar.tsx
│       │   ├── SidebarItem.tsx
│       │   ├── SidebarGroup.tsx
│       │   ├── Sidebar.module.css
│       │   └── index.ts
│       ├── Topbar/
│       │   ├── Topbar.tsx
│       │   ├── SearchBar.tsx
│       │   ├── NotificationBell.tsx
│       │   ├── ProfileMenu.tsx
│       │   ├── QuickActions.tsx
│       │   ├── Topbar.module.css
│       │   └── index.ts
│       ├── Breadcrumb/
│       │   ├── Breadcrumb.tsx
│       │   ├── Breadcrumb.module.css
│       │   └── index.ts
│       ├── Search/
│       │   ├── SearchModal.tsx
│       │   ├── SearchResult.tsx
│       │   ├── SearchSuggestions.tsx
│       │   ├── Search.module.css
│       │   └── index.ts
│       ├── Notifications/
│       │   ├── NotificationDropdown.tsx
│       │   ├── NotificationItem.tsx
│       │   ├── NotificationFilters.tsx
│       │   ├── Notifications.module.css
│       │   └── index.ts
│       ├── ProfileMenu/
│       │   ├── ProfileMenu.tsx
│       │   ├── ProfileMenuItem.tsx
│       │   ├── ProfileMenu.module.css
│       │   └── index.ts
│       └── ErrorPages/
│           ├── Error404.tsx
│           ├── Error403.tsx
│           ├── OfflineBanner.tsx
│           ├── ErrorPages.module.css
│           └── index.ts
├── layouts/
│   ├── DashboardLayout.tsx
│   ├── AppLayout.tsx
│   └── AuthLayout.tsx
├── pages/
│   ├── Dashboard/
│   ├── Fleet/
│   ├── Traffic/
│   ├── Routes/
│   ├── Alerts/
│   ├── Analytics/
│   └── Settings/
└── navigation/
    ├── routes.ts
    ├── menuConfig.ts
    └── NavigationContext.tsx
```

---

## Why This Structure is Scalable

### 1. Component Modularity

**Benefit**: Each navigation component is self-contained and independently maintainable.

**Example**:
- `Sidebar/` contains all sidebar-related code
- `Topbar/` contains all top navigation code
- Easy to locate and update components
- No cross-component dependencies

---

### 2. Reusability

**Benefit**: Components can be reused across layouts and pages.

**Example**:
- `SidebarItem` used in Sidebar and MobileMenu
- `NotificationItem` used in NotificationDropdown and notification pages
- Reduces code duplication
- Ensures consistency

---

### 3. Separation of Concerns

**Benefit**: Clear separation between navigation logic, UI, and data.

**Example**:
- `navigation/routes.ts`: Route definitions
- `navigation/menuConfig.ts`: Menu configuration
- `NavigationContext.tsx`: Navigation state management
- Components: UI only

---

### 4. Easy Extension

**Benefit**: New features can be added without restructuring.

**Example**:
- Add new menu item: Update `menuConfig.ts`
- Add new page: Create in `pages/` and add route
- Add new component: Create in appropriate `components/navigation/` folder
- No need to modify existing components

---

### 5. Layout Flexibility

**Benefit**: Different layouts for different contexts.

**Example**:
- `DashboardLayout`: Sidebar + Topbar + Content
- `AuthLayout`: Centered login form (no sidebar/topbar)
- `AppLayout`: Topbar + Content (no sidebar for specific pages)
- Easy to create new layouts as needed

---

### 6. Centralized Configuration

**Benefit**: Menu structure defined in one place.

**Example**:
- `menuConfig.ts` contains all menu items
- Easy to reorder, add, or remove items
- Supports role-based menus (future)
- Supports feature flags (future)

---

### 7. Type Safety

**Benefit**: TypeScript ensures type safety across navigation.

**Example**:
- Route types defined in `routes.ts`
- Menu item types defined in `menuConfig.ts`
- Component props typed
- Compile-time error checking

---

### 8. Performance Optimization

**Benefit**: Code splitting and lazy loading.

**Example**:
- Layouts code-split by route
- Components lazy-loaded
- Navigation bundle separate from page bundles
- Faster initial load

---

# React Router Structure

Document the route hierarchy for the UrbanFlow AI application.

## Route Hierarchy

```
/                                    (Redirect to /dashboard)
/dashboard                           (Dashboard - default landing)
/fleet                               (Fleet > Live Fleet)
/fleet/:vehicleId                    (Fleet > Vehicle Details)
/fleet/:vehicleId/driver             (Fleet > Driver Details)
/traffic                             (Traffic > Live Traffic)
/traffic/congestion                  (Traffic > Congestion)
/traffic/incidents                   (Traffic > Incidents)
/traffic/incidents/:incidentId       (Traffic > Incident Details)
/traffic/weather                     (Traffic > Weather)
/routes                              (Routes > Recommendations)
/routes/recommendations              (Routes > Recommendations)
/routes/active                       (Routes > Active Routes)
/routes/active/:routeId              (Routes > Route Details)
/routes/history                      (Routes > Route History)
/alerts                              (Alerts > Active Alerts)
/alerts/critical                     (Alerts > Critical)
/alerts/history                      (Alerts > History)
/alerts/:alertId                     (Alerts > Alert Details)
/analytics                           (Analytics > Fleet Performance)
/analytics/fleet-performance         (Analytics > Fleet Performance)
/analytics/delivery-trends           (Analytics > Delivery Trends)
/analytics/traffic-trends            (Analytics > Traffic Trends)
/analytics/route-optimization        (Analytics > Route Optimization)
/settings                            (Settings > Profile)
/settings/profile                    (Settings > Profile)
/settings/notifications              (Settings > Notifications)
/settings/preferences                (Settings > Preferences)
/settings/system                     (Settings > System)
/login                               (Login page)
/forgot-password                     (Forgot password)
/reset-password                      (Reset password)
/help                                (Help center)
/about                               (About page)
*                                    (404 - Not Found)
```

---

## Route Configuration

**File**: `src/navigation/routes.ts`

```typescript
export const routes = {
  // Public routes
  login: '/login',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  help: '/help',
  about: '/about',
  
  // Protected routes
  dashboard: '/dashboard',
  
  // Fleet routes
  fleet: '/fleet',
  fleetVehicle: '/fleet/:vehicleId',
  fleetDriver: '/fleet/:vehicleId/driver',
  
  // Traffic routes
  traffic: '/traffic',
  trafficCongestion: '/traffic/congestion',
  trafficIncidents: '/traffic/incidents',
  trafficIncidentDetail: '/traffic/incidents/:incidentId',
  trafficWeather: '/traffic/weather',
  
  // Routes
  routes: '/routes',
  routesRecommendations: '/routes/recommendations',
  routesActive: '/routes/active',
  routesActiveDetail: '/routes/active/:routeId',
  routesHistory: '/routes/history',
  
  // Alerts
  alerts: '/alerts',
  alertsCritical: '/alerts/critical',
  alertsHistory: '/alerts/history',
  alertsDetail: '/alerts/:alertId',
  
  // Analytics
  analytics: '/analytics',
  analyticsFleetPerformance: '/analytics/fleet-performance',
  analyticsDeliveryTrends: '/analytics/delivery-trends',
  analyticsTrafficTrends: '/analytics/traffic-trends',
  analyticsRouteOptimization: '/analytics/route-optimization',
  
  // Settings
  settings: '/settings',
  settingsProfile: '/settings/profile',
  settingsNotifications: '/settings/notifications',
  settingsPreferences: '/settings/preferences',
  settingsSystem: '/settings/system',
  
  // Error pages
  notFound: '*',
};
```

---

## Nested Routing

**Concept**: Routes organized hierarchically with parent-child relationships.

**Example**:

```
/fleet (parent)
  ├── /fleet (Live Fleet - default)
  ├── /fleet/:vehicleId (Vehicle Details - child)
  │   └── /fleet/:vehicleId/driver (Driver Details - grandchild)
  └── /fleet/:vehicleId/driver (Driver Details - child)
```

**Implementation**:

```tsx
// App.tsx
<Routes>
  <Route path="/fleet" element={<FleetLayout />}>
    <Route index element={<LiveFleet />} />
    <Route path=":vehicleId" element={<VehicleDetails />}>
      <Route path="driver" element={<DriverDetails />} />
    </Route>
  </Route>
</Routes>
```

**Benefits**:
- Shared layout for section
- Nested UI components
- Relative navigation
- URL structure reflects hierarchy

---

## Route Guards

**Purpose**: Protect routes requiring authentication.

**Implementation**:

```tsx
// ProtectedRoute.tsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// App.tsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/" element={
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  }>
    <Route index element={<Navigate to="/dashboard" replace />} />
    <Route path="dashboard" element={<Dashboard />} />
    {/* Other protected routes */}
  </Route>
</Routes>
```

---

## Lazy Loading

**Purpose**: Code splitting for performance optimization.

**Implementation**:

```tsx
// App.tsx
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Fleet = lazy(() => import('./pages/Fleet'));
const Traffic = lazy(() => import('./pages/Traffic'));

<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/fleet" element={<Fleet />} />
    <Route path="/traffic" element={<Traffic />} />
  </Routes>
</Suspense>
```

**Benefits**:
- Smaller initial bundle
- Faster page load
- Load code on demand
- Better performance

---

# UX Best Practices

Navigation design principles for optimal user experience.

## 1. Users Should Never Feel Lost

**Principle**: Users always know where they are and how to get where they want to go.

**Implementation**:
- Clear active state in sidebar
- Breadcrumb trail on all pages
- Page title in browser tab
- Consistent navigation structure
- "Back to Dashboard" option always available

**Rationale**: Disorientation causes frustration and delays. Clear orientation builds confidence and efficiency.

---

## 2. Maximum Three Clicks to Reach Important Information

**Principle**: Any critical information accessible within 3 clicks from any page.

**Implementation**:
- Flat navigation hierarchy (max 3 levels)
- Global search for direct access
- Quick actions on every page
- Notification center for alerts
- Dashboard as central hub

**Examples**:
- Dashboard → Fleet → Vehicle Details (3 clicks)
- Dashboard → Alerts → Alert Details (3 clicks)
- Any page → Global Search → Result (2 clicks)

**Rationale**: Reduces time-to-insight and enables rapid decision-making.

---

## 3. Highlight the Current Location

**Principle**: Users always know their current location in the application.

**Implementation**:
- Active state in sidebar (colored background + border)
- Breadcrumb trail showing path
- Page title in browser tab
- Current section highlighted
- Visual distinction between active and inactive items

**Rationale**: Prevents disorientation and builds spatial awareness of the application.

---

## 4. Navigation Should Remain Consistent

**Principle**: Navigation behavior is uniform across all pages and sections.

**Implementation**:
- Same sidebar behavior everywhere
- Consistent button placement
- Uniform hover/active/disabled states
- Standardized breadcrumb format
- Predictable interaction patterns

**Rationale**: Consistency builds muscle memory, allowing instinctive navigation.

---

## 5. Icons Should Always Have Labels

**Principle**: Never use icons without text labels in navigation.

**Implementation**:
- Expanded sidebar: Icon + text label
- Collapsed sidebar: Icon + tooltip on hover
- Icon-only buttons: ARIA label for screen readers
- No icon-only navigation items

**Rationale**: Icons are ambiguous; text labels ensure clarity for all users.

---

## 6. Critical Alerts Should Always Be Visible

**Principle**: Critical information never hidden or buried.

**Implementation**:
- Notification badge always visible
- Critical alerts persistent (don't auto-clear)
- Sound alerts for critical notifications (optional)
- Red color for critical severity
- Dashboard shows critical alerts preview

**Rationale**: Fleet Managers cannot afford to miss critical issues.

---

## 7. Search Should Be Globally Accessible

**Principle**: Search available from any page with keyboard shortcut.

**Implementation**:
- Global search in top navigation
- Ctrl+K / Cmd+K shortcut
- Search modal accessible from everywhere
- Real-time search results
- Search all data types

**Rationale**: Direct access bypasses navigation hierarchy for maximum speed.

---

## 8. Avoid Unnecessary Navigation Depth

**Principle**: Keep navigation hierarchy flat and efficient.

**Implementation**:
- Maximum 3 levels deep
- Primary navigation (sidebar) for major sections
- Secondary navigation (tabs) for subsections
- Detail pages accessed via drill-down
- Breadcrumb for context

**Rationale**: Deep navigation increases time-to-information and cognitive load.

---

## 9. Support Future Expansion

**Principle**: Navigation architecture supports growth without restructuring.

**Implementation**:
- Modular component architecture
- Configuration-based menu
- Dynamic route generation
- Role-based navigation support (future)
- Feature flag support
- Extensible structure

**Rationale**: Platform will evolve; navigation must accommodate new features seamlessly.

---

# Future Navigation Enhancements

Planned navigation features for future phases beyond MVP.

## AI Assistant

**Description**: AI-powered navigation assistant that suggests actions and surfaces relevant information.

**Features**:
- Natural language queries ("Show me delayed vehicles")
- Proactive suggestions ("3 vehicles need attention")
- Context-aware recommendations
- Voice input support
- Learning from user behavior

**Implementation**:
- Chat interface in sidebar or floating button
- AI-powered search and navigation
- Integration with AI engine
- Natural language processing

**Priority**: Phase 2

---

## Voice Navigation

**Description**: Voice-controlled navigation for hands-free operation.

**Features**:
- Voice commands ("Go to Fleet", "Show alerts")
- Voice search ("Find vehicle VH-1234")
- Voice actions ("Reroute vehicle VH-1234")
- Multi-language support
- Voice feedback

**Implementation**:
- Web Speech API
- Voice command recognition
- Text-to-speech for feedback
- Microphone button in navigation

**Priority**: Phase 2

---

## Command Palette

**Description**: VS Code-style command palette for power users.

**Features**:
- Ctrl+Shift+P to open
- Search commands and actions
- Recent commands
- Keyboard shortcuts display
- Quick access to all features

**Implementation**:
- Command palette modal
- Fuzzy search
- Command registry
- Keyboard shortcut integration

**Priority**: Phase 2

---

## Favorites

**Description**: Quick access to frequently used pages and items.

**Features**:
- Star/favorite pages
- Favorites section in sidebar
- Quick access dropdown
- Sync across devices (future)
- Organize into folders (future)

**Implementation**:
- Favorites stored in user preferences
- Favorites section in sidebar
- Drag-and-drop ordering
- Quick access menu

**Priority**: Phase 2

---

## Pinned Pages

**Description**: Pin important pages for quick access.

**Features**:
- Pin pages to sidebar
- Visual indicator (pin icon)
- Quick navigation
- Persistent across sessions
- Multiple pins allowed

**Implementation**:
- Pin button on pages
- Pinned section in sidebar
- localStorage for persistence
- Maximum 5 pinned pages

**Priority**: Phase 2

---

## Recent Pages

**Description**: Quick access to recently visited pages.

**Features**:
- Recent pages list
- Click to navigate
- Clear history
- Time stamps
- Group by date

**Implementation**:
- Track navigation history
- Recent pages dropdown
- localStorage for history
- Maximum 20 recent pages

**Priority**: Phase 2

---

## Multi-language Navigation

**Description**: Support for multiple languages in navigation.

**Features**:
- Translated menu items
- Translated breadcrumbs
- Translated notifications
- Language switcher
- RTL language support

**Implementation**:
- i18n library (react-i18next)
- Translation files
- Language detection
- User preference storage

**Priority**: Phase 3

---

## Custom Dashboards

**Description**: User-customizable dashboard layouts.

**Features**:
- Drag-and-drop widgets
- Save custom layouts
- Multiple dashboard views
- Share dashboards (future)
- Template dashboards

**Implementation**:
- Drag-and-drop library (react-dnd)
- Layout persistence
- Widget configuration
- Multiple layout support

**Priority**: Phase 2

---

## Workspace Switching

**Description**: Switch between different workspaces (e.g., regions, fleets).

**Features**:
- Multiple workspaces
- Quick switching
- Context-aware navigation
- Separate settings per workspace
- Workspace-specific data

**Implementation**:
- Workspace selector in top navigation
- Context provider for workspace
- URL parameter for workspace
- Separate state per workspace

**Priority**: Phase 3

---

# Summary

The UrbanFlow AI navigation system is designed to be the invisible backbone of the platform—always available, never intrusive, and consistently reliable. It enables Fleet Managers to:

**Monitor Operations Efficiently**:
- Access critical information within 3 clicks
- Navigate instinctively through consistent patterns
- Switch contexts rapidly without losing orientation
- Receive immediate notification of critical issues

**Make Rapid Decisions**:
- Global search for direct access to any item
- Quick actions on every page
- AI-powered recommendations at fingertips
- Real-time data always accessible

**Maintain Situational Awareness**:
- Clear active state shows current location
- Breadcrumb trail documents navigation path
- Notification center ensures no critical alerts missed
- Dashboard provides at-a-glance overview

**Scale with Business Growth**:
- Modular architecture supports new features
- Configuration-based menu enables easy expansion
- Role-based navigation ready for future user types
- Responsive design works across all devices

The navigation system is the foundation upon which all other features are built. By prioritizing simplicity, consistency, and speed, it ensures that Fleet Managers can focus on what matters most: managing fleet operations and making informed decisions that drive business success.

This document serves as the single source of truth for navigation design, guiding Penpot wireframes, React Router implementation, sidebar development, header implementation, and all navigation components. It ensures UX consistency across the application and provides a scalable foundation for future platform growth.

---

**Document Version**: 1.0  
**Last Updated**: 2026-07-08  
**Status**: Approved for Implementation  
**Next Review**: After MVP launch