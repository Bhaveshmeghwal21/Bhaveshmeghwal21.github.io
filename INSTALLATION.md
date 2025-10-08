# Installation & Setup Guide

## Quick Start

Follow these steps to get your portfolio up and running:

### 1. Install Dependencies

```powershell
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- Three.js (for future 3D features)
- Email.js (for contact form)

### 2. Run Development Server

```powershell
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### 3. Customize Your Content

#### Update Personal Information
Edit `src/utils/constants.js`:
- Name, email, phone
- GitHub and LinkedIn URLs
- Location and graduation year

#### Add Your Projects
Add project details to the `projects` array in `constants.js`

#### Update Skills
Modify the `skills` object to reflect your proficiency levels

#### Add Experience
Update the `experience` array with your work history

### 4. Add Your Assets

Create these directories and add your files:

```
public/
├── images/
│   ├── profile.jpg          # Your photo
│   ├── og-image.jpg         # Social media preview
│   └── projects/            # Project screenshots
├── videos/                  # Project demo videos
└── documents/
    ├── Bhavesh_Meghwal_Resume.pdf
    └── Bhavesh_Meghwal_Resume_Robotics.pdf
```

### 5. Build for Production

```powershell
npm run build
npm run export
```

The static site will be in the `out` directory.

### 6. Deploy to GitHub Pages

#### Automatic Deployment (Recommended)

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions"

2. **Push to main branch**:
   ```powershell
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

3. **Wait for workflow**: Check Actions tab for deployment status

4. **Access your site**: https://bhaveshmeghwal21.github.io/

#### Manual Deployment

```powershell
npm run deploy
```

## Troubleshooting

### TypeScript Errors
These are expected before installing dependencies. Run `npm install` first.

### Port Already in Use
```powershell
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

### Build Failures
```powershell
# Clear cache
Remove-Item -Recurse -Force .next, node_modules
npm install
npm run build
```

### Images Not Loading
- Ensure images are in `public/` directory
- Check file paths in `constants.js`
- Image paths should be relative to `public/` (e.g., `/images/project.jpg`)

## Next Steps

1. ✅ Install dependencies
2. ✅ Run dev server and test locally
3. ✅ Customize content in `constants.js`
4. ✅ Add your images and documents
5. ✅ Test all sections and links
6. ✅ Build and deploy to GitHub Pages
7. ✅ Share your portfolio!

## Configuration Options

### Email Form Integration

To enable the contact form:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Update `src/components/Contact.tsx`:

```javascript
import emailjs from 'emailjs-com'

// In handleSubmit function:
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  formData,
  'YOUR_PUBLIC_KEY'
)
```

### Custom Domain

To use a custom domain:

1. Update `next.config.js`:
```javascript
basePath: '',  // Remove basePath for custom domain
```

2. Add `CNAME` file to `public/` directory:
```
yourdomain.com
```

3. Configure DNS settings at your domain provider

### Theme Customization

Edit `tailwind.config.js` to change colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: { DEFAULT: '#your-color' },
      highlight: { DEFAULT: '#your-color' },
    }
  }
}
```

## Support

For issues or questions:
- Check the main README.md
- Review Next.js documentation: https://nextjs.org/docs
- Review Tailwind CSS docs: https://tailwindcss.com/docs

---

Happy coding! 🚀
