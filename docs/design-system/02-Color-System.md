# Color System

The UrbanFlow AI Color System establishes a cohesive, accessible, and purposeful color language for the fleet management platform. Built on the design patterns established in the Visily UI, this system ensures visual consistency across all interface elements while supporting the operational needs of fleet management operators. The color system balances professional enterprise aesthetics with clear data communication, enabling rapid comprehension of fleet status and operational metrics.

---

# Design Goals

The UrbanFlow AI Color System is designed to achieve the following objectives:

## Consistency
Ensure uniform color application across all modules, components, and pages. Consistent color usage reduces cognitive load and builds user confidence in the interface.

## Accessibility
Meet WCAG 2.1 AA standards for color contrast and information conveyance. All color combinations must maintain sufficient contrast ratios for readability, and color must never be the sole means of conveying information.

## Readability
Optimize text and background color combinations for comfortable reading during extended operational sessions. Fleet operators often monitor dashboards for hours; color choices must reduce eye strain.

## Enterprise Appearance
Project professionalism and trustworthiness through a refined, modern color palette appropriate for enterprise SaaS platforms handling critical fleet operations.

## Visual Hierarchy
Use color strategically to guide attention and establish information priority. Critical alerts and important metrics should stand out naturally without overwhelming the interface.

## Status Communication
Leverage semantic colors to communicate fleet health, operational status, and system alerts intuitively. Color should enable operators to assess situations at a glance.

---

# Brand Colors

Brand colors establish the visual identity of UrbanFlow AI and are used sparingly to reinforce brand recognition and highlight key interactive elements.

## Primary

**Purpose:** The primary brand color represents UrbanFlow AI's core identity and is used for primary actions, key navigation elements, and brand moments.

**Typical Usage:**
- Primary buttons and call-to-action elements
- Active navigation states
- Logo and brand elements
- Key interactive components
- Progress indicators

**Guidelines:** Use the primary color for the most important actions on each screen. Avoid overuse; reserve for elements that require immediate user attention.

## Secondary

**Purpose:** The secondary brand color provides visual variety while maintaining brand cohesion. It supports the primary color in creating visual interest and distinguishing different types of interactions.

**Typical Usage:**
- Secondary buttons and alternative actions
- Supporting navigation elements
- Decorative accents
- Secondary interactive states
- Complementary visual elements

**Guidelines:** Use secondary color for actions that are important but not primary. Maintain clear visual hierarchy by ensuring primary actions stand out more prominently.

## Accent

**Purpose:** The accent color provides additional visual distinction for special features, highlights, or premium functionality.

**Typical Usage:**
- Feature highlights and new functionality indicators
- Premium or advanced features
- Special notifications or announcements
- Interactive chart elements
- Focus states and selections

**Guidelines:** Use accent color sparingly to avoid diluting its impact. Reserve for elements that need to stand out from both primary and secondary elements.

---

# Semantic Colors

Semantic colors communicate meaning and status throughout the interface. These colors are used consistently to represent specific states or outcomes.

## Success

**Purpose:** Indicates positive outcomes, completed actions, and healthy operational states.

**Typical Usage:**
- Success messages and confirmations
- Completed task indicators
- Healthy fleet status
- Positive trend indicators in data visualization
- Successful form submissions

**Examples:**
- Green indicator showing vehicle is operational
- Success toast notification after data save
- Positive trend arrow in metrics dashboard
- Completed checkmark in task lists

## Warning

**Purpose:** Alerts users to conditions requiring attention but not immediately critical. Encourages proactive action.

**Typical Usage:**
- Warning messages and cautions
- Approaching threshold indicators
- Maintenance reminders
- Non-critical system alerts
- Attention-required badges

**Examples:**
- Yellow indicator showing vehicle needs maintenance soon
- Warning banner for low fuel levels
- Caution icon for approaching speed limits
- Attention badge for pending approvals

## Danger

**Purpose:** Communicates critical issues, errors, and situations requiring immediate action.

**Typical Usage:**
- Error messages and critical alerts
- Failed operation indicators
- Critical fleet health issues
- Destructive action confirmations
- Emergency status indicators

**Examples:**
- Red indicator showing vehicle breakdown
- Error message for failed API call
- Critical alert for vehicle offline
- Delete confirmation button
- Emergency status badge

## Info

**Purpose:** Provides neutral informational content and helpful context without implying urgency or action requirements.

**Typical Usage:**
- Informational messages and tips
- Help text and tooltips
- Neutral status indicators
- Contextual information
- Non-urgent notifications

**Examples:**
- Blue info icon with helpful tip
- Informational banner about new features
- Neutral status indicator for pending actions
- Tooltip explaining data metric
- Contextual help text in forms

## Neutral

**Purpose:** Provides visual structure and supports content without drawing attention. Used for backgrounds, borders, and non-critical text.

**Typical Usage:**
- Background colors and surfaces
- Border and divider lines
- Secondary and muted text
- Disabled states
- Placeholder content

**Examples:**
- Gray background for page surfaces
- Light gray borders between sections
- Muted text for timestamps and metadata
- Disabled button states
- Placeholder text in empty states

---

# Surface Colors

Surface colors define the visual layers and depth of the interface, creating clear spatial organization and improving content legibility.

## Background

**Purpose:** The foundational color of the application, providing the base layer for all content.

**Typical Usage:**
- Main application background
- Page-level backgrounds
- Canvas for content areas

**Guidelines:** Use a neutral, low-contrast background color that reduces eye strain during extended use. Ensure sufficient contrast with foreground content.

## Primary Surface

**Purpose:** The main content area where primary user interactions occur.

**Typical Usage:**
- Main content panels
- Dashboard widgets
- Primary data display areas
- Form containers
- Card backgrounds

**Guidelines:** Use a slightly elevated shade from the background to create subtle depth. Maintain clear visual separation from the background while avoiding harsh contrast.

## Secondary Surface

**Purpose:** Supporting content areas that contain secondary information or auxiliary controls.

**Typical Usage:**
- Side panels and auxiliary content
- Nested information areas
- Secondary data displays
- Supporting form sections
- Expanded content areas

**Guidelines:** Create visual hierarchy by differentiating from primary surfaces. Use subtle elevation to indicate content relationships.

## Sidebar

**Purpose:** The navigation sidebar that provides primary application navigation.

**Typical Usage:**
- Left navigation panel
- Navigation menu container
- Navigation item backgrounds
- Collapsed sidebar states

**Guidelines:** Use a distinct surface color that clearly separates navigation from content. Ensure navigation items maintain proper contrast for readability.

## Header

**Purpose:** The top application bar containing global actions, search, and user controls.

**Typical Usage:**
- Top navigation bar
- Page headers
- Toolbar backgrounds
- Search bar containers
- Global action areas

**Guidelines:** Use a surface color that distinguishes the header from both the sidebar and main content. Maintain visual continuity with the overall design system.

## Card Background

**Purpose:** Individual card containers that group related information and actions.

**Typical Usage:**
- Metric cards
- Status cards
- Content cards
- Widget containers
- Information grouping elements

**Guidelines:** Use a surface color that elevates cards above the primary content area. Maintain consistent card styling across all modules.

## Table Background

**Purpose:** Data table containers for displaying structured fleet information.

**Typical Usage:**
- Data table backgrounds
- Table header rows
- Table body areas
- Alternating row backgrounds
- Table cell backgrounds

**Guidelines:** Ensure table backgrounds provide sufficient contrast for data readability. Use subtle row striping to improve scanability without visual distraction.

## Modal Background

**Purpose:** Overlay surfaces for modal dialogs, drawers, and focused interactions.

**Typical Usage:**
- Modal dialog backgrounds
- Drawer containers
- Overlay panels
- Focused interaction areas
- Confirmation dialogs

**Guidelines:** Use a surface color that clearly separates modal content from the underlying page. Ensure modal backgrounds are visually distinct to indicate a focused interaction state.

---

# Text Colors

Text colors establish a clear hierarchy of information, guiding users through content from most to least important.

## Primary Text

**Purpose:** The main text color for headings, body content, and primary information.

**Typical Usage:**
- Page headings and titles
- Body text and paragraphs
- Primary data values
- Important labels
- Core content text

**Guidelines:** Use the highest contrast text color for maximum readability. This should be the default text color for most content.

## Secondary Text

**Purpose:** Supporting text that provides context and additional information.

**Typical Usage:**
- Subtitles and subheadings
- Supporting descriptions
- Secondary data values
- Supplementary labels
- Contextual information

**Guidelines:** Use slightly reduced contrast from primary text to establish hierarchy while maintaining readability. Avoid making secondary text too light.

## Muted Text

**Purpose:** Low-emphasis text for metadata, timestamps, and non-critical information.

**Typical Usage:**
- Timestamps and dates
- Metadata and auxiliary information
- Placeholder text
- Disabled content labels
- Non-essential annotations

**Guidelines:** Use significantly reduced contrast to indicate lower priority. Ensure text remains readable while clearly indicating secondary importance.

## Disabled Text

**Purpose:** Text for disabled or inactive interface elements.

**Typical Usage:**
- Disabled button labels
- Inactive navigation items
- Unavailable option text
- Grayed-out form fields
- Inactive feature labels

**Guidelines:** Use very low contrast to clearly indicate non-interactive state. Ensure disabled text is distinguishable from both active text and placeholder text.

## Inverse Text

**Purpose:** Light text used on dark or colored backgrounds.

**Typical Usage:**
- Text on primary color buttons
- Text on dark backgrounds
- Text on brand color elements
- Text on gradient backgrounds
- Text over images and media

**Guidelines:** Use light text on dark surfaces to maintain readability. Ensure sufficient contrast against the background color for WCAG compliance.

---

# Border Colors

Border colors define boundaries, separate content areas, and indicate interactive states.

## Default Border

**Purpose:** Standard borders for containers, inputs, and dividers.

**Typical Usage:**
- Input field borders
- Card borders
- Container outlines
- Standard dividers
- Default element boundaries

**Guidelines:** Use subtle borders that define structure without visual distraction. Maintain consistency across all bordered elements.

## Strong Border

**Purpose:** More prominent borders for emphasis and critical boundaries.

**Typical Usage:**
- Focused input borders
- Active element indicators
- Important section dividers
- Highlighted boundaries
- Error state borders

**Guidelines:** Increase border prominence for elements requiring attention. Use sparingly to maintain visual hierarchy.

## Divider

**Purpose:** Light lines that separate content sections and organize information.

**Typical Usage:**
- Section dividers
- List item separators
- Content area boundaries
- Menu item separators
- Visual content grouping

**Guidelines:** Use very subtle borders that organize content without drawing attention. Dividers should support readability, not compete with content.

## Focus Border

**Purpose:** Indicates keyboard focus and interactive element selection.

**Typical Usage:**
- Keyboard navigation focus indicators
- Active input field indicators
- Focused button outlines
- Selected element indicators
- Accessibility focus markers

**Guidelines:** Use high-contrast borders that are clearly visible. Focus indicators must meet WCAG visibility requirements and be distinguishable from default borders.

## Disabled Border

**Purpose:** Indicates non-interactive or unavailable elements.

**Typical Usage:**
- Disabled input borders
- Inactive button outlines
- Unavailable option boundaries
- Grayed-out form fields
- Non-interactive element indicators

**Guidelines:** Use low-contrast borders that clearly communicate non-interactive state. Ensure disabled borders are distinguishable from default borders.

---

# Status Color Usage

The following table defines the color mapping for fleet and operational statuses:

| Status | Color | Example Usage |
|--------|-------|---------------|
| Active | Success Green | Vehicle is operational and in service |
| Idle | Info Blue | Vehicle is available but not currently assigned |
| Maintenance | Warning Yellow | Vehicle is scheduled for or undergoing maintenance |
| Offline | Neutral Gray | Vehicle is not connected or powered off |
| Critical | Danger Red | Vehicle has critical issue requiring immediate attention |
| Warning | Warning Yellow | Vehicle has issue requiring attention soon |
| Healthy | Success Green | Vehicle health check passed, no issues detected |
| Delayed | Warning Orange | Vehicle or route is experiencing delays |

**Guidelines:**
- Use status colors consistently across all modules
- Combine status colors with icons and text labels for accessibility
- Ensure status colors maintain sufficient contrast on all backgrounds
- Use status colors in tables, cards, lists, and detail views
- Pair status colors with appropriate semantic meaning throughout the interface

---

# Interactive States

Interactive elements change appearance based on user interaction. These states provide feedback and improve usability.

## Default

**Purpose:** The resting state of interactive elements before user interaction.

**Typical Usage:**
- Button default state
- Link default appearance
- Input field resting state
- Default control appearance

**Guidelines:** Use brand or semantic colors appropriate to the element's function. Ensure default state is clearly identifiable as interactive.

## Hover

**Purpose:** Indicates that an element is interactive and responds to mouse hover.

**Typical Usage:**
- Button hover state
- Link hover state
- Interactive card hover
- Menu item hover
- Control hover feedback

**Guidelines:** Slightly darken or lighten the default color to indicate interactivity. Maintain sufficient contrast and ensure hover state is clearly distinguishable from default state.

## Pressed

**Purpose:** Indicates active clicking or selection of an element.

**Typical Usage:**
- Button click state
- Active toggle state
- Selected item state
- Active control state
- Confirmed selection

**Guidelines:** Use a more pronounced color change to simulate physical depression. Ensure pressed state is clearly visible and provides satisfying feedback.

## Focused

**Purpose:** Indicates keyboard focus for accessibility and keyboard navigation.

**Typical Usage:**
- Keyboard navigation focus
- Input field focus
- Focused button outline
- Tab navigation indicator
- Screen reader focus target

**Guidelines:** Use high-contrast focus borders or rings. Focus indicators must be clearly visible and meet WCAG 2.1 SC 2.4.7 requirements. Never remove focus indicators for aesthetic reasons.

## Disabled

**Purpose:** Indicates elements that are not currently interactive or available.

**Typical Usage:**
- Disabled buttons
- Inactive form fields
- Unavailable options
- Grayed-out controls
- Non-interactive elements

**Guidelines:** Significantly reduce opacity or use muted colors. Ensure disabled state is clearly distinguishable from active state while maintaining visibility of the element's purpose.

## Selected

**Purpose:** Indicates actively selected or active elements.

**Typical Usage:**
- Selected navigation items
- Active tabs
- Checked checkboxes
- Active toggles
- Current selections

**Guidelines:** Use brand primary color or accent color to indicate selection. Ensure selected state is clearly visible and consistently applied across all selectable elements.

---

# Accessibility

The UrbanFlow AI Color System is designed to meet and exceed accessibility standards, ensuring the platform is usable by all operators.

## Color Contrast

All text and interactive elements must meet WCAG 2.1 AA contrast requirements:

- **Normal text (under 18pt):** Minimum 4.5:1 contrast ratio
- **Large text (18pt and above):** Minimum 3:1 contrast ratio
- **UI components and graphics:** Minimum 3:1 contrast ratio against adjacent colors

**Guidelines:**
- Test all color combinations for contrast compliance
- Provide high-contrast mode support where feasible
- Avoid light gray text on white backgrounds
- Ensure colored text maintains readability

## Color Independence

Never use color as the sole means of conveying information or prompting action.

**Guidelines:**
- Pair color with icons, text labels, or patterns
- Use icons alongside status colors in tables and lists
- Include text labels with color-coded alerts
- Provide alternative indicators for color-blind users
- Test designs in grayscale to ensure information remains clear

## Focus Indicators

All interactive elements must have visible focus indicators for keyboard navigation.

**Guidelines:**
- Use high-contrast focus borders (minimum 2px width)
- Ensure focus indicators are visible on all backgrounds
- Never remove focus outlines for aesthetic reasons
- Provide clear visual distinction between focused and unfocused states
- Test keyboard navigation across all interactive elements

## Readable Text

Optimize typography and color for extended reading sessions.

**Guidelines:**
- Avoid pure black (#000000) on pure white (#FFFFFF) for body text
- Use slightly off-white backgrounds to reduce eye strain
- Ensure adequate line height and letter spacing
- Test readability in various lighting conditions
- Consider dark mode support for low-light environments

## Error Visibility

Error states must be clearly visible and distinguishable from other states.

**Guidelines:**
- Use danger red for error states with sufficient contrast
- Pair error colors with error icons and descriptive text
- Ensure error messages are prominent and easy to locate
- Provide clear visual distinction between error, warning, and success states
- Test error visibility across all supported backgrounds

---

# Tailwind Mapping

The following Tailwind color token names are recommended for implementing the UrbanFlow AI Color System. These tokens provide a consistent naming convention that aligns with the design system architecture.

## Brand Colors
- `primary` - Primary brand color
- `secondary` - Secondary brand color
- `accent` - Accent color for highlights and special features

## Semantic Colors
- `success` - Success state color
- `warning` - Warning state color
- `danger` - Error and critical state color
- `info` - Informational state color
- `neutral` - Neutral and disabled state color

## Surface Colors
- `background` - Main application background
- `surface` - Primary surface color
- `surface-secondary` - Secondary surface color
- `surface-sidebar` - Sidebar background
- `surface-header` - Header background
- `surface-card` - Card background
- `surface-table` - Table background
- `surface-modal` - Modal background

## Text Colors
- `text-primary` - Primary text color
- `text-secondary` - Secondary text color
- `text-muted` - Muted and metadata text
- `text-disabled` - Disabled text color
- `text-inverse` - Inverse text for dark backgrounds

## Border Colors
- `border-default` - Default border color
- `border-strong` - Strong border color
- `border-divider` - Divider color
- `border-focus` - Focus indicator color
- `border-disabled` - Disabled border color

## Status Colors
- `status-active` - Active status
- `status-idle` - Idle status
- `status-maintenance` - Maintenance status
- `status-offline` - Offline status
- `status-critical` - Critical status
- `status-warning` - Warning status
- `status-healthy` - Healthy status
- `status-delayed` - Delayed status

## Interactive State Modifiers
Interactive states can be implemented using Tailwind's modifier syntax:
- `hover:` - Hover state variants
- `active:` - Pressed/active state variants
- `focus:` - Focus state variants
- `disabled:` - Disabled state variants
- `selected:` - Selected state variants (custom modifier)

**Guidelines:**
- Use these token names consistently across all components
- Map tokens to actual color values in the Tailwind configuration
- Maintain semantic naming that reflects purpose, not appearance
- Group related tokens for easy maintenance
- Document any custom color values or exceptions

---

# Future Expansion

The UrbanFlow AI Color System is designed to accommodate growth and evolution without disrupting existing implementations.

## Adding New Semantic Colors

New semantic colors can be introduced as the platform grows:

**Process:**
1. Identify the semantic meaning and use case
2. Ensure the new color does not conflict with existing semantic colors
3. Test contrast ratios for accessibility compliance
4. Document the color's purpose, usage, and examples
5. Add the color token to the Tailwind configuration
6. Update component libraries to support the new color
7. Communicate changes to design and development teams

**Guidelines:**
- Limit the number of semantic colors to avoid confusion
- Ensure new colors have clear, distinct meanings
- Maintain backward compatibility with existing components
- Consider how new colors integrate with existing status systems

## Theme Variations

The color system supports potential theme variations:

**Light Theme (Default)**
- Current color system optimized for light backgrounds
- Suitable for daytime operations and well-lit environments

**Dark Theme (Future)**
- Inverted or adjusted color values for dark backgrounds
- Reduced eye strain for low-light environments
- Maintains semantic color meanings and accessibility standards

**High Contrast Mode (Future)**
- Enhanced contrast ratios for users with visual impairments
- Bold color distinctions for improved visibility
- WCAG AAA compliance where possible

## Platform-Specific Adaptations

As the platform expands to new device types, colors may require adjustment:

**Tablet Adaptations**
- Maintain current color system with minor adjustments for touch interfaces
- Ensure sufficient color contrast for outdoor visibility
- Test color perception in various lighting conditions

**Mobile Adaptations**
- Optimize color system for smaller screens
- Ensure status colors remain visible on mobile displays
- Consider battery-saving dark mode for OLED screens

## Color Token Management

As the design system matures, implement a formal token management system:

**Centralized Token Repository**
- Store color values in a single source of truth
- Enable easy updates across all platforms
- Support theme switching and customization

**Version Control**
- Track changes to color tokens over time
- Maintain changelog for design system updates
- Communicate breaking changes to stakeholders

**Design Tool Integration**
- Sync tokens with design tools (Figma, Sketch)
- Enable designers to work with actual production values
- Reduce design-to-development handoff errors

---

# Summary

The UrbanFlow AI Color System provides a comprehensive, accessible, and scalable foundation for the platform's visual language. By establishing clear guidelines for brand colors, semantic colors, surfaces, text, borders, and interactive states, the system ensures consistent application across all modules and features.

The color system supports the core design principles of the UrbanFlow AI platform:

- **Operational Awareness:** Status colors enable immediate comprehension of fleet health
- **Accessibility:** WCAG compliance ensures usability for all operators
- **Consistency:** Standardized color application reduces cognitive load
- **Scalability:** Flexible architecture supports platform growth and new features
- **Professional Appearance:** Enterprise-grade palette projects trust and reliability

This color system serves as a critical component of the broader UrbanFlow AI Design System, translating design intent into actionable implementation guidelines. As the platform evolves, the color system will grow while maintaining the clarity, accessibility, and professionalism that define the UrbanFlow AI user experience.

---

*Document Version: 1.0*  
*Phase: 2D – Design System*  
*Status: Color System Specification*