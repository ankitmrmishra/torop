# SF Pro Display Font Setup

## ✅ Font Issue Fixed

The SF Pro Display fonts are now properly configured and will load correctly.

## What Was Fixed

### 1. Font Face Declarations

Updated `packages/ui/src/styles/globals.css` to use the correct font file names:

```css
@font-face {
  font-family: "SF Pro Display";
  src: url("/fonts/SFPRODISPLAYREGULAR.OTF") format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "SF Pro Display";
  src: url("/fonts/SFPRODISPLAYMEDIUM.OTF") format("opentype");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "SF Pro Display";
  src: url("/fonts/SFPRODISPLAYBOLD.OTF") format("opentype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### 2. Font Family Configuration

Updated the CSS variables to use a single "SF Pro Display" family:

```css
--font-sans: "SF Pro Display", system-ui, -apple-system, sans-serif;
```

### 3. Layout Cleanup

Removed the Inter font import from `apps/web/app/layout.tsx` since we're now using SF Pro Display exclusively.

## Font Files Available

Located in `apps/web/public/fonts/`:

**Currently Configured:**

- ✅ `SFPRODISPLAYREGULAR.OTF` - Regular (400)
- ✅ `SFPRODISPLAYMEDIUM.OTF` - Medium (500)
- ✅ `SFPRODISPLAYBOLD.OTF` - Bold (700)

**Available but Not Configured:**

- `SFPRODISPLAYBLACKITALIC.OTF`
- `SFPRODISPLAYHEAVYITALIC.OTF`
- `SFPRODISPLAYLIGHTITALIC.OTF`
- `SFPRODISPLAYSEMIBOLDITALIC.OTF`
- `SFPRODISPLAYTHINITALIC.OTF`
- `SFPRODISPLAYULTRALIGHTITALIC.OTF`

## How It Works

1. **Font Loading**: The `@font-face` declarations in `globals.css` tell the browser to load the font files from `/fonts/`
2. **Font Display**: `font-display: swap` ensures text is visible immediately with fallback fonts while SF Pro Display loads
3. **Font Weights**: Different weights are mapped to the same family name, so Tailwind's `font-medium` and `font-bold` utilities work automatically
4. **Fallbacks**: If SF Pro Display fails to load, the browser falls back to system fonts

## Usage in Components

The fonts are automatically applied through Tailwind's `font-sans` utility:

```tsx
// Automatically uses SF Pro Display Regular (400)
<p className="text-base">Body text</p>

// Uses SF Pro Display Medium (500)
<p className="font-medium">Medium text</p>

// Uses SF Pro Display Bold (700)
<h1 className="font-bold">Bold heading</h1>
```

## Verification

To verify the fonts are loading:

1. **Start the dev server:**

   ```bash
   pnpm --filter web dev
   ```

2. **Open browser DevTools:**
   - Go to Network tab
   - Filter by "Font"
   - Refresh the page
   - You should see `SFPRODISPLAYREGULAR.OTF`, `SFPRODISPLAYMEDIUM.OTF`, and `SFPRODISPLAYBOLD.OTF` loading

3. **Inspect text elements:**
   - Right-click any text
   - Select "Inspect"
   - Check the "Computed" tab
   - Look for `font-family: "SF Pro Display", system-ui, -apple-system, sans-serif`

## Troubleshooting

### Fonts Not Loading?

1. **Check file paths**: Ensure font files are in `apps/web/public/fonts/`
2. **Check file names**: Must match exactly (case-sensitive on some systems)
3. **Clear cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. **Check console**: Look for 404 errors in browser console

### Fonts Look Different?

1. **Check font-weight**: Ensure you're using the correct weight class
2. **Check antialiasing**: The `antialiased` class is applied in layout.tsx
3. **Check color**: Text should be `#F5F5F5` on dark backgrounds

## Performance

- **Font Display Strategy**: `swap` ensures text is always visible
- **Font Subsetting**: Consider subsetting fonts for production to reduce file size
- **Preloading**: For critical fonts, add preload links in `layout.tsx`:

```tsx
<link
  rel="preload"
  href="/fonts/SFPRODISPLAYREGULAR.OTF"
  as="font"
  type="font/otf"
  crossOrigin="anonymous"
/>
```

## License Note

SF Pro Display is a proprietary font owned by Apple Inc. Ensure you have the proper license to use these fonts in your project. For commercial projects, verify licensing requirements.

## Alternative Fonts

If you need to switch to a different font:

1. **Inter** (free, open-source):

   ```tsx
   import { Inter } from "next/font/google"
   const inter = Inter({ subsets: ["latin"] })
   ```

2. **System Fonts** (no download required):

   ```css
   font-family:
     system-ui,
     -apple-system,
     sans-serif;
   ```

3. **Geist** (Vercel's font):
   ```tsx
   import { GeistSans } from "geist/font/sans"
   ```
