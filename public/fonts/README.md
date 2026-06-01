# SF Pro Display Fonts

This folder contains the SF Pro Display font files used throughout the application.

## Installed Fonts

The following SF Pro Display font files are currently installed:

- `SFPRODISPLAYREGULAR.OTF` - Regular weight (400)
- `SFPRODISPLAYMEDIUM.OTF` - Medium weight (500)
- `SFPRODISPLAYBOLD.OTF` - Bold weight (700)

Additional weights available but not currently configured:

- `SFPRODISPLAYBLACKITALIC.OTF`
- `SFPRODISPLAYHEAVYITALIC.OTF`
- `SFPRODISPLAYLIGHTITALIC.OTF`
- `SFPRODISPLAYSEMIBOLDITALIC.OTF`
- `SFPRODISPLAYTHINITALIC.OTF`
- `SFPRODISPLAYULTRALIGHTITALIC.OTF`

## Configuration

The fonts are loaded in `packages/ui/src/styles/globals.css` using `@font-face` declarations.

The font family is set to "SF Pro Display" with fallbacks to system fonts:

```css
font-family:
  "SF Pro Display",
  system-ui,
  -apple-system,
  sans-serif;
```

## Usage

The fonts are automatically applied to all text through the `font-sans` utility class in Tailwind CSS.

Font weights:

- Regular (400): Default body text
- Medium (500): Emphasized text
- Bold (700): Headings and strong emphasis

## License

SF Pro Display is a proprietary font owned by Apple Inc. Ensure you have the proper license to use these fonts in your project.
