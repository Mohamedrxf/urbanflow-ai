# Assets

This directory contains static assets used throughout the TrafficShield (UrbanFlow AI) documentation.

## Contents

- **README.md** - This file, assets index and guidelines
- Images, icons, logos, and other static resources

## Purpose

The assets directory stores supporting files that are referenced in documentation, including images, diagrams, icons, logos, and other visual resources.

## Asset Types

### Images

- Screenshots of the application
- UI mockups and prototypes
- Architecture diagrams (exported from drawio)
- Infographics and visualizations

### Icons and Logos

- Project logos and branding
- Icon sets for documentation
- Favicon and app icons

### Other Assets

- PDF documents and whitepapers
- Video files and demonstrations
- Data files and sample datasets
- Configuration files

## File Organization

Organize assets in subdirectories by type:
```
assets/
├── images/          # General images and screenshots
├── icons/           # Icon files
├── logos/           # Logo and branding files
└── diagrams/        # Exported diagram images (PNG, SVG, PDF)
```

## Naming Convention

- Use kebab-case for all filenames: `system-architecture.png`, `user-dashboard.png`
- Be descriptive: `auth-login-flow.png` instead of `flow.png`
- Include version numbers when appropriate: `logo-v2.png`
- Use consistent extensions: `.png` for screenshots, `.svg` for vector graphics

## Guidelines

- Optimize images for web (compress without significant quality loss)
- Use appropriate formats: PNG for screenshots, SVG for diagrams, JPEG for photos
- Maintain consistent dimensions for similar types of images
- Include alt text when referencing images in markdown
- Keep file sizes reasonable (aim for < 1MB per image)
- Document the source and purpose of each asset

## Usage in Documentation

Reference assets in markdown using relative paths:
```markdown
![System Architecture](../assets/diagrams/system-architecture.png)
```

## Getting Started

1. Create appropriate subdirectories for asset types
2. Add assets with descriptive filenames
3. Reference assets in documentation using relative paths
4. Optimize images before adding to the repository
5. Update this README when adding new asset categories

---

**Note:** This is a documentation structure only. Assets will be added in subsequent phases.