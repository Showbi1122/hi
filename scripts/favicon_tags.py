"""Shared favicon link tags for HTML templates."""


def favicon_head(depth: str = "") -> str:
    """Return favicon <link> tags. Use depth='../' for blog/geo pages."""
    return f"""  <link rel="icon" href="{depth}favicon.ico" sizes="any" />
  <link rel="icon" type="image/svg+xml" href="{depth}favicon.svg" />
  <link rel="icon" type="image/webp" sizes="32x32" href="{depth}favicon-32x32.webp" />
  <link rel="icon" type="image/webp" sizes="16x16" href="{depth}favicon-16x16.webp" />
  <link rel="apple-touch-icon" sizes="180x180" href="{depth}apple-touch-icon.webp" />
  <link rel="manifest" href="{depth}site.webmanifest" />"""
