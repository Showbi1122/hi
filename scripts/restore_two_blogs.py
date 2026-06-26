#!/usr/bin/env python3
"""Restore custom_website_benefits.py and ai_web_development.py from agent transcript Write events."""

import json
import os

TRANSCRIPT = (
    "/home/hermit-123/.cursor/projects/home-hermit-123-Documents-Portfolio/"
    "agent-transcripts/b5617c08-59f2-4fee-8cd5-81cdf10124ef/"
    "subagents/6b22d770-eacb-4ca4-990c-c183fdbc55df.jsonl"
)
OUT = os.path.join(os.path.dirname(os.path.dirname(__file__)), "scripts", "blog_content")
TARGETS = {
    "custom_website_benefits.py": os.path.join(OUT, "custom_website_benefits.py"),
    "ai_web_development.py": os.path.join(OUT, "ai_web_development.py"),
}

for line in open(TRANSCRIPT, encoding="utf-8"):
    obj = json.loads(line)
    for part in obj.get("message", {}).get("content", []):
        if part.get("type") != "tool_use" or part.get("name") != "Write":
            continue
        path = part.get("input", {}).get("path", "")
        for name, out in TARGETS.items():
            if path.endswith(name):
                contents = part.get("input", {}).get("contents", "")
                if len(contents) > 5000:
                    with open(out, "w", encoding="utf-8") as f:
                        f.write(contents)
                    print(f"Restored {name} ({len(contents)} chars)")
