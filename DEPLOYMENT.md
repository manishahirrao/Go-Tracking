# Deployment Guide

## Common Deployment Issues

### Error Page After Deployment

If you see "OOPS! SOMETHING WENT WRONG" after deployment, check:

1. **Environment Variables** - Make sure these are set in your hosting platform:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. **Routing Configuration** - SPA routing is configured via:
   - `public/_redirects` (for Netlify)
   - `public/vercel.json` (for Vercel)

3. **Build Output** - Ensure your hosting platform points to the `dist` folder

## Platform-Specific Instructions

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables in Site Settings > Environment Variables
4. The `_redirects` file handles routing automatically

### Vercel
1. Build command: `npm run build`
2. Output directory: `dist`
3. Add environment variables in Project Settings > Environment Variables
4. The `vercel.json` file handles routing automatically

### Other Platforms (Render, Railway, etc.)
1. Build command: `npm run build`
2. Start command: `npm run preview` (or use a static file server)
3. Publish directory: `dist`
4. Add environment variables in platform settings
5. Configure rewrites to serve `index.html` for all routes

## Environment Variables Required

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from your Supabase project dashboard: Settings > API

## Testing Locally

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

Visit http://localhost:4173 to test the production build.

## Troubleshooting

- **Blank page**: Check browser console for errors, usually missing environment variables
- **404 on refresh**: Routing configuration missing (add _redirects or vercel.json)
- **API errors**: Verify Supabase credentials and RLS policies are set up correctly
