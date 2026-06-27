#!/usr/bin/env python3
"""Minify CSS/JS source assets for production."""

from __future__ import annotations

import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, cwd=ROOT, check=True)


def main() -> None:
    run(["terser", "assets/main.js", "-c", "-m", "-o", "assets/main.min.js"])
    run(
        [
            "npx",
            "--yes",
            "clean-css-cli",
            "-O1",
            "assets/style.css",
            "-o",
            "assets/style.min.css",
        ]
    )
    css = os.path.getsize(os.path.join(ROOT, "assets/style.min.css"))
    js = os.path.getsize(os.path.join(ROOT, "assets/main.min.js"))
    print(f"Built assets/style.min.css ({css} bytes)")
    print(f"Built assets/main.min.js ({js} bytes)")


if __name__ == "__main__":
    main()
