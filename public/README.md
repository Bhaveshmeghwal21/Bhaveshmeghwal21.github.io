# Public Assets Directory Structure

This directory contains all static assets for the portfolio website.

## Directory Structure

```
public/
├── images/
│   ├── profile.jpg           # Your professional headshot (recommended: 500x500px)
│   ├── og-image.jpg          # Open Graph image for social sharing (1200x630px)
│   ├── favicon.ico           # Website favicon
│   └── projects/
│       ├── ftc-drone.jpg     # Fault-Tolerant Control project
│       ├── aerovla.jpg       # AeroVLA project
│       ├── vtol-drone.jpg    # PAWAAC internship
│       ├── cfd-analysis.jpg  # CFD Propeller Analysis
│       ├── swarm-drones.jpg  # Swarm Drone System
│       ├── human-follower.jpg # Human Follower Drone
│       └── speech-emotion.jpg # Speech Emotion Recognition
├── videos/
│   └── (optional demo videos)
└── documents/
    ├── Bhavesh_Meghwal_Resume.pdf
    ├── Bhavesh_Meghwal_Resume_Robotics.pdf
    ├── FTC_Report.pdf
    ├── CFD_Propeller_Analysis.pdf
    ├── PAWAAC_Internship_Report.pdf
    └── (other project reports)
```

## Adding Your Assets

### Profile Photo
- **Size**: 500x500px recommended
- **Format**: JPG or PNG
- **File**: `images/profile.jpg`
- Used in: About section

### Project Images
- **Size**: 1200x800px recommended
- **Format**: JPG or PNG
- **Location**: `images/projects/`
- Used in: Projects section cards

### Open Graph Image
- **Size**: 1200x630px (required for proper social media display)
- **Format**: JPG or PNG
- **File**: `images/og-image.jpg`
- Used in: Social media previews when sharing your portfolio

### Resume PDFs
- **Format**: PDF
- **Location**: `documents/`
- Files:
  - `Bhavesh_Meghwal_Resume.pdf` (General resume)
  - `Bhavesh_Meghwal_Resume_Robotics.pdf` (Robotics-focused)

### Project Reports
- **Format**: PDF
- **Location**: `documents/`
- Reference these in `src/utils/constants.js` project links

## Image Optimization Tips

1. **Compress images** before adding (use tools like TinyPNG, Squoosh)
2. **Use appropriate formats**:
   - Photos: JPG
   - Graphics/logos: PNG or SVG
   - Icons: SVG preferred
3. **WebP format** for better compression (Next.js auto-converts)

## Placeholder Images

If you don't have images yet, you can:
1. Use placeholder services temporarily
2. Create gradient placeholders in code
3. Use stock photos from:
   - Unsplash
   - Pexels
   - Your own drone photos!

## Updating Image References

After adding images, update paths in `src/utils/constants.js`:

```javascript
export const projects = [
  {
    id: 1,
    image: "/images/projects/ftc-drone.jpg",  // Path relative to public/
    // ... other fields
  }
]
```

## Favicon

To create a custom favicon:
1. Use a favicon generator (e.g., favicon.io)
2. Replace `public/favicon.ico`
3. Optionally add other sizes in a `public/favicons/` directory

---

**Note**: All paths are relative to the `public/` directory. When referencing in code, use `/images/...` not `/public/images/...`
