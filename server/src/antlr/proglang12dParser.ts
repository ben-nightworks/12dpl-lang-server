// Generated from server/src/proglang12d.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import proglang12dListener from "./proglang12dListener.js";
import proglang12dVisitor from "./proglang12dVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class proglang12dParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly T__34 = 35;
	public static readonly T__35 = 36;
	public static readonly T__36 = 37;
	public static readonly T__37 = 38;
	public static readonly T__38 = 39;
	public static readonly T__39 = 40;
	public static readonly T__40 = 41;
	public static readonly T__41 = 42;
	public static readonly T__42 = 43;
	public static readonly T__43 = 44;
	public static readonly T__44 = 45;
	public static readonly T__45 = 46;
	public static readonly T__46 = 47;
	public static readonly T__47 = 48;
	public static readonly T__48 = 49;
	public static readonly T__49 = 50;
	public static readonly T__50 = 51;
	public static readonly T__51 = 52;
	public static readonly T__52 = 53;
	public static readonly T__53 = 54;
	public static readonly T__54 = 55;
	public static readonly T__55 = 56;
	public static readonly T__56 = 57;
	public static readonly T__57 = 58;
	public static readonly T__58 = 59;
	public static readonly T__59 = 60;
	public static readonly T__60 = 61;
	public static readonly T__61 = 62;
	public static readonly T__62 = 63;
	public static readonly T__63 = 64;
	public static readonly T__64 = 65;
	public static readonly T__65 = 66;
	public static readonly T__66 = 67;
	public static readonly T__67 = 68;
	public static readonly T__68 = 69;
	public static readonly T__69 = 70;
	public static readonly T__70 = 71;
	public static readonly T__71 = 72;
	public static readonly T__72 = 73;
	public static readonly T__73 = 74;
	public static readonly T__74 = 75;
	public static readonly T__75 = 76;
	public static readonly T__76 = 77;
	public static readonly T__77 = 78;
	public static readonly T__78 = 79;
	public static readonly T__79 = 80;
	public static readonly T__80 = 81;
	public static readonly T__81 = 82;
	public static readonly T__82 = 83;
	public static readonly T__83 = 84;
	public static readonly T__84 = 85;
	public static readonly T__85 = 86;
	public static readonly T__86 = 87;
	public static readonly T__87 = 88;
	public static readonly T__88 = 89;
	public static readonly T__89 = 90;
	public static readonly T__90 = 91;
	public static readonly T__91 = 92;
	public static readonly T__92 = 93;
	public static readonly T__93 = 94;
	public static readonly T__94 = 95;
	public static readonly T__95 = 96;
	public static readonly T__96 = 97;
	public static readonly T__97 = 98;
	public static readonly T__98 = 99;
	public static readonly T__99 = 100;
	public static readonly T__100 = 101;
	public static readonly T__101 = 102;
	public static readonly T__102 = 103;
	public static readonly T__103 = 104;
	public static readonly T__104 = 105;
	public static readonly T__105 = 106;
	public static readonly T__106 = 107;
	public static readonly T__107 = 108;
	public static readonly T__108 = 109;
	public static readonly T__109 = 110;
	public static readonly T__110 = 111;
	public static readonly T__111 = 112;
	public static readonly T__112 = 113;
	public static readonly T__113 = 114;
	public static readonly T__114 = 115;
	public static readonly T__115 = 116;
	public static readonly T__116 = 117;
	public static readonly T__117 = 118;
	public static readonly T__118 = 119;
	public static readonly T__119 = 120;
	public static readonly T__120 = 121;
	public static readonly T__121 = 122;
	public static readonly T__122 = 123;
	public static readonly T__123 = 124;
	public static readonly T__124 = 125;
	public static readonly T__125 = 126;
	public static readonly T__126 = 127;
	public static readonly T__127 = 128;
	public static readonly T__128 = 129;
	public static readonly T__129 = 130;
	public static readonly T__130 = 131;
	public static readonly T__131 = 132;
	public static readonly T__132 = 133;
	public static readonly T__133 = 134;
	public static readonly T__134 = 135;
	public static readonly T__135 = 136;
	public static readonly T__136 = 137;
	public static readonly T__137 = 138;
	public static readonly T__138 = 139;
	public static readonly T__139 = 140;
	public static readonly T__140 = 141;
	public static readonly T__141 = 142;
	public static readonly T__142 = 143;
	public static readonly Break = 144;
	public static readonly Case = 145;
	public static readonly Char = 146;
	public static readonly Continue = 147;
	public static readonly Default = 148;
	public static readonly Do = 149;
	public static readonly Else = 150;
	public static readonly Float = 151;
	public static readonly For = 152;
	public static readonly Goto = 153;
	public static readonly If = 154;
	public static readonly Int = 155;
	public static readonly Return = 156;
	public static readonly Switch = 157;
	public static readonly Void = 158;
	public static readonly While = 159;
	public static readonly Auto = 160;
	public static readonly Class = 161;
	public static readonly Const = 162;
	public static readonly Delete = 163;
	public static readonly Enum = 164;
	public static readonly Extern = 165;
	public static readonly Friend = 166;
	public static readonly Inline = 167;
	public static readonly New = 168;
	public static readonly Operator = 169;
	public static readonly Private = 170;
	public static readonly Protected = 171;
	public static readonly Public = 172;
	public static readonly Register = 173;
	public static readonly Signed = 174;
	public static readonly Sizeof = 175;
	public static readonly Static = 176;
	public static readonly Struct = 177;
	public static readonly Template = 178;
	public static readonly This = 179;
	public static readonly Throw = 180;
	public static readonly Try = 181;
	public static readonly Typedef = 182;
	public static readonly Union = 183;
	public static readonly Unsigned = 184;
	public static readonly Virtual = 185;
	public static readonly Volatile = 186;
	public static readonly LeftParen = 187;
	public static readonly RightParen = 188;
	public static readonly LeftBracket = 189;
	public static readonly RightBracket = 190;
	public static readonly LeftBrace = 191;
	public static readonly RightBrace = 192;
	public static readonly Less = 193;
	public static readonly LessEqual = 194;
	public static readonly Greater = 195;
	public static readonly GreaterEqual = 196;
	public static readonly LeftShift = 197;
	public static readonly RightShift = 198;
	public static readonly Plus = 199;
	public static readonly PlusPlus = 200;
	public static readonly Minus = 201;
	public static readonly MinusMinus = 202;
	public static readonly Star = 203;
	public static readonly Div = 204;
	public static readonly Mod = 205;
	public static readonly And = 206;
	public static readonly Or = 207;
	public static readonly AndAnd = 208;
	public static readonly OrOr = 209;
	public static readonly Caret = 210;
	public static readonly Not = 211;
	public static readonly Question = 212;
	public static readonly Colon = 213;
	public static readonly Semi = 214;
	public static readonly Comma = 215;
	public static readonly Assign = 216;
	public static readonly StarAssign = 217;
	public static readonly DivAssign = 218;
	public static readonly ModAssign = 219;
	public static readonly PlusAssign = 220;
	public static readonly MinusAssign = 221;
	public static readonly LeftShiftAssign = 222;
	public static readonly RightShiftAssign = 223;
	public static readonly AndAssign = 224;
	public static readonly XorAssign = 225;
	public static readonly OrAssign = 226;
	public static readonly Equal = 227;
	public static readonly NotEqual = 228;
	public static readonly Dot = 229;
	public static readonly Ellipsis = 230;
	public static readonly Identifier = 231;
	public static readonly Constant = 232;
	public static readonly DigitSequence = 233;
	public static readonly StringLiteral = 234;
	public static readonly ComplexDefine = 235;
	public static readonly IncludeDirective = 236;
	public static readonly AsmBlock = 237;
	public static readonly LineAfterPreprocessing = 238;
	public static readonly LineDirective = 239;
	public static readonly PragmaDirective = 240;
	public static readonly Whitespace = 241;
	public static readonly Newline = 242;
	public static readonly BlockComment = 243;
	public static readonly LineComment = 244;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_primaryExpression = 0;
	public static readonly RULE_genericAssocList = 1;
	public static readonly RULE_genericAssociation = 2;
	public static readonly RULE_postfixExpression = 3;
	public static readonly RULE_argumentExpressionList = 4;
	public static readonly RULE_unaryExpression = 5;
	public static readonly RULE_unaryOperator = 6;
	public static readonly RULE_castExpression = 7;
	public static readonly RULE_multiplicativeExpression = 8;
	public static readonly RULE_additiveExpression = 9;
	public static readonly RULE_shiftExpression = 10;
	public static readonly RULE_relationalExpression = 11;
	public static readonly RULE_equalityExpression = 12;
	public static readonly RULE_andExpression = 13;
	public static readonly RULE_exclusiveOrExpression = 14;
	public static readonly RULE_inclusiveOrExpression = 15;
	public static readonly RULE_logicalAndExpression = 16;
	public static readonly RULE_logicalOrExpression = 17;
	public static readonly RULE_conditionalExpression = 18;
	public static readonly RULE_assignmentExpression = 19;
	public static readonly RULE_assignmentOperator = 20;
	public static readonly RULE_expression = 21;
	public static readonly RULE_constantExpression = 22;
	public static readonly RULE_declaration = 23;
	public static readonly RULE_initDeclaratorList = 24;
	public static readonly RULE_initDeclarator = 25;
	public static readonly RULE_declarationSpecifiers = 26;
	public static readonly RULE_declarationSpecifiers2 = 27;
	public static readonly RULE_declarationSpecifier = 28;
	public static readonly RULE_typeSpecifier = 29;
	public static readonly RULE_builtInTypeSpecifier = 30;
	public static readonly RULE_specifierQualifierList = 31;
	public static readonly RULE_declarator = 32;
	public static readonly RULE_directDeclarator = 33;
	public static readonly RULE_nestedParenthesesBlock = 34;
	public static readonly RULE_parameterTypeList = 35;
	public static readonly RULE_parameterList = 36;
	public static readonly RULE_parameterDeclaration = 37;
	public static readonly RULE_identifierList = 38;
	public static readonly RULE_typeName = 39;
	public static readonly RULE_directAbstractDeclarator = 40;
	public static readonly RULE_typedefName = 41;
	public static readonly RULE_initializer = 42;
	public static readonly RULE_initializerList = 43;
	public static readonly RULE_designation = 44;
	public static readonly RULE_designatorList = 45;
	public static readonly RULE_designator = 46;
	public static readonly RULE_statement = 47;
	public static readonly RULE_labeledStatement = 48;
	public static readonly RULE_compoundStatement = 49;
	public static readonly RULE_blockItemList = 50;
	public static readonly RULE_blockItem = 51;
	public static readonly RULE_expressionStatement = 52;
	public static readonly RULE_selectionStatement = 53;
	public static readonly RULE_iterationStatement = 54;
	public static readonly RULE_forCondition = 55;
	public static readonly RULE_forDeclaration = 56;
	public static readonly RULE_forExpression = 57;
	public static readonly RULE_jumpStatement = 58;
	public static readonly RULE_compilationUnit = 59;
	public static readonly RULE_translationUnit = 60;
	public static readonly RULE_externalDeclaration = 61;
	public static readonly RULE_functionDefinition = 62;
	public static readonly RULE_declarationList = 63;
	public static readonly literalNames: (string | null)[] = [ null, "'->'", 
                                                            "'~'", "'Element'", 
                                                            "'Model'", "'Dynamic_Element'", 
                                                            "'Tin'", "'Menu'", 
                                                            "'Dynamic_Text'", 
                                                            "'Point'", "'Line'", 
                                                            "'Arc'", "'Segment'", 
                                                            "'File'", "'View'", 
                                                            "'Panel'", "'Vertical_Group'", 
                                                            "'Horizontal_Group'", 
                                                            "'Message_Box'", 
                                                            "'Model_Box'", 
                                                            "'Named_Tick_Box'", 
                                                            "'Button'", 
                                                            "'Widget'", 
                                                            "'Map_File'", 
                                                            "'Select_Button'", 
                                                            "'Select_Box'", 
                                                            "'Select_Boxes'", 
                                                            "'Angle_Box'", 
                                                            "'Choice_Box'", 
                                                            "'Colour_Box'", 
                                                            "'Directory_Box'", 
                                                            "'Real_Box'", 
                                                            "'File_Box'", 
                                                            "'Input_Box'", 
                                                            "'Integer_Box'", 
                                                            "'Justify_Box'", 
                                                            "'Linestyle_Box'", 
                                                            "'Map_File_Box'", 
                                                            "'Name_Box'", 
                                                            "'Plotter_Box'", 
                                                            "'Report_Box'", 
                                                            "'Template_Box'", 
                                                            "'Sheet_Size_Box'", 
                                                            "'Text_Style_Box'", 
                                                            "'Text_Units_Box'", 
                                                            "'Tick_Box'", 
                                                            "'Tin_Box'", 
                                                            "'View_Box'", 
                                                            "'XYZ_Box'", 
                                                            "'Apply_Many_Function'", 
                                                            "'Kerb_Return_Function'", 
                                                            "'Function'", 
                                                            "'Macro_Function'", 
                                                            "'Apply_Function'", 
                                                            "'Function_Box'", 
                                                            "'Widget_Pages'", 
                                                            "'Sheet_Panel'", 
                                                            "'List_Box'", 
                                                            "'Draw_Box'", 
                                                            "'Screen_Text'", 
                                                            "'Text_Edit_Box'", 
                                                            "'Overlay_Widget'", 
                                                            "'Tab_Box'", 
                                                            "'ListCtrl_Box'", 
                                                            "'Bitmap_List_Box'", 
                                                            "'Undo_List'", 
                                                            "'Undo'", "'Textstyle_Data'", 
                                                            "'Textstyle_Data_Box'", 
                                                            "'Source_Box'", 
                                                            "'Target_Box'", 
                                                            "'SDR_Attribute'", 
                                                            "'Dynamic_Integer'", 
                                                            "'Dynamic_Real'", 
                                                            "'Spiral'", 
                                                            "'Parabola'", 
                                                            "'Billboard_Box'", 
                                                            "'Texture_Box'", 
                                                            "'Bitmap_Fill_Box'", 
                                                            "'Date_Time_Box'", 
                                                            "'HyperLink_Box'", 
                                                            "'Uid'", "'Attributes'", 
                                                            "'Symbol_Box'", 
                                                            "'Chainage_Box'", 
                                                            "'Graph_Box'", 
                                                            "'Attributes_Box'", 
                                                            "'Equality_Info'", 
                                                            "'Equality_Label'", 
                                                            "'New_Select_Box'", 
                                                            "'Polygon_Box'", 
                                                            "'New_XYZ_Box'", 
                                                            "'Vector2'", 
                                                            "'Vector3'", 
                                                            "'Vector4'", 
                                                            "'Matrix3'", 
                                                            "'Matrix4'", 
                                                            "'GridCtrl_Box'", 
                                                            "'XML_Document'", 
                                                            "'XML_Node'", 
                                                            "'Plot_Parameter_File'", 
                                                            "'Connection'", 
                                                            "'Select_Query'", 
                                                            "'Database_Result'", 
                                                            "'Insert_Query'", 
                                                            "'Update_Query'", 
                                                            "'Delete_Query'", 
                                                            "'Manual_Query'", 
                                                            "'Transaction'", 
                                                            "'Query_Condition'", 
                                                            "'Parameter_Collection'", 
                                                            "'Manual_Condition'", 
                                                            "'Tree_Box'", 
                                                            "'Tree_Page'", 
                                                            "'Colour_Message_Box'", 
                                                            "'Unknown'", 
                                                            "'Log_Line'", 
                                                            "'Log_Box'", 
                                                            "'Slider_Box'", 
                                                            "'Function_Property_Collection'", 
                                                            "'Curve'", "'Integer64'", 
                                                            "'Guid'", "'Attribute_Blob'", 
                                                            "'Attribute'", 
                                                            "'Functions'", 
                                                            "'Database_Results'", 
                                                            "'Transactions'", 
                                                            "'Dynamic_Integer64'", 
                                                            "'Colour'", 
                                                            "'Time'", "'Drainage_Network'", 
                                                            "'Integer_Set'", 
                                                            "'List'", "'Process_Handle'", 
                                                            "'Real_Set'", 
                                                            "'Selection'", 
                                                            "'String'", 
                                                            "'Text_Set'", 
                                                            "'Time_Zone_Box'", 
                                                            "'Time_Zone_Box_Box'", 
                                                            "'__asm'", "'__asm__'", 
                                                            "'__volatile__'", 
                                                            "'break'", "'case'", 
                                                            "'Text'", "'continue'", 
                                                            "'default'", 
                                                            "'do'", "'else'", 
                                                            "'Real'", "'for'", 
                                                            "'goto'", "'if'", 
                                                            "'Integer'", 
                                                            "'return'", 
                                                            "'switch'", 
                                                            "'void'", "'while'", 
                                                            "'auto'", "'class'", 
                                                            "'const'", "'delete'", 
                                                            "'enum'", "'extern'", 
                                                            "'friend'", 
                                                            "'inline'", 
                                                            "'new'", "'operator'", 
                                                            "'private'", 
                                                            "'protected'", 
                                                            "'public'", 
                                                            "'register'", 
                                                            "'signed'", 
                                                            "'sizeof'", 
                                                            "'static'", 
                                                            "'struct'", 
                                                            "'template'", 
                                                            "'this'", "'throw'", 
                                                            "'try'", "'typedef'", 
                                                            "'union'", "'unsigned'", 
                                                            "'virtual'", 
                                                            "'volatile'", 
                                                            "'('", "')'", 
                                                            "'['", "']'", 
                                                            "'{'", "'}'", 
                                                            "'<'", "'<='", 
                                                            "'>'", "'>='", 
                                                            "'<<'", "'>>'", 
                                                            "'+'", "'++'", 
                                                            "'-'", "'--'", 
                                                            "'*'", "'/'", 
                                                            "'%'", "'&'", 
                                                            "'|'", "'&&'", 
                                                            "'||'", "'^'", 
                                                            "'!'", "'?'", 
                                                            "':'", "';'", 
                                                            "','", "'='", 
                                                            "'*='", "'/='", 
                                                            "'%='", "'+='", 
                                                            "'-='", "'<<='", 
                                                            "'>>='", "'&='", 
                                                            "'^='", "'|='", 
                                                            "'=='", "'!='", 
                                                            "'.'", "'...'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "Break", "Case", 
                                                             "Char", "Continue", 
                                                             "Default", 
                                                             "Do", "Else", 
                                                             "Float", "For", 
                                                             "Goto", "If", 
                                                             "Int", "Return", 
                                                             "Switch", "Void", 
                                                             "While", "Auto", 
                                                             "Class", "Const", 
                                                             "Delete", "Enum", 
                                                             "Extern", "Friend", 
                                                             "Inline", "New", 
                                                             "Operator", 
                                                             "Private", 
                                                             "Protected", 
                                                             "Public", "Register", 
                                                             "Signed", "Sizeof", 
                                                             "Static", "Struct", 
                                                             "Template", 
                                                             "This", "Throw", 
                                                             "Try", "Typedef", 
                                                             "Union", "Unsigned", 
                                                             "Virtual", 
                                                             "Volatile", 
                                                             "LeftParen", 
                                                             "RightParen", 
                                                             "LeftBracket", 
                                                             "RightBracket", 
                                                             "LeftBrace", 
                                                             "RightBrace", 
                                                             "Less", "LessEqual", 
                                                             "Greater", 
                                                             "GreaterEqual", 
                                                             "LeftShift", 
                                                             "RightShift", 
                                                             "Plus", "PlusPlus", 
                                                             "Minus", "MinusMinus", 
                                                             "Star", "Div", 
                                                             "Mod", "And", 
                                                             "Or", "AndAnd", 
                                                             "OrOr", "Caret", 
                                                             "Not", "Question", 
                                                             "Colon", "Semi", 
                                                             "Comma", "Assign", 
                                                             "StarAssign", 
                                                             "DivAssign", 
                                                             "ModAssign", 
                                                             "PlusAssign", 
                                                             "MinusAssign", 
                                                             "LeftShiftAssign", 
                                                             "RightShiftAssign", 
                                                             "AndAssign", 
                                                             "XorAssign", 
                                                             "OrAssign", 
                                                             "Equal", "NotEqual", 
                                                             "Dot", "Ellipsis", 
                                                             "Identifier", 
                                                             "Constant", 
                                                             "DigitSequence", 
                                                             "StringLiteral", 
                                                             "ComplexDefine", 
                                                             "IncludeDirective", 
                                                             "AsmBlock", 
                                                             "LineAfterPreprocessing", 
                                                             "LineDirective", 
                                                             "PragmaDirective", 
                                                             "Whitespace", 
                                                             "Newline", 
                                                             "BlockComment", 
                                                             "LineComment" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"primaryExpression", "genericAssocList", "genericAssociation", "postfixExpression", 
		"argumentExpressionList", "unaryExpression", "unaryOperator", "castExpression", 
		"multiplicativeExpression", "additiveExpression", "shiftExpression", "relationalExpression", 
		"equalityExpression", "andExpression", "exclusiveOrExpression", "inclusiveOrExpression", 
		"logicalAndExpression", "logicalOrExpression", "conditionalExpression", 
		"assignmentExpression", "assignmentOperator", "expression", "constantExpression", 
		"declaration", "initDeclaratorList", "initDeclarator", "declarationSpecifiers", 
		"declarationSpecifiers2", "declarationSpecifier", "typeSpecifier", "builtInTypeSpecifier", 
		"specifierQualifierList", "declarator", "directDeclarator", "nestedParenthesesBlock", 
		"parameterTypeList", "parameterList", "parameterDeclaration", "identifierList", 
		"typeName", "directAbstractDeclarator", "typedefName", "initializer", 
		"initializerList", "designation", "designatorList", "designator", "statement", 
		"labeledStatement", "compoundStatement", "blockItemList", "blockItem", 
		"expressionStatement", "selectionStatement", "iterationStatement", "forCondition", 
		"forDeclaration", "forExpression", "jumpStatement", "compilationUnit", 
		"translationUnit", "externalDeclaration", "functionDefinition", "declarationList",
	];
	public get grammarFileName(): string { return "proglang12d.g4"; }
	public get literalNames(): (string | null)[] { return proglang12dParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return proglang12dParser.symbolicNames; }
	public get ruleNames(): string[] { return proglang12dParser.ruleNames; }
	public get serializedATN(): number[] { return proglang12dParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, proglang12dParser._ATN, proglang12dParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public primaryExpression(): PrimaryExpressionContext {
		let localctx: PrimaryExpressionContext = new PrimaryExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, proglang12dParser.RULE_primaryExpression);
		let _la: number;
		try {
			this.state = 139;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 231:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 128;
				this.match(proglang12dParser.Identifier);
				}
				break;
			case 232:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 129;
				this.match(proglang12dParser.Constant);
				}
				break;
			case 234:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 131;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 130;
					this.match(proglang12dParser.StringLiteral);
					}
					}
					this.state = 133;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===234);
				}
				break;
			case 187:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 135;
				this.match(proglang12dParser.LeftParen);
				this.state = 136;
				this.expression();
				this.state = 137;
				this.match(proglang12dParser.RightParen);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public genericAssocList(): GenericAssocListContext {
		let localctx: GenericAssocListContext = new GenericAssocListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, proglang12dParser.RULE_genericAssocList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 141;
			this.genericAssociation();
			this.state = 146;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===215) {
				{
				{
				this.state = 142;
				this.match(proglang12dParser.Comma);
				this.state = 143;
				this.genericAssociation();
				}
				}
				this.state = 148;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public genericAssociation(): GenericAssociationContext {
		let localctx: GenericAssociationContext = new GenericAssociationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, proglang12dParser.RULE_genericAssociation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 151;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 146:
			case 151:
			case 155:
			case 158:
				{
				this.state = 149;
				this.typeName();
				}
				break;
			case 148:
				{
				this.state = 150;
				this.match(proglang12dParser.Default);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 153;
			this.match(proglang12dParser.Colon);
			this.state = 154;
			this.assignmentExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public postfixExpression(): PostfixExpressionContext {
		let localctx: PostfixExpressionContext = new PostfixExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, proglang12dParser.RULE_postfixExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 156;
			this.primaryExpression();
			this.state = 172;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1 || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 40965) !== 0) || _la===229) {
				{
				this.state = 170;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 189:
					{
					this.state = 157;
					this.match(proglang12dParser.LeftBracket);
					this.state = 158;
					this.expression();
					this.state = 159;
					this.match(proglang12dParser.RightBracket);
					}
					break;
				case 187:
					{
					this.state = 161;
					this.match(proglang12dParser.LeftParen);
					this.state = 163;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===2 || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 19525633) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & 15) !== 0)) {
						{
						this.state = 162;
						this.argumentExpressionList();
						}
					}

					this.state = 165;
					this.match(proglang12dParser.RightParen);
					}
					break;
				case 1:
				case 229:
					{
					this.state = 166;
					_la = this._input.LA(1);
					if(!(_la===1 || _la===229)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					this.state = 167;
					this.match(proglang12dParser.Identifier);
					}
					break;
				case 200:
					{
					this.state = 168;
					this.match(proglang12dParser.PlusPlus);
					}
					break;
				case 202:
					{
					this.state = 169;
					this.match(proglang12dParser.MinusMinus);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 174;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public argumentExpressionList(): ArgumentExpressionListContext {
		let localctx: ArgumentExpressionListContext = new ArgumentExpressionListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, proglang12dParser.RULE_argumentExpressionList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 175;
			this.assignmentExpression();
			this.state = 180;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===215) {
				{
				{
				this.state = 176;
				this.match(proglang12dParser.Comma);
				this.state = 177;
				this.assignmentExpression();
				}
				}
				this.state = 182;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public unaryExpression(): UnaryExpressionContext {
		let localctx: UnaryExpressionContext = new UnaryExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, proglang12dParser.RULE_unaryExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 186;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===200 || _la===202) {
				{
				{
				this.state = 183;
				_la = this._input.LA(1);
				if(!(_la===200 || _la===202)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				}
				this.state = 188;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 195;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 187:
			case 231:
			case 232:
			case 234:
				{
				this.state = 189;
				this.postfixExpression();
				}
				break;
			case 2:
			case 199:
			case 201:
			case 203:
			case 206:
			case 211:
				{
				this.state = 190;
				this.unaryOperator();
				this.state = 191;
				this.castExpression();
				}
				break;
			case 208:
				{
				this.state = 193;
				this.match(proglang12dParser.AndAnd);
				this.state = 194;
				this.match(proglang12dParser.Identifier);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public unaryOperator(): UnaryOperatorContext {
		let localctx: UnaryOperatorContext = new UnaryOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, proglang12dParser.RULE_unaryOperator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 197;
			_la = this._input.LA(1);
			if(!(_la===2 || ((((_la - 199)) & ~0x1F) === 0 && ((1 << (_la - 199)) & 4245) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public castExpression(): CastExpressionContext {
		let localctx: CastExpressionContext = new CastExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, proglang12dParser.RULE_castExpression);
		try {
			this.state = 201;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
			case 187:
			case 199:
			case 200:
			case 201:
			case 202:
			case 203:
			case 206:
			case 208:
			case 211:
			case 231:
			case 232:
			case 234:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 199;
				this.unaryExpression();
				}
				break;
			case 233:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 200;
				this.match(proglang12dParser.DigitSequence);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public multiplicativeExpression(): MultiplicativeExpressionContext {
		let localctx: MultiplicativeExpressionContext = new MultiplicativeExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, proglang12dParser.RULE_multiplicativeExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 203;
			this.castExpression();
			this.state = 208;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 7) !== 0)) {
				{
				{
				this.state = 204;
				_la = this._input.LA(1);
				if(!(((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 7) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 205;
				this.castExpression();
				}
				}
				this.state = 210;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public additiveExpression(): AdditiveExpressionContext {
		let localctx: AdditiveExpressionContext = new AdditiveExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, proglang12dParser.RULE_additiveExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 211;
			this.multiplicativeExpression();
			this.state = 216;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===199 || _la===201) {
				{
				{
				this.state = 212;
				_la = this._input.LA(1);
				if(!(_la===199 || _la===201)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 213;
				this.multiplicativeExpression();
				}
				}
				this.state = 218;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public shiftExpression(): ShiftExpressionContext {
		let localctx: ShiftExpressionContext = new ShiftExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, proglang12dParser.RULE_shiftExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 219;
			this.additiveExpression();
			this.state = 224;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===197 || _la===198) {
				{
				{
				this.state = 220;
				_la = this._input.LA(1);
				if(!(_la===197 || _la===198)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 221;
				this.additiveExpression();
				}
				}
				this.state = 226;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public relationalExpression(): RelationalExpressionContext {
		let localctx: RelationalExpressionContext = new RelationalExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, proglang12dParser.RULE_relationalExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 227;
			this.shiftExpression();
			this.state = 232;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 193)) & ~0x1F) === 0 && ((1 << (_la - 193)) & 15) !== 0)) {
				{
				{
				this.state = 228;
				_la = this._input.LA(1);
				if(!(((((_la - 193)) & ~0x1F) === 0 && ((1 << (_la - 193)) & 15) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 229;
				this.shiftExpression();
				}
				}
				this.state = 234;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public equalityExpression(): EqualityExpressionContext {
		let localctx: EqualityExpressionContext = new EqualityExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, proglang12dParser.RULE_equalityExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 235;
			this.relationalExpression();
			this.state = 240;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===227 || _la===228) {
				{
				{
				this.state = 236;
				_la = this._input.LA(1);
				if(!(_la===227 || _la===228)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 237;
				this.relationalExpression();
				}
				}
				this.state = 242;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public andExpression(): AndExpressionContext {
		let localctx: AndExpressionContext = new AndExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, proglang12dParser.RULE_andExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 243;
			this.equalityExpression();
			this.state = 248;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===206) {
				{
				{
				this.state = 244;
				this.match(proglang12dParser.And);
				this.state = 245;
				this.equalityExpression();
				}
				}
				this.state = 250;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public exclusiveOrExpression(): ExclusiveOrExpressionContext {
		let localctx: ExclusiveOrExpressionContext = new ExclusiveOrExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, proglang12dParser.RULE_exclusiveOrExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 251;
			this.andExpression();
			this.state = 256;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===210) {
				{
				{
				this.state = 252;
				this.match(proglang12dParser.Caret);
				this.state = 253;
				this.andExpression();
				}
				}
				this.state = 258;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public inclusiveOrExpression(): InclusiveOrExpressionContext {
		let localctx: InclusiveOrExpressionContext = new InclusiveOrExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, proglang12dParser.RULE_inclusiveOrExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 259;
			this.exclusiveOrExpression();
			this.state = 264;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===207) {
				{
				{
				this.state = 260;
				this.match(proglang12dParser.Or);
				this.state = 261;
				this.exclusiveOrExpression();
				}
				}
				this.state = 266;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public logicalAndExpression(): LogicalAndExpressionContext {
		let localctx: LogicalAndExpressionContext = new LogicalAndExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, proglang12dParser.RULE_logicalAndExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 267;
			this.inclusiveOrExpression();
			this.state = 272;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===208) {
				{
				{
				this.state = 268;
				this.match(proglang12dParser.AndAnd);
				this.state = 269;
				this.inclusiveOrExpression();
				}
				}
				this.state = 274;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public logicalOrExpression(): LogicalOrExpressionContext {
		let localctx: LogicalOrExpressionContext = new LogicalOrExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, proglang12dParser.RULE_logicalOrExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 275;
			this.logicalAndExpression();
			this.state = 280;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===209) {
				{
				{
				this.state = 276;
				this.match(proglang12dParser.OrOr);
				this.state = 277;
				this.logicalAndExpression();
				}
				}
				this.state = 282;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public conditionalExpression(): ConditionalExpressionContext {
		let localctx: ConditionalExpressionContext = new ConditionalExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, proglang12dParser.RULE_conditionalExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 283;
			this.logicalOrExpression();
			this.state = 289;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===212) {
				{
				this.state = 284;
				this.match(proglang12dParser.Question);
				this.state = 285;
				this.expression();
				this.state = 286;
				this.match(proglang12dParser.Colon);
				this.state = 287;
				this.conditionalExpression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignmentExpression(): AssignmentExpressionContext {
		let localctx: AssignmentExpressionContext = new AssignmentExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, proglang12dParser.RULE_assignmentExpression);
		try {
			this.state = 297;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 291;
				this.conditionalExpression();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 292;
				this.unaryExpression();
				this.state = 293;
				this.assignmentOperator();
				this.state = 294;
				this.assignmentExpression();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 296;
				this.match(proglang12dParser.DigitSequence);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignmentOperator(): AssignmentOperatorContext {
		let localctx: AssignmentOperatorContext = new AssignmentOperatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, proglang12dParser.RULE_assignmentOperator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 299;
			_la = this._input.LA(1);
			if(!(((((_la - 216)) & ~0x1F) === 0 && ((1 << (_la - 216)) & 2047) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, proglang12dParser.RULE_expression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 301;
			this.assignmentExpression();
			this.state = 306;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===215) {
				{
				{
				this.state = 302;
				this.match(proglang12dParser.Comma);
				this.state = 303;
				this.assignmentExpression();
				}
				}
				this.state = 308;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public constantExpression(): ConstantExpressionContext {
		let localctx: ConstantExpressionContext = new ConstantExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, proglang12dParser.RULE_constantExpression);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 309;
			this.conditionalExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declaration(): DeclarationContext {
		let localctx: DeclarationContext = new DeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, proglang12dParser.RULE_declaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 311;
			this.declarationSpecifiers();
			this.state = 312;
			this.initDeclaratorList();
			this.state = 313;
			this.match(proglang12dParser.Semi);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public initDeclaratorList(): InitDeclaratorListContext {
		let localctx: InitDeclaratorListContext = new InitDeclaratorListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, proglang12dParser.RULE_initDeclaratorList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 315;
			this.initDeclarator();
			this.state = 320;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===215) {
				{
				{
				this.state = 316;
				this.match(proglang12dParser.Comma);
				this.state = 317;
				this.initDeclarator();
				}
				}
				this.state = 322;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public initDeclarator(): InitDeclaratorContext {
		let localctx: InitDeclaratorContext = new InitDeclaratorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, proglang12dParser.RULE_initDeclarator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 323;
			this.declarator();
			this.state = 326;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===216) {
				{
				this.state = 324;
				this.match(proglang12dParser.Assign);
				this.state = 325;
				this.initializer();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declarationSpecifiers(): DeclarationSpecifiersContext {
		let localctx: DeclarationSpecifiersContext = new DeclarationSpecifiersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, proglang12dParser.RULE_declarationSpecifiers);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 329;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 328;
				this.declarationSpecifier();
				}
				}
				this.state = 331;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967288) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216618495) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declarationSpecifiers2(): DeclarationSpecifiers2Context {
		let localctx: DeclarationSpecifiers2Context = new DeclarationSpecifiers2Context(this, this._ctx, this.state);
		this.enterRule(localctx, 54, proglang12dParser.RULE_declarationSpecifiers2);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 334;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 333;
				this.declarationSpecifier();
				}
				}
				this.state = 336;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967288) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216618495) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declarationSpecifier(): DeclarationSpecifierContext {
		let localctx: DeclarationSpecifierContext = new DeclarationSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, proglang12dParser.RULE_declarationSpecifier);
		try {
			this.state = 340;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 146:
			case 151:
			case 155:
			case 158:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 338;
				this.typeSpecifier();
				}
				break;
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
			case 27:
			case 28:
			case 29:
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 75:
			case 76:
			case 77:
			case 78:
			case 79:
			case 80:
			case 81:
			case 82:
			case 83:
			case 84:
			case 85:
			case 86:
			case 87:
			case 88:
			case 89:
			case 90:
			case 91:
			case 92:
			case 93:
			case 94:
			case 95:
			case 96:
			case 97:
			case 98:
			case 99:
			case 100:
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
			case 106:
			case 107:
			case 108:
			case 109:
			case 110:
			case 111:
			case 112:
			case 113:
			case 114:
			case 115:
			case 116:
			case 117:
			case 118:
			case 119:
			case 120:
			case 121:
			case 122:
			case 123:
			case 124:
			case 125:
			case 126:
			case 127:
			case 128:
			case 129:
			case 130:
			case 131:
			case 132:
			case 133:
			case 134:
			case 135:
			case 136:
			case 137:
			case 138:
			case 139:
			case 140:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 339;
				this.builtInTypeSpecifier();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeSpecifier(): TypeSpecifierContext {
		let localctx: TypeSpecifierContext = new TypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, proglang12dParser.RULE_typeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 342;
			_la = this._input.LA(1);
			if(!(((((_la - 146)) & ~0x1F) === 0 && ((1 << (_la - 146)) & 4641) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public builtInTypeSpecifier(): BuiltInTypeSpecifierContext {
		let localctx: BuiltInTypeSpecifierContext = new BuiltInTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, proglang12dParser.RULE_builtInTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 344;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967288) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 8191) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public specifierQualifierList(): SpecifierQualifierListContext {
		let localctx: SpecifierQualifierListContext = new SpecifierQualifierListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, proglang12dParser.RULE_specifierQualifierList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 346;
			this.typeSpecifier();
			this.state = 348;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 146)) & ~0x1F) === 0 && ((1 << (_la - 146)) & 4641) !== 0)) {
				{
				this.state = 347;
				this.specifierQualifierList();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declarator(): DeclaratorContext {
		let localctx: DeclaratorContext = new DeclaratorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, proglang12dParser.RULE_declarator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 350;
			this.directDeclarator(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public directDeclarator(): DirectDeclaratorContext;
	public directDeclarator(_p: number): DirectDeclaratorContext;
	// @RuleVersion(0)
	public directDeclarator(_p?: number): DirectDeclaratorContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: DirectDeclaratorContext = new DirectDeclaratorContext(this, this._ctx, _parentState);
		let _prevctx: DirectDeclaratorContext = localctx;
		let _startState: number = 66;
		this.enterRecursionRule(localctx, 66, proglang12dParser.RULE_directDeclarator, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 353;
			this.match(proglang12dParser.Identifier);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 374;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 372;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 32, this._ctx) ) {
					case 1:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directDeclarator);
						this.state = 355;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 356;
						this.match(proglang12dParser.LeftBracket);
						this.state = 358;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===2 || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 19525633) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & 15) !== 0)) {
							{
							this.state = 357;
							this.constantExpression();
							}
						}

						this.state = 360;
						this.match(proglang12dParser.RightBracket);
						}
						break;
					case 2:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directDeclarator);
						this.state = 361;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 362;
						this.match(proglang12dParser.LeftParen);
						this.state = 363;
						this.parameterTypeList();
						this.state = 364;
						this.match(proglang12dParser.RightParen);
						}
						break;
					case 3:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directDeclarator);
						this.state = 366;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 367;
						this.match(proglang12dParser.LeftParen);
						this.state = 369;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===231) {
							{
							this.state = 368;
							this.identifierList();
							}
						}

						this.state = 371;
						this.match(proglang12dParser.RightParen);
						}
						break;
					}
					}
				}
				this.state = 376;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public nestedParenthesesBlock(): NestedParenthesesBlockContext {
		let localctx: NestedParenthesesBlockContext = new NestedParenthesesBlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, proglang12dParser.RULE_nestedParenthesesBlock);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 384;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4026531839) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 2097151) !== 0)) {
				{
				this.state = 382;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
				case 12:
				case 13:
				case 14:
				case 15:
				case 16:
				case 17:
				case 18:
				case 19:
				case 20:
				case 21:
				case 22:
				case 23:
				case 24:
				case 25:
				case 26:
				case 27:
				case 28:
				case 29:
				case 30:
				case 31:
				case 32:
				case 33:
				case 34:
				case 35:
				case 36:
				case 37:
				case 38:
				case 39:
				case 40:
				case 41:
				case 42:
				case 43:
				case 44:
				case 45:
				case 46:
				case 47:
				case 48:
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57:
				case 58:
				case 59:
				case 60:
				case 61:
				case 62:
				case 63:
				case 64:
				case 65:
				case 66:
				case 67:
				case 68:
				case 69:
				case 70:
				case 71:
				case 72:
				case 73:
				case 74:
				case 75:
				case 76:
				case 77:
				case 78:
				case 79:
				case 80:
				case 81:
				case 82:
				case 83:
				case 84:
				case 85:
				case 86:
				case 87:
				case 88:
				case 89:
				case 90:
				case 91:
				case 92:
				case 93:
				case 94:
				case 95:
				case 96:
				case 97:
				case 98:
				case 99:
				case 100:
				case 101:
				case 102:
				case 103:
				case 104:
				case 105:
				case 106:
				case 107:
				case 108:
				case 109:
				case 110:
				case 111:
				case 112:
				case 113:
				case 114:
				case 115:
				case 116:
				case 117:
				case 118:
				case 119:
				case 120:
				case 121:
				case 122:
				case 123:
				case 124:
				case 125:
				case 126:
				case 127:
				case 128:
				case 129:
				case 130:
				case 131:
				case 132:
				case 133:
				case 134:
				case 135:
				case 136:
				case 137:
				case 138:
				case 139:
				case 140:
				case 141:
				case 142:
				case 143:
				case 144:
				case 145:
				case 146:
				case 147:
				case 148:
				case 149:
				case 150:
				case 151:
				case 152:
				case 153:
				case 154:
				case 155:
				case 156:
				case 157:
				case 158:
				case 159:
				case 160:
				case 161:
				case 162:
				case 163:
				case 164:
				case 165:
				case 166:
				case 167:
				case 168:
				case 169:
				case 170:
				case 171:
				case 172:
				case 173:
				case 174:
				case 175:
				case 176:
				case 177:
				case 178:
				case 179:
				case 180:
				case 181:
				case 182:
				case 183:
				case 184:
				case 185:
				case 186:
				case 189:
				case 190:
				case 191:
				case 192:
				case 193:
				case 194:
				case 195:
				case 196:
				case 197:
				case 198:
				case 199:
				case 200:
				case 201:
				case 202:
				case 203:
				case 204:
				case 205:
				case 206:
				case 207:
				case 208:
				case 209:
				case 210:
				case 211:
				case 212:
				case 213:
				case 214:
				case 215:
				case 216:
				case 217:
				case 218:
				case 219:
				case 220:
				case 221:
				case 222:
				case 223:
				case 224:
				case 225:
				case 226:
				case 227:
				case 228:
				case 229:
				case 230:
				case 231:
				case 232:
				case 233:
				case 234:
				case 235:
				case 236:
				case 237:
				case 238:
				case 239:
				case 240:
				case 241:
				case 242:
				case 243:
				case 244:
					{
					this.state = 377;
					_la = this._input.LA(1);
					if(_la<=0 || _la===187 || _la===188) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					break;
				case 187:
					{
					this.state = 378;
					this.match(proglang12dParser.LeftParen);
					this.state = 379;
					this.nestedParenthesesBlock();
					this.state = 380;
					this.match(proglang12dParser.RightParen);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 386;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameterTypeList(): ParameterTypeListContext {
		let localctx: ParameterTypeListContext = new ParameterTypeListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, proglang12dParser.RULE_parameterTypeList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 387;
			this.parameterList();
			this.state = 390;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===215) {
				{
				this.state = 388;
				this.match(proglang12dParser.Comma);
				this.state = 389;
				this.match(proglang12dParser.Ellipsis);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameterList(): ParameterListContext {
		let localctx: ParameterListContext = new ParameterListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, proglang12dParser.RULE_parameterList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 392;
			this.parameterDeclaration();
			this.state = 397;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 393;
					this.match(proglang12dParser.Comma);
					this.state = 394;
					this.parameterDeclaration();
					}
					}
				}
				this.state = 399;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 37, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameterDeclaration(): ParameterDeclarationContext {
		let localctx: ParameterDeclarationContext = new ParameterDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, proglang12dParser.RULE_parameterDeclaration);
		let _la: number;
		try {
			this.state = 413;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 400;
				this.declarationSpecifiers2();
				this.state = 402;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===231) {
					{
					this.state = 401;
					this.match(proglang12dParser.Identifier);
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 404;
				this.declarationSpecifiers2();
				this.state = 405;
				this.match(proglang12dParser.And);
				this.state = 406;
				this.match(proglang12dParser.Identifier);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 408;
				this.declarationSpecifiers2();
				this.state = 409;
				this.match(proglang12dParser.Identifier);
				this.state = 410;
				this.match(proglang12dParser.LeftBracket);
				this.state = 411;
				this.match(proglang12dParser.RightBracket);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public identifierList(): IdentifierListContext {
		let localctx: IdentifierListContext = new IdentifierListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, proglang12dParser.RULE_identifierList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 415;
			this.match(proglang12dParser.Identifier);
			this.state = 420;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===215) {
				{
				{
				this.state = 416;
				this.match(proglang12dParser.Comma);
				this.state = 417;
				this.match(proglang12dParser.Identifier);
				}
				}
				this.state = 422;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeName(): TypeNameContext {
		let localctx: TypeNameContext = new TypeNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, proglang12dParser.RULE_typeName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 423;
			this.specifierQualifierList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public directAbstractDeclarator(): DirectAbstractDeclaratorContext;
	public directAbstractDeclarator(_p: number): DirectAbstractDeclaratorContext;
	// @RuleVersion(0)
	public directAbstractDeclarator(_p?: number): DirectAbstractDeclaratorContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: DirectAbstractDeclaratorContext = new DirectAbstractDeclaratorContext(this, this._ctx, _parentState);
		let _prevctx: DirectAbstractDeclaratorContext = localctx;
		let _startState: number = 80;
		this.enterRecursionRule(localctx, 80, proglang12dParser.RULE_directAbstractDeclarator, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 426;
			this.match(proglang12dParser.LeftBracket);
			this.state = 427;
			this.match(proglang12dParser.Star);
			this.state = 428;
			this.match(proglang12dParser.RightBracket);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 442;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 440;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 42, this._ctx) ) {
					case 1:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directAbstractDeclarator);
						this.state = 430;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 431;
						this.match(proglang12dParser.LeftBracket);
						this.state = 433;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===2 || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 19525633) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & 15) !== 0)) {
							{
							this.state = 432;
							this.assignmentExpression();
							}
						}

						this.state = 435;
						this.match(proglang12dParser.RightBracket);
						}
						break;
					case 2:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directAbstractDeclarator);
						this.state = 436;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 437;
						this.match(proglang12dParser.LeftBracket);
						this.state = 438;
						this.match(proglang12dParser.Star);
						this.state = 439;
						this.match(proglang12dParser.RightBracket);
						}
						break;
					}
					}
				}
				this.state = 444;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typedefName(): TypedefNameContext {
		let localctx: TypedefNameContext = new TypedefNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, proglang12dParser.RULE_typedefName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 445;
			this.match(proglang12dParser.Identifier);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public initializer(): InitializerContext {
		let localctx: InitializerContext = new InitializerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, proglang12dParser.RULE_initializer);
		let _la: number;
		try {
			this.state = 455;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
			case 187:
			case 199:
			case 200:
			case 201:
			case 202:
			case 203:
			case 206:
			case 208:
			case 211:
			case 231:
			case 232:
			case 233:
			case 234:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 447;
				this.assignmentExpression();
				}
				break;
			case 191:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 448;
				this.match(proglang12dParser.LeftBrace);
				this.state = 449;
				this.initializerList();
				this.state = 451;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===215) {
					{
					this.state = 450;
					this.match(proglang12dParser.Comma);
					}
				}

				this.state = 453;
				this.match(proglang12dParser.RightBrace);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public initializerList(): InitializerListContext {
		let localctx: InitializerListContext = new InitializerListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, proglang12dParser.RULE_initializerList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 458;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===189 || _la===229) {
				{
				this.state = 457;
				this.designation();
				}
			}

			this.state = 460;
			this.initializer();
			this.state = 468;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 48, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 461;
					this.match(proglang12dParser.Comma);
					this.state = 463;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===189 || _la===229) {
						{
						this.state = 462;
						this.designation();
						}
					}

					this.state = 465;
					this.initializer();
					}
					}
				}
				this.state = 470;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 48, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public designation(): DesignationContext {
		let localctx: DesignationContext = new DesignationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, proglang12dParser.RULE_designation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 471;
			this.designatorList();
			this.state = 472;
			this.match(proglang12dParser.Assign);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public designatorList(): DesignatorListContext {
		let localctx: DesignatorListContext = new DesignatorListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, proglang12dParser.RULE_designatorList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 475;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 474;
				this.designator();
				}
				}
				this.state = 477;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===189 || _la===229);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public designator(): DesignatorContext {
		let localctx: DesignatorContext = new DesignatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, proglang12dParser.RULE_designator);
		try {
			this.state = 485;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 189:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 479;
				this.match(proglang12dParser.LeftBracket);
				this.state = 480;
				this.constantExpression();
				this.state = 481;
				this.match(proglang12dParser.RightBracket);
				}
				break;
			case 229:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 483;
				this.match(proglang12dParser.Dot);
				this.state = 484;
				this.match(proglang12dParser.Identifier);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, proglang12dParser.RULE_statement);
		let _la: number;
		try {
			this.state = 524;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 56, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 487;
				this.labeledStatement();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 488;
				this.compoundStatement();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 489;
				this.expressionStatement();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 490;
				this.selectionStatement();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 491;
				this.iterationStatement();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 492;
				this.jumpStatement();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 493;
				_la = this._input.LA(1);
				if(!(_la===141 || _la===142)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 494;
				_la = this._input.LA(1);
				if(!(_la===143 || _la===186)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 495;
				this.match(proglang12dParser.LeftParen);
				this.state = 504;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2 || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 19525633) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & 15) !== 0)) {
					{
					this.state = 496;
					this.logicalOrExpression();
					this.state = 501;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===215) {
						{
						{
						this.state = 497;
						this.match(proglang12dParser.Comma);
						this.state = 498;
						this.logicalOrExpression();
						}
						}
						this.state = 503;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 519;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===213) {
					{
					{
					this.state = 506;
					this.match(proglang12dParser.Colon);
					this.state = 515;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===2 || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 19525633) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & 15) !== 0)) {
						{
						this.state = 507;
						this.logicalOrExpression();
						this.state = 512;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la===215) {
							{
							{
							this.state = 508;
							this.match(proglang12dParser.Comma);
							this.state = 509;
							this.logicalOrExpression();
							}
							}
							this.state = 514;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						}
					}

					}
					}
					this.state = 521;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 522;
				this.match(proglang12dParser.RightParen);
				this.state = 523;
				this.match(proglang12dParser.Semi);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public labeledStatement(): LabeledStatementContext {
		let localctx: LabeledStatementContext = new LabeledStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, proglang12dParser.RULE_labeledStatement);
		try {
			this.state = 537;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 231:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 526;
				this.match(proglang12dParser.Identifier);
				this.state = 527;
				this.match(proglang12dParser.Colon);
				this.state = 528;
				this.statement();
				}
				break;
			case 145:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 529;
				this.match(proglang12dParser.Case);
				this.state = 530;
				this.constantExpression();
				this.state = 531;
				this.match(proglang12dParser.Colon);
				this.state = 532;
				this.compoundStatement();
				}
				break;
			case 148:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 534;
				this.match(proglang12dParser.Default);
				this.state = 535;
				this.match(proglang12dParser.Colon);
				this.state = 536;
				this.compoundStatement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public compoundStatement(): CompoundStatementContext {
		let localctx: CompoundStatementContext = new CompoundStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, proglang12dParser.RULE_compoundStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 539;
			this.match(proglang12dParser.LeftBrace);
			this.state = 541;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967292) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4290740223) !== 0) || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 153743377) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & 15) !== 0)) {
				{
				this.state = 540;
				this.blockItemList();
				}
			}

			this.state = 543;
			this.match(proglang12dParser.RightBrace);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public blockItemList(): BlockItemListContext {
		let localctx: BlockItemListContext = new BlockItemListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 100, proglang12dParser.RULE_blockItemList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 546;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 545;
				this.blockItem();
				}
				}
				this.state = 548;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967292) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4290740223) !== 0) || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 153743377) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & 15) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public blockItem(): BlockItemContext {
		let localctx: BlockItemContext = new BlockItemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 102, proglang12dParser.RULE_blockItem);
		try {
			this.state = 552;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
			case 141:
			case 142:
			case 144:
			case 145:
			case 147:
			case 148:
			case 149:
			case 152:
			case 153:
			case 154:
			case 156:
			case 157:
			case 159:
			case 187:
			case 191:
			case 199:
			case 200:
			case 201:
			case 202:
			case 203:
			case 206:
			case 208:
			case 211:
			case 214:
			case 231:
			case 232:
			case 233:
			case 234:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 550;
				this.statement();
				}
				break;
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
			case 27:
			case 28:
			case 29:
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 75:
			case 76:
			case 77:
			case 78:
			case 79:
			case 80:
			case 81:
			case 82:
			case 83:
			case 84:
			case 85:
			case 86:
			case 87:
			case 88:
			case 89:
			case 90:
			case 91:
			case 92:
			case 93:
			case 94:
			case 95:
			case 96:
			case 97:
			case 98:
			case 99:
			case 100:
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
			case 106:
			case 107:
			case 108:
			case 109:
			case 110:
			case 111:
			case 112:
			case 113:
			case 114:
			case 115:
			case 116:
			case 117:
			case 118:
			case 119:
			case 120:
			case 121:
			case 122:
			case 123:
			case 124:
			case 125:
			case 126:
			case 127:
			case 128:
			case 129:
			case 130:
			case 131:
			case 132:
			case 133:
			case 134:
			case 135:
			case 136:
			case 137:
			case 138:
			case 139:
			case 140:
			case 146:
			case 151:
			case 155:
			case 158:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 551;
				this.declaration();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public expressionStatement(): ExpressionStatementContext {
		let localctx: ExpressionStatementContext = new ExpressionStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 104, proglang12dParser.RULE_expressionStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 555;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===2 || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 19525633) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & 15) !== 0)) {
				{
				this.state = 554;
				this.expression();
				}
			}

			this.state = 557;
			this.match(proglang12dParser.Semi);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public selectionStatement(): SelectionStatementContext {
		let localctx: SelectionStatementContext = new SelectionStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 106, proglang12dParser.RULE_selectionStatement);
		try {
			this.state = 574;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 154:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 559;
				this.match(proglang12dParser.If);
				this.state = 560;
				this.match(proglang12dParser.LeftParen);
				this.state = 561;
				this.expression();
				this.state = 562;
				this.match(proglang12dParser.RightParen);
				this.state = 563;
				this.statement();
				this.state = 566;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 62, this._ctx) ) {
				case 1:
					{
					this.state = 564;
					this.match(proglang12dParser.Else);
					this.state = 565;
					this.statement();
					}
					break;
				}
				}
				break;
			case 157:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 568;
				this.match(proglang12dParser.Switch);
				this.state = 569;
				this.match(proglang12dParser.LeftParen);
				this.state = 570;
				this.expression();
				this.state = 571;
				this.match(proglang12dParser.RightParen);
				this.state = 572;
				this.statement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public iterationStatement(): IterationStatementContext {
		let localctx: IterationStatementContext = new IterationStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 108, proglang12dParser.RULE_iterationStatement);
		try {
			this.state = 596;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 159:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 576;
				this.match(proglang12dParser.While);
				this.state = 577;
				this.match(proglang12dParser.LeftParen);
				this.state = 578;
				this.expression();
				this.state = 579;
				this.match(proglang12dParser.RightParen);
				this.state = 580;
				this.statement();
				}
				break;
			case 149:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 582;
				this.match(proglang12dParser.Do);
				this.state = 583;
				this.statement();
				this.state = 584;
				this.match(proglang12dParser.While);
				this.state = 585;
				this.match(proglang12dParser.LeftParen);
				this.state = 586;
				this.expression();
				this.state = 587;
				this.match(proglang12dParser.RightParen);
				this.state = 588;
				this.match(proglang12dParser.Semi);
				}
				break;
			case 152:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 590;
				this.match(proglang12dParser.For);
				this.state = 591;
				this.match(proglang12dParser.LeftParen);
				this.state = 592;
				this.forCondition();
				this.state = 593;
				this.match(proglang12dParser.RightParen);
				this.state = 594;
				this.statement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forCondition(): ForConditionContext {
		let localctx: ForConditionContext = new ForConditionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 110, proglang12dParser.RULE_forCondition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 602;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
			case 27:
			case 28:
			case 29:
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 75:
			case 76:
			case 77:
			case 78:
			case 79:
			case 80:
			case 81:
			case 82:
			case 83:
			case 84:
			case 85:
			case 86:
			case 87:
			case 88:
			case 89:
			case 90:
			case 91:
			case 92:
			case 93:
			case 94:
			case 95:
			case 96:
			case 97:
			case 98:
			case 99:
			case 100:
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
			case 106:
			case 107:
			case 108:
			case 109:
			case 110:
			case 111:
			case 112:
			case 113:
			case 114:
			case 115:
			case 116:
			case 117:
			case 118:
			case 119:
			case 120:
			case 121:
			case 122:
			case 123:
			case 124:
			case 125:
			case 126:
			case 127:
			case 128:
			case 129:
			case 130:
			case 131:
			case 132:
			case 133:
			case 134:
			case 135:
			case 136:
			case 137:
			case 138:
			case 139:
			case 140:
			case 146:
			case 151:
			case 155:
			case 158:
				{
				this.state = 598;
				this.forDeclaration();
				}
				break;
			case 2:
			case 187:
			case 199:
			case 200:
			case 201:
			case 202:
			case 203:
			case 206:
			case 208:
			case 211:
			case 214:
			case 231:
			case 232:
			case 233:
			case 234:
				{
				this.state = 600;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2 || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 19525633) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & 15) !== 0)) {
					{
					this.state = 599;
					this.expression();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 604;
			this.match(proglang12dParser.Semi);
			this.state = 606;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===2 || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 19525633) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & 15) !== 0)) {
				{
				this.state = 605;
				this.forExpression();
				}
			}

			this.state = 608;
			this.match(proglang12dParser.Semi);
			this.state = 610;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===2 || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 19525633) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & 15) !== 0)) {
				{
				this.state = 609;
				this.forExpression();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forDeclaration(): ForDeclarationContext {
		let localctx: ForDeclarationContext = new ForDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 112, proglang12dParser.RULE_forDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 612;
			this.declarationSpecifiers();
			this.state = 613;
			this.initDeclaratorList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forExpression(): ForExpressionContext {
		let localctx: ForExpressionContext = new ForExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 114, proglang12dParser.RULE_forExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 615;
			this.assignmentExpression();
			this.state = 620;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===215) {
				{
				{
				this.state = 616;
				this.match(proglang12dParser.Comma);
				this.state = 617;
				this.assignmentExpression();
				}
				}
				this.state = 622;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public jumpStatement(): JumpStatementContext {
		let localctx: JumpStatementContext = new JumpStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 116, proglang12dParser.RULE_jumpStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 633;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 71, this._ctx) ) {
			case 1:
				{
				this.state = 623;
				this.match(proglang12dParser.Goto);
				this.state = 624;
				this.match(proglang12dParser.Identifier);
				}
				break;
			case 2:
				{
				this.state = 625;
				this.match(proglang12dParser.Continue);
				}
				break;
			case 3:
				{
				this.state = 626;
				this.match(proglang12dParser.Break);
				}
				break;
			case 4:
				{
				this.state = 627;
				this.match(proglang12dParser.Return);
				this.state = 629;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2 || ((((_la - 187)) & ~0x1F) === 0 && ((1 << (_la - 187)) & 19525633) !== 0) || ((((_la - 231)) & ~0x1F) === 0 && ((1 << (_la - 231)) & 15) !== 0)) {
					{
					this.state = 628;
					this.expression();
					}
				}

				}
				break;
			case 5:
				{
				this.state = 631;
				this.match(proglang12dParser.Goto);
				this.state = 632;
				this.unaryExpression();
				}
				break;
			}
			this.state = 635;
			this.match(proglang12dParser.Semi);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public compilationUnit(): CompilationUnitContext {
		let localctx: CompilationUnitContext = new CompilationUnitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 118, proglang12dParser.RULE_compilationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 638;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967288) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216618495) !== 0) || _la===214 || _la===231) {
				{
				this.state = 637;
				this.translationUnit();
				}
			}

			this.state = 640;
			this.match(proglang12dParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public translationUnit(): TranslationUnitContext {
		let localctx: TranslationUnitContext = new TranslationUnitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 120, proglang12dParser.RULE_translationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 643;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 642;
				this.externalDeclaration();
				}
				}
				this.state = 645;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967288) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216618495) !== 0) || _la===214 || _la===231);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public externalDeclaration(): ExternalDeclarationContext {
		let localctx: ExternalDeclarationContext = new ExternalDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 122, proglang12dParser.RULE_externalDeclaration);
		try {
			this.state = 650;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 74, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 647;
				this.functionDefinition();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 648;
				this.declaration();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 649;
				this.match(proglang12dParser.Semi);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public functionDefinition(): FunctionDefinitionContext {
		let localctx: FunctionDefinitionContext = new FunctionDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 124, proglang12dParser.RULE_functionDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 653;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967288) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216618495) !== 0)) {
				{
				this.state = 652;
				this.declarationSpecifiers();
				}
			}

			this.state = 655;
			this.declarator();
			this.state = 657;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967288) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216618495) !== 0)) {
				{
				this.state = 656;
				this.declarationList();
				}
			}

			this.state = 659;
			this.compoundStatement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public declarationList(): DeclarationListContext {
		let localctx: DeclarationListContext = new DeclarationListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 126, proglang12dParser.RULE_declarationList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 662;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 661;
				this.declaration();
				}
				}
				this.state = 664;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967288) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216618495) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 33:
			return this.directDeclarator_sempred(localctx as DirectDeclaratorContext, predIndex);
		case 40:
			return this.directAbstractDeclarator_sempred(localctx as DirectAbstractDeclaratorContext, predIndex);
		}
		return true;
	}
	private directDeclarator_sempred(localctx: DirectDeclaratorContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 3);
		case 1:
			return this.precpred(this._ctx, 2);
		case 2:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private directAbstractDeclarator_sempred(localctx: DirectAbstractDeclaratorContext, predIndex: number): boolean {
		switch (predIndex) {
		case 3:
			return this.precpred(this._ctx, 2);
		case 4:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,244,667,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,
	7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,
	60,2,61,7,61,2,62,7,62,2,63,7,63,1,0,1,0,1,0,4,0,132,8,0,11,0,12,0,133,
	1,0,1,0,1,0,1,0,3,0,140,8,0,1,1,1,1,1,1,5,1,145,8,1,10,1,12,1,148,9,1,1,
	2,1,2,3,2,152,8,2,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,164,8,3,1,
	3,1,3,1,3,1,3,1,3,5,3,171,8,3,10,3,12,3,174,9,3,1,4,1,4,1,4,5,4,179,8,4,
	10,4,12,4,182,9,4,1,5,5,5,185,8,5,10,5,12,5,188,9,5,1,5,1,5,1,5,1,5,1,5,
	1,5,3,5,196,8,5,1,6,1,6,1,7,1,7,3,7,202,8,7,1,8,1,8,1,8,5,8,207,8,8,10,
	8,12,8,210,9,8,1,9,1,9,1,9,5,9,215,8,9,10,9,12,9,218,9,9,1,10,1,10,1,10,
	5,10,223,8,10,10,10,12,10,226,9,10,1,11,1,11,1,11,5,11,231,8,11,10,11,12,
	11,234,9,11,1,12,1,12,1,12,5,12,239,8,12,10,12,12,12,242,9,12,1,13,1,13,
	1,13,5,13,247,8,13,10,13,12,13,250,9,13,1,14,1,14,1,14,5,14,255,8,14,10,
	14,12,14,258,9,14,1,15,1,15,1,15,5,15,263,8,15,10,15,12,15,266,9,15,1,16,
	1,16,1,16,5,16,271,8,16,10,16,12,16,274,9,16,1,17,1,17,1,17,5,17,279,8,
	17,10,17,12,17,282,9,17,1,18,1,18,1,18,1,18,1,18,1,18,3,18,290,8,18,1,19,
	1,19,1,19,1,19,1,19,1,19,3,19,298,8,19,1,20,1,20,1,21,1,21,1,21,5,21,305,
	8,21,10,21,12,21,308,9,21,1,22,1,22,1,23,1,23,1,23,1,23,1,24,1,24,1,24,
	5,24,319,8,24,10,24,12,24,322,9,24,1,25,1,25,1,25,3,25,327,8,25,1,26,4,
	26,330,8,26,11,26,12,26,331,1,27,4,27,335,8,27,11,27,12,27,336,1,28,1,28,
	3,28,341,8,28,1,29,1,29,1,30,1,30,1,31,1,31,3,31,349,8,31,1,32,1,32,1,33,
	1,33,1,33,1,33,1,33,1,33,3,33,359,8,33,1,33,1,33,1,33,1,33,1,33,1,33,1,
	33,1,33,1,33,3,33,370,8,33,1,33,5,33,373,8,33,10,33,12,33,376,9,33,1,34,
	1,34,1,34,1,34,1,34,5,34,383,8,34,10,34,12,34,386,9,34,1,35,1,35,1,35,3,
	35,391,8,35,1,36,1,36,1,36,5,36,396,8,36,10,36,12,36,399,9,36,1,37,1,37,
	3,37,403,8,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,1,37,3,37,414,8,37,
	1,38,1,38,1,38,5,38,419,8,38,10,38,12,38,422,9,38,1,39,1,39,1,40,1,40,1,
	40,1,40,1,40,1,40,1,40,1,40,3,40,434,8,40,1,40,1,40,1,40,1,40,1,40,5,40,
	441,8,40,10,40,12,40,444,9,40,1,41,1,41,1,42,1,42,1,42,1,42,3,42,452,8,
	42,1,42,1,42,3,42,456,8,42,1,43,3,43,459,8,43,1,43,1,43,1,43,3,43,464,8,
	43,1,43,5,43,467,8,43,10,43,12,43,470,9,43,1,44,1,44,1,44,1,45,4,45,476,
	8,45,11,45,12,45,477,1,46,1,46,1,46,1,46,1,46,1,46,3,46,486,8,46,1,47,1,
	47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,5,47,500,8,47,10,47,
	12,47,503,9,47,3,47,505,8,47,1,47,1,47,1,47,1,47,5,47,511,8,47,10,47,12,
	47,514,9,47,3,47,516,8,47,5,47,518,8,47,10,47,12,47,521,9,47,1,47,1,47,
	3,47,525,8,47,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,3,
	48,538,8,48,1,49,1,49,3,49,542,8,49,1,49,1,49,1,50,4,50,547,8,50,11,50,
	12,50,548,1,51,1,51,3,51,553,8,51,1,52,3,52,556,8,52,1,52,1,52,1,53,1,53,
	1,53,1,53,1,53,1,53,1,53,3,53,567,8,53,1,53,1,53,1,53,1,53,1,53,1,53,3,
	53,575,8,53,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,
	1,54,1,54,1,54,1,54,1,54,1,54,1,54,1,54,3,54,597,8,54,1,55,1,55,3,55,601,
	8,55,3,55,603,8,55,1,55,1,55,3,55,607,8,55,1,55,1,55,3,55,611,8,55,1,56,
	1,56,1,56,1,57,1,57,1,57,5,57,619,8,57,10,57,12,57,622,9,57,1,58,1,58,1,
	58,1,58,1,58,1,58,3,58,630,8,58,1,58,1,58,3,58,634,8,58,1,58,1,58,1,59,
	3,59,639,8,59,1,59,1,59,1,60,4,60,644,8,60,11,60,12,60,645,1,61,1,61,1,
	61,3,61,651,8,61,1,62,3,62,654,8,62,1,62,1,62,3,62,658,8,62,1,62,1,62,1,
	63,4,63,663,8,63,11,63,12,63,664,1,63,0,2,66,80,64,0,2,4,6,8,10,12,14,16,
	18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,
	66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,
	110,112,114,116,118,120,122,124,126,0,14,2,0,1,1,229,229,2,0,200,200,202,
	202,6,0,2,2,199,199,201,201,203,203,206,206,211,211,1,0,203,205,2,0,199,
	199,201,201,1,0,197,198,1,0,193,196,1,0,227,228,1,0,216,226,4,0,146,146,
	151,151,155,155,158,158,1,0,3,140,1,0,187,188,1,0,141,142,2,0,143,143,186,
	186,700,0,139,1,0,0,0,2,141,1,0,0,0,4,151,1,0,0,0,6,156,1,0,0,0,8,175,1,
	0,0,0,10,186,1,0,0,0,12,197,1,0,0,0,14,201,1,0,0,0,16,203,1,0,0,0,18,211,
	1,0,0,0,20,219,1,0,0,0,22,227,1,0,0,0,24,235,1,0,0,0,26,243,1,0,0,0,28,
	251,1,0,0,0,30,259,1,0,0,0,32,267,1,0,0,0,34,275,1,0,0,0,36,283,1,0,0,0,
	38,297,1,0,0,0,40,299,1,0,0,0,42,301,1,0,0,0,44,309,1,0,0,0,46,311,1,0,
	0,0,48,315,1,0,0,0,50,323,1,0,0,0,52,329,1,0,0,0,54,334,1,0,0,0,56,340,
	1,0,0,0,58,342,1,0,0,0,60,344,1,0,0,0,62,346,1,0,0,0,64,350,1,0,0,0,66,
	352,1,0,0,0,68,384,1,0,0,0,70,387,1,0,0,0,72,392,1,0,0,0,74,413,1,0,0,0,
	76,415,1,0,0,0,78,423,1,0,0,0,80,425,1,0,0,0,82,445,1,0,0,0,84,455,1,0,
	0,0,86,458,1,0,0,0,88,471,1,0,0,0,90,475,1,0,0,0,92,485,1,0,0,0,94,524,
	1,0,0,0,96,537,1,0,0,0,98,539,1,0,0,0,100,546,1,0,0,0,102,552,1,0,0,0,104,
	555,1,0,0,0,106,574,1,0,0,0,108,596,1,0,0,0,110,602,1,0,0,0,112,612,1,0,
	0,0,114,615,1,0,0,0,116,633,1,0,0,0,118,638,1,0,0,0,120,643,1,0,0,0,122,
	650,1,0,0,0,124,653,1,0,0,0,126,662,1,0,0,0,128,140,5,231,0,0,129,140,5,
	232,0,0,130,132,5,234,0,0,131,130,1,0,0,0,132,133,1,0,0,0,133,131,1,0,0,
	0,133,134,1,0,0,0,134,140,1,0,0,0,135,136,5,187,0,0,136,137,3,42,21,0,137,
	138,5,188,0,0,138,140,1,0,0,0,139,128,1,0,0,0,139,129,1,0,0,0,139,131,1,
	0,0,0,139,135,1,0,0,0,140,1,1,0,0,0,141,146,3,4,2,0,142,143,5,215,0,0,143,
	145,3,4,2,0,144,142,1,0,0,0,145,148,1,0,0,0,146,144,1,0,0,0,146,147,1,0,
	0,0,147,3,1,0,0,0,148,146,1,0,0,0,149,152,3,78,39,0,150,152,5,148,0,0,151,
	149,1,0,0,0,151,150,1,0,0,0,152,153,1,0,0,0,153,154,5,213,0,0,154,155,3,
	38,19,0,155,5,1,0,0,0,156,172,3,0,0,0,157,158,5,189,0,0,158,159,3,42,21,
	0,159,160,5,190,0,0,160,171,1,0,0,0,161,163,5,187,0,0,162,164,3,8,4,0,163,
	162,1,0,0,0,163,164,1,0,0,0,164,165,1,0,0,0,165,171,5,188,0,0,166,167,7,
	0,0,0,167,171,5,231,0,0,168,171,5,200,0,0,169,171,5,202,0,0,170,157,1,0,
	0,0,170,161,1,0,0,0,170,166,1,0,0,0,170,168,1,0,0,0,170,169,1,0,0,0,171,
	174,1,0,0,0,172,170,1,0,0,0,172,173,1,0,0,0,173,7,1,0,0,0,174,172,1,0,0,
	0,175,180,3,38,19,0,176,177,5,215,0,0,177,179,3,38,19,0,178,176,1,0,0,0,
	179,182,1,0,0,0,180,178,1,0,0,0,180,181,1,0,0,0,181,9,1,0,0,0,182,180,1,
	0,0,0,183,185,7,1,0,0,184,183,1,0,0,0,185,188,1,0,0,0,186,184,1,0,0,0,186,
	187,1,0,0,0,187,195,1,0,0,0,188,186,1,0,0,0,189,196,3,6,3,0,190,191,3,12,
	6,0,191,192,3,14,7,0,192,196,1,0,0,0,193,194,5,208,0,0,194,196,5,231,0,
	0,195,189,1,0,0,0,195,190,1,0,0,0,195,193,1,0,0,0,196,11,1,0,0,0,197,198,
	7,2,0,0,198,13,1,0,0,0,199,202,3,10,5,0,200,202,5,233,0,0,201,199,1,0,0,
	0,201,200,1,0,0,0,202,15,1,0,0,0,203,208,3,14,7,0,204,205,7,3,0,0,205,207,
	3,14,7,0,206,204,1,0,0,0,207,210,1,0,0,0,208,206,1,0,0,0,208,209,1,0,0,
	0,209,17,1,0,0,0,210,208,1,0,0,0,211,216,3,16,8,0,212,213,7,4,0,0,213,215,
	3,16,8,0,214,212,1,0,0,0,215,218,1,0,0,0,216,214,1,0,0,0,216,217,1,0,0,
	0,217,19,1,0,0,0,218,216,1,0,0,0,219,224,3,18,9,0,220,221,7,5,0,0,221,223,
	3,18,9,0,222,220,1,0,0,0,223,226,1,0,0,0,224,222,1,0,0,0,224,225,1,0,0,
	0,225,21,1,0,0,0,226,224,1,0,0,0,227,232,3,20,10,0,228,229,7,6,0,0,229,
	231,3,20,10,0,230,228,1,0,0,0,231,234,1,0,0,0,232,230,1,0,0,0,232,233,1,
	0,0,0,233,23,1,0,0,0,234,232,1,0,0,0,235,240,3,22,11,0,236,237,7,7,0,0,
	237,239,3,22,11,0,238,236,1,0,0,0,239,242,1,0,0,0,240,238,1,0,0,0,240,241,
	1,0,0,0,241,25,1,0,0,0,242,240,1,0,0,0,243,248,3,24,12,0,244,245,5,206,
	0,0,245,247,3,24,12,0,246,244,1,0,0,0,247,250,1,0,0,0,248,246,1,0,0,0,248,
	249,1,0,0,0,249,27,1,0,0,0,250,248,1,0,0,0,251,256,3,26,13,0,252,253,5,
	210,0,0,253,255,3,26,13,0,254,252,1,0,0,0,255,258,1,0,0,0,256,254,1,0,0,
	0,256,257,1,0,0,0,257,29,1,0,0,0,258,256,1,0,0,0,259,264,3,28,14,0,260,
	261,5,207,0,0,261,263,3,28,14,0,262,260,1,0,0,0,263,266,1,0,0,0,264,262,
	1,0,0,0,264,265,1,0,0,0,265,31,1,0,0,0,266,264,1,0,0,0,267,272,3,30,15,
	0,268,269,5,208,0,0,269,271,3,30,15,0,270,268,1,0,0,0,271,274,1,0,0,0,272,
	270,1,0,0,0,272,273,1,0,0,0,273,33,1,0,0,0,274,272,1,0,0,0,275,280,3,32,
	16,0,276,277,5,209,0,0,277,279,3,32,16,0,278,276,1,0,0,0,279,282,1,0,0,
	0,280,278,1,0,0,0,280,281,1,0,0,0,281,35,1,0,0,0,282,280,1,0,0,0,283,289,
	3,34,17,0,284,285,5,212,0,0,285,286,3,42,21,0,286,287,5,213,0,0,287,288,
	3,36,18,0,288,290,1,0,0,0,289,284,1,0,0,0,289,290,1,0,0,0,290,37,1,0,0,
	0,291,298,3,36,18,0,292,293,3,10,5,0,293,294,3,40,20,0,294,295,3,38,19,
	0,295,298,1,0,0,0,296,298,5,233,0,0,297,291,1,0,0,0,297,292,1,0,0,0,297,
	296,1,0,0,0,298,39,1,0,0,0,299,300,7,8,0,0,300,41,1,0,0,0,301,306,3,38,
	19,0,302,303,5,215,0,0,303,305,3,38,19,0,304,302,1,0,0,0,305,308,1,0,0,
	0,306,304,1,0,0,0,306,307,1,0,0,0,307,43,1,0,0,0,308,306,1,0,0,0,309,310,
	3,36,18,0,310,45,1,0,0,0,311,312,3,52,26,0,312,313,3,48,24,0,313,314,5,
	214,0,0,314,47,1,0,0,0,315,320,3,50,25,0,316,317,5,215,0,0,317,319,3,50,
	25,0,318,316,1,0,0,0,319,322,1,0,0,0,320,318,1,0,0,0,320,321,1,0,0,0,321,
	49,1,0,0,0,322,320,1,0,0,0,323,326,3,64,32,0,324,325,5,216,0,0,325,327,
	3,84,42,0,326,324,1,0,0,0,326,327,1,0,0,0,327,51,1,0,0,0,328,330,3,56,28,
	0,329,328,1,0,0,0,330,331,1,0,0,0,331,329,1,0,0,0,331,332,1,0,0,0,332,53,
	1,0,0,0,333,335,3,56,28,0,334,333,1,0,0,0,335,336,1,0,0,0,336,334,1,0,0,
	0,336,337,1,0,0,0,337,55,1,0,0,0,338,341,3,58,29,0,339,341,3,60,30,0,340,
	338,1,0,0,0,340,339,1,0,0,0,341,57,1,0,0,0,342,343,7,9,0,0,343,59,1,0,0,
	0,344,345,7,10,0,0,345,61,1,0,0,0,346,348,3,58,29,0,347,349,3,62,31,0,348,
	347,1,0,0,0,348,349,1,0,0,0,349,63,1,0,0,0,350,351,3,66,33,0,351,65,1,0,
	0,0,352,353,6,33,-1,0,353,354,5,231,0,0,354,374,1,0,0,0,355,356,10,3,0,
	0,356,358,5,189,0,0,357,359,3,44,22,0,358,357,1,0,0,0,358,359,1,0,0,0,359,
	360,1,0,0,0,360,373,5,190,0,0,361,362,10,2,0,0,362,363,5,187,0,0,363,364,
	3,70,35,0,364,365,5,188,0,0,365,373,1,0,0,0,366,367,10,1,0,0,367,369,5,
	187,0,0,368,370,3,76,38,0,369,368,1,0,0,0,369,370,1,0,0,0,370,371,1,0,0,
	0,371,373,5,188,0,0,372,355,1,0,0,0,372,361,1,0,0,0,372,366,1,0,0,0,373,
	376,1,0,0,0,374,372,1,0,0,0,374,375,1,0,0,0,375,67,1,0,0,0,376,374,1,0,
	0,0,377,383,8,11,0,0,378,379,5,187,0,0,379,380,3,68,34,0,380,381,5,188,
	0,0,381,383,1,0,0,0,382,377,1,0,0,0,382,378,1,0,0,0,383,386,1,0,0,0,384,
	382,1,0,0,0,384,385,1,0,0,0,385,69,1,0,0,0,386,384,1,0,0,0,387,390,3,72,
	36,0,388,389,5,215,0,0,389,391,5,230,0,0,390,388,1,0,0,0,390,391,1,0,0,
	0,391,71,1,0,0,0,392,397,3,74,37,0,393,394,5,215,0,0,394,396,3,74,37,0,
	395,393,1,0,0,0,396,399,1,0,0,0,397,395,1,0,0,0,397,398,1,0,0,0,398,73,
	1,0,0,0,399,397,1,0,0,0,400,402,3,54,27,0,401,403,5,231,0,0,402,401,1,0,
	0,0,402,403,1,0,0,0,403,414,1,0,0,0,404,405,3,54,27,0,405,406,5,206,0,0,
	406,407,5,231,0,0,407,414,1,0,0,0,408,409,3,54,27,0,409,410,5,231,0,0,410,
	411,5,189,0,0,411,412,5,190,0,0,412,414,1,0,0,0,413,400,1,0,0,0,413,404,
	1,0,0,0,413,408,1,0,0,0,414,75,1,0,0,0,415,420,5,231,0,0,416,417,5,215,
	0,0,417,419,5,231,0,0,418,416,1,0,0,0,419,422,1,0,0,0,420,418,1,0,0,0,420,
	421,1,0,0,0,421,77,1,0,0,0,422,420,1,0,0,0,423,424,3,62,31,0,424,79,1,0,
	0,0,425,426,6,40,-1,0,426,427,5,189,0,0,427,428,5,203,0,0,428,429,5,190,
	0,0,429,442,1,0,0,0,430,431,10,2,0,0,431,433,5,189,0,0,432,434,3,38,19,
	0,433,432,1,0,0,0,433,434,1,0,0,0,434,435,1,0,0,0,435,441,5,190,0,0,436,
	437,10,1,0,0,437,438,5,189,0,0,438,439,5,203,0,0,439,441,5,190,0,0,440,
	430,1,0,0,0,440,436,1,0,0,0,441,444,1,0,0,0,442,440,1,0,0,0,442,443,1,0,
	0,0,443,81,1,0,0,0,444,442,1,0,0,0,445,446,5,231,0,0,446,83,1,0,0,0,447,
	456,3,38,19,0,448,449,5,191,0,0,449,451,3,86,43,0,450,452,5,215,0,0,451,
	450,1,0,0,0,451,452,1,0,0,0,452,453,1,0,0,0,453,454,5,192,0,0,454,456,1,
	0,0,0,455,447,1,0,0,0,455,448,1,0,0,0,456,85,1,0,0,0,457,459,3,88,44,0,
	458,457,1,0,0,0,458,459,1,0,0,0,459,460,1,0,0,0,460,468,3,84,42,0,461,463,
	5,215,0,0,462,464,3,88,44,0,463,462,1,0,0,0,463,464,1,0,0,0,464,465,1,0,
	0,0,465,467,3,84,42,0,466,461,1,0,0,0,467,470,1,0,0,0,468,466,1,0,0,0,468,
	469,1,0,0,0,469,87,1,0,0,0,470,468,1,0,0,0,471,472,3,90,45,0,472,473,5,
	216,0,0,473,89,1,0,0,0,474,476,3,92,46,0,475,474,1,0,0,0,476,477,1,0,0,
	0,477,475,1,0,0,0,477,478,1,0,0,0,478,91,1,0,0,0,479,480,5,189,0,0,480,
	481,3,44,22,0,481,482,5,190,0,0,482,486,1,0,0,0,483,484,5,229,0,0,484,486,
	5,231,0,0,485,479,1,0,0,0,485,483,1,0,0,0,486,93,1,0,0,0,487,525,3,96,48,
	0,488,525,3,98,49,0,489,525,3,104,52,0,490,525,3,106,53,0,491,525,3,108,
	54,0,492,525,3,116,58,0,493,494,7,12,0,0,494,495,7,13,0,0,495,504,5,187,
	0,0,496,501,3,34,17,0,497,498,5,215,0,0,498,500,3,34,17,0,499,497,1,0,0,
	0,500,503,1,0,0,0,501,499,1,0,0,0,501,502,1,0,0,0,502,505,1,0,0,0,503,501,
	1,0,0,0,504,496,1,0,0,0,504,505,1,0,0,0,505,519,1,0,0,0,506,515,5,213,0,
	0,507,512,3,34,17,0,508,509,5,215,0,0,509,511,3,34,17,0,510,508,1,0,0,0,
	511,514,1,0,0,0,512,510,1,0,0,0,512,513,1,0,0,0,513,516,1,0,0,0,514,512,
	1,0,0,0,515,507,1,0,0,0,515,516,1,0,0,0,516,518,1,0,0,0,517,506,1,0,0,0,
	518,521,1,0,0,0,519,517,1,0,0,0,519,520,1,0,0,0,520,522,1,0,0,0,521,519,
	1,0,0,0,522,523,5,188,0,0,523,525,5,214,0,0,524,487,1,0,0,0,524,488,1,0,
	0,0,524,489,1,0,0,0,524,490,1,0,0,0,524,491,1,0,0,0,524,492,1,0,0,0,524,
	493,1,0,0,0,525,95,1,0,0,0,526,527,5,231,0,0,527,528,5,213,0,0,528,538,
	3,94,47,0,529,530,5,145,0,0,530,531,3,44,22,0,531,532,5,213,0,0,532,533,
	3,98,49,0,533,538,1,0,0,0,534,535,5,148,0,0,535,536,5,213,0,0,536,538,3,
	98,49,0,537,526,1,0,0,0,537,529,1,0,0,0,537,534,1,0,0,0,538,97,1,0,0,0,
	539,541,5,191,0,0,540,542,3,100,50,0,541,540,1,0,0,0,541,542,1,0,0,0,542,
	543,1,0,0,0,543,544,5,192,0,0,544,99,1,0,0,0,545,547,3,102,51,0,546,545,
	1,0,0,0,547,548,1,0,0,0,548,546,1,0,0,0,548,549,1,0,0,0,549,101,1,0,0,0,
	550,553,3,94,47,0,551,553,3,46,23,0,552,550,1,0,0,0,552,551,1,0,0,0,553,
	103,1,0,0,0,554,556,3,42,21,0,555,554,1,0,0,0,555,556,1,0,0,0,556,557,1,
	0,0,0,557,558,5,214,0,0,558,105,1,0,0,0,559,560,5,154,0,0,560,561,5,187,
	0,0,561,562,3,42,21,0,562,563,5,188,0,0,563,566,3,94,47,0,564,565,5,150,
	0,0,565,567,3,94,47,0,566,564,1,0,0,0,566,567,1,0,0,0,567,575,1,0,0,0,568,
	569,5,157,0,0,569,570,5,187,0,0,570,571,3,42,21,0,571,572,5,188,0,0,572,
	573,3,94,47,0,573,575,1,0,0,0,574,559,1,0,0,0,574,568,1,0,0,0,575,107,1,
	0,0,0,576,577,5,159,0,0,577,578,5,187,0,0,578,579,3,42,21,0,579,580,5,188,
	0,0,580,581,3,94,47,0,581,597,1,0,0,0,582,583,5,149,0,0,583,584,3,94,47,
	0,584,585,5,159,0,0,585,586,5,187,0,0,586,587,3,42,21,0,587,588,5,188,0,
	0,588,589,5,214,0,0,589,597,1,0,0,0,590,591,5,152,0,0,591,592,5,187,0,0,
	592,593,3,110,55,0,593,594,5,188,0,0,594,595,3,94,47,0,595,597,1,0,0,0,
	596,576,1,0,0,0,596,582,1,0,0,0,596,590,1,0,0,0,597,109,1,0,0,0,598,603,
	3,112,56,0,599,601,3,42,21,0,600,599,1,0,0,0,600,601,1,0,0,0,601,603,1,
	0,0,0,602,598,1,0,0,0,602,600,1,0,0,0,603,604,1,0,0,0,604,606,5,214,0,0,
	605,607,3,114,57,0,606,605,1,0,0,0,606,607,1,0,0,0,607,608,1,0,0,0,608,
	610,5,214,0,0,609,611,3,114,57,0,610,609,1,0,0,0,610,611,1,0,0,0,611,111,
	1,0,0,0,612,613,3,52,26,0,613,614,3,48,24,0,614,113,1,0,0,0,615,620,3,38,
	19,0,616,617,5,215,0,0,617,619,3,38,19,0,618,616,1,0,0,0,619,622,1,0,0,
	0,620,618,1,0,0,0,620,621,1,0,0,0,621,115,1,0,0,0,622,620,1,0,0,0,623,624,
	5,153,0,0,624,634,5,231,0,0,625,634,5,147,0,0,626,634,5,144,0,0,627,629,
	5,156,0,0,628,630,3,42,21,0,629,628,1,0,0,0,629,630,1,0,0,0,630,634,1,0,
	0,0,631,632,5,153,0,0,632,634,3,10,5,0,633,623,1,0,0,0,633,625,1,0,0,0,
	633,626,1,0,0,0,633,627,1,0,0,0,633,631,1,0,0,0,634,635,1,0,0,0,635,636,
	5,214,0,0,636,117,1,0,0,0,637,639,3,120,60,0,638,637,1,0,0,0,638,639,1,
	0,0,0,639,640,1,0,0,0,640,641,5,0,0,1,641,119,1,0,0,0,642,644,3,122,61,
	0,643,642,1,0,0,0,644,645,1,0,0,0,645,643,1,0,0,0,645,646,1,0,0,0,646,121,
	1,0,0,0,647,651,3,124,62,0,648,651,3,46,23,0,649,651,5,214,0,0,650,647,
	1,0,0,0,650,648,1,0,0,0,650,649,1,0,0,0,651,123,1,0,0,0,652,654,3,52,26,
	0,653,652,1,0,0,0,653,654,1,0,0,0,654,655,1,0,0,0,655,657,3,64,32,0,656,
	658,3,126,63,0,657,656,1,0,0,0,657,658,1,0,0,0,658,659,1,0,0,0,659,660,
	3,98,49,0,660,125,1,0,0,0,661,663,3,46,23,0,662,661,1,0,0,0,663,664,1,0,
	0,0,664,662,1,0,0,0,664,665,1,0,0,0,665,127,1,0,0,0,78,133,139,146,151,
	163,170,172,180,186,195,201,208,216,224,232,240,248,256,264,272,280,289,
	297,306,320,326,331,336,340,348,358,369,372,374,382,384,390,397,402,413,
	420,433,440,442,451,455,458,463,468,477,485,501,504,512,515,519,524,537,
	541,548,552,555,566,574,596,600,602,606,610,620,629,633,638,645,650,653,
	657,664];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!proglang12dParser.__ATN) {
			proglang12dParser.__ATN = new ATNDeserializer().deserialize(proglang12dParser._serializedATN);
		}

		return proglang12dParser.__ATN;
	}


	static DecisionsToDFA = proglang12dParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class PrimaryExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Identifier(): TerminalNode {
		return this.getToken(proglang12dParser.Identifier, 0);
	}
	public Constant(): TerminalNode {
		return this.getToken(proglang12dParser.Constant, 0);
	}
	public StringLiteral_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.StringLiteral);
	}
	public StringLiteral(i: number): TerminalNode {
		return this.getToken(proglang12dParser.StringLiteral, i);
	}
	public LeftParen(): TerminalNode {
		return this.getToken(proglang12dParser.LeftParen, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(proglang12dParser.RightParen, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_primaryExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterPrimaryExpression) {
	 		listener.enterPrimaryExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitPrimaryExpression) {
	 		listener.exitPrimaryExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitPrimaryExpression) {
			return visitor.visitPrimaryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GenericAssocListContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public genericAssociation_list(): GenericAssociationContext[] {
		return this.getTypedRuleContexts(GenericAssociationContext) as GenericAssociationContext[];
	}
	public genericAssociation(i: number): GenericAssociationContext {
		return this.getTypedRuleContext(GenericAssociationContext, i) as GenericAssociationContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_genericAssocList;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterGenericAssocList) {
	 		listener.enterGenericAssocList(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitGenericAssocList) {
	 		listener.exitGenericAssocList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitGenericAssocList) {
			return visitor.visitGenericAssocList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GenericAssociationContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Colon(): TerminalNode {
		return this.getToken(proglang12dParser.Colon, 0);
	}
	public assignmentExpression(): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, 0) as AssignmentExpressionContext;
	}
	public typeName(): TypeNameContext {
		return this.getTypedRuleContext(TypeNameContext, 0) as TypeNameContext;
	}
	public Default(): TerminalNode {
		return this.getToken(proglang12dParser.Default, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_genericAssociation;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterGenericAssociation) {
	 		listener.enterGenericAssociation(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitGenericAssociation) {
	 		listener.exitGenericAssociation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitGenericAssociation) {
			return visitor.visitGenericAssociation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PostfixExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public primaryExpression(): PrimaryExpressionContext {
		return this.getTypedRuleContext(PrimaryExpressionContext, 0) as PrimaryExpressionContext;
	}
	public LeftBracket_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.LeftBracket);
	}
	public LeftBracket(i: number): TerminalNode {
		return this.getToken(proglang12dParser.LeftBracket, i);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public RightBracket_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.RightBracket);
	}
	public RightBracket(i: number): TerminalNode {
		return this.getToken(proglang12dParser.RightBracket, i);
	}
	public LeftParen_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.LeftParen);
	}
	public LeftParen(i: number): TerminalNode {
		return this.getToken(proglang12dParser.LeftParen, i);
	}
	public RightParen_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.RightParen);
	}
	public RightParen(i: number): TerminalNode {
		return this.getToken(proglang12dParser.RightParen, i);
	}
	public Identifier_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Identifier);
	}
	public Identifier(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Identifier, i);
	}
	public PlusPlus_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.PlusPlus);
	}
	public PlusPlus(i: number): TerminalNode {
		return this.getToken(proglang12dParser.PlusPlus, i);
	}
	public MinusMinus_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.MinusMinus);
	}
	public MinusMinus(i: number): TerminalNode {
		return this.getToken(proglang12dParser.MinusMinus, i);
	}
	public Dot_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Dot);
	}
	public Dot(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Dot, i);
	}
	public argumentExpressionList_list(): ArgumentExpressionListContext[] {
		return this.getTypedRuleContexts(ArgumentExpressionListContext) as ArgumentExpressionListContext[];
	}
	public argumentExpressionList(i: number): ArgumentExpressionListContext {
		return this.getTypedRuleContext(ArgumentExpressionListContext, i) as ArgumentExpressionListContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_postfixExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterPostfixExpression) {
	 		listener.enterPostfixExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitPostfixExpression) {
	 		listener.exitPostfixExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitPostfixExpression) {
			return visitor.visitPostfixExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentExpressionListContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public assignmentExpression_list(): AssignmentExpressionContext[] {
		return this.getTypedRuleContexts(AssignmentExpressionContext) as AssignmentExpressionContext[];
	}
	public assignmentExpression(i: number): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, i) as AssignmentExpressionContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_argumentExpressionList;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterArgumentExpressionList) {
	 		listener.enterArgumentExpressionList(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitArgumentExpressionList) {
	 		listener.exitArgumentExpressionList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitArgumentExpressionList) {
			return visitor.visitArgumentExpressionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnaryExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public postfixExpression(): PostfixExpressionContext {
		return this.getTypedRuleContext(PostfixExpressionContext, 0) as PostfixExpressionContext;
	}
	public unaryOperator(): UnaryOperatorContext {
		return this.getTypedRuleContext(UnaryOperatorContext, 0) as UnaryOperatorContext;
	}
	public castExpression(): CastExpressionContext {
		return this.getTypedRuleContext(CastExpressionContext, 0) as CastExpressionContext;
	}
	public AndAnd(): TerminalNode {
		return this.getToken(proglang12dParser.AndAnd, 0);
	}
	public Identifier(): TerminalNode {
		return this.getToken(proglang12dParser.Identifier, 0);
	}
	public PlusPlus_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.PlusPlus);
	}
	public PlusPlus(i: number): TerminalNode {
		return this.getToken(proglang12dParser.PlusPlus, i);
	}
	public MinusMinus_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.MinusMinus);
	}
	public MinusMinus(i: number): TerminalNode {
		return this.getToken(proglang12dParser.MinusMinus, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_unaryExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterUnaryExpression) {
	 		listener.enterUnaryExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitUnaryExpression) {
	 		listener.exitUnaryExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitUnaryExpression) {
			return visitor.visitUnaryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnaryOperatorContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public And(): TerminalNode {
		return this.getToken(proglang12dParser.And, 0);
	}
	public Star(): TerminalNode {
		return this.getToken(proglang12dParser.Star, 0);
	}
	public Plus(): TerminalNode {
		return this.getToken(proglang12dParser.Plus, 0);
	}
	public Minus(): TerminalNode {
		return this.getToken(proglang12dParser.Minus, 0);
	}
	public Not(): TerminalNode {
		return this.getToken(proglang12dParser.Not, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_unaryOperator;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterUnaryOperator) {
	 		listener.enterUnaryOperator(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitUnaryOperator) {
	 		listener.exitUnaryOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitUnaryOperator) {
			return visitor.visitUnaryOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CastExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public unaryExpression(): UnaryExpressionContext {
		return this.getTypedRuleContext(UnaryExpressionContext, 0) as UnaryExpressionContext;
	}
	public DigitSequence(): TerminalNode {
		return this.getToken(proglang12dParser.DigitSequence, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_castExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterCastExpression) {
	 		listener.enterCastExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitCastExpression) {
	 		listener.exitCastExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitCastExpression) {
			return visitor.visitCastExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MultiplicativeExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public castExpression_list(): CastExpressionContext[] {
		return this.getTypedRuleContexts(CastExpressionContext) as CastExpressionContext[];
	}
	public castExpression(i: number): CastExpressionContext {
		return this.getTypedRuleContext(CastExpressionContext, i) as CastExpressionContext;
	}
	public Star_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Star);
	}
	public Star(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Star, i);
	}
	public Div_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Div);
	}
	public Div(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Div, i);
	}
	public Mod_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Mod);
	}
	public Mod(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Mod, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_multiplicativeExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterMultiplicativeExpression) {
	 		listener.enterMultiplicativeExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitMultiplicativeExpression) {
	 		listener.exitMultiplicativeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitMultiplicativeExpression) {
			return visitor.visitMultiplicativeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AdditiveExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public multiplicativeExpression_list(): MultiplicativeExpressionContext[] {
		return this.getTypedRuleContexts(MultiplicativeExpressionContext) as MultiplicativeExpressionContext[];
	}
	public multiplicativeExpression(i: number): MultiplicativeExpressionContext {
		return this.getTypedRuleContext(MultiplicativeExpressionContext, i) as MultiplicativeExpressionContext;
	}
	public Plus_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Plus);
	}
	public Plus(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Plus, i);
	}
	public Minus_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Minus);
	}
	public Minus(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Minus, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_additiveExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterAdditiveExpression) {
	 		listener.enterAdditiveExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitAdditiveExpression) {
	 		listener.exitAdditiveExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitAdditiveExpression) {
			return visitor.visitAdditiveExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ShiftExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public additiveExpression_list(): AdditiveExpressionContext[] {
		return this.getTypedRuleContexts(AdditiveExpressionContext) as AdditiveExpressionContext[];
	}
	public additiveExpression(i: number): AdditiveExpressionContext {
		return this.getTypedRuleContext(AdditiveExpressionContext, i) as AdditiveExpressionContext;
	}
	public LeftShift_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.LeftShift);
	}
	public LeftShift(i: number): TerminalNode {
		return this.getToken(proglang12dParser.LeftShift, i);
	}
	public RightShift_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.RightShift);
	}
	public RightShift(i: number): TerminalNode {
		return this.getToken(proglang12dParser.RightShift, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_shiftExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterShiftExpression) {
	 		listener.enterShiftExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitShiftExpression) {
	 		listener.exitShiftExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitShiftExpression) {
			return visitor.visitShiftExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelationalExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public shiftExpression_list(): ShiftExpressionContext[] {
		return this.getTypedRuleContexts(ShiftExpressionContext) as ShiftExpressionContext[];
	}
	public shiftExpression(i: number): ShiftExpressionContext {
		return this.getTypedRuleContext(ShiftExpressionContext, i) as ShiftExpressionContext;
	}
	public Less_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Less);
	}
	public Less(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Less, i);
	}
	public Greater_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Greater);
	}
	public Greater(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Greater, i);
	}
	public LessEqual_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.LessEqual);
	}
	public LessEqual(i: number): TerminalNode {
		return this.getToken(proglang12dParser.LessEqual, i);
	}
	public GreaterEqual_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.GreaterEqual);
	}
	public GreaterEqual(i: number): TerminalNode {
		return this.getToken(proglang12dParser.GreaterEqual, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_relationalExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterRelationalExpression) {
	 		listener.enterRelationalExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitRelationalExpression) {
	 		listener.exitRelationalExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitRelationalExpression) {
			return visitor.visitRelationalExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EqualityExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public relationalExpression_list(): RelationalExpressionContext[] {
		return this.getTypedRuleContexts(RelationalExpressionContext) as RelationalExpressionContext[];
	}
	public relationalExpression(i: number): RelationalExpressionContext {
		return this.getTypedRuleContext(RelationalExpressionContext, i) as RelationalExpressionContext;
	}
	public Equal_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Equal);
	}
	public Equal(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Equal, i);
	}
	public NotEqual_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.NotEqual);
	}
	public NotEqual(i: number): TerminalNode {
		return this.getToken(proglang12dParser.NotEqual, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_equalityExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterEqualityExpression) {
	 		listener.enterEqualityExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitEqualityExpression) {
	 		listener.exitEqualityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitEqualityExpression) {
			return visitor.visitEqualityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AndExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public equalityExpression_list(): EqualityExpressionContext[] {
		return this.getTypedRuleContexts(EqualityExpressionContext) as EqualityExpressionContext[];
	}
	public equalityExpression(i: number): EqualityExpressionContext {
		return this.getTypedRuleContext(EqualityExpressionContext, i) as EqualityExpressionContext;
	}
	public And_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.And);
	}
	public And(i: number): TerminalNode {
		return this.getToken(proglang12dParser.And, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_andExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterAndExpression) {
	 		listener.enterAndExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitAndExpression) {
	 		listener.exitAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitAndExpression) {
			return visitor.visitAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExclusiveOrExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public andExpression_list(): AndExpressionContext[] {
		return this.getTypedRuleContexts(AndExpressionContext) as AndExpressionContext[];
	}
	public andExpression(i: number): AndExpressionContext {
		return this.getTypedRuleContext(AndExpressionContext, i) as AndExpressionContext;
	}
	public Caret_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Caret);
	}
	public Caret(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Caret, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_exclusiveOrExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterExclusiveOrExpression) {
	 		listener.enterExclusiveOrExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitExclusiveOrExpression) {
	 		listener.exitExclusiveOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitExclusiveOrExpression) {
			return visitor.visitExclusiveOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InclusiveOrExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public exclusiveOrExpression_list(): ExclusiveOrExpressionContext[] {
		return this.getTypedRuleContexts(ExclusiveOrExpressionContext) as ExclusiveOrExpressionContext[];
	}
	public exclusiveOrExpression(i: number): ExclusiveOrExpressionContext {
		return this.getTypedRuleContext(ExclusiveOrExpressionContext, i) as ExclusiveOrExpressionContext;
	}
	public Or_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Or);
	}
	public Or(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Or, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_inclusiveOrExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterInclusiveOrExpression) {
	 		listener.enterInclusiveOrExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitInclusiveOrExpression) {
	 		listener.exitInclusiveOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitInclusiveOrExpression) {
			return visitor.visitInclusiveOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogicalAndExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public inclusiveOrExpression_list(): InclusiveOrExpressionContext[] {
		return this.getTypedRuleContexts(InclusiveOrExpressionContext) as InclusiveOrExpressionContext[];
	}
	public inclusiveOrExpression(i: number): InclusiveOrExpressionContext {
		return this.getTypedRuleContext(InclusiveOrExpressionContext, i) as InclusiveOrExpressionContext;
	}
	public AndAnd_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.AndAnd);
	}
	public AndAnd(i: number): TerminalNode {
		return this.getToken(proglang12dParser.AndAnd, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_logicalAndExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterLogicalAndExpression) {
	 		listener.enterLogicalAndExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitLogicalAndExpression) {
	 		listener.exitLogicalAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitLogicalAndExpression) {
			return visitor.visitLogicalAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogicalOrExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public logicalAndExpression_list(): LogicalAndExpressionContext[] {
		return this.getTypedRuleContexts(LogicalAndExpressionContext) as LogicalAndExpressionContext[];
	}
	public logicalAndExpression(i: number): LogicalAndExpressionContext {
		return this.getTypedRuleContext(LogicalAndExpressionContext, i) as LogicalAndExpressionContext;
	}
	public OrOr_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.OrOr);
	}
	public OrOr(i: number): TerminalNode {
		return this.getToken(proglang12dParser.OrOr, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_logicalOrExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterLogicalOrExpression) {
	 		listener.enterLogicalOrExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitLogicalOrExpression) {
	 		listener.exitLogicalOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitLogicalOrExpression) {
			return visitor.visitLogicalOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConditionalExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public logicalOrExpression(): LogicalOrExpressionContext {
		return this.getTypedRuleContext(LogicalOrExpressionContext, 0) as LogicalOrExpressionContext;
	}
	public Question(): TerminalNode {
		return this.getToken(proglang12dParser.Question, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public Colon(): TerminalNode {
		return this.getToken(proglang12dParser.Colon, 0);
	}
	public conditionalExpression(): ConditionalExpressionContext {
		return this.getTypedRuleContext(ConditionalExpressionContext, 0) as ConditionalExpressionContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_conditionalExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterConditionalExpression) {
	 		listener.enterConditionalExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitConditionalExpression) {
	 		listener.exitConditionalExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitConditionalExpression) {
			return visitor.visitConditionalExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public conditionalExpression(): ConditionalExpressionContext {
		return this.getTypedRuleContext(ConditionalExpressionContext, 0) as ConditionalExpressionContext;
	}
	public unaryExpression(): UnaryExpressionContext {
		return this.getTypedRuleContext(UnaryExpressionContext, 0) as UnaryExpressionContext;
	}
	public assignmentOperator(): AssignmentOperatorContext {
		return this.getTypedRuleContext(AssignmentOperatorContext, 0) as AssignmentOperatorContext;
	}
	public assignmentExpression(): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, 0) as AssignmentExpressionContext;
	}
	public DigitSequence(): TerminalNode {
		return this.getToken(proglang12dParser.DigitSequence, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_assignmentExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterAssignmentExpression) {
	 		listener.enterAssignmentExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitAssignmentExpression) {
	 		listener.exitAssignmentExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitAssignmentExpression) {
			return visitor.visitAssignmentExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignmentOperatorContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Assign(): TerminalNode {
		return this.getToken(proglang12dParser.Assign, 0);
	}
	public StarAssign(): TerminalNode {
		return this.getToken(proglang12dParser.StarAssign, 0);
	}
	public DivAssign(): TerminalNode {
		return this.getToken(proglang12dParser.DivAssign, 0);
	}
	public ModAssign(): TerminalNode {
		return this.getToken(proglang12dParser.ModAssign, 0);
	}
	public PlusAssign(): TerminalNode {
		return this.getToken(proglang12dParser.PlusAssign, 0);
	}
	public MinusAssign(): TerminalNode {
		return this.getToken(proglang12dParser.MinusAssign, 0);
	}
	public LeftShiftAssign(): TerminalNode {
		return this.getToken(proglang12dParser.LeftShiftAssign, 0);
	}
	public RightShiftAssign(): TerminalNode {
		return this.getToken(proglang12dParser.RightShiftAssign, 0);
	}
	public AndAssign(): TerminalNode {
		return this.getToken(proglang12dParser.AndAssign, 0);
	}
	public XorAssign(): TerminalNode {
		return this.getToken(proglang12dParser.XorAssign, 0);
	}
	public OrAssign(): TerminalNode {
		return this.getToken(proglang12dParser.OrAssign, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_assignmentOperator;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterAssignmentOperator) {
	 		listener.enterAssignmentOperator(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitAssignmentOperator) {
	 		listener.exitAssignmentOperator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitAssignmentOperator) {
			return visitor.visitAssignmentOperator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public assignmentExpression_list(): AssignmentExpressionContext[] {
		return this.getTypedRuleContexts(AssignmentExpressionContext) as AssignmentExpressionContext[];
	}
	public assignmentExpression(i: number): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, i) as AssignmentExpressionContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_expression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterExpression) {
	 		listener.enterExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitExpression) {
	 		listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstantExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public conditionalExpression(): ConditionalExpressionContext {
		return this.getTypedRuleContext(ConditionalExpressionContext, 0) as ConditionalExpressionContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_constantExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterConstantExpression) {
	 		listener.enterConstantExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitConstantExpression) {
	 		listener.exitConstantExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitConstantExpression) {
			return visitor.visitConstantExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarationSpecifiers(): DeclarationSpecifiersContext {
		return this.getTypedRuleContext(DeclarationSpecifiersContext, 0) as DeclarationSpecifiersContext;
	}
	public initDeclaratorList(): InitDeclaratorListContext {
		return this.getTypedRuleContext(InitDeclaratorListContext, 0) as InitDeclaratorListContext;
	}
	public Semi(): TerminalNode {
		return this.getToken(proglang12dParser.Semi, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_declaration;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterDeclaration) {
	 		listener.enterDeclaration(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitDeclaration) {
	 		listener.exitDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitDeclaration) {
			return visitor.visitDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InitDeclaratorListContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public initDeclarator_list(): InitDeclaratorContext[] {
		return this.getTypedRuleContexts(InitDeclaratorContext) as InitDeclaratorContext[];
	}
	public initDeclarator(i: number): InitDeclaratorContext {
		return this.getTypedRuleContext(InitDeclaratorContext, i) as InitDeclaratorContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_initDeclaratorList;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterInitDeclaratorList) {
	 		listener.enterInitDeclaratorList(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitInitDeclaratorList) {
	 		listener.exitInitDeclaratorList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitInitDeclaratorList) {
			return visitor.visitInitDeclaratorList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InitDeclaratorContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarator(): DeclaratorContext {
		return this.getTypedRuleContext(DeclaratorContext, 0) as DeclaratorContext;
	}
	public Assign(): TerminalNode {
		return this.getToken(proglang12dParser.Assign, 0);
	}
	public initializer(): InitializerContext {
		return this.getTypedRuleContext(InitializerContext, 0) as InitializerContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_initDeclarator;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterInitDeclarator) {
	 		listener.enterInitDeclarator(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitInitDeclarator) {
	 		listener.exitInitDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitInitDeclarator) {
			return visitor.visitInitDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationSpecifiersContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarationSpecifier_list(): DeclarationSpecifierContext[] {
		return this.getTypedRuleContexts(DeclarationSpecifierContext) as DeclarationSpecifierContext[];
	}
	public declarationSpecifier(i: number): DeclarationSpecifierContext {
		return this.getTypedRuleContext(DeclarationSpecifierContext, i) as DeclarationSpecifierContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_declarationSpecifiers;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterDeclarationSpecifiers) {
	 		listener.enterDeclarationSpecifiers(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitDeclarationSpecifiers) {
	 		listener.exitDeclarationSpecifiers(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitDeclarationSpecifiers) {
			return visitor.visitDeclarationSpecifiers(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationSpecifiers2Context extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarationSpecifier_list(): DeclarationSpecifierContext[] {
		return this.getTypedRuleContexts(DeclarationSpecifierContext) as DeclarationSpecifierContext[];
	}
	public declarationSpecifier(i: number): DeclarationSpecifierContext {
		return this.getTypedRuleContext(DeclarationSpecifierContext, i) as DeclarationSpecifierContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_declarationSpecifiers2;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterDeclarationSpecifiers2) {
	 		listener.enterDeclarationSpecifiers2(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitDeclarationSpecifiers2) {
	 		listener.exitDeclarationSpecifiers2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitDeclarationSpecifiers2) {
			return visitor.visitDeclarationSpecifiers2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationSpecifierContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
	public builtInTypeSpecifier(): BuiltInTypeSpecifierContext {
		return this.getTypedRuleContext(BuiltInTypeSpecifierContext, 0) as BuiltInTypeSpecifierContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_declarationSpecifier;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterDeclarationSpecifier) {
	 		listener.enterDeclarationSpecifier(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitDeclarationSpecifier) {
	 		listener.exitDeclarationSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitDeclarationSpecifier) {
			return visitor.visitDeclarationSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Void(): TerminalNode {
		return this.getToken(proglang12dParser.Void, 0);
	}
	public Char(): TerminalNode {
		return this.getToken(proglang12dParser.Char, 0);
	}
	public Int(): TerminalNode {
		return this.getToken(proglang12dParser.Int, 0);
	}
	public Float(): TerminalNode {
		return this.getToken(proglang12dParser.Float, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_typeSpecifier;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterTypeSpecifier) {
	 		listener.enterTypeSpecifier(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitTypeSpecifier) {
	 		listener.exitTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitTypeSpecifier) {
			return visitor.visitTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BuiltInTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_builtInTypeSpecifier;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterBuiltInTypeSpecifier) {
	 		listener.enterBuiltInTypeSpecifier(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitBuiltInTypeSpecifier) {
	 		listener.exitBuiltInTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitBuiltInTypeSpecifier) {
			return visitor.visitBuiltInTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SpecifierQualifierListContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
	public specifierQualifierList(): SpecifierQualifierListContext {
		return this.getTypedRuleContext(SpecifierQualifierListContext, 0) as SpecifierQualifierListContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_specifierQualifierList;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterSpecifierQualifierList) {
	 		listener.enterSpecifierQualifierList(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitSpecifierQualifierList) {
	 		listener.exitSpecifierQualifierList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitSpecifierQualifierList) {
			return visitor.visitSpecifierQualifierList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclaratorContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public directDeclarator(): DirectDeclaratorContext {
		return this.getTypedRuleContext(DirectDeclaratorContext, 0) as DirectDeclaratorContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_declarator;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterDeclarator) {
	 		listener.enterDeclarator(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitDeclarator) {
	 		listener.exitDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitDeclarator) {
			return visitor.visitDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DirectDeclaratorContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Identifier(): TerminalNode {
		return this.getToken(proglang12dParser.Identifier, 0);
	}
	public directDeclarator(): DirectDeclaratorContext {
		return this.getTypedRuleContext(DirectDeclaratorContext, 0) as DirectDeclaratorContext;
	}
	public LeftBracket(): TerminalNode {
		return this.getToken(proglang12dParser.LeftBracket, 0);
	}
	public RightBracket(): TerminalNode {
		return this.getToken(proglang12dParser.RightBracket, 0);
	}
	public constantExpression(): ConstantExpressionContext {
		return this.getTypedRuleContext(ConstantExpressionContext, 0) as ConstantExpressionContext;
	}
	public LeftParen(): TerminalNode {
		return this.getToken(proglang12dParser.LeftParen, 0);
	}
	public parameterTypeList(): ParameterTypeListContext {
		return this.getTypedRuleContext(ParameterTypeListContext, 0) as ParameterTypeListContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(proglang12dParser.RightParen, 0);
	}
	public identifierList(): IdentifierListContext {
		return this.getTypedRuleContext(IdentifierListContext, 0) as IdentifierListContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_directDeclarator;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterDirectDeclarator) {
	 		listener.enterDirectDeclarator(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitDirectDeclarator) {
	 		listener.exitDirectDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitDirectDeclarator) {
			return visitor.visitDirectDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NestedParenthesesBlockContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LeftParen_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.LeftParen);
	}
	public LeftParen(i: number): TerminalNode {
		return this.getToken(proglang12dParser.LeftParen, i);
	}
	public nestedParenthesesBlock_list(): NestedParenthesesBlockContext[] {
		return this.getTypedRuleContexts(NestedParenthesesBlockContext) as NestedParenthesesBlockContext[];
	}
	public nestedParenthesesBlock(i: number): NestedParenthesesBlockContext {
		return this.getTypedRuleContext(NestedParenthesesBlockContext, i) as NestedParenthesesBlockContext;
	}
	public RightParen_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.RightParen);
	}
	public RightParen(i: number): TerminalNode {
		return this.getToken(proglang12dParser.RightParen, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_nestedParenthesesBlock;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterNestedParenthesesBlock) {
	 		listener.enterNestedParenthesesBlock(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitNestedParenthesesBlock) {
	 		listener.exitNestedParenthesesBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitNestedParenthesesBlock) {
			return visitor.visitNestedParenthesesBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterTypeListContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameterList(): ParameterListContext {
		return this.getTypedRuleContext(ParameterListContext, 0) as ParameterListContext;
	}
	public Comma(): TerminalNode {
		return this.getToken(proglang12dParser.Comma, 0);
	}
	public Ellipsis(): TerminalNode {
		return this.getToken(proglang12dParser.Ellipsis, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_parameterTypeList;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterParameterTypeList) {
	 		listener.enterParameterTypeList(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitParameterTypeList) {
	 		listener.exitParameterTypeList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitParameterTypeList) {
			return visitor.visitParameterTypeList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterListContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameterDeclaration_list(): ParameterDeclarationContext[] {
		return this.getTypedRuleContexts(ParameterDeclarationContext) as ParameterDeclarationContext[];
	}
	public parameterDeclaration(i: number): ParameterDeclarationContext {
		return this.getTypedRuleContext(ParameterDeclarationContext, i) as ParameterDeclarationContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_parameterList;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterParameterList) {
	 		listener.enterParameterList(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitParameterList) {
	 		listener.exitParameterList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitParameterList) {
			return visitor.visitParameterList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterDeclarationContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarationSpecifiers2(): DeclarationSpecifiers2Context {
		return this.getTypedRuleContext(DeclarationSpecifiers2Context, 0) as DeclarationSpecifiers2Context;
	}
	public Identifier(): TerminalNode {
		return this.getToken(proglang12dParser.Identifier, 0);
	}
	public And(): TerminalNode {
		return this.getToken(proglang12dParser.And, 0);
	}
	public LeftBracket(): TerminalNode {
		return this.getToken(proglang12dParser.LeftBracket, 0);
	}
	public RightBracket(): TerminalNode {
		return this.getToken(proglang12dParser.RightBracket, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_parameterDeclaration;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterParameterDeclaration) {
	 		listener.enterParameterDeclaration(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitParameterDeclaration) {
	 		listener.exitParameterDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitParameterDeclaration) {
			return visitor.visitParameterDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierListContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Identifier_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Identifier);
	}
	public Identifier(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Identifier, i);
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_identifierList;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterIdentifierList) {
	 		listener.enterIdentifierList(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitIdentifierList) {
	 		listener.exitIdentifierList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitIdentifierList) {
			return visitor.visitIdentifierList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeNameContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public specifierQualifierList(): SpecifierQualifierListContext {
		return this.getTypedRuleContext(SpecifierQualifierListContext, 0) as SpecifierQualifierListContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_typeName;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterTypeName) {
	 		listener.enterTypeName(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitTypeName) {
	 		listener.exitTypeName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitTypeName) {
			return visitor.visitTypeName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DirectAbstractDeclaratorContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LeftBracket(): TerminalNode {
		return this.getToken(proglang12dParser.LeftBracket, 0);
	}
	public Star(): TerminalNode {
		return this.getToken(proglang12dParser.Star, 0);
	}
	public RightBracket(): TerminalNode {
		return this.getToken(proglang12dParser.RightBracket, 0);
	}
	public directAbstractDeclarator(): DirectAbstractDeclaratorContext {
		return this.getTypedRuleContext(DirectAbstractDeclaratorContext, 0) as DirectAbstractDeclaratorContext;
	}
	public assignmentExpression(): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, 0) as AssignmentExpressionContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_directAbstractDeclarator;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterDirectAbstractDeclarator) {
	 		listener.enterDirectAbstractDeclarator(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitDirectAbstractDeclarator) {
	 		listener.exitDirectAbstractDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitDirectAbstractDeclarator) {
			return visitor.visitDirectAbstractDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypedefNameContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Identifier(): TerminalNode {
		return this.getToken(proglang12dParser.Identifier, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_typedefName;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterTypedefName) {
	 		listener.enterTypedefName(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitTypedefName) {
	 		listener.exitTypedefName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitTypedefName) {
			return visitor.visitTypedefName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InitializerContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public assignmentExpression(): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, 0) as AssignmentExpressionContext;
	}
	public LeftBrace(): TerminalNode {
		return this.getToken(proglang12dParser.LeftBrace, 0);
	}
	public initializerList(): InitializerListContext {
		return this.getTypedRuleContext(InitializerListContext, 0) as InitializerListContext;
	}
	public RightBrace(): TerminalNode {
		return this.getToken(proglang12dParser.RightBrace, 0);
	}
	public Comma(): TerminalNode {
		return this.getToken(proglang12dParser.Comma, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_initializer;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterInitializer) {
	 		listener.enterInitializer(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitInitializer) {
	 		listener.exitInitializer(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitInitializer) {
			return visitor.visitInitializer(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InitializerListContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public initializer_list(): InitializerContext[] {
		return this.getTypedRuleContexts(InitializerContext) as InitializerContext[];
	}
	public initializer(i: number): InitializerContext {
		return this.getTypedRuleContext(InitializerContext, i) as InitializerContext;
	}
	public designation_list(): DesignationContext[] {
		return this.getTypedRuleContexts(DesignationContext) as DesignationContext[];
	}
	public designation(i: number): DesignationContext {
		return this.getTypedRuleContext(DesignationContext, i) as DesignationContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_initializerList;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterInitializerList) {
	 		listener.enterInitializerList(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitInitializerList) {
	 		listener.exitInitializerList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitInitializerList) {
			return visitor.visitInitializerList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DesignationContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public designatorList(): DesignatorListContext {
		return this.getTypedRuleContext(DesignatorListContext, 0) as DesignatorListContext;
	}
	public Assign(): TerminalNode {
		return this.getToken(proglang12dParser.Assign, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_designation;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterDesignation) {
	 		listener.enterDesignation(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitDesignation) {
	 		listener.exitDesignation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitDesignation) {
			return visitor.visitDesignation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DesignatorListContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public designator_list(): DesignatorContext[] {
		return this.getTypedRuleContexts(DesignatorContext) as DesignatorContext[];
	}
	public designator(i: number): DesignatorContext {
		return this.getTypedRuleContext(DesignatorContext, i) as DesignatorContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_designatorList;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterDesignatorList) {
	 		listener.enterDesignatorList(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitDesignatorList) {
	 		listener.exitDesignatorList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitDesignatorList) {
			return visitor.visitDesignatorList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DesignatorContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LeftBracket(): TerminalNode {
		return this.getToken(proglang12dParser.LeftBracket, 0);
	}
	public constantExpression(): ConstantExpressionContext {
		return this.getTypedRuleContext(ConstantExpressionContext, 0) as ConstantExpressionContext;
	}
	public RightBracket(): TerminalNode {
		return this.getToken(proglang12dParser.RightBracket, 0);
	}
	public Dot(): TerminalNode {
		return this.getToken(proglang12dParser.Dot, 0);
	}
	public Identifier(): TerminalNode {
		return this.getToken(proglang12dParser.Identifier, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_designator;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterDesignator) {
	 		listener.enterDesignator(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitDesignator) {
	 		listener.exitDesignator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitDesignator) {
			return visitor.visitDesignator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public labeledStatement(): LabeledStatementContext {
		return this.getTypedRuleContext(LabeledStatementContext, 0) as LabeledStatementContext;
	}
	public compoundStatement(): CompoundStatementContext {
		return this.getTypedRuleContext(CompoundStatementContext, 0) as CompoundStatementContext;
	}
	public expressionStatement(): ExpressionStatementContext {
		return this.getTypedRuleContext(ExpressionStatementContext, 0) as ExpressionStatementContext;
	}
	public selectionStatement(): SelectionStatementContext {
		return this.getTypedRuleContext(SelectionStatementContext, 0) as SelectionStatementContext;
	}
	public iterationStatement(): IterationStatementContext {
		return this.getTypedRuleContext(IterationStatementContext, 0) as IterationStatementContext;
	}
	public jumpStatement(): JumpStatementContext {
		return this.getTypedRuleContext(JumpStatementContext, 0) as JumpStatementContext;
	}
	public LeftParen(): TerminalNode {
		return this.getToken(proglang12dParser.LeftParen, 0);
	}
	public RightParen(): TerminalNode {
		return this.getToken(proglang12dParser.RightParen, 0);
	}
	public Semi(): TerminalNode {
		return this.getToken(proglang12dParser.Semi, 0);
	}
	public Volatile(): TerminalNode {
		return this.getToken(proglang12dParser.Volatile, 0);
	}
	public logicalOrExpression_list(): LogicalOrExpressionContext[] {
		return this.getTypedRuleContexts(LogicalOrExpressionContext) as LogicalOrExpressionContext[];
	}
	public logicalOrExpression(i: number): LogicalOrExpressionContext {
		return this.getTypedRuleContext(LogicalOrExpressionContext, i) as LogicalOrExpressionContext;
	}
	public Colon_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Colon);
	}
	public Colon(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Colon, i);
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_statement;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterStatement) {
	 		listener.enterStatement(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitStatement) {
	 		listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LabeledStatementContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Identifier(): TerminalNode {
		return this.getToken(proglang12dParser.Identifier, 0);
	}
	public Colon(): TerminalNode {
		return this.getToken(proglang12dParser.Colon, 0);
	}
	public statement(): StatementContext {
		return this.getTypedRuleContext(StatementContext, 0) as StatementContext;
	}
	public Case(): TerminalNode {
		return this.getToken(proglang12dParser.Case, 0);
	}
	public constantExpression(): ConstantExpressionContext {
		return this.getTypedRuleContext(ConstantExpressionContext, 0) as ConstantExpressionContext;
	}
	public compoundStatement(): CompoundStatementContext {
		return this.getTypedRuleContext(CompoundStatementContext, 0) as CompoundStatementContext;
	}
	public Default(): TerminalNode {
		return this.getToken(proglang12dParser.Default, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_labeledStatement;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterLabeledStatement) {
	 		listener.enterLabeledStatement(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitLabeledStatement) {
	 		listener.exitLabeledStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitLabeledStatement) {
			return visitor.visitLabeledStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CompoundStatementContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LeftBrace(): TerminalNode {
		return this.getToken(proglang12dParser.LeftBrace, 0);
	}
	public RightBrace(): TerminalNode {
		return this.getToken(proglang12dParser.RightBrace, 0);
	}
	public blockItemList(): BlockItemListContext {
		return this.getTypedRuleContext(BlockItemListContext, 0) as BlockItemListContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_compoundStatement;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterCompoundStatement) {
	 		listener.enterCompoundStatement(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitCompoundStatement) {
	 		listener.exitCompoundStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitCompoundStatement) {
			return visitor.visitCompoundStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockItemListContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public blockItem_list(): BlockItemContext[] {
		return this.getTypedRuleContexts(BlockItemContext) as BlockItemContext[];
	}
	public blockItem(i: number): BlockItemContext {
		return this.getTypedRuleContext(BlockItemContext, i) as BlockItemContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_blockItemList;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterBlockItemList) {
	 		listener.enterBlockItemList(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitBlockItemList) {
	 		listener.exitBlockItemList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitBlockItemList) {
			return visitor.visitBlockItemList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockItemContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public statement(): StatementContext {
		return this.getTypedRuleContext(StatementContext, 0) as StatementContext;
	}
	public declaration(): DeclarationContext {
		return this.getTypedRuleContext(DeclarationContext, 0) as DeclarationContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_blockItem;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterBlockItem) {
	 		listener.enterBlockItem(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitBlockItem) {
	 		listener.exitBlockItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitBlockItem) {
			return visitor.visitBlockItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionStatementContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Semi(): TerminalNode {
		return this.getToken(proglang12dParser.Semi, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_expressionStatement;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterExpressionStatement) {
	 		listener.enterExpressionStatement(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitExpressionStatement) {
	 		listener.exitExpressionStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitExpressionStatement) {
			return visitor.visitExpressionStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SelectionStatementContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public If(): TerminalNode {
		return this.getToken(proglang12dParser.If, 0);
	}
	public LeftParen(): TerminalNode {
		return this.getToken(proglang12dParser.LeftParen, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(proglang12dParser.RightParen, 0);
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
	public Else(): TerminalNode {
		return this.getToken(proglang12dParser.Else, 0);
	}
	public Switch(): TerminalNode {
		return this.getToken(proglang12dParser.Switch, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_selectionStatement;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterSelectionStatement) {
	 		listener.enterSelectionStatement(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitSelectionStatement) {
	 		listener.exitSelectionStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitSelectionStatement) {
			return visitor.visitSelectionStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IterationStatementContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public While(): TerminalNode {
		return this.getToken(proglang12dParser.While, 0);
	}
	public LeftParen(): TerminalNode {
		return this.getToken(proglang12dParser.LeftParen, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RightParen(): TerminalNode {
		return this.getToken(proglang12dParser.RightParen, 0);
	}
	public statement(): StatementContext {
		return this.getTypedRuleContext(StatementContext, 0) as StatementContext;
	}
	public Do(): TerminalNode {
		return this.getToken(proglang12dParser.Do, 0);
	}
	public Semi(): TerminalNode {
		return this.getToken(proglang12dParser.Semi, 0);
	}
	public For(): TerminalNode {
		return this.getToken(proglang12dParser.For, 0);
	}
	public forCondition(): ForConditionContext {
		return this.getTypedRuleContext(ForConditionContext, 0) as ForConditionContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_iterationStatement;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterIterationStatement) {
	 		listener.enterIterationStatement(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitIterationStatement) {
	 		listener.exitIterationStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitIterationStatement) {
			return visitor.visitIterationStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForConditionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Semi_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Semi);
	}
	public Semi(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Semi, i);
	}
	public forDeclaration(): ForDeclarationContext {
		return this.getTypedRuleContext(ForDeclarationContext, 0) as ForDeclarationContext;
	}
	public forExpression_list(): ForExpressionContext[] {
		return this.getTypedRuleContexts(ForExpressionContext) as ForExpressionContext[];
	}
	public forExpression(i: number): ForExpressionContext {
		return this.getTypedRuleContext(ForExpressionContext, i) as ForExpressionContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_forCondition;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterForCondition) {
	 		listener.enterForCondition(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitForCondition) {
	 		listener.exitForCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitForCondition) {
			return visitor.visitForCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForDeclarationContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarationSpecifiers(): DeclarationSpecifiersContext {
		return this.getTypedRuleContext(DeclarationSpecifiersContext, 0) as DeclarationSpecifiersContext;
	}
	public initDeclaratorList(): InitDeclaratorListContext {
		return this.getTypedRuleContext(InitDeclaratorListContext, 0) as InitDeclaratorListContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_forDeclaration;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterForDeclaration) {
	 		listener.enterForDeclaration(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitForDeclaration) {
	 		listener.exitForDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitForDeclaration) {
			return visitor.visitForDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForExpressionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public assignmentExpression_list(): AssignmentExpressionContext[] {
		return this.getTypedRuleContexts(AssignmentExpressionContext) as AssignmentExpressionContext[];
	}
	public assignmentExpression(i: number): AssignmentExpressionContext {
		return this.getTypedRuleContext(AssignmentExpressionContext, i) as AssignmentExpressionContext;
	}
	public Comma_list(): TerminalNode[] {
	    	return this.getTokens(proglang12dParser.Comma);
	}
	public Comma(i: number): TerminalNode {
		return this.getToken(proglang12dParser.Comma, i);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_forExpression;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterForExpression) {
	 		listener.enterForExpression(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitForExpression) {
	 		listener.exitForExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitForExpression) {
			return visitor.visitForExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JumpStatementContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Semi(): TerminalNode {
		return this.getToken(proglang12dParser.Semi, 0);
	}
	public Goto(): TerminalNode {
		return this.getToken(proglang12dParser.Goto, 0);
	}
	public Identifier(): TerminalNode {
		return this.getToken(proglang12dParser.Identifier, 0);
	}
	public Continue(): TerminalNode {
		return this.getToken(proglang12dParser.Continue, 0);
	}
	public Break(): TerminalNode {
		return this.getToken(proglang12dParser.Break, 0);
	}
	public Return(): TerminalNode {
		return this.getToken(proglang12dParser.Return, 0);
	}
	public unaryExpression(): UnaryExpressionContext {
		return this.getTypedRuleContext(UnaryExpressionContext, 0) as UnaryExpressionContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_jumpStatement;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterJumpStatement) {
	 		listener.enterJumpStatement(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitJumpStatement) {
	 		listener.exitJumpStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitJumpStatement) {
			return visitor.visitJumpStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CompilationUnitContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(proglang12dParser.EOF, 0);
	}
	public translationUnit(): TranslationUnitContext {
		return this.getTypedRuleContext(TranslationUnitContext, 0) as TranslationUnitContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_compilationUnit;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterCompilationUnit) {
	 		listener.enterCompilationUnit(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitCompilationUnit) {
	 		listener.exitCompilationUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitCompilationUnit) {
			return visitor.visitCompilationUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TranslationUnitContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public externalDeclaration_list(): ExternalDeclarationContext[] {
		return this.getTypedRuleContexts(ExternalDeclarationContext) as ExternalDeclarationContext[];
	}
	public externalDeclaration(i: number): ExternalDeclarationContext {
		return this.getTypedRuleContext(ExternalDeclarationContext, i) as ExternalDeclarationContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_translationUnit;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterTranslationUnit) {
	 		listener.enterTranslationUnit(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitTranslationUnit) {
	 		listener.exitTranslationUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitTranslationUnit) {
			return visitor.visitTranslationUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExternalDeclarationContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public functionDefinition(): FunctionDefinitionContext {
		return this.getTypedRuleContext(FunctionDefinitionContext, 0) as FunctionDefinitionContext;
	}
	public declaration(): DeclarationContext {
		return this.getTypedRuleContext(DeclarationContext, 0) as DeclarationContext;
	}
	public Semi(): TerminalNode {
		return this.getToken(proglang12dParser.Semi, 0);
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_externalDeclaration;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterExternalDeclaration) {
	 		listener.enterExternalDeclaration(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitExternalDeclaration) {
	 		listener.exitExternalDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitExternalDeclaration) {
			return visitor.visitExternalDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionDefinitionContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declarator(): DeclaratorContext {
		return this.getTypedRuleContext(DeclaratorContext, 0) as DeclaratorContext;
	}
	public compoundStatement(): CompoundStatementContext {
		return this.getTypedRuleContext(CompoundStatementContext, 0) as CompoundStatementContext;
	}
	public declarationSpecifiers(): DeclarationSpecifiersContext {
		return this.getTypedRuleContext(DeclarationSpecifiersContext, 0) as DeclarationSpecifiersContext;
	}
	public declarationList(): DeclarationListContext {
		return this.getTypedRuleContext(DeclarationListContext, 0) as DeclarationListContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_functionDefinition;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterFunctionDefinition) {
	 		listener.enterFunctionDefinition(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitFunctionDefinition) {
	 		listener.exitFunctionDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitFunctionDefinition) {
			return visitor.visitFunctionDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclarationListContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public declaration_list(): DeclarationContext[] {
		return this.getTypedRuleContexts(DeclarationContext) as DeclarationContext[];
	}
	public declaration(i: number): DeclarationContext {
		return this.getTypedRuleContext(DeclarationContext, i) as DeclarationContext;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_declarationList;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterDeclarationList) {
	 		listener.enterDeclarationList(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitDeclarationList) {
	 		listener.exitDeclarationList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitDeclarationList) {
			return visitor.visitDeclarationList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
