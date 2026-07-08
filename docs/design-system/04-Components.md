# Component Library

The UrbanFlow AI Component Library is a comprehensive collection of reusable UI components that form the building blocks of the fleet management platform. These components are designed to ensure consistency, accelerate development, and maintain accessibility across all modules. Built on the design patterns established in the Visily UI, the component library provides implementation-ready patterns for React + Tailwind CSS development. Each component is crafted to support the operational needs of fleet management while maintaining the professional, enterprise-grade aesthetic appropriate for critical business applications.

---

# Component Philosophy

The UrbanFlow AI Component Library is guided by the following core principles:

## Reusability
Components are designed to be used repeatedly across different modules and pages. Reusability eliminates redundant development work, ensures visual consistency, and simplifies maintenance. When a component is updated, all instances across the platform benefit from the improvement.

## Consistency
Every component follows established design patterns, interaction behaviors, and visual treatments. Consistency reduces the learning curve for users, prevents errors, and creates a polished, professional experience that builds trust in the platform.

## Accessibility
All components are built with accessibility as a foundational requirement, not an afterthought. Components support keyboard navigation, screen readers, sufficient color contrast, and appropriate touch targets. Accessibility is non-negotiable.

## Responsive Behavior
Components adapt gracefully across desktop, tablet, and future mobile contexts. Responsive behavior ensures the platform remains functional and usable regardless of device or screen size, supporting operators in various operational environments.

## Simplicity
Components are designed to do one thing well. Complex functionality is achieved through composition of simple, focused components rather than monolithic, multi-purpose elements. Simplicity makes components easier to understand, use, and maintain.

## Composition Over Duplication
Complex UI patterns are built by composing simpler components rather than creating specialized one-off implementations. Composition promotes flexibility, reduces code duplication, and makes the component library easier to extend and maintain.

---

# Layout Components

Layout components provide the structural foundation for all pages and views in the UrbanFlow AI platform.

## Header

**Purpose:** The top application bar that provides global navigation, search functionality, and user controls.

**Contents:**
- Application logo and brand
- Global search bar
- Notification bell with badge
- User profile menu
- Quick action buttons
- Breadcrumb navigation (optional)

**User Interactions:**
- Click logo to return to dashboard
- Search for vehicles, drivers, routes
- View notifications
- Access user profile and settings
- Quick actions for common tasks

**Responsive Behavior:**
- **Desktop:** Full header with all elements visible
- **Tablet:** Condensed header with collapsible sections
- **Mobile:** Minimal header with hamburger menu (future)

## Sidebar

**Purpose:** Primary navigation container that provides access to all major platform modules.

**Contents:**
- Navigation menu items
- Module icons and labels
- Active state indicator
- Collapsible sections
- User information (bottom)
- Collapse/expand toggle

**User Interactions:**
- Click navigation items to navigate modules
- Hover to see tooltips (when collapsed)
- Click toggle to collapse/expand sidebar
- Active state shows current location

**Responsive Behavior:**
- **Desktop:** Full sidebar (240-280px width)
- **Tablet:** Collapsible sidebar (icon-only mode)
- **Mobile:** Hidden by default, overlay on demand (future)

## Page Container

**Purpose:** Wraps page content and provides consistent padding and maximum width constraints.

**Contents:**
- Page title and breadcrumbs
- Main content area
- Optional page-level actions
- Consistent padding and margins

**User Interactions:**
- Scroll to view content
- Interact with page-level actions
- Navigate via breadcrumbs

**Responsive Behavior:**
- **Desktop:** Full width with max-width constraint (1440px)
- **Tablet:** Full width with reduced padding
- **Mobile:** Full width with minimal padding (future)

## Content Area

**Purpose:** Primary region for displaying main content and data visualizations.

**Contents:**
- Dashboard widgets
- Data tables
- Charts and graphs
- Forms and inputs
- Cards and panels

**User Interactions:**
- Interact with widgets and data displays
- Scroll through content
- Filter and sort data
- Expand/collapse sections

**Responsive Behavior:**
- **Desktop:** Multi-column layouts (2-3 columns)
- **Tablet:** Single or dual column layouts
- **Mobile:** Single column, stacked layout (future)

## Section Container

**Purpose:** Groups related content within a page with clear visual boundaries.

**Contents:**
- Section title
- Related content elements
- Optional section actions
- Consistent spacing and borders

**User Interactions:**
- Interact with section content
- Use section actions
- Collapse/expand section (optional)

**Responsive Behavior:**
- **Desktop:** Horizontal layout with multiple elements
- **Tablet:** Stacked or horizontal layout
- **Mobile:** Stacked vertical layout (future)

## Card Container

**Purpose:** Groups related information and actions into a visually distinct container.

**Contents:**
- Card header (title, actions)
- Card body (content)
- Optional card footer
- Consistent padding and shadows

**User Interactions:**
- View card content
- Click card actions
- Hover for elevation effect (optional)
- Click to navigate (if applicable)

**Responsive Behavior:**
- **Desktop:** Grid layout (3-4 columns)
- **Tablet:** Grid layout (2 columns)
- **Mobile:** Single column, full width (future)

---

# Navigation Components

Navigation components enable users to move through the application and access different sections.

## Sidebar Item

**Purpose:** Individual navigation entry in the sidebar menu.

**States:**
- **Default:** Inactive state
- **Hover:** Highlighted on mouse over
- **Active:** Currently selected page
- **Disabled:** Unavailable navigation option

**User Interactions:**
- Click to navigate to module
- Hover to see tooltip (when collapsed)
- Keyboard navigation with arrow keys

**Responsive Behavior:**
- **Desktop:** Full label with icon
- **Tablet:** Icon-only with tooltip on hover
- **Mobile:** Icon-only in overlay menu (future)

## Top Navigation

**Purpose:** Secondary navigation for quick access to frequently used features.

**States:**
- **Default:** Inactive state
- **Hover:** Highlighted
- **Active:** Current section
- **Disabled:** Unavailable option

**User Interactions:**
- Click to navigate
- Hover for dropdown menu (if applicable)
- Keyboard navigation

**Responsive Behavior:**
- **Desktop:** Full horizontal navigation
- **Tablet:** Condensed with overflow menu
- **Mobile:** Horizontal scroll or hamburger (future)

## Breadcrumb

**Purpose:** Shows current location in navigation hierarchy.

**States:**
- **Default:** Standard breadcrumb trail
- **Active:** Current page (non-clickable)
- **Hover:** Previous pages highlight

**User Interactions:**
- Click previous levels to navigate up
- View current location
- Keyboard navigation

**Responsive Behavior:**
- **Desktop:** Full breadcrumb trail
- **Tablet:** Truncated with ellipsis
- **Mobile:** Minimal or hidden (future)

## Search Bar

**Purpose:** Global search functionality for finding vehicles, drivers, routes, and data.

**States:**
- **Default:** Empty search field
- **Focused:** Active input with cursor
- **Filled:** Contains search query
- **Loading:** Search in progress
- **Disabled:** Search unavailable

**User Interactions:**
- Click to focus input
- Type search query
- Press Enter or click search icon
- Clear search with X button
- View search suggestions (future)

**Responsive Behavior:**
- **Desktop:** Full-width search bar
- **Tablet:** Condensed search with expand on focus
- **Mobile:** Full-width overlay search (future)

## Notification Menu

**Purpose:** Displays recent alerts, notifications, and system messages.

**States:**
- **Default:** No new notifications
- **Has Notifications:** Badge shows count
- **Open:** Dropdown menu visible
- **Loading:** Fetching notifications

**User Interactions:**
- Click bell icon to open menu
- View notification list
- Click notification to navigate
- Mark as read/dismiss
- View all notifications

**Responsive Behavior:**
- **Desktop:** Dropdown menu from header
- **Tablet:** Dropdown or full-screen overlay
- **Mobile:** Full-screen notification center (future)

## User Profile Menu

**Purpose:** Provides access to user account settings and profile information.

**States:**
- **Default:** Shows user avatar and name
- **Hover:** Highlighted
- **Open:** Dropdown menu visible

**User Interactions:**
- Click avatar to open menu
- View profile information
- Access settings
- Logout
- Switch accounts (if applicable)

**Responsive Behavior:**
- **Desktop:** Dropdown menu from header
- **Tablet:** Dropdown menu
- **Mobile:** Full-screen profile page (future)

---

# Data Display Components

Data display components present information to users in clear, scannable formats.

## KPI Card

**Purpose:** Displays key performance indicators and critical metrics on dashboards.

**Displayed Data:**
- Metric value (large, prominent)
- Metric label/description
- Trend indicator (up/down/neutral)
- Comparison period (optional)
- Sparkline or mini chart (optional)

**Supported States:**
- **Default:** Standard display
- **Loading:** Skeleton or spinner
- **Error:** Error message
- **Trending Up:** Positive trend indicator
- **Trending Down:** Negative trend indicator

**Typical Usage:**
- Dashboard overview
- Summary statistics
- Performance monitoring
- Executive dashboards

## Statistics Card

**Purpose:** Shows statistical data with context and comparisons.

**Displayed Data:**
- Primary statistic
- Secondary statistics
- Comparison data
- Time period
- Percentage change

**Supported States:**
- **Default:** Standard display
- **Loading:** Skeleton loader
- **Error:** Error state

**Typical Usage:**
- Analytics dashboards
- Performance reports
- Historical data views
- Comparative analysis

## Information Card

**Purpose:** Displays detailed information about a specific entity or topic.

**Displayed Data:**
- Title/heading
- Descriptive content
- Supporting data points
- Related actions
- Media (images, icons)

**Supported States:**
- **Default:** Standard display
- **Expanded:** Shows additional details
- **Loading:** Skeleton loader
- **Error:** Error state

**Typical Usage:**
- Vehicle details
- Driver profiles
- Route information
- Entity detail views

## Alert Card

**Purpose:** Communicates important alerts, warnings, and notifications.

**Displayed Data:**
- Alert title
- Alert description
- Severity level
- Timestamp
- Action buttons (acknowledge, dismiss, view details)

**Supported States:**
- **Info:** Informational alert
- **Warning:** Cautionary alert
- **Error:** Critical alert
- **Success:** Confirmation alert
- **Acknowledged:** User has seen alert
- **Dismissed:** Alert hidden

**Typical Usage:**
- System alerts
- Maintenance notifications
- Critical warnings
- Status updates

## Status Badge

**Purpose:** Indicates the current status of an entity or process.

**Displayed Data:**
- Status text
- Status color
- Optional icon

**Supported States:**
- **Active:** Green - operational
- **Idle:** Blue - available but not in use
- **Maintenance:** Yellow - scheduled maintenance
- **Offline:** Gray - not connected
- **Critical:** Red - immediate attention required
- **Warning:** Orange - needs attention soon
- **Healthy:** Green - no issues
- **Delayed:** Orange - experiencing delays

**Typical Usage:**
- Vehicle status in tables
- Process status indicators
- Task completion status
- System health indicators

## Progress Indicator

**Purpose:** Shows completion status of a process or task.

**Displayed Data:**
- Progress percentage
- Progress bar
- Status text
- Optional ETA

**Supported States:**
- **Default:** In progress
- **Complete:** 100% finished
- **Error:** Failed
- **Paused:** Temporarily stopped

**Typical Usage:**
- Task completion
- Data loading
- Process status
- Upload/download progress

## Metric Tile

**Purpose:** Compact display of a single metric with context.

**Displayed Data:**
- Metric value
- Metric label
- Trend indicator
- Sparkline (optional)

**Supported States:**
- **Default:** Standard display
- **Loading:** Skeleton
- **Error:** Error state

**Typical Usage:**
- Dashboard widgets
- Summary tiles
- Quick statistics
- At-a-glance metrics

## Analytics Card

**Purpose:** Displays analytical data with charts and insights.

**Displayed Data:**
- Chart or graph
- Data points
- Time range selector
- Legend
- Insights or annotations

**Supported States:**
- **Default:** Standard display
- **Loading:** Skeleton or spinner
- **Error:** Error state
- **Filtered:** Applied filters

**Typical Usage:**
- Performance analytics
- Trend analysis
- Historical data
- Predictive insights

## Map Container

**Purpose:** Displays geographic data and vehicle locations on an interactive map.

**Displayed Data:**
- Map view
- Vehicle markers
- Route lines
- Geographic boundaries
- Clusters (when zoomed out)

**Supported States:**
- **Default:** Standard map view
- **Loading:** Map loading
- **Filtered:** Filtered vehicles
- **Selected:** Vehicle selected
- **Error:** Map load error

**Typical Usage:**
- Fleet tracking
- Route visualization
- Geographic analysis
- Vehicle location monitoring

## Chart Container

**Purpose:** Wraps charts and data visualizations with consistent styling and controls.

**Displayed Data:**
- Chart type (bar, line, pie, etc.)
- Data series
- Axes and labels
- Legend
- Tooltips

**Supported States:**
- **Default:** Standard chart
- **Loading:** Skeleton or spinner
- **Error:** Error state
- **Interactive:** Hover/click interactions

**Typical Usage:**
- Data visualization
- Trend analysis
- Performance metrics
- Comparative analysis

## Vehicle Card

**Purpose:** Displays summary information about a vehicle.

**Displayed Data:**
- Vehicle image/icon
- Vehicle ID and name
- Status indicator
- Key metrics (fuel, mileage, etc.)
- Driver assignment
- Last update timestamp

**Supported States:**
- **Default:** Standard display
- **Selected:** Highlighted
- **Loading:** Skeleton
- **Error:** Error state
- **Active/Idle/Maintenance/Offline:** Status states

**Typical Usage:**
- Vehicle lists
- Fleet overview
- Vehicle selection
- Quick vehicle info

---

# Table Components

Table components display structured data in a scannable, interactive format.

## Fleet Table

**Purpose:** Primary component for displaying fleet data in tabular format.

**Contents:**
- Table header with column definitions
- Table rows with data
- Sorting controls
- Filtering options
- Pagination controls
- Row selection checkboxes
- Row action menus

**User Interactions:**
- Sort columns by clicking headers
- Filter data using filter controls
- Select rows for bulk actions
- Navigate pages with pagination
- Perform row actions (view, edit, delete)
- Search within table

**Responsive Behavior:**
- **Desktop:** Full table with all columns
- **Tablet:** Horizontal scroll or column prioritization
- **Mobile:** Card view or horizontal scroll (future)

## Table Header

**Purpose:** Defines table columns and provides sorting controls.

**Contents:**
- Column labels
- Sort indicators (arrows)
- Filter icons (optional)
- Resize handles (optional)

**User Interactions:**
- Click to sort ascending/descending
- Click filter icon to open filter
- Resize column (if enabled)

**Responsive Behavior:**
- **Desktop:** All headers visible
- **Tablet:** Priority columns visible, others scrollable
- **Mobile:** Minimal headers (future)

## Table Row

**Purpose:** Represents a single data record in the table.

**Contents:**
- Data cells
- Selection checkbox
- Row actions menu
- Status indicators

**User Interactions:**
- Click to select row
- Click actions menu for options
- Hover for highlight effect
- Double-click to view details

**Supported States:**
- **Default:** Standard row
- **Hover:** Highlighted
- **Selected:** Checked/Highlighted
- **Disabled:** Non-interactive

**Responsive Behavior:**
- **Desktop:** Full row display
- **Tablet:** Condensed row
- **Mobile:** Card layout (future)

## Table Cell

**Purpose:** Displays individual data point within a table row.

**Contents:**
- Data value
- Formatting (numbers, dates, currency)
- Status badges (if applicable)
- Links (if applicable)

**User Interactions:**
- Click links within cell
- Copy text (if enabled)
- View tooltips for truncated content

**Responsive Behavior:**
- **Desktop:** Full content visible
- **Tablet:** Truncated with ellipsis
- **Mobile:** Stacked or card format (future)

## Pagination

**Purpose:** Enables navigation through large datasets.

**Contents:**
- Page numbers
- Previous/Next buttons
- Page size selector
- Total records indicator
- Jump to page input (optional)

**User Interactions:**
- Click page numbers
- Click Previous/Next
- Change page size
- Jump to specific page

**Responsive Behavior:**
- **Desktop:** Full pagination controls
- **Tablet:** Simplified pagination
- **Mobile:** Infinite scroll or load more (future)

## Sorting

**Purpose:** Allows users to reorder table data by column.

**Contents:**
- Sort direction indicators
- Multi-sort indicators (optional)
- Sort priority numbers (optional)

**User Interactions:**
- Click column header to sort
- Shift+Click for multi-sort
- Click again to reverse direction
- Clear sorting

**Responsive Behavior:**
- **Desktop:** Full sorting controls
- **Tablet:** Simplified sorting
- **Mobile:** Filter-based sorting (future)

## Filtering

**Purpose:** Narrows table data based on user-defined criteria.

**Contents:**
- Filter input fields
- Filter dropdowns
- Date range pickers
- Clear filters button
- Active filter indicators

**User Interactions:**
- Enter filter criteria
- Apply filters
- Clear all filters
- Save filter presets (future)

**Responsive Behavior:**
- **Desktop:** Inline or panel filters
- **Tablet:** Panel filters
- **Mobile:** Full-screen filter panel (future)

## Row Actions

**Purpose:** Provides context actions for individual table rows.

**Contents:**
- Action menu button (three dots)
- Action list (view, edit, delete, etc.)
- Keyboard shortcuts (optional)

**User Interactions:**
- Click action button to open menu
- Select action from menu
- Keyboard navigation within menu

**Responsive Behavior:**
- **Desktop:** Dropdown menu
- **Tablet:** Dropdown or bottom sheet
- **Mobile:** Bottom sheet or swipe actions (future)

## Selection

**Purpose:** Enables selection of multiple rows for bulk operations.

**Contents:**
- Select all checkbox (header)
- Individual row checkboxes
- Selection count indicator
- Bulk action toolbar (when items selected)

**User Interactions:**
- Click checkbox to select/deselect
- Click select all to select all rows
- Shift+Click for range selection
- Perform bulk actions

**Responsive Behavior:**
- **Desktop:** Checkbox column
- **Tablet:** Checkbox column
- **Mobile:** Swipe to select or long-press (future)

## Empty State

**Purpose:** Communicates when no data is available.

**Contents:**
- Icon or illustration
- Title message
- Descriptive text
- Action button (if applicable)

**User Interactions:**
- Read message
- Click action button to create data
- Navigate away

**Responsive Behavior:**
- **Desktop:** Centered content
- **Tablet:** Centered content
- **Mobile:** Full-width content (future)

## Loading State

**Purpose:** Indicates data is being loaded.

**Contents:**
- Loading spinner or skeleton
- Loading message (optional)
- Progress indicator (if applicable)

**User Interactions:**
- Wait for data to load
- Cancel operation (if applicable)

**Responsive Behavior:**
- **Desktop:** Skeleton rows
- **Tablet:** Skeleton rows
- **Mobile:** Skeleton cards (future)

---

# Form Components

Form components enable user input and data entry.

## Primary Button

**Purpose:** Primary call-to-action button for important actions.

**Variants:**
- Solid primary color background
- White text
- Optional icon

**States:**
- **Default:** Primary color background
- **Hover:** Darker shade
- **Pressed:** Even darker shade
- **Focused:** Focus ring visible
- **Disabled:** Muted colors, reduced opacity
- **Loading:** Spinner replaces text

**Accessibility:**
- Keyboard accessible
- Focus indicator visible
- Sufficient color contrast
- Screen reader label

**Typical Usage:**
- Form submission
- Primary actions
- Confirmations
- Next steps

## Secondary Button

**Purpose:** Secondary or alternative action button.

**Variants:**
- Secondary color or neutral background
- Dark text
- Optional icon

**States:**
- **Default:** Secondary color background
- **Hover:** Darker shade
- **Pressed:** Even darker shade
- **Focused:** Focus ring visible
- **Disabled:** Muted colors
- **Loading:** Spinner replaces text

**Accessibility:**
- Keyboard accessible
- Focus indicator visible
- Sufficient color contrast

**Typical Usage:**
- Secondary actions
- Cancel buttons
- Alternative options
- Back navigation

## Danger Button

**Purpose:** Destructive or dangerous actions requiring caution.

**Variants:**
- Danger/red background
- White text
- Warning icon (optional)

**States:**
- **Default:** Danger color background
- **Hover:** Darker shade
- **Pressed:** Even darker shade
- **Focused:** Focus ring visible
- **Disabled:** Muted colors
- **Loading:** Spinner replaces text

**Accessibility:**
- Keyboard accessible
- Focus indicator visible
- Sufficient color contrast
- Confirmation dialog recommended

**Typical Usage:**
- Delete actions
- Destructive operations
- Irreversible actions
- Remove operations

## Outlined Button

**Purpose:** Tertiary or less prominent action button.

**Variants:**
- Transparent background
- Colored border
- Colored text
- Optional icon

**States:**
- **Default:** Transparent with border
- **Hover:** Filled background
- **Pressed:** Darker filled background
- **Focused:** Focus ring visible
- **Disabled:** Muted colors
- **Loading:** Spinner replaces text

**Accessibility:**
- Keyboard accessible
- Focus indicator visible
- Sufficient color contrast

**Typical Usage:**
- Tertiary actions
- Less important options
- Secondary navigation
- Filter toggles

## Text Button

**Purpose:** Minimal button for low-emphasis actions.

**Variants:**
- No background
- No border
- Colored text
- Optional icon

**States:**
- **Default:** Text only
- **Hover:** Background highlight
- **Pressed:** Darker text
- **Focused:** Focus ring visible
- **Disabled:** Muted text color
- **Loading:** Spinner replaces text

**Accessibility:**
- Keyboard accessible
- Focus indicator visible
- Sufficient color contrast

**Typical Usage:**
- Links within text
- Inline actions
- Low-emphasis actions
- Contextual actions

## Input Field

**Purpose:** Text input for user data entry.

**Variants:**
- Default input
- With label
- With placeholder
- With icon
- With helper text
- With error message

**States:**
- **Default:** Empty, ready for input
- **Filled:** Contains user input
- **Focused:** Active input with cursor
- **Error:** Validation error
- **Disabled:** Non-interactive
- **Read-only:** Display only

**Accessibility:**
- Associated label
- Keyboard accessible
- Focus indicator visible
- Error messages announced
- Sufficient color contrast

**Typical Usage:**
- Text entry
- Form fields
- Search inputs
- Data entry

## Search Input

**Purpose:** Specialized input for search functionality.

**Variants:**
- With search icon
- With clear button
- With suggestions dropdown
- With recent searches

**States:**
- **Default:** Empty, ready for search
- **Focused:** Active input
- **Filled:** Contains search query
- **Loading:** Search in progress
- **Disabled:** Search unavailable

**Accessibility:**
- Keyboard accessible
- Focus indicator visible
- Screen reader label
- Search suggestions accessible

**Typical Usage:**
- Global search
- Table search
- Filter search
- Quick find

## Dropdown

**Purpose:** Selection from a list of options.

**Variants:**
- Single select
- Multi-select
- With search
- With groups
- With icons

**States:**
- **Default:** Closed, showing selected value
- **Open:** Dropdown menu visible
- **Focused:** Input focused
- **Filled:** Selection made
- **Disabled:** Non-interactive
- **Error:** Validation error

**Accessibility:**
- Keyboard navigable
- Focus indicator visible
- Screen reader announcements
- Arrow key navigation
- Escape to close

**Typical Usage:**
- Selection menus
- Form inputs
- Filter options
- Settings configuration

## Checkbox

**Purpose:** Binary selection (checked/unchecked).

**Variants:**
- Standard checkbox
- With label
- With description
- Indeterminate state
- Disabled state

**States:**
- **Unchecked:** Default state
- **Checked:** Selected state
- **Indeterminate:** Partial selection
- **Focused:** Keyboard focus
- **Disabled:** Non-interactive

**Accessibility:**
- Keyboard accessible (Space to toggle)
- Focus indicator visible
- Screen reader label
- Sufficient touch target (44x44px)

**Typical Usage:**
- Multiple selections
- Agreement confirmations
- Feature toggles
- Option selection

## Radio Button

**Purpose:** Single selection from multiple options.

**Variants:**
- Standard radio
- With label
- With description
- Radio group
- Button-style radios

**States:**
- **Unselected:** Default state
- **Selected:** Active option
- **Focused:** Keyboard focus
- **Disabled:** Non-interactive

**Accessibility:**
- Keyboard navigable (Arrow keys)
- Focus indicator visible
- Screen reader group label
- Sufficient touch target

**Typical Usage:**
- Single choice selection
- Option groups
- Settings selection
- Form options

## Toggle Switch

**Purpose:** Binary on/off control.

**Variants:**
- Standard toggle
- With label
- With description
- Disabled state
- Loading state

**States:**
- **Off:** Default state
- **On:** Active state
- **Disabled:** Non-interactive
- **Loading:** Processing

**Accessibility:**
- Keyboard accessible (Space to toggle)
- Focus indicator visible
- Screen reader label
- Sufficient touch target

**Typical Usage:**
- Feature toggles
- Setting switches
- Enable/disable options
- Preference controls

## Text Area

**Purpose:** Multi-line text input.

**Variants:**
- Standard textarea
- With label
- With placeholder
- With character count
- Auto-resize
- With helper text

**States:**
- **Default:** Empty, ready for input
- **Filled:** Contains text
- **Focused:** Active input
- **Error:** Validation error
- **Disabled:** Non-interactive
- **Read-only:** Display only

**Accessibility:**
- Associated label
- Keyboard accessible
- Focus indicator visible
- Character count announced
- Sufficient color contrast

**Typical Usage:**
- Long text entry
- Comments and notes
- Descriptions
- Multi-line data

## Date Picker (Future)

**Purpose:** Date selection with calendar interface.

**Variants:**
- Single date picker
- Date range picker
- With time selection
- With presets

**States:**
- **Default:** Closed, showing placeholder
- **Open:** Calendar visible
- **Selected:** Date chosen
- **Focused:** Input focused
- **Disabled:** Non-interactive

**Accessibility:**
- Keyboard navigable
- Focus indicator visible
- Screen reader announcements
- Arrow key navigation in calendar

**Typical Usage:**
- Date entry
- Date range selection
- Scheduling
- Filtering by date

---

# Feedback Components

Feedback components communicate system status and respond to user actions.

## Toast Notification

**Purpose:** Temporary notification for user feedback.

**Contents:**
- Icon (success, error, warning, info)
- Title message
- Description (optional)
- Action button (optional)
- Close button
- Auto-dismiss timer

**States:**
- **Success:** Positive confirmation
- **Error:** Error notification
- **Warning:** Cautionary message
- **Info:** Informational message
- **Loading:** Processing notification

**User Interactions:**
- Auto-dismiss after timeout
- Click to dismiss
- Click action button (if present)
- Swipe to dismiss (mobile, future)

**Responsive Behavior:**
- **Desktop:** Top-right corner
- **Tablet:** Top-center or top-right
- **Mobile:** Top or bottom full-width (future)

## Alert Banner

**Purpose:** Persistent notification for important messages.

**Contents:**
- Icon
- Title
- Description
- Action button (optional)
- Dismiss button

**States:**
- **Info:** Informational
- **Success:** Success message
- **Warning:** Warning message
- **Error:** Error message
- **Dismissed:** Hidden

**User Interactions:**
- Read message
- Click action button
- Dismiss alert
- View details (if applicable)

**Responsive Behavior:**
- **Desktop:** Full-width banner at top
- **Tablet:** Full-width banner
- **Mobile:** Full-width banner (future)

## Loading Spinner

**Purpose:** Indicates processing or loading state.

**Contents:**
- Spinning animation
- Optional loading text
- Optional progress indicator

**States:**
- **Default:** Spinning
- **Paused:** Temporarily stopped
- **Complete:** Finished loading

**User Interactions:**
- Wait for completion
- Cancel operation (if applicable)

**Responsive Behavior:**
- **Desktop:** Centered or inline
- **Tablet:** Centered or inline
- **Mobile:** Centered (future)

## Skeleton Loader

**Purpose:** Placeholder content while data loads.

**Contents:**
- Skeleton shapes matching content layout
- Shimmer animation
- Optional loading text

**States:**
- **Loading:** Shimmer animation active
- **Loaded:** Replaced with actual content
- **Error:** Error state shown

**User Interactions:**
- View placeholder
- Wait for content to load

**Responsive Behavior:**
- **Desktop:** Skeleton matching layout
- **Tablet:** Skeleton matching layout
- **Mobile:** Simplified skeleton (future)

## Empty State

**Purpose:** Communicates absence of data.

**Contents:**
- Icon or illustration
- Title message
- Descriptive text
- Action button (if applicable)

**User Interactions:**
- Read message
- Click action to create data
- Navigate away

**Responsive Behavior:**
- **Desktop:** Centered content
- **Tablet:** Centered content
- **Mobile:** Full-width content (future)

## Error State

**Purpose:** Communicates errors and provides recovery options.

**Contents:**
- Error icon
- Error title
- Error description
- Retry button
- Contact support link (optional)

**User Interactions:**
- Read error message
- Click retry button
- Contact support
- Navigate away

**Responsive Behavior:**
- **Desktop:** Centered content
- **Tablet:** Centered content
- **Mobile:** Full-width content (future)

## Confirmation Dialog

**Purpose:** Confirms user actions before execution.

**Contents:**
- Dialog title
- Confirmation message
- Confirm button
- Cancel button
- Optional details

**States:**
- **Default:** Awaiting user choice
- **Confirmed:** User confirmed action
- **Cancelled:** User cancelled

**User Interactions:**
- Read message
- Click confirm or cancel
- Press Enter or Escape
- Click outside to cancel (optional)

**Responsive Behavior:**
- **Desktop:** Centered modal dialog
- **Tablet:** Centered modal or bottom sheet
- **Mobile:** Bottom sheet (future)

## Success Message

**Purpose:** Confirms successful completion of an action.

**Contents:**
- Success icon
- Success title
- Success description
- Optional next steps
- Close button

**States:**
- **Default:** Success message displayed
- **Dismissed:** Message hidden

**User Interactions:**
- Read confirmation
- Click next steps (if applicable)
- Dismiss message
- Auto-dismiss (optional)

**Responsive Behavior:**
- **Desktop:** Toast or inline message
- **Tablet:** Toast or inline message
- **Mobile:** Toast or full-width banner (future)

---

# Modal Components

Modal components overlay content for focused interactions.

## Modal

**Purpose:** Overlay dialog for focused user interaction.

**Contents:**
- Modal header (title, close button)
- Modal body (content)
- Modal footer (actions)
- Backdrop overlay

**States:**
- **Closed:** Hidden
- **Open:** Visible with backdrop
- **Loading:** Content loading
- **Error:** Error state

**User Interactions:**
- Click close button or X
- Press Escape to close
- Click backdrop to close (optional)
- Interact with modal content
- Click action buttons

**Responsive Behavior:**
- **Desktop:** Centered dialog (600-800px width)
- **Tablet:** Centered dialog or full-screen
- **Mobile:** Full-screen or bottom sheet (future)

## Confirmation Modal

**Purpose:** Confirms potentially destructive or important actions.

**Contents:**
- Warning/confirmation icon
- Title
- Description
- Confirm button
- Cancel button

**States:**
- **Default:** Awaiting confirmation
- **Confirmed:** Action executed
- **Cancelled:** Action cancelled

**User Interactions:**
- Read confirmation message
- Click confirm or cancel
- Press Enter or Escape

**Responsive Behavior:**
- **Desktop:** Centered modal
- **Tablet:** Centered modal or bottom sheet
- **Mobile:** Bottom sheet (future)

## Delete Dialog

**Purpose:** Specialized confirmation for delete actions.

**Contents:**
- Warning icon
- Title ("Delete [Item]?")
- Description of consequences
- Delete button (danger)
- Cancel button

**States:**
- **Default:** Awaiting confirmation
- **Confirmed:** Item deleted
- **Cancelled:** Action cancelled

**User Interactions:**
- Read warning message
- Click delete or cancel
- Press Enter or Escape

**Responsive Behavior:**
- **Desktop:** Centered modal
- **Tablet:** Centered modal or bottom sheet
- **Mobile:** Bottom sheet (future)

## Filter Panel

**Purpose:** Provides filtering controls for data tables and lists.

**Contents:**
- Filter input fields
- Filter dropdowns
- Date range pickers
- Apply/Clear buttons
- Active filter indicators

**States:**
- **Closed:** Hidden
- **Open:** Visible with filters
- **Applied:** Filters active
- **Loading:** Applying filters

**User Interactions:**
- Open/close panel
- Enter filter criteria
- Apply filters
- Clear filters
- Save filter presets (future)

**Responsive Behavior:**
- **Desktop:** Side panel or dropdown
- **Tablet:** Side panel or bottom sheet
- **Mobile:** Full-screen overlay (future)

## Drawer

**Purpose:** Slide-out panel for additional content or forms.

**Contents:**
- Drawer header (title, close button)
- Drawer body (content)
- Drawer footer (actions)
- Backdrop overlay

**States:**
- **Closed:** Hidden
- **Open:** Visible, slides in from side
- **Loading:** Content loading
- **Error:** Error state

**User Interactions:**
- Click close button or X
- Press Escape to close
- Click backdrop to close
- Interact with drawer content
- Scroll within drawer

**Responsive Behavior:**
- **Desktop:** Right side drawer (400-600px width)
- **Tablet:** Right side or full-width drawer
- **Mobile:** Full-screen or bottom sheet (future)

## Tooltip

**Purpose:** Provides additional information on hover or focus.

**Contents:**
- Informational text
- Optional icon
- Optional formatting

**States:**
- **Hidden:** Not visible
- **Visible:** Displayed on hover/focus
- **Loading:** Content loading (rare)

**User Interactions:**
- Hover over element to show
- Focus element to show (keyboard)
- Move away to hide
- Press Escape to hide (if focused)

**Responsive Behavior:**
- **Desktop:** Tooltip on hover/focus
- **Tablet:** Tooltip on tap/hold
- **Mobile:** Tooltip on long-press (future)

## Popover

**Purpose:** Displays contextual content or actions.

**Contents:**
- Popover content
- Optional header
- Optional footer with actions
- Arrow pointing to trigger

**States:**
- **Closed:** Hidden
- **Open:** Visible
- **Loading:** Content loading

**User Interactions:**
- Click trigger to open
- Click outside to close
- Press Escape to close
- Interact with popover content

**Responsive Behavior:**
- **Desktop:** Popover positioned near trigger
- **Tablet:** Popover or bottom sheet
- **Mobile:** Bottom sheet or full-screen (future)

---

# AI-Specific Components

AI-specific components present AI-generated insights, predictions, and recommendations unique to the UrbanFlow AI platform.

## Route Recommendation Card

**Purpose:** Displays AI-generated route optimization suggestions.

**Displayed Data:**
- Recommended route
- Expected duration
- Fuel savings estimate
- Confidence score
- Key benefits
- Accept/Reject actions

**Supported States:**
- **Default:** New recommendation
- **Accepted:** User accepted route
- **Rejected:** User rejected route
- **Loading:** Generating recommendation

**Typical Usage:**
- Route planning
- Optimization suggestions
- Driver assistance
- Cost reduction

## Confidence Score Badge

**Purpose:** Indicates AI prediction or recommendation confidence level.

**Displayed Data:**
- Confidence percentage
- Color-coded indicator
- Optional explanation

**Supported States:**
- **High (90-100%):** Green - highly reliable
- **Medium (70-89%):** Yellow - reasonably reliable
- **Low (<70%):** Orange - use with caution

**Typical Usage:**
- AI predictions
- Recommendations
- Anomaly detection
- Forecasting

## Traffic Prediction Panel

**Purpose:** Displays AI-predicted traffic conditions.

**Displayed Data:**
- Predicted traffic levels
- Time-based forecast
- Affected routes
- Alternative suggestions
- Confidence level

**Supported States:**
- **Default:** Standard prediction
- **High Confidence:** Reliable prediction
- **Low Confidence:** Uncertain prediction
- **Updated:** Recently refreshed

**Typical Usage:**
- Route planning
- ETA calculations
- Delay prevention
- Proactive adjustments

## AI Insight Card

**Purpose:** Presents AI-generated insights and analysis.

**Displayed Data:**
- Insight title
- Detailed description
- Supporting data
- Recommendations
- Confidence score
- Timestamp

**Supported States:**
- **New:** Recently generated
- **Reviewed:** User has viewed
- **Actioned:** User acted on insight
- **Dismissed:** User dismissed

**Typical Usage:**
- Operational insights
- Performance analysis
- Anomaly detection
- Predictive maintenance

## Risk Indicator

**Purpose:** Communicates risk levels identified by AI analysis.

**Displayed Data:**
- Risk level (low, medium, high, critical)
- Risk description
- Contributing factors
- Recommended actions
- Confidence score

**Supported States:**
- **Low Risk:** Green - minimal concern
- **Medium Risk:** Yellow - monitor closely
- **High Risk:** Orange - action required
- **Critical Risk:** Red - immediate action

**Typical Usage:**
- Vehicle risk assessment
- Route risk analysis
- Driver safety monitoring
- Maintenance forecasting

## Weather Impact Card

**Purpose:** Displays weather-related impact on operations.

**Displayed Data:**
- Weather condition
- Affected routes/vehicles
- Predicted impact
- Duration
- Recommendations

**Supported States:**
- **Default:** Standard weather impact
- **Severe:** Significant impact
- **Minimal:** Little to no impact
- **Resolved:** Impact cleared

**Typical Usage:**
- Route adjustments
- Schedule modifications
- Proactive planning
- Driver notifications

## Optimization Summary

**Purpose:** Shows results of AI optimization efforts.

**Displayed Data:**
- Optimization type
- Before/after metrics
- Improvement percentage
- Time period
- Key achievements

**Supported States:**
- **Default:** Standard summary
- **Significant:** Major improvements
- **Minimal:** Minor improvements
- **No Change:** No optimization needed

**Typical Usage:**
- Performance reporting
- Cost savings analysis
- Efficiency improvements
- ROI demonstration

---

# Component States

All components support a standard set of states to communicate interactivity and system status.

## Default

**Purpose:** Resting state before user interaction.

**Appearance:** Standard component appearance with no special styling.

**Usage:** Initial state when component loads or after interaction completes.

## Hover

**Purpose:** Indicates element is interactive and responds to mouse hover.

**Appearance:** Slight visual change (color shift, elevation, underline).

**Usage:** Mouse over interactive elements.

## Focused

**Purpose:** Indicates keyboard focus for accessibility.

**Appearance:** Visible focus ring or outline (2px minimum).

**Usage:** Keyboard navigation with Tab key.

## Pressed

**Purpose:** Indicates active clicking or selection.

**Appearance:** More pronounced visual change (darker shade, inset shadow).

**Usage:** Mouse down or touch start on interactive elements.

## Disabled

**Purpose:** Indicates element is not currently interactive.

**Appearance:** Reduced opacity, muted colors, no hover effects.

**Usage:** Unavailable options, form fields not yet active.

## Loading

**Purpose:** Indicates content or operation is in progress.

**Appearance:** Spinner, skeleton, or progress indicator.

**Usage:** Data fetching, form submission, processing.

## Error

**Purpose:** Communicates error state.

**Appearance:** Error colors, error icons, error messages.

**Usage:** Validation errors, failed operations, system errors.

## Success

**Purpose:** Confirms successful completion.

**Appearance:** Success colors, checkmarks, success messages.

**Usage:** Successful submissions, completed operations.

## Selected

**Purpose:** Indicates active selection.

**Appearance:** Highlighted background, checkmark, or border.

**Usage:** Selected items, active navigation, current choices.

---

# Responsive Behavior

Components adapt their layout and behavior across different device contexts.

## Desktop

**Primary Context:** Desktop is the primary platform for UrbanFlow AI.

**Behavior:**
- Full component functionality
- Multi-column layouts
- Hover states enabled
- Keyboard and mouse input
- Maximum screen real estate utilization
- Complex data displays supported

**Breakpoint:** 1024px and above

## Tablet

**Secondary Context:** Tablet supports field operations and remote monitoring.

**Behavior:**
- Adapted layouts for medium screens
- Touch-optimized interactions
- Simplified complex components
- Collapsible navigation
- Adequate touch targets (minimum 44x44px)
- Reduced data density

**Breakpoint:** 768px to 1023px

**Adaptations:**
- Sidebar collapses to icon-only mode
- Tables may require horizontal scroll
- Modals may use bottom sheet pattern
- Reduced font sizes for headings
- Increased spacing for touch

## Mobile (Future)

**Future Context:** Mobile support planned for future phases.

**Behavior:**
- Single column layouts
- Touch-first interactions
- Simplified navigation
- Card-based layouts
- Swipe gestures
- Bottom navigation (optional)

**Breakpoint:** Below 768px

**Planned Adaptations:**
- Full-screen modals and drawers
- Bottom sheet patterns
- Horizontal scroll for tables
- Simplified data visualizations
- Read-only dashboards initially
- Progressive enhancement for full functionality

---

# Accessibility

All components are designed to meet WCAG 2.1 AA standards and support inclusive design.

## Keyboard Navigation

**Requirements:**
- All interactive elements are keyboard accessible
- Logical tab order matches visual hierarchy
- Focus indicators are clearly visible
- Keyboard shortcuts for common actions
- Escape key closes modals and dropdowns
- Arrow keys navigate within components (menus, radios, etc.)

**Guidelines:**
- Test all components with keyboard only
- Ensure focus is never trapped
- Provide skip links where appropriate
- Support standard keyboard patterns

## ARIA Considerations

**Requirements:**
- Appropriate ARIA roles for all components
- ARIA labels for icon-only buttons
- ARIA descriptions for complex components
- Live regions for dynamic content
- ARIA states (expanded, selected, etc.)
- Proper heading hierarchy

**Guidelines:**
- Use semantic HTML elements
- Add ARIA only when HTML is insufficient
- Test with screen readers
- Keep ARIA updated with component state
- Document ARIA usage for each component

## Focus Management

**Requirements:**
- Visible focus indicators (2px minimum)
- High contrast focus rings
- Focus trapped in modals
- Focus returns to trigger on close
- Focus order is logical
- No focus on disabled elements

**Guidelines:**
- Never remove focus indicators for aesthetics
- Use focus indicators that meet contrast requirements
- Manage focus in overlays and modals
- Test focus management with keyboard

## Touch Targets

**Requirements:**
- Minimum 44x44px touch target size
- Adequate spacing between targets (8px minimum)
- Large enough for finger interaction
- No accidental activation

**Guidelines:**
- Design for touch on tablet and future mobile
- Provide adequate spacing between interactive elements
- Test on actual touch devices
- Consider thumb reach zones

## Screen Readers

**Requirements:**
- All content is accessible to screen readers
- Meaningful link text (not "click here")
- Alternative text for images and icons
- Announce dynamic content changes
- Proper heading hierarchy
- Form labels associated with inputs

**Guidelines:**
- Test with NVDA, JAWS, and VoiceOver
- Use semantic HTML
- Provide context for screen reader users
- Announce errors and success messages
- Support screen reader navigation

## Color Independence

**Requirements:**
- Information not conveyed by color alone
- Icons or text accompany color-coded information
- Patterns or textures for additional distinction
- Works in grayscale

**Guidelines:**
- Pair colors with icons
- Include text labels with status colors
- Test designs in grayscale
- Provide alternative indicators
- Support color-blind users

---

# React Component Mapping

The following table maps UI components to suggested React component file names for implementation.

| UI Component | Suggested React Component |
|--------------|---------------------------|
| Header | `Header.tsx` |
| Sidebar | `Sidebar.tsx` |
| Page Container | `PageContainer.tsx` |
| Content Area | `ContentArea.tsx` |
| Section Container | `SectionContainer.tsx` |
| Card Container | `Card.tsx` |
| Sidebar Item | `SidebarItem.tsx` |
| Top Navigation | `TopNavigation.tsx` |
| Breadcrumb | `Breadcrumb.tsx` |
| Search Bar | `SearchBar.tsx` |
| Notification Menu | `NotificationMenu.tsx` |
| User Profile Menu | `UserProfileMenu.tsx` |
| KPI Card | `KPICard.tsx` |
| Statistics Card | `StatisticsCard.tsx` |
| Information Card | `InfoCard.tsx` |
| Alert Card | `AlertCard.tsx` |
| Status Badge | `StatusBadge.tsx` |
| Progress Indicator | `ProgressIndicator.tsx` |
| Metric Tile | `MetricTile.tsx` |
| Analytics Card | `AnalyticsCard.tsx` |
| Map Container | `MapContainer.tsx` |
| Chart Container | `ChartContainer.tsx` |
| Vehicle Card | `VehicleCard.tsx` |
| Fleet Table | `FleetTable.tsx` |
| Table Header | `TableHeader.tsx` |
| Table Row | `TableRow.tsx` |
| Table Cell | `TableCell.tsx` |
| Pagination | `Pagination.tsx` |
| Primary Button | `Button.tsx` (variant="primary") |
| Secondary Button | `Button.tsx` (variant="secondary") |
| Danger Button | `Button.tsx` (variant="danger") |
| Outlined Button | `Button.tsx` (variant="outlined") |
| Text Button | `Button.tsx` (variant="text") |
| Input Field | `Input.tsx` |
| Search Input | `SearchInput.tsx` |
| Dropdown | `Dropdown.tsx` |
| Checkbox | `Checkbox.tsx` |
| Radio Button | `RadioButton.tsx` |
| Toggle Switch | `ToggleSwitch.tsx` |
| Text Area | `TextArea.tsx` |
| Toast Notification | `Toast.tsx` |
| Alert Banner | `AlertBanner.tsx` |
| Loading Spinner | `Spinner.tsx` |
| Skeleton Loader | `Skeleton.tsx` |
| Empty State | `EmptyState.tsx` |
| Error State | `ErrorState.tsx` |
| Confirmation Dialog | `ConfirmationDialog.tsx` |
| Success Message | `SuccessMessage.tsx` |
| Modal | `Modal.tsx` |
| Confirmation Modal | `ConfirmationModal.tsx` |
| Delete Dialog | `DeleteDialog.tsx` |
| Filter Panel | `FilterPanel.tsx` |
| Drawer | `Drawer.tsx` |
| Tooltip | `Tooltip.tsx` |
| Popover | `Popover.tsx` |
| Route Recommendation Card | `RouteRecommendationCard.tsx` |
| Confidence Score Badge | `ConfidenceScoreBadge.tsx` |
| Traffic Prediction Panel | `TrafficPredictionPanel.tsx` |
| AI Insight Card | `AIInsightCard.tsx` |
| Risk Indicator | `RiskIndicator.tsx` |
| Weather Impact Card | `WeatherImpactCard.tsx` |
| Optimization Summary | `OptimizationSummary.tsx` |

**Guidelines:**
- Use consistent naming conventions
- Group related components in directories
- Create index files for component exports
- Document component props and usage
- Include TypeScript interfaces for props

---

# Best Practices

Follow these best practices to maintain component consistency and quality across the UrbanFlow AI platform:

## Component Design

- Design components for reusability across modules
- Keep components focused on single responsibility
- Use composition to build complex UIs
- Document component purpose and usage
- Provide clear prop interfaces
- Include default props where appropriate

## Consistency

- Use components from the library exclusively
- Never recreate existing components
- Follow established naming conventions
- Maintain consistent behavior across similar components
- Document exceptions with clear rationale

## Accessibility

- Build accessibility into components from the start
- Test with keyboard navigation
- Verify screen reader compatibility
- Maintain sufficient color contrast
- Provide appropriate ARIA attributes
- Support browser accessibility features

## Performance

- Optimize component rendering
- Use React.memo for expensive components
- Implement proper key props in lists
- Lazy load heavy components
- Minimize re-renders
- Profile component performance

## Documentation

- Document component purpose and usage
- Provide code examples
- Document all props and variants
- Include accessibility notes
- Show responsive behavior
- Provide do's and don'ts

## Testing

- Test all component states
- Verify responsive behavior
- Test accessibility with screen readers
- Test keyboard navigation
- Verify color contrast
- Test with real content

## Maintenance

- Version control component changes
- Communicate breaking changes
- Update documentation with changes
- Deprecate components properly
- Maintain backward compatibility
- Review components regularly

## Responsive Design

- Design mobile-first when possible
- Test on actual devices
- Support all breakpoints
- Consider touch interactions
- Optimize for different screen sizes
- Maintain functionality across devices

---

# Summary

The UrbanFlow AI Component Library provides a comprehensive, accessible, and scalable foundation for building the fleet management platform. By establishing reusable components with clear guidelines, the library ensures consistency across all modules while accelerating development and reducing maintenance burden.

The component library supports the core objectives of the UrbanFlow AI design system:

- **Consistency:** Standardized components create uniform user experience
- **Accessibility:** WCAG-compliant components ensure inclusive design
- **Scalability:** Reusable components support platform growth
- **Efficiency:** Pre-built components accelerate development
- **Quality:** Tested, documented components improve reliability
- **Maintainability:** Centralized components simplify updates

This component library works in conjunction with the Color System, Typography System, and broader Design System to create a cohesive, professional, and accessible user experience. As UrbanFlow AI evolves, the component library will expand to support new features and modules while maintaining the consistency and quality that operators depend on for effective fleet management.

The component library is not merely a collection of UI elements—it is the implementation layer that translates design intent into functional, accessible, and maintainable user interfaces. By providing clear implementation guidance for React + Tailwind CSS, the component library bridges the gap between design and development, ensuring the UrbanFlow AI platform delivers on its promise of intelligent, efficient, and powerful fleet operations management.

---

*Document Version: 1.0*  
*Phase: 2D – Design System*  
*Status: Component Library Specification*