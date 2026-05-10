"""Build site_data.js for the 12dPL docs website.

Reads source-of-truth files from the language server (no manual copy step):
  - server/src/resources/functions.enriched.json
  - server/src/resources/typeDocumentation.json
  - snippets/12dpl.tmSnippets.json

Output:
  - website/public/site_data.js   (window.SITE_DATA = { ... })

Run with:  python website/scripts/build_site_data.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FUNCS_PATH = ROOT / "server" / "src" / "resources" / "functions.enriched.json"
TYPES_PATH = ROOT / "server" / "src" / "resources" / "typeDocumentation.json"
SNIPPETS_PATH = ROOT / "snippets" / "12dpl.tmSnippets.json"
OUT_DIR = ROOT / "website" / "public"
OUT_JS = OUT_DIR / "site_data.js"
OUT_DATA_DIR = OUT_DIR / "data"
OUT_ROBOTS = OUT_DIR / "robots.txt"
OUT_SITEMAP = OUT_DIR / "sitemap.xml"

# Override at build time:  SITE_URL=https://docs.example.com python build_site_data.py
import os
SITE_URL = os.environ.get("SITE_URL", "https://12dpl-docs.vercel.app").rstrip("/")

# Hash-fragment sections we want indexable. Kept in sync with index.html.
SITEMAP_SECTIONS = [
    "", "getting-started", "compiling", "basic-structure", "names",
    "comments", "preprocessing", "variables", "math-types", "geometric-types",
    "db-handles", "internal-types", "interface-types", "file-types",
    "odbc-types", "arrays", "constants", "operators", "flow-control",
    "if-else", "switch", "loops", "goto", "functions", "function-decl",
    "function-call", "parameters", "return-values", "io", "console-output",
    "input", "files", "panels", "panel-basics", "widgets", "events",
    "all-calls", "types", "snippets", "examples", "type-summary", "about",
]

# AI scrapers we explicitly welcome (alphabetical).
AI_BOTS = [
    "anthropic-ai", "AwarioRssBot", "AwarioSmartBot", "Bytespider", "CCBot",
    "ChatGPT-User", "ClaudeBot", "Claude-Web", "cohere-ai", "Diffbot",
    "FacebookBot", "Google-Extended", "GPTBot", "ImagesiftBot", "Kagibot",
    "Meta-ExternalAgent", "Meta-ExternalFetcher", "OAI-SearchBot", "omgili",
    "PerplexityBot", "Perplexity-User", "PiplBot", "Timpibot", "YouBot",
]

NAME_RULES: list[tuple[str, re.Pattern]] = [
    ("ui",         re.compile(r"\b(panel|widget|button|message_box|input_box|grid_box|gridctrl|tabctrl|treectrl|graphctrl|choice_box|chainage_box|colour_box|file_box|list_box|element_box|point_box|integer_box|real_box|text_box|tin_box|model_box|view_box|attribute_box|source_box|tabbox|menu)", re.I)),
    ("tin",        re.compile(r"\b(tin|drainage|catchment|culvert|pit|pipe|drain)", re.I)),
    ("data",       re.compile(r"\b(xml|odbc|recordset|connection|database|sql|json|map_file|blob)", re.I)),
    ("attributes", re.compile(r"\b(attribute|textstyle|colour|color|symbol|hatch|pattern|linestyle|tinstyle|visibility|annotation|legend)", re.I)),
    ("arrays",     re.compile(r"\b(dynamic_|array|_set|_map|_multimap|_multiset|add_item|get_item|set_item|delete_item|insert_item|clear_items|get_count|sort)", re.I)),
    ("geometry",   re.compile(r"\b(point|line|arc|spiral|parabola|segment|curve|polygon|polyline|chord|tangent|intersect|offset|locate|project|bearing|chainage|distance_between|along)", re.I)),
    ("elements",   re.compile(r"\b(element|^model$|create_model|get_model|get_element|delete_element|copy_element|drape|view|folder|super_string|project)", re.I)),
    ("io",         re.compile(r"\b(file_|open_file|close_file|read_|write_|^print$|print_|prompt|clipboard|output_window|console|flush)", re.I)),
    ("text",       re.compile(r"\b(text_|^to_text$|format_|upper_|lower_|trim|substr|find_text|ascii|unicode|replace|^text$)", re.I)),
    ("math",       re.compile(r"\b(math|angle|radian|degree|sin|cos|tan|atan|asin|acos|sqrt|log|exp|^pow$|matrix|vector|triangle|random|round|^abs$|mod|pi)", re.I)),
    ("system",     re.compile(r"\b(system|exit|lock|time|date|guid|uid|environment|command_argument|macro_console)", re.I)),
]

DESC_RULES: list[tuple[str, re.Pattern]] = [
    ("tin",        re.compile(r"triangulated irregular network|tin model|drainage", re.I)),
    ("ui",         re.compile(r"panel|widget|dialog box", re.I)),
    ("geometry",   re.compile(r"\b(geometric|geometry|polyline|chainage)\b", re.I)),
]

TYPE_GROUPS: dict[str, str] = {
    **dict.fromkeys(["Integer", "Integer64", "Real", "Text", "void", "Vector2", "Vector3", "Vector4", "Matrix3", "Matrix4", "Colour", "Time"], "math"),
    **dict.fromkeys(["Point", "Line", "Arc", "Spiral", "Parabola", "Segment", "Curve", "Triangle", "Polygon"], "geometry"),
    **dict.fromkeys(["Element", "Model", "View", "Tin", "Macro_Function", "Undo", "Undo_List", "Project_Model", "Folder", "Super_String", "Layer"], "elements"),
    **dict.fromkeys(["Uid", "Guid", "Attributes", "Attribute", "Attribute_Blob", "Blob", "Screen_Text", "Textstyle_Data", "Equality_Label"], "attributes"),
    **dict.fromkeys(["File", "Map_File", "XML_Document", "XML_Node", "Connection", "Recordset", "Statement"], "data"),
}

PARAM_TYPE_TO_CATEGORY: dict[str, str] = {
    "Tin": "tin", "Drainage": "tin", "Pipe": "tin", "Pit": "tin", "Catchment": "tin",
    "Panel": "ui", "Widget": "ui", "Button": "ui", "Menu": "ui",
    "Input_Box": "ui", "Message_Box": "ui", "Source_Box": "ui",
    "GridCtrl_Box": "ui", "TabCtrl_Box": "ui", "TreeCtrl_Box": "ui", "GraphCtrl_Box": "ui",
    "File_Box": "ui", "Element_Box": "ui", "Model_Box": "ui", "View_Box": "ui",
    "Choice_Box": "ui", "Colour_Box": "ui", "Chainage_Box": "ui",
    "XML_Document": "data", "XML_Node": "data",
    "Connection": "data", "Recordset": "data", "Statement": "data",
    "Map_File": "data", "Blob": "data", "Attribute_Blob": "data",
    "File": "io",
    "Point": "geometry", "Line": "geometry", "Arc": "geometry",
    "Spiral": "geometry", "Parabola": "geometry", "Segment": "geometry",
    "Curve": "geometry", "Polygon": "geometry",
    "Element": "elements", "Model": "elements", "View": "elements",
    "Folder": "elements", "Project_Model": "elements", "Super_String": "elements",
    "Layer": "elements", "Macro_Function": "elements",
    "Vector2": "math", "Vector3": "math", "Vector4": "math",
    "Matrix3": "math", "Matrix4": "math", "Triangle": "math",
    "Attribute": "attributes", "Attributes": "attributes", "Textstyle_Data": "attributes",
    "Colour": "attributes", "Symbol": "attributes",
    "Time": "system", "Guid": "system", "Uid": "system", "Undo": "system", "Undo_List": "system",
}


def classify(name: str, description: str, parameters: list[dict] | None = None) -> str:
    for key, regex in NAME_RULES:
        if regex.search(name):
            return key
    if parameters:
        first_type = (parameters[0].get("type") or "").strip().split()[0] if parameters[0].get("type") else ""
        first_type = first_type.lstrip("&*")
        if first_type.startswith("Dynamic_"):
            return "arrays"
        if first_type.endswith("_Set") or first_type.endswith("_Map") or first_type.endswith("_Multimap") or first_type.endswith("_Multiset"):
            return "arrays"
        if first_type.endswith("_Box") or first_type.endswith("_Group") or first_type.endswith("_Button") or first_type.endswith("_Bar"):
            return "ui"
        if first_type.endswith("_Query") or first_type.endswith("_Result") or first_type.endswith("_Statement"):
            return "data"
        cat = PARAM_TYPE_TO_CATEGORY.get(first_type)
        if cat:
            return cat
        if first_type == "Text":
            return "text"
        if first_type in {"Integer", "Integer64", "Real"}:
            return "math"
    for key, regex in DESC_RULES:
        if regex.search(description):
            return key
    return "misc"


def classify_type(type_name: str) -> str:
    if type_name in TYPE_GROUPS:
        return TYPE_GROUPS[type_name]
    if type_name.startswith("Dynamic_"):
        return "arrays"
    if type_name.endswith("_Box") or type_name.endswith("_Group") or type_name in {"Panel", "Widget", "Button", "Menu"}:
        return "ui"
    if "Map" in type_name or "Set" in type_name or "Multimap" in type_name:
        return "arrays"
    return "misc"


def normalise_function(entry: dict) -> dict:
    name = entry.get("name") or ""
    return_type = entry.get("returnType") or "void"
    params = entry.get("parameters") or []
    desc = (entry.get("description") or "").strip()

    sig_params = ", ".join(
        f"{(p.get('type') or '').strip()} {(p.get('name') or '').strip()}".strip()
        for p in params
    )
    signature = f"{return_type} {name}({sig_params})"

    return {
        "name": name,
        "id": entry.get("id"),
        "returnType": return_type,
        "parameters": params,
        "signature": signature,
        "description": desc,
        "category": classify(name, desc, params),
    }


def main() -> None:
    for p in (FUNCS_PATH, TYPES_PATH, SNIPPETS_PATH):
        if not p.exists():
            raise SystemExit(f"missing {p}")

    raw_funcs = json.loads(FUNCS_PATH.read_text(encoding="utf-8"))
    raw_types = json.loads(TYPES_PATH.read_text(encoding="utf-8"))
    raw_snippets = json.loads(SNIPPETS_PATH.read_text(encoding="utf-8"))

    funcs = [normalise_function(f) for f in raw_funcs if f.get("name")]
    funcs.sort(key=lambda f: f["name"].lower())

    type_entries = []
    for type_name, doc in raw_types.items():
        text = doc if isinstance(doc, str) else (doc.get("description") if isinstance(doc, dict) else "")
        text = (text or "").strip()
        text = re.sub(r"^\*\*[^*]+\*\*\s*", "", text)
        type_entries.append({
            "name": type_name,
            "description": text,
            "group": classify_type(type_name),
        })
    type_entries.sort(key=lambda t: t["name"].lower())

    snippet_entries = []
    for label, snip in raw_snippets.items():
        body = snip.get("body")
        if isinstance(body, list):
            body_text = "\n".join(body)
        else:
            body_text = str(body or "")
        snippet_entries.append({
            "label": label,
            "prefix": snip.get("prefix") or label.lower().replace(" ", "_"),
            "description": snip.get("description") or "",
            "body": body_text,
        })
    snippet_entries.sort(key=lambda s: s["label"].lower())

    category_counts: dict[str, int] = {}
    for f in funcs:
        category_counts[f["category"]] = category_counts.get(f["category"], 0) + 1

    payload = {
        "stats": {
            "functions": len(funcs),
            "types": len(type_entries),
            "snippets": len(snippet_entries),
            "byCategory": category_counts,
        },
        "functions": funcs,
        "types": type_entries,
        "snippets": snippet_entries,
        "source": "https://github.com/ben-nightworks/12dpl-lang-server",
    }

    OUT_DATA_DIR.mkdir(parents=True, exist_ok=True)
    js = "// Generated by website/scripts/build_site_data.py - do not edit by hand.\n"
    js += "window.SITE_DATA = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n"
    with open(OUT_JS, "w", encoding="utf-8", newline="\n") as _f:
        _f.write(js)

    # Mirror the raw source JSONs so the download links in the SPA work.
    (OUT_DATA_DIR / "functions.enriched.json").write_bytes(FUNCS_PATH.read_bytes())
    (OUT_DATA_DIR / "typeDocumentation.json").write_bytes(TYPES_PATH.read_bytes())
    (OUT_DATA_DIR / "snippets.json").write_bytes(SNIPPETS_PATH.read_bytes())

    write_robots_txt()
    write_sitemap()

    print(f"Wrote {OUT_JS}")
    print(f"Mirrored raw JSON to {OUT_DATA_DIR}")
    print(f"Wrote {OUT_ROBOTS}")
    print(f"Wrote {OUT_SITEMAP}")
    print(f"  functions : {len(funcs)}")
    print(f"  types     : {len(type_entries)}")
    print(f"  snippets  : {len(snippet_entries)}")
    print(f"  categories: {sorted(category_counts.items(), key=lambda x: -x[1])}")


def write_robots_txt() -> None:
    lines = [
        "# Generated by website/scripts/build_site_data.py - do not edit by hand.",
        "# 12dPL Docs is a community reference. Crawling is welcome.",
        "",
        "User-agent: *",
        "Allow: /",
        "",
        "# AI / LLM scrapers are explicitly welcome.",
        "# Content is under MIT — please attribute and link back where appropriate.",
    ]
    for bot in AI_BOTS:
        lines.append(f"User-agent: {bot}")
        lines.append("Allow: /")
        lines.append("")
    lines.append(f"Sitemap: {SITE_URL}/sitemap.xml")
    lines.append("")
    with open(OUT_ROBOTS, "w", encoding="utf-8", newline="\n") as _f:
        _f.write("\n".join(lines))


def write_sitemap() -> None:
    from datetime import datetime, timezone
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    parts = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for frag in SITEMAP_SECTIONS:
        loc = SITE_URL + "/" + (f"#{frag}" if frag else "")
        priority = "1.0" if frag == "" else ("0.9" if frag in {"all-calls", "types", "snippets"} else "0.7")
        parts.append("  <url>")
        parts.append(f"    <loc>{loc}</loc>")
        parts.append(f"    <lastmod>{today}</lastmod>")
        parts.append("    <changefreq>weekly</changefreq>")
        parts.append(f"    <priority>{priority}</priority>")
        parts.append("  </url>")
    parts.append("</urlset>")
    parts.append("")
    with open(OUT_SITEMAP, "w", encoding="utf-8", newline="\n") as _f:
        _f.write("\n".join(parts))


if __name__ == "__main__":
    main()
