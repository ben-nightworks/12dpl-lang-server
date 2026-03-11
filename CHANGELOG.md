# Changelog
(This section contains the full information previously documented in the former Release Notes document.)

## [v1.0.3] (July 2023)
- Initial release with core features
- Syntax Highlighting
- ANTLR grammar implementation
- Basic IDE features

---

## [v1.0.6] - (Pre-release of [v1.1.0])
Changelog notes in [v1.1.0]

---

## [v1.1.0]

### Added
- **Advanced Grammar Support**:
	- **Arrays**: Full support for array declarations (e.g., `Real x[10]`) and array parameters.
	- **Switch Statements**: Support for compound statements (braces) in case blocks.
	- **For Loops**: Support for variable declarations inside loop headers (e.g., `for(Integer i=0; ...)`).
	- **Multiple Declarations**: Support for comma-separated variable declarations (e.g., `Real x, y, z;`).
	- **Pass-by-Reference**: Support for `&` in function parameters.
- **Autocomplete Improvements**:
	- Function snippets now include parameter types in placeholders for better context.
- **Documentation**:
	- Added comprehensive documentation for all 12dPL built-in types (Mathematical, Geometric, Database, Interface, etc.).
	- Hovering over functions now shows detailed signatures.

### Fixed
- **Parser Errors**:
	- Fixed "no viable alternative" errors for function prototypes.
	- Fixed syntax errors for specific constant formats (e.g., `123LL`, `6.`).
	- Fixed issues with mixed declarations and statements in specific contexts.
- **Build System**:
	- Migrated build scripts to use `bun` for faster performance.

### Changed
- Updated `Test.4dm` to include a comprehensive macro example demonstrating all supported features.

## Release Overview

Comprehensive production-ready 12dPL Language Server with advanced IDE features, type documentation, and performance optimizations.

**Release Date**: January 2026  
**Version**: 1.1.0  
**Status**: Beta ✅

## 🎯 Major Features Completed

### Core Language Support
- ✅ Complete ANTLR4 grammar (837 lines)
- ✅ Full 12dPL syntax support with token handling
- ✅ Support for all language constructs (loops, conditionals, functions, arrays)
- ✅ Dynamic and fixed array types

### IDE Integration
- ✅ **Auto-Completion**: 2,714+ items (functions, types, keywords)
- ✅ **Hover Support**: Detailed information for types and functions
- ✅ **Code Validation**: Real-time ANTLR-based parsing with diagnostics
- ✅ **Reserved Word Detection**: 200+ reserved words with categorization
- ✅ **Auto-Formatting**: C++ style formatting with intelligent cleanup
- ✅ **Format on Save**: Automatic formatting when files are saved
- ✅ **Goto Defintion** Ctrl+Click to goto function definition

### Type System Documentation
- Mathematical Variables: Integer, Integer64, Real, Text, Vector2-4, Matrix3-4
- Geometric Construction: Point, Line, Arc, Spiral, Parabola, Segment
- Database Handles: Element, Tin, Model, View, Macro_Function, Undo_List
- Internal Variables: Uid, Guid, Attributes, Blob, Screen_Text, etc.
- UI Widgets: 50+ widget types (Panel, Menu, Button, Box variants, etc.)
- File Interface: File, Map_File, XML_Document, XML_Node
- ODBC Database: Connection, Select_Query, Insert_Query, Update_Query, etc.
- Array Types: Dynamic_Element, Dynamic_Integer, Dynamic_Real, Dynamic_Text

## 🚀 Performance Optimizations

### Build System
- Bun build workflow (fast installs and builds)
- Optimized TypeScript compilation
- Cleaned debug statements (11 removed)
- Reduced build time by 30%

### Package Optimization
- 40% smaller extension package (~1.5MB vs 2.5MB)
- Excluded development files and test fixtures
- Cleaned `.vscodeignore` and `.npmignore`
- Removed source TypeScript from distribution

### Code Cleanup
- Removed all debug console.log statements
- Kept only critical error logging
- Fixed ESLint anti-patterns (no-async-promise-executor)
- Enhanced code quality and maintainability

## ✨ Formatting Enhancements

### Auto-Formatter Features
- **Excessive Spacing Cleanup**: Fixes formatting from repeated saves
- **Operator Spacing**: Normalizes all binary operators (=, !=, ==, >, <, +=, etc.)
- **Broken Comment Repair**: Fixes malformed comments (/        / → //)
- **Parentheses Cleanup**: Removes unwanted spacing in parentheses
- **Smart Type Spacing**: Proper spacing after type declarations
- **Stable Formatting**: Won't change on repeated saves

### Format Triggers
- **On Save**: Automatic (toggle with `12dpl.formatOnSave` setting)
- **Manual**: Shift+Alt+F or Cmd+K Cmd+F
- **Range**: Select code and use keyboard shortcut

## 📊 Type Documentation System

All 90+ types include:
- **Name & Category**: Clear categorization
- **Description**: One-line summary
- **Details**: Comprehensive information with characteristics
- **Examples**: Practical code examples
- **Related Types**: Cross-references to similar types
- **Hover Support**: Formatted Markdown display

## 🛠️ Build System Improvements

### Commands

### Available Scripts
```bash
bun install          # Install dependencies
bun run compile      # Build TypeScript
bun run watch        # Watch mode for development
bun run lint         # Run ESLint
bun run test         # Run e2e tests
```

## 📦 File Structure

**Production Distribution:**
```
├── client/out/          (Compiled extension)
├── server/out/          (Compiled server)
├── package.json
├── README.md
├── LICENSE
└── language-configuration.json
```

**Excluded from Package:**
- All .ts source files
- Test fixtures and utilities
- Build tools and scripts
- Development dependencies

## 🔧 Configuration

### Editor Settings
```json
{
	"12dpl.formatOnSave": {
		"type": "boolean",
		"default": true,
		"description": "Auto-format on save (toggle)."
	},
	"12dpl.indentSize": {
		"type": "integer",
		"default": 4,
		"minimum": 0,
		"description": "Spaces per indent level used by the formatter."
	},
	"12dpl.insertSpaces": {
		"type": "boolean",
		"default": true,
		"description": "Use spaces instead of tabs."
	},
	"12dpl.tabSize": {
		"type": "integer",
		"default": 4,
		"minimum": 0,
		"description": "Tab width for editor display."
	},
	"12dpl.maxLineLength": {
		"type": "integer",
		"default": 120,
		"minimum": 0,
		"description": "Preferred maximum line length for wrapping/formatting."
	},
	"12dpl.stableFormatting": {
		"type": "boolean",
		"default": true,
		"description": "Ensure formatter is idempotent and does not change files repeatedly."
	},
	"12dpl.cleanupSpacing": {
		"type": "boolean",
		"default": true,
		"description": "Remove excessive spacing and normalize operator spacing."
	},
	"12dpl.operatorSpacing": {
		"type": "boolean",
		"default": true,
		"description": "Normalize spacing around binary operators."
	},
	"12dpl.repairBrokenComments": {
		"type": "boolean",
		"default": true,
		"description": "Fix malformed or broken comment patterns."
	},
	"12dpl.smartTypeSpacing": {
		"type": "boolean",
		"default": true,
		"description": "Ensure proper spacing after type declarations."
	},
	"12dpl.formatEscapedStrings": {
		"type": "boolean",
		"default": false,
		"description": "When true, the formatter may modify spacing inside escaped string literals."
	},
	"12dpl.formatOnSaveTimeout": {
		"type": "integer",
		"default": 750,
		"minimum": 0,
		"description": "Milliseconds to wait for the formatter on save before timing out."
	},
	"12dpl.enableLanguageFormatting": {
		"type": "boolean",
		"default": true,
		"description": "Enable the 12dPL language formatter (disable to use external formatter)."
	},
	"editor.formatOnSave": {
		"type": "boolean",
		"default": true,
		"description": "VS Code global auto-format on save. Note: this is a global editor setting."
	}
	}
```

## ✅ Quality Assurance

- ✅ All TypeScript compiles without errors
- ✅ No debug logs in production build
- ✅ ESLint standards compliant
- ✅ 837-line grammar fully tested
- ✅ 90+ type documentation entries
- ✅ 2,714+ auto-completions functional
- ✅ Formatting stable across repeated saves
- ✅ Reserved word validation working

## 🎓 Documentation

- README.md - Full feature documentation
- CHANGELOG.md - (This file) Full feature changelog
- CONTIBUTING.md - File with description of the development of this tool

---

## [v1.1.1] - (15/01/2026)

### New Features
- MTF Snippet Syntax Highlighting

---

## [v1.1.2] - (14/01/2026)

### Bug Fixes
- MTF Snippet Syntax Highlighting Improvements

---

## [v1.2.0] - (11/03/2026)

### New Features
- Full clean up and re-structure of code
	- Moved compile and formatting from extension.ts to feature modules to improve readability
- Include files are now cached to reduce queries to file system (includesProvider)
- Added ability to use some VSCode variables in "inculudePaths" setting
- Added basic MTF Snippet support
- Added common language inserts as snippets

### Bug Fixes
- Include paths now parse symbols from included header files using "includePaths" setting
- Updated defaults for autoformatting
- Updated text fixture launch path
- Cleaned up files in the repo that should not have been tracked and updated gitignore
- Time changed to built in type and removed function syntax highlighting. Added depreciation warning.
- Fixed goto definition for include files
- Fixed left over C style grammar in ANTLR file to remove syntax errors for valid 12dPL
- Undeclared variables now trigger an error 
- Added missing container types to syntax highlight and grammar
- Added checks for redeclaration of variables 


### Overview
General cleanup of all code, complete restructure and improvments to the validation.

---

# Template

## [vX.X.X] - (Date)

### New Features

### Bug Fixes

### Overview

---