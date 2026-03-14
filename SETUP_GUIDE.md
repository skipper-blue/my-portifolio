# Portfolio React Setup & Configuration Guide

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## Project Structure Overview

### `/src/components/`
Reusable React components organized by feature:
- **Navbar**: Fixed navigation with active link tracking
- **Hero**: Large hero section with introduction
- **About**: About section with profile info
- **Projects**: Portfolio projects grid
- **Services**: Services offered
- **Contact**: Contact form and info
- **Modal**: Info dialog for details
- **BackToTop**: Floating scroll-to-top button
- **Footer**: Site footer

Each component has:
- `.jsx` file: React component
- `.css` file: Component styles

### `/src/pages/`
Full page components:
- **Landing.jsx**: Animated landing/intro page
- **Portfolio.jsx**: Main portfolio page with all sections

### `/src/store/`
Data and state management:
- **portfolioData.js**: All portfolio content and data

### `/src/styles/`
Global styles:
- **variables.css**: CSS custom properties (colors, spacing, etc.)
- **global.css**: Global styles and resets

### `/src/hooks/`
Custom React hooks:
- **useScroll.js**: Scroll-related hooks

### `/src/utils/`
Utility functions:
- **helpers.js**: Common helper functions

## Customization Guide

### 1. Update Portfolio Data
Edit `src/store/portfolioData.js`:
```javascript
export const portfolioData = {
  personal: {
    name: "Your Name",
    nickname: "Your Nickname",
    // ... update other fields
  },
  projects: [
    // Add/edit projects
  ],
  // ... update other sections
};
```

### 2. Change Colors/Theme
Edit `src/styles/variables.css`:
```css
:root {
  --accent: #001f4d;        /* Primary color */
  --accent-2: #00c8ff;      /* Secondary color */
  --text: #ffffff;          /* Text color */
  /* ... other variables */
}
```

### 3. Update Images & CV
Replace images in `/public/` folder:
- Profile images in `/profileavatar/`
- Project images in `/projects/`

Place your résumé/CV PDF at the root of `frontend/public` named `CV.pdf` (or update the `cv` path in `src/store/portfolioData.js` accordingly).

Update paths in `src/store/portfolioData.js`:
```javascript
profileImages: {
  main: "/profileavatar/profile-pic1.jpg",
  about: "/profileavatar/profile-pic.jpg"
},
cv: "/CV.pdf"
```

The CV will automatically be linked from the hero section, landing page icons, contact section, and navbar.
### 4. Modify Component Styling
Each component has its own CSS file. Edit the styles directly:
- Change spacing: Update `padding`, `margin`
- Change colors: Update `color`, `background`
- Change layout: Update `display`, `grid`, `flex`

### 5. Add New Sections
1. Create component in `/src/components/NewSection/`
2. Create `.jsx` and `.css` files
3. Export from `src/components/index.js`
4. Import and use in `src/pages/Portfolio.jsx`

## Component Props

### About Component
```jsx
<About onModalOpen={handleModalOpen} />
```
- `onModalOpen`: Callback to open modal with specific tab

### Modal Component
```jsx
<Modal
  isOpen={isModalOpen}
  tab={activeTab}
  onClose={handleModalClose}
/>
```
- `isOpen`: boolean - Whether modal is open
- `tab`: string - Active tab ('languages', 'education', 'projects')
- `onClose`: function - Callback to close modal

## Styling System

### CSS Variables Available
- `--bg-0`: Main background
- `--bg-1`: Secondary background
- `--text`: Text color
- `--muted`: Muted text color
- `--accent`: Primary accent color
- `--accent-2`: Secondary accent color
- All spacing, radius, and shadow variables

### Responsive Breakpoints
```css
/* Large screens */
@media (max-width: 1100px) { }

/* Medium screens */
@media (max-width: 900px) { }

/* Small screens */
@media (max-width: 700px) { }

/* Extra small screens */
@media (max-width: 420px) { }
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari 12+, Chrome Android

## Performance Optimization

### Current Optimizations
- CSS custom properties for theme switching
- Lazy component loading with React Router
- Optimized images
- Minimal dependencies
- Fast Vite build process

### Additional Tips
- Use React DevTools to check for unnecessary re-renders
- Monitor bundle size with `npm run build`
- Use `React.memo()` for expensive components if needed

## Troubleshooting

### Port Already in Use
Change the port in `vite.config.js`:
```javascript
export default {
  server: {
    port: 3000
  }
}
```

### Styling Not Applied
1. Check CSS file is imported in component
2. Check selector specificity
3. Check variable names match in `variables.css`

### Images Not Loading

- Make sure you have copied all image assets from the legacy `assets/` folder into the `frontend/public` directory. Maintain the same sub‑folders used in the data store (`/profileavatar`, `/projects`, etc.).
- Example copy commands (run from workspace root):
  ```powershell
  mkdir -p frontend/public/profileavatar
  mkdir -p frontend/public/projects
  cp ..\assets\profileavatar\* frontend\public\profileavatar\
  cp ..\assets\projects\* frontend\public\projects\
  ```
- After copying, verify the paths in `src/store/portfolioData.js` still begin with `/` so that Vite serves them correctly from the public folder.

### Icons and Bootstrap Icons

- We use [Bootstrap Icons](https://icons.getbootstrap.com/) via the CDN link in `index.html`.
- To change an icon, open the icon picker on the website, copy the `bi bi-xxx` class name and update the `icon` field in the data store or the `<i>` element inside the component.
- For social links (GitHub, LinkedIn, WhatsApp, etc.) use the appropriate `bi-` icon prefix. Example for LinkedIn:
  ```jsx
  <i className="bi bi-linkedin"></i>
  ```
1. Check image paths start with `/`
2. Ensure images exist in `/public/` folder
3. Check file names and extensions match exactly

### Modal Not Opening
1. Check modal is being passed `isOpen` prop
2. Check modal open handler is called
3. Check modal component is rendered in parent

## Deployment

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop build/ folder to netlify.com
```

## Environment Variables

Create `.env` file in frontend folder for environment-specific settings:
```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My Portfolio
```

Access in components:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Common Tasks

### Add Google Analytics
Install package:
```bash
npm install react-ga4
```

Import and initialize in `App.jsx`:
```javascript
import ReactGA from "react-ga4";

ReactGA.initialize("GA_ID");
```

### Add Contact Form Backend
Update form submission in `Contact.jsx`:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: formData
  });
  // Handle response
};
```

### Add Dark/Light Mode Toggle
Create a context and implement theme switcher using CSS variables.

## Additional Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Getting Help

1. Check component documentation in comments
2. Review `portfolioData.js` for data structure
3. Check responsive breakpoints in CSS files
4. Review component props and usage examples

## Version History

- v1.0.0: Initial React portfolio setup

## License

© 2026 Skipper-blue. All rights reserved.
