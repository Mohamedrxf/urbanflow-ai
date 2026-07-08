# Spacing & Layout System

The UrbanFlow AI Spacing & Layout System establishes a consistent, predictable framework for organizing content across the fleet management platform. Consistent spacing and layout are critical for enterprise dashboard applications because they enable rapid information scanning, reduce cognitive load, and create a professional, polished appearance. This system defines the spatial relationships between all interface elements, ensuring that operators can navigate complex data displays efficiently and comfortably during extended monitoring sessions. Built on the design patterns established in the Visily UI, the spacing and layout system provides implementation-ready guidelines for React + Tailwind CSS development.

---

# Design Goals

The UrbanFlow AI Spacing & Layout System is designed to achieve the following objectives:

## Consistency
Ensure uniform spacing and alignment across all modules, pages, and components. Consistent spacing creates visual rhythm, reduces cognitive load, and builds user confidence in the interface.

## Readability
Optimize whitespace and content density for comfortable information consumption. Adequate spacing between elements improves scanability and reduces eye strain during extended operational sessions.

## Visual Hierarchy
Use spacing strategically to establish information priority. Generous spacing around important elements draws attention, while compact spacing groups related content.

## Balanced Whitespace
Distribute whitespace effectively to create visual breathing room without wasting valuable screen real estate. Balance is particularly important in data-dense dashboard environments.

## Responsive Layouts
Adapt spacing and layout appropriately across desktop, tablet, and future mobile contexts. Layouts should maintain functionality and readability while optimizing for each device's capabilities.

## Predictable User Experience
Create spatial patterns that users can anticipate. Predictable spacing reduces the learning curve and enables operators to focus on data rather than interface navigation.

---

# Spacing Scale

The UrbanFlow AI spacing system uses an 8-point grid scale to ensure consistent spatial relationships throughout the interface. All spacing values are multiples of 4px, providing flexibility while maintaining alignment.

## 4px (xs)

**Purpose:** Minimal spacing for tight layouts and fine adjustments.

**Recommended Usage:**
- Icon spacing within buttons
- Padding inside small components
- Gap between closely related elements
- Fine-tuning alignment
- Inline element spacing

**Examples:**
- 4px gap between icon and text in buttons
- 4px padding in badge components
- 4px margin between inline form fields

## 8px (sm)

**Purpose:** Standard spacing for compact components and tight groupings.

**Recommended Usage:**
- Button padding (vertical)
- Input field padding
- Gap between related form fields
- Icon padding
- Compact card padding

**Examples:**
- 8px vertical padding in primary buttons
- 8px gap between form labels and inputs
- 8px padding in table cells
- 8px spacing between icon buttons

## 12px (md-sm)

**Purpose:** Moderate spacing for standard components and content grouping.

**Recommended Usage:**
- Card internal padding
- List item spacing
- Form field spacing
- Button horizontal padding
- Navigation item spacing

**Examples:**
- 12px padding in card bodies
- 12px gap between form fields
- 12px horizontal padding in buttons
- 12px spacing between navigation items

## 16px (md)

**Purpose:** Standard spacing for most components and content areas.

**Recommended Usage:**
- Section spacing
- Card padding
- Form section spacing
- List spacing
- Standard component margins

**Examples:**
- 16px padding in standard cards
- 16px margin between sections
- 16px gap between related components
- 16px padding in content areas
- 16px spacing between list items

## 24px (lg)

**Purpose:** Generous spacing for content separation and emphasis.

**Recommended Usage:**
- Section margins
- Card spacing in grids
- Page section separation
- Modal internal padding
- Form group spacing

**Examples:**
- 24px margin between major sections
- 24px gap between cards in grid
- 24px padding in modals
- 24px spacing between form groups
- 24px margin above page titles

## 32px (xl)

**Purpose:** Large spacing for major layout divisions and page structure.

**Recommended Usage:**
- Page-level spacing
- Major section separation
- Dashboard widget spacing
- Container padding
- Large component margins

**Examples:**
- 32px padding in page containers
- 32px margin between dashboard sections
- 32px gap between major content areas
- 32px padding in sidebar
- 32px spacing between page sections

## 48px (2xl)

**Purpose:** Extra-large spacing for prominent layout elements and hero sections.

**Recommended Usage:**
- Page header spacing
- Hero section padding
- Major layout divisions
- Large container margins
- Prominent component spacing

**Examples:**
- 48px padding in page headers
- 48px margin between page title and content
- 48px gap between major dashboard areas
- 48px padding in full-width sections
- 48px spacing between page-level elements

## 64px (3xl)

**Purpose:** Maximum spacing for major page divisions and special layouts.

**Recommended Usage:**
- Page-level margins
- Major section breaks
- Full-width container padding
- Special layout spacing
- Maximum whitespace for emphasis

**Examples:**
- 64px horizontal page margins (desktop)
- 64px padding in full-width hero sections
- 64px gap between completely separate page sections
- 64px margin for maximum content width constraints
- 64px spacing in landing page layouts

**Guidelines:**
- Use the spacing scale consistently across all components
- Avoid arbitrary spacing values outside the scale
- Combine spacing values (e.g., 16px + 8px = 24px) when needed
- Maintain consistent spacing within similar components
- Use larger spacing for higher-priority content separation

---

# Grid System

The UrbanFlow AI grid system provides a structured framework for organizing content across different screen sizes.

## Desktop: 12-Column Grid

**Purpose:** Maximum flexibility for complex dashboard layouts.

**Column Specifications:**
- **Total Columns:** 12
- **Column Width:** Flexible (percentage-based)
- **Gutter Width:** 24px
- **Margin:** 64px on each side
- **Content Width:** Maximum 1440px (12 columns + gutters + margins)

**Usage:**
- Multi-column dashboard layouts (3-4 columns)
- Complex data displays
- Side-by-side cards and widgets
- Form layouts with multiple fields
- Analytics dashboards

**Example Layouts:**
- 3 equal columns: 4 columns each
- 2 columns with sidebar: 8 columns content, 4 columns sidebar
- 4 columns: 3 columns each
- Mixed layouts: 6 + 6, 8 + 4, etc.

## Tablet: 8-Column Grid

**Purpose:** Simplified layout for medium screens while maintaining functionality.

**Column Specifications:**
- **Total Columns:** 8
- **Column Width:** Flexible (percentage-based)
- **Gutter Width:** 16px
- **Margin:** 32px on each side
- **Content Width:** Maximum 1024px (8 columns + gutters + margins)

**Usage:**
- Dual column layouts
- Single column with reduced width
- Simplified dashboard views
- Condensed data displays
- Touch-optimized interfaces

**Example Layouts:**
- 2 equal columns: 4 columns each
- Single column: 8 columns full width
- 3 columns: 3 + 3 + 2 (approximate)
- Sidebar + content: 3 + 5

## Future Mobile: 4-Column Grid

**Purpose:** Simplified single-column layout for small screens.

**Column Specifications:**
- **Total Columns:** 4
- **Column Width:** Flexible (percentage-based)
- **Gutter Width:** 16px
- **Margin:** 16px on each side
- **Content Width:** Maximum 768px (4 columns + gutters + margins)

**Usage:**
- Single column stacked layouts
- Card-based designs
- Simplified data displays
- Touch-first interactions
- Read-only dashboards (initial)

**Example Layouts:**
- Single column: 4 columns full width
- 2 columns: 2 + 2
- Card layouts: Full-width cards

**Grid Guidelines:**
- Use grid systems for consistent alignment
- Maintain gutters between columns
- Respect maximum content widths
- Allow content to breathe within grid cells
- Use grid for overall page structure, not micro-layouts
- Nest grids within components when needed
- Maintain consistent gutters within component groups

---

# Layout Structure

The UrbanFlow AI application follows a consistent layout structure across all pages.

## Overall Application Layout

**Desktop Structure:**
```
┌─────────────────────────────────────────────────────┐
│ Header (full width, fixed height)                    │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ Sidebar  │  Main Content Area                       │
│ (fixed)  │  (scrollable)                            │
│          │                                          │
│          │                                          │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

**Layout Specifications:**
- **Header Height:** 64px
- **Sidebar Width:** 240-280px (expandable)
- **Sidebar Collapsed:** 64-80px (icon-only)
- **Content Area:** Remaining width
- **Total Height:** 100vh (full viewport)

## Header

**Purpose:** Global navigation and user controls.

**Position:** Fixed at top of viewport.

**Height:** 64px

**Contents:**
- Logo and brand (left)
- Global search (center-left)
- Notification menu (right)
- User profile menu (right)
- Quick actions (right)

**Spacing:**
- Horizontal padding: 24px
- Vertical padding: 16px
- Gap between elements: 16px

## Sidebar

**Purpose:** Primary navigation menu.

**Position:** Fixed on left side.

**Width:** 240-280px (expanded), 64-80px (collapsed)

**Contents:**
- Navigation items
- Module links
- User info (bottom)
- Collapse toggle

**Spacing:**
- Padding: 16px
- Gap between items: 8px
- Section spacing: 24px

## Main Content Area

**Purpose:** Primary region for displaying content and data.

**Position:** Right of sidebar, below header.

**Width:** Remaining viewport width.

**Scrollable:** Yes, vertically.

**Padding:**
- Desktop: 32px
- Tablet: 24px
- Mobile: 16px (future)

**Max Width:** 1440px (content constrained)

## Content Sections

**Purpose:** Groups related content within main area.

**Structure:**
- Section title
- Section content
- Optional section actions

**Spacing:**
- Margin between sections: 32px
- Padding within section: 24px
- Gap between elements: 16px

## Cards

**Purpose:** Individual content containers.

**Layout:** Grid within content sections.

**Desktop:** 3-4 columns per row.

**Tablet:** 2 columns per row.

**Mobile:** 1 column per row (future).

**Spacing:**
- Card padding: 24px
- Gap between cards: 24px
- Card header spacing: 16px

## Tables

**Purpose:** Structured data display.

**Layout:** Full-width within content area.

**Spacing:**
- Table padding: 16px
- Cell padding: 12px
- Row height: 48-56px
- Header height: 48px

## Analytics Area

**Purpose:** Charts and data visualizations.

**Layout:** Grid or stacked within content sections.

**Spacing:**
- Chart padding: 24px
- Gap between charts: 24px
- Chart title spacing: 16px

## Alerts Area

**Purpose:** System alerts and notifications.

**Position:** Top of content area or inline.

**Spacing:**
- Alert padding: 16px
- Gap between alerts: 12px
- Margin below alerts: 16px

## Map Area

**Purpose:** Geographic data visualization.

**Layout:** Full-width or side-by-side with data.

**Spacing:**
- Map padding: 0 (full-width)
- Map height: 400-600px
- Gap from other content: 24px

**Layout Guidelines:**
- Maintain consistent structure across all pages
- Use fixed positioning for header and sidebar
- Ensure content area is scrollable
- Respect spacing scale for all elements
- Create visual hierarchy through spacing
- Group related content with consistent spacing
- Use whitespace to guide attention

---

# Page Layout Guidelines

Standard page structure for UrbanFlow AI modules.

## Standard Page Structure

```
┌─────────────────────────────────────────────────────┐
│ Header                                               │
├──────────┬──────────────────────────────────────────┤
│          │ Page Title                    Actions     │
│ Sidebar  │──────────────────────────────────────────│
│          │ Action Bar (filters, search, etc.)       │
│          │──────────────────────────────────────────│
│          │                                          │
│          │ Primary Content                          │
│          │ (main data, tables, charts)              │
│          │                                          │
│          │                                          │
│          │──────────────────────────────────────────│
│          │ Secondary Content (if needed)            │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

## Page Title

**Position:** Top of content area.

**Spacing:**
- Margin bottom: 24px
- Margin top: 0 (or 32px if no breadcrumbs)

**Typography:** Heading 1 (36px, Bold)

**Content:**
- Page title
- Optional breadcrumbs above
- Optional page actions (right-aligned)

## Action Bar

**Position:** Below page title.

**Spacing:**
- Margin bottom: 24px
- Padding: 16px
- Gap between elements: 12px

**Contents:**
- Search/filter controls
- Action buttons
- View toggles
- Bulk actions

**Layout:** Horizontal, wrapped on smaller screens.

## Filters

**Position:** Below action bar or inline within action bar.

**Spacing:**
- Margin bottom: 24px
- Padding: 16px
- Gap between filters: 12px

**Contents:**
- Filter dropdowns
- Date range pickers
- Search inputs
- Clear filters button

**Layout:** Horizontal, wrapped.

## Primary Content

**Position:** Main content area.

**Spacing:**
- Margin bottom: 32px
- Padding: 24px (if in card)

**Contents:**
- Data tables
- Primary charts
- Key metrics
- Main information

**Layout:** Full-width or grid.

## Secondary Content

**Position:** Below primary content.

**Spacing:**
- Margin top: 32px
- Margin bottom: 32px
- Padding: 24px (if in card)

**Contents:**
- Supplementary information
- Additional charts
- Related data
- Supporting details

**Layout:** Full-width or grid.

## Footer (If Applicable)

**Position:** Bottom of page.

**Spacing:**
- Margin top: 32px
- Padding: 24px
- Border top: 1px

**Contents:**
- Page information
- Copyright
- Help links
- Version information

**Layout:** Full-width, centered or split.

**Page Layout Guidelines:**
- Follow standard structure consistently
- Use spacing to create clear visual hierarchy
- Group related elements with consistent spacing
- Provide adequate whitespace around important content
- Maintain alignment across page sections
- Use cards to group related content
- Ensure adequate spacing for readability
- Consider scroll length when designing pages

---

# Alignment Rules

Consistent alignment creates visual order and improves readability.

## Left Alignment

**Purpose:** Default alignment for most content.

**Usage:**
- Body text and paragraphs
- Form labels and inputs
- Navigation items
- Card content
- General content areas
- Table text columns

**Guidelines:**
- Use as default for all text
- Provides fastest reading speed
- Align to consistent left margin
- Maintain consistent left edge across components

## Center Alignment

**Purpose:** Emphasis and visual balance.

**Usage:**
- Page titles (optional)
- Card titles (when design requires)
- Metric values in KPI cards
- Empty state messages
- Modal titles
- Hero sections

**Guidelines:**
- Use sparingly and intentionally
- Works well for short, emphasized text
- Never center-align body text or table content
- Consider visual balance in card layouts

## Right Alignment

**Purpose:** Numerical data and consistency in data tables.

**Usage:**
- Numeric values in tables
- Currency amounts
- Percentages and statistics
- Time stamps in data tables
- Columnar numerical data
- Card metrics

**Guidelines:**
- Right-align all numeric data in tables
- Maintain consistent alignment within columns
- Align decimal points for financial data
- Use tabular figures for numbers

## Vertical Alignment

**Purpose:** Controls vertical positioning within containers.

**Usage:**
- Top alignment: Form fields, table cells, card content
- Middle alignment: Buttons, icons, single-line content
- Bottom alignment: Card footers, action buttons

**Guidelines:**
- Top-align form fields and table cells for scanability
- Middle-align buttons and icons for visual balance
- Bottom-align card actions for consistency
- Maintain consistent vertical alignment within components

## Card Alignment

**Purpose:** Organizes content within card containers.

**Guidelines:**
- Left-align card body text
- Center-align card titles when appropriate
- Right-align card metrics and values
- Top-align card content
- Bottom-align card actions
- Maintain consistent alignment within card types

## Table Alignment

**Purpose:** Optimizes table content for data scanning.

**Guidelines:**
- Left-align text columns
- Right-align numeric columns
- Center-align status indicators and badges
- Top-align cell content
- Maintain consistent alignment within each column
- Use vertical alignment to improve scanability

## Chart Alignment

**Purpose:** Ensures chart labels and data are readable.

**Guidelines:**
- Left-align Y-axis labels
- Bottom-align X-axis labels
- Right-align data labels on horizontal bars
- Center-align pie chart labels
- Ensure labels don't overlap with data
- Maintain consistent alignment within chart types

## Form Alignment

**Purpose:** Creates clear, scannable form layouts.

**Guidelines:**
- Top-align labels above inputs
- Left-align labels and inputs
- Right-align action buttons
- Center-align form titles
- Maintain consistent label width (if side-by-side)
- Align helper text below inputs
- Group related fields with consistent spacing

**Alignment Guidelines:**
- Establish alignment system and use consistently
- Create visual order through alignment
- Use alignment to group related content
- Maintain consistent alignment within components
- Consider how alignment affects scanability
- Test alignment with actual content
- Break alignment intentionally for emphasis

---

# Responsive Layout

Layouts adapt across different device contexts while maintaining functionality and readability.

## Desktop (Primary)

**Screen Size:** 1024px and above

**Layout Characteristics:**
- Full sidebar visible (240-280px)
- Multi-column content layouts (2-3 columns)
- Maximum content width: 1440px
- Generous whitespace
- Hover states enabled
- Complex data displays
- Side-by-side cards and widgets
- Full table displays

**Spacing:**
- Page padding: 32px
- Section spacing: 32px
- Card gap: 24px
- Component spacing: 16-24px

**Breakpoint:** lg (1024px) and above

## Laptop

**Screen Size:** 768px to 1023px

**Layout Characteristics:**
- Collapsible sidebar (icon-only mode)
- Dual column layouts
- Reduced content width: 1024px
- Moderate whitespace
- Touch-optimized spacing
- Simplified complex components
- Horizontal scroll for wide tables

**Spacing:**
- Page padding: 24px
- Section spacing: 24px
- Card gap: 16px
- Component spacing: 12-16px

**Adaptations:**
- Sidebar collapses to icons
- Tables may require horizontal scroll
- Modals may use bottom sheet
- Reduced heading sizes
- Increased touch targets

**Breakpoint:** md (768px) to lg (1023px)

## Tablet

**Screen Size:** 600px to 767px

**Layout Characteristics:**
- Icon-only sidebar (overlay)
- Single or dual column layouts
- Reduced content width: 768px
- Compact whitespace
- Touch-first interactions
- Card-based layouts
- Simplified data displays

**Spacing:**
- Page padding: 16px
- Section spacing: 16px
- Card gap: 16px
- Component spacing: 12-16px

**Adaptations:**
- Sidebar as overlay
- Single column primary layout
- Full-width cards
- Bottom sheet modals
- Simplified navigation
- Larger touch targets

**Breakpoint:** sm (640px) to md (767px)

## Future Mobile

**Screen Size:** Below 640px

**Layout Characteristics:**
- No persistent sidebar (hamburger menu)
- Single column layouts
- Full-width content
- Minimal whitespace
- Touch-only interactions
- Card-based designs
- Simplified data displays
- Bottom navigation (optional)

**Spacing:**
- Page padding: 16px
- Section spacing: 16px
- Card gap: 16px
- Component spacing: 12-16px

**Planned Adaptations:**
- Full-screen modals and drawers
- Bottom sheet patterns
- Horizontal scroll for tables
- Simplified charts
- Swipe gestures
- Read-only dashboards initially
- Progressive enhancement

**Breakpoint:** Below sm (640px)

**Responsive Layout Guidelines:**
- Design mobile-first when possible
- Test layouts on actual devices
- Ensure content remains readable at all sizes
- Maintain functionality across breakpoints
- Consider touch interactions for tablet and mobile
- Optimize whitespace for each context
- Use responsive grid systems
- Test horizontal scroll scenarios
- Ensure modals and overlays work on all sizes

---

# Component Spacing

Specific spacing recommendations for common components.

## Buttons

**Padding:**
- Small button: 8px horizontal, 6px vertical
- Medium button: 16px horizontal, 10px vertical
- Large button: 24px horizontal, 14px vertical

**Gap:**
- Between icon and text: 8px
- Between buttons: 12px
- Between button groups: 16px

**Guidelines:**
- Maintain consistent padding within button groups
- Use adequate spacing to prevent accidental clicks
- Provide visual separation between related buttons

## Inputs

**Padding:**
- Input field: 12px horizontal, 10px vertical
- Textarea: 12px horizontal, 12px vertical
- Search input: 12px horizontal, 10px vertical

**Spacing:**
- Between label and input: 8px
- Between helper text and input: 4px
- Between form fields: 16px
- Between form groups: 24px

**Guidelines:**
- Provide adequate space for touch targets
- Maintain consistent spacing within forms
- Group related fields with reduced spacing
- Separate form sections with increased spacing

## Cards

**Padding:**
- Card body: 24px
- Card header: 20px
- Card footer: 16px

**Spacing:**
- Between cards: 24px
- Between card elements: 16px
- Card title to content: 16px
- Card content to footer: 16px

**Guidelines:**
- Use consistent padding across all cards
- Maintain adequate spacing between cards
- Group related cards with reduced spacing
- Separate unrelated cards with increased spacing

## Tables

**Padding:**
- Table cell: 12px horizontal, 12px vertical
- Table header: 12px horizontal, 12px vertical
- Table container: 16px

**Spacing:**
- Between rows: 0 (use borders or striping)
- Between table and surrounding content: 24px
- Between table and filters: 16px
- Table header to content: 0

**Guidelines:**
- Maintain consistent cell padding
- Use adequate row height (48-56px)
- Provide sufficient spacing around tables
- Use borders or striping for row separation

## Sidebar

**Padding:**
- Sidebar container: 16px
- Navigation item: 12px horizontal, 10px vertical
- Section header: 16px horizontal, 8px vertical

**Spacing:**
- Between navigation items: 4px
- Between sections: 24px
- Between sidebar and content: 0 (adjacent)
- Sidebar to viewport edge: 0

**Guidelines:**
- Maintain consistent navigation item spacing
- Group related items with reduced spacing
- Separate sections with increased spacing
- Ensure adequate spacing for touch targets

## Navigation

**Padding:**
- Navigation item: 12px horizontal, 10px vertical
- Top navigation: 8px horizontal, 8px vertical

**Spacing:**
- Between navigation items: 4px
- Between navigation groups: 16px
- Between navigation and content: 24px

**Guidelines:**
- Maintain consistent spacing across navigation types
- Use reduced spacing for compact navigation
- Group related items with consistent spacing
- Ensure adequate spacing for touch targets

## Search Bar

**Padding:**
- Search input: 12px horizontal, 10px vertical
- Search icon: 8px from edge

**Spacing:**
- Between search bar and adjacent elements: 16px
- Between search icon and text: 8px
- Between search bar and suggestions: 4px

**Guidelines:**
- Maintain consistent padding within search bar
- Provide adequate spacing around search bar
- Ensure search bar is easily discoverable
- Use appropriate spacing for search suggestions

## Modals

**Padding:**
- Modal header: 24px
- Modal body: 24px
- Modal footer: 16px

**Spacing:**
- Between header and body: 0
- Between body and footer: 16px
- Between modal and backdrop: 0
- Modal to viewport edge: 24px minimum

**Guidelines:**
- Maintain consistent internal padding
- Provide adequate spacing between modal elements
- Ensure modal is centered with adequate margins
- Use spacing to separate modal sections

## Notifications

**Padding:**
- Toast notification: 16px
- Alert banner: 16px

**Spacing:**
- Between toasts: 12px
- Between toast and viewport edge: 24px
- Between alert and content: 16px

**Guidelines:**
- Maintain consistent notification padding
- Provide adequate spacing between stacked notifications
- Position notifications with consistent margins
- Use spacing to separate notifications from content

## Charts

**Padding:**
- Chart container: 24px
- Chart title: 16px from top
- Chart legend: 16px from chart

**Spacing:**
- Between chart and title: 16px
- Between chart and legend: 16px
- Between multiple charts: 24px
- Between chart and surrounding content: 24px

**Guidelines:**
- Maintain consistent chart container padding
- Provide adequate spacing for chart labels
- Use spacing to separate multiple charts
- Ensure charts have adequate whitespace

## Maps

**Padding:**
- Map container: 0 (full-width)
- Map controls: 16px from edges

**Spacing:**
- Between map and content: 24px
- Between map controls: 8px
- Map height: 400-600px

**Guidelines:**
- Use full-width for maximum map visibility
- Provide adequate spacing around map
- Position map controls with consistent margins
- Ensure map has sufficient height for usability

**Component Spacing Guidelines:**
- Use spacing scale consistently
- Maintain spacing patterns within component types
- Provide adequate spacing for touch targets
- Use spacing to create visual hierarchy
- Group related elements with reduced spacing
- Separate unrelated elements with increased spacing
- Test spacing on actual devices

---

# Container Rules

Rules for container components and content regions.

## Maximum Content Width

**Purpose:** Constrains content width for optimal readability.

**Specifications:**
- **Desktop:** 1440px maximum
- **Tablet:** 1024px maximum
- **Mobile:** 768px maximum (future)

**Guidelines:**
- Center content horizontally
- Apply to main content area
- Allow full-width for special layouts (maps, tables)
- Maintain consistent max-width across pages

## Internal Padding

**Purpose:** Provides whitespace within containers.

**Specifications:**
- **Page Container:**
  - Desktop: 32px
  - Tablet: 24px
  - Mobile: 16px (future)

- **Card Container:**
  - Standard: 24px
  - Compact: 16px
  - Dense: 12px

- **Section Container:**
  - Standard: 24px
  - Compact: 16px

- **Modal/Drawer:**
  - Standard: 24px
  - Compact: 16px

**Guidelines:**
- Use consistent padding within container types
- Reduce padding for compact layouts
- Increase padding for emphasis
- Maintain adequate padding for readability

## External Margins

**Purpose:** Separates containers from surrounding content.

**Specifications:**
- **Between sections:** 32px
- **Between cards:** 24px
- **Between form groups:** 24px
- **Between page elements:** 24-32px
- **Between major sections:** 48px

**Guidelines:**
- Use consistent margins between similar elements
- Increase margins for major section separation
- Reduce margins for closely related content
- Maintain visual hierarchy through spacing

## Scrollable Regions

**Purpose:** Contains scrollable content within fixed layouts.

**Specifications:**
- **Main Content Area:** Vertically scrollable
- **Sidebar:** Vertically scrollable (if needed)
- **Tables:** Horizontally scrollable (when needed)
- **Modals:** Vertically scrollable (if content exceeds viewport)
- **Drawers:** Vertically scrollable

**Guidelines:**
- Maintain fixed header and sidebar
- Enable scrolling only when content exceeds viewport
- Provide visual indication of scrollability
- Ensure scrollbars are visible and accessible
- Test scrolling behavior on all devices
- Consider performance with large datasets

## Sticky Areas

**Purpose:** Keeps important elements visible during scrolling.

**Specifications:**
- **Header:** Fixed at top
- **Sidebar:** Fixed at left
- **Table Header:** Sticky within scrollable table
- **Filter Bar:** Sticky below header (optional)
- **Action Bar:** Sticky below page title (optional)

**Guidelines:**
- Use sticky positioning sparingly
- Ensure sticky elements don't obscure content
- Provide adequate spacing below sticky elements
- Test sticky behavior on all screen sizes
- Consider z-index layering
- Ensure sticky elements remain accessible

**Container Rules:**
- Apply maximum width constraints consistently
- Use internal padding to create whitespace
- Apply external margins to separate content
- Enable scrolling only when necessary
- Use sticky positioning for important elements
- Test container behavior with actual content
- Ensure containers work across breakpoints

---

# Responsive Breakpoints

Recommended breakpoints for implementing responsive layouts with Tailwind CSS.

## Breakpoint Definitions

### sm (Small)

**Screen Size:** 640px and above

**Intended Usage:**
- Tablet portrait mode
- Large phones in landscape
- Condensed desktop layouts

**Layout Changes:**
- Increase padding and spacing
- Enable dual-column layouts
- Show additional content
- Expand navigation

**Example:** Tablet devices, small laptops

### md (Medium)

**Screen Size:** 768px and above

**Intended Usage:**
- Tablet landscape mode
- Small laptops
- Standard tablet layouts

**Layout Changes:**
- Further increase spacing
- Enable multi-column layouts
- Show full navigation
- Display additional data columns

**Example:** iPad, standard tablets, small laptops

### lg (Large)

**Screen Size:** 1024px and above

**Intended Usage:**
- Desktop monitors
- Laptops
- Primary platform layout

**Layout Changes:**
- Full spacing scale
- Multi-column layouts (2-3 columns)
- Full sidebar visible
- Complete data displays
- Hover states enabled

**Example:** Desktop computers, laptops (primary platform)

### xl (Extra Large)

**Screen Size:** 1280px and above

**Intended Usage:**
- Large desktop monitors
- Wide screens
- Maximum content width

**Layout Changes:**
- Maximum content width constraint (1440px)
- Centered content
- Generous whitespace
- Multi-column layouts maintained

**Example:** Large desktop monitors, wide screens

### 2xl (2X Large)

**Screen Size:** 1536px and above

**Intended Usage:**
- Ultra-wide monitors
- Maximum screen real estate
- Special layouts

**Layout Changes:**
- Maximum content width maintained (1440px)
- Centered content with increased margins
- Optimal viewing experience

**Example:** Ultra-wide monitors, large displays

## Mobile Breakpoints (Future)

### Below sm (Mobile)

**Screen Size:** Below 640px

**Intended Usage:**
- Phones in portrait mode
- Future mobile support

**Layout Changes:**
- Single column layouts
- Full-width components
- Simplified navigation
- Touch-optimized spacing
- Card-based designs

**Example:** Mobile phones (future support)

## Breakpoint Usage Guidelines

**General Principles:**
- Design mobile-first when possible
- Use breakpoints to enhance, not rebuild layouts
- Test at all breakpoints
- Consider content reflow at each breakpoint
- Maintain functionality across all sizes
- Use responsive utilities for spacing and layout
- Test on actual devices when possible

**Tailwind Implementation:**
- Use `sm:` for 640px and above
- Use `md:` for 768px and above
- Use `lg:` for 1024px and above
- Use `xl:` for 1280px and above
- Use `2xl:` for 1536px and above
- Use default (no prefix) for mobile-first base styles
- Combine breakpoints for complex responsive behavior

**Breakpoint Guidelines:**
- Use breakpoints consistently across project
- Document breakpoint usage in components
- Test layouts at all breakpoints
- Consider content priority at each size
- Optimize for primary platform (desktop)
- Plan for future mobile support
- Avoid excessive breakpoint-specific styles

---

# Accessibility

Spacing and layout considerations for accessible design.

## Touch Targets

**WCAG 2.1 AA Requirements:**
- Minimum touch target size: 44x44px
- Adequate spacing between touch targets: 8px minimum
- No accidental activation

**Guidelines:**
- Design all interactive elements at 44x44px minimum
- Provide adequate spacing between buttons and controls
- Ensure touch targets are easily tappable
- Test on actual touch devices
- Consider thumb reach zones
- Increase spacing for important actions

## Keyboard Navigation

**Requirements:**
- Logical tab order matches visual layout
- Adequate spacing for focus indicators
- No overlapping interactive elements
- Clear visual distinction between elements

**Guidelines:**
- Maintain consistent spacing for keyboard navigation
- Ensure focus indicators are visible within layout
- Avoid overlapping elements
- Test keyboard navigation with actual spacing
- Provide skip links where appropriate
- Ensure logical focus order

## Readable Spacing

**WCAG 2.1 AA Requirements:**
- Adequate line spacing: 1.5 minimum
- Paragraph spacing: 2x font size minimum
- Component spacing for scanability

**Guidelines:**
- Provide adequate spacing between text elements
- Use line height of 1.5-1.6 for body text
- Maintain paragraph spacing for readability
- Avoid cramped layouts
- Test readability with actual content
- Consider users with visual impairments

## Zoom Support

**WCAG 2.1 AA Requirements:**
- Content scales to 200% without loss of functionality
- Content reflows at 400% zoom
- No horizontal scrolling at 200% zoom (where possible)

**Guidelines:**
- Use relative units (rem, em) for spacing where possible
- Test layouts at 200% and 400% zoom
- Ensure content reflows appropriately
- Avoid fixed widths that break at high zoom
- Maintain functionality at all zoom levels
- Test with browser zoom and OS-level zoom

## Avoiding Clutter

**Guidelines:**
- Provide adequate whitespace around content
- Group related elements with reduced spacing
- Separate unrelated elements with increased spacing
- Avoid overcrowding information
- Use cards to organize content
- Maintain visual breathing room
- Consider information density
- Test with real data volumes
- Prioritize important information with spacing
- Use progressive disclosure to reduce clutter

**Accessibility Guidelines:**
- Design for all users regardless of ability
- Test with assistive technologies
- Meet WCAG 2.1 AA standards
- Consider diverse user needs
- Provide adequate spacing for all interactions
- Ensure layouts work at all zoom levels
- Avoid clutter that impedes usability
- Test with actual users when possible

---

# Tailwind Mapping

Recommended Tailwind spacing token names for implementing the UrbanFlow AI Spacing & Layout System.

## Spacing Scale Tokens

- `0` - 0px (no spacing)
- `xs` - 4px (extra small)
- `sm` - 8px (small)
- `md-sm` - 12px (medium-small)
- `md` - 16px (medium)
- `lg` - 24px (large)
- `xl` - 32px (extra large)
- `2xl` - 48px (2x extra large)
- `3xl` - 64px (3x extra large)

## Usage Examples

**Padding:**
- `p-xs` - 4px padding
- `p-sm` - 8px padding
 `p-md` - 16px padding
- `p-lg` - 24px padding
- `p-xl` - 32px padding

**Margin:**
- `m-xs` - 4px margin
- `m-sm` - 8px margin
- `m-md` - 16px margin
- `m-lg` - 24px margin
- `m-xl` - 32px margin

**Gap:**
- `gap-xs` - 4px gap
- `gap-sm` - 8px gap
- `gap-md` - 16px gap
- `gap-lg` - 24px gap
- `gap-xl` - 32px gap

**Directional Spacing:**
- `px-md` - 16px horizontal padding
- `py-lg` - 24px vertical padding
- `mx-auto` - auto horizontal margins (centering)
- `mt-xl` - 32px top margin
- `mb-2xl` - 48px bottom margin

## Grid System Tokens

**Container:**
- `max-w-content` - 1440px (desktop)
- `max-w-tablet` - 1024px (tablet)
- `max-w-mobile` - 768px (mobile)

**Grid Columns:**
- `grid-cols-12` - 12-column grid (desktop)
- `grid-cols-8` - 8-column grid (tablet)
- `grid-cols-4` - 4-column grid (mobile)

**Gutters:**
- `gap-6` - 24px gutter (desktop)
- `gap-4` - 16px gutter (tablet/mobile)

**Margins:**
- `mx-16` - 64px horizontal margin (desktop)
- `mx-8` - 32px horizontal margin (tablet)
- `mx-4` - 16px horizontal margin (mobile)

## Layout Tokens

**Page Structure:**
- `header-height` - 64px
- `sidebar-width` - 240-280px
- `sidebar-collapsed-width` - 64-80px
- `content-padding` - 32px (desktop), 24px (tablet)

**Component Spacing:**
- `card-padding` - 24px
- `card-gap` - 24px
- `section-spacing` - 32px
- `form-spacing` - 16px

**Guidelines:**
- Use these token names consistently across components
- Map tokens to actual spacing values in Tailwind configuration
- Create custom utilities for common spacing patterns
- Document spacing usage in component documentation
- Maintain semantic naming that reflects purpose
- Use responsive variants for different breakpoints
- Consider creating component-specific spacing utilities

---

# Best Practices

Follow these best practices to maintain spacing and layout consistency across the UrbanFlow AI platform:

## Consistency

- Use the spacing scale exclusively
- Never introduce arbitrary spacing values
- Apply spacing patterns consistently
- Document spacing decisions
- Review layouts against spacing system
- Use design tokens for spacing values

## Grid Usage

- Use grid systems for page layout
- Maintain consistent gutters
- Respect maximum content widths
- Nest grids appropriately
- Use grid for structure, not micro-layouts
- Test grid behavior at all breakpoints

## Whitespace

- Use whitespace strategically
- Provide adequate breathing room
- Group related content with spacing
- Separate unrelated content
- Avoid clutter and overcrowding
- Test whitespace with real content

## Responsive Design

- Design for all breakpoints
- Test on actual devices
- Consider content reflow
- Maintain functionality across sizes
- Optimize for primary platform (desktop)
- Plan for future mobile support

## Alignment

- Establish alignment system
- Use alignment consistently
- Create visual order through alignment
- Maintain alignment within components
- Consider scanability
- Test alignment with actual content

## Component Spacing

- Use consistent spacing within component types
- Provide adequate spacing for touch targets
- Group related elements with reduced spacing
- Separate unrelated elements with increased spacing
- Test component spacing on all devices
- Document spacing in component specs

## Accessibility

- Meet WCAG 2.1 AA standards
- Provide adequate touch target spacing
- Ensure keyboard navigation works
- Test at 200% and 400% zoom
- Avoid clutter that impedes usability
- Consider diverse user needs

## Performance

- Avoid excessive DOM elements from spacing
- Use CSS for spacing, not images
- Optimize for rendering performance
- Test performance with complex layouts
- Consider lazy loading for large datasets
- Profile layout performance

## Maintenance

- Document spacing decisions
- Use design tokens for easy updates
- Communicate spacing changes
- Version control spacing specifications
- Review layouts regularly
- Update documentation with changes

**Best Practices Guidelines:**
- Follow established spacing system
- Use grid systems consistently
- Maintain alignment across layouts
- Design for all breakpoints
- Prioritize accessibility
- Test on actual devices
- Document spacing decisions
- Communicate changes to team

---

# Summary

The UrbanFlow AI Spacing & Layout System provides a comprehensive, consistent, and scalable foundation for organizing content across the fleet management platform. By establishing clear guidelines for spacing scales, grid systems, layout structure, alignment, and responsive behavior, the system ensures that interfaces are both functional and aesthetically pleasing.

Spacing and layout are critical components of the enterprise design system because they directly impact how operators consume information:

- **Consistency:** Uniform spacing creates visual rhythm and reduces cognitive load
- **Readability:** Adequate whitespace improves scanability and reduces eye strain
- **Visual Hierarchy:** Strategic spacing guides attention to important information
- **Professional Appearance:** Polished layouts project trust and competence
- **Accessibility:** WCAG-compliant spacing ensures usability for all operators
- **Scalability:** Defined spacing system supports consistent implementation as the platform grows

This spacing and layout system works in conjunction with the Color System, Typography System, and Component Library to create a cohesive, professional, and accessible user experience. As UrbanFlow AI evolves, the spacing and layout system will maintain the clarity and consistency that operators depend on for effective fleet management.

The spacing and layout system is not merely a set of rules—it is the structural foundation that translates design intent into functional, usable, and maintainable interfaces. By providing clear implementation guidance for React + Tailwind CSS, the spacing and layout system ensures that the UrbanFlow AI platform delivers on its promise of intelligent, efficient, and powerful fleet operations management.

---

*Document Version: 1.0*  
*Phase: 2D – Design System*  
*Status: Spacing & Layout System Specification*