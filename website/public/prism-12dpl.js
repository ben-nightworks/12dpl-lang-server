/* Prism syntax highlighter for 12dPL.
   Self-contained grammar: does NOT depend on prism-clike being loaded. */
(function () {
  if (typeof window === 'undefined') return;
  var Prism = window.Prism;
  if (!Prism || !Prism.languages) {
    console.warn('[prism-12dpl] Prism core not found — syntax highlighting disabled.');
    return;
  }

  var TYPES = [
    'void', 'Integer', 'Integer64', 'Real', 'Text', 'Time',
    'Vector2', 'Vector3', 'Vector4', 'Matrix3', 'Matrix4', 'Triangle',
    'Point', 'Line', 'Arc', 'Spiral', 'Parabola', 'Segment', 'Curve', 'Polygon',
    'Element', 'Model', 'View', 'Tin', 'Folder', 'Project_Model', 'Super_String',
    'Layer', 'Macro_Function', 'Drainage', 'Pipe', 'Pit', 'Catchment',
    'Uid', 'Guid', 'Attributes', 'Attribute', 'Attribute_Blob', 'Blob',
    'Screen_Text', 'Textstyle_Data', 'Equality_Label', 'Colour', 'Symbol',
    'File', 'Map_File', 'XML_Document', 'XML_Node',
    'Connection', 'Recordset', 'Statement',
    'Select_Query', 'Insert_Query', 'Update_Query', 'Delete_Query',
    'Query_Condition',
    'Panel', 'Widget', 'Menu',
    'Button', 'Message_Box', 'Input_Box', 'Source_Box',
    'GridCtrl_Box', 'TabCtrl_Box', 'TreeCtrl_Box', 'GraphCtrl_Box',
    'File_Box', 'Element_Box', 'Model_Box', 'View_Box',
    'Choice_Box', 'Colour_Box', 'Chainage_Box', 'Angle_Box',
    'Apply_Function',
    'Undo', 'Undo_List',
    'Dynamic_Element', 'Dynamic_Real', 'Dynamic_Integer', 'Dynamic_Text',
    'Dynamic_Point', 'Dynamic_Line', 'Dynamic_Vector3'
  ];

  var KEYWORDS = [
    'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default',
    'return', 'break', 'continue', 'goto',
    'persistent', 'ascending', 'descending'
  ];

  var grammar = {
    // Order matters — Prism tries each token in declaration order.
    'comment': [
      { pattern: /\/\*[\s\S]*?\*\//, greedy: true },
      { pattern: /\/\/.*/, greedy: true }
    ],
    'string': {
      pattern: /"(?:\\.|[^"\\\r\n])*"/,
      greedy: true
    },
    'macro': {
      pattern: /^\s*#\s*\w+(?:[^\\\r\n]|\\(?:\r\n?|\n|[^\r\n]))*/m,
      alias: 'property',
      inside: {
        'string': {
          pattern: /"[^"\r\n]*"|<[^>\r\n]*>/,
          greedy: true
        },
        'directive': {
          pattern: /\b(?:include|define|undef|if|ifdef|ifndef|else|elif|endif|pragma|line|error|warning)\b/,
          alias: 'keyword'
        },
        'punctuation': /[#\\]/
      }
    },
    'class-name': new RegExp('\\b(?:' + TYPES.join('|') + ')\\b'),
    'keyword': new RegExp('\\b(?:' + KEYWORDS.join('|') + ')\\b'),
    'boolean': /\b(?:true|false)\b/,
    'function': /\b[A-Za-z_][A-Za-z0-9_]*(?=\s*\()/,
    'number': /\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/,
    'operator': /->|<<|>>|<=|>=|==|!=|&&|\|\||\+\+|--|[+\-*/%=<>!&|^~?:]/,
    'punctuation': /[{}[\];(),.]/
  };

  Prism.languages['12dpl'] = grammar;
  Prism.languages['12dPL'] = grammar;

  // Belt-and-suspenders: re-run Prism after the script tag executes.
  // Prism's auto-highlight on DOMContentLoaded normally handles this,
  // but if the page was already parsed (e.g. injected dynamically) we
  // need to highlight manually.
  function rehighlight() {
    if (Prism && typeof Prism.highlightAll === 'function') {
      try { Prism.highlightAll(); } catch (_) { /* ignore */ }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rehighlight, { once: true });
  } else {
    rehighlight();
  }
}());
