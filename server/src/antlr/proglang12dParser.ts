// Generated from src/proglang12d.g4 by ANTLR 4.13.1
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
	public static readonly LeftParen = 160;
	public static readonly RightParen = 161;
	public static readonly LeftBracket = 162;
	public static readonly RightBracket = 163;
	public static readonly LeftBrace = 164;
	public static readonly RightBrace = 165;
	public static readonly Less = 166;
	public static readonly LessEqual = 167;
	public static readonly Greater = 168;
	public static readonly GreaterEqual = 169;
	public static readonly LeftShift = 170;
	public static readonly RightShift = 171;
	public static readonly Plus = 172;
	public static readonly PlusPlus = 173;
	public static readonly Minus = 174;
	public static readonly MinusMinus = 175;
	public static readonly Star = 176;
	public static readonly Div = 177;
	public static readonly Mod = 178;
	public static readonly And = 179;
	public static readonly Or = 180;
	public static readonly AndAnd = 181;
	public static readonly OrOr = 182;
	public static readonly Caret = 183;
	public static readonly Not = 184;
	public static readonly Question = 185;
	public static readonly Colon = 186;
	public static readonly Semi = 187;
	public static readonly Comma = 188;
	public static readonly Assign = 189;
	public static readonly StarAssign = 190;
	public static readonly DivAssign = 191;
	public static readonly ModAssign = 192;
	public static readonly PlusAssign = 193;
	public static readonly MinusAssign = 194;
	public static readonly LeftShiftAssign = 195;
	public static readonly RightShiftAssign = 196;
	public static readonly AndAssign = 197;
	public static readonly XorAssign = 198;
	public static readonly OrAssign = 199;
	public static readonly Equal = 200;
	public static readonly NotEqual = 201;
	public static readonly Dot = 202;
	public static readonly Constant = 203;
	public static readonly Identifier = 204;
	public static readonly DigitSequence = 205;
	public static readonly StringLiteral = 206;
	public static readonly ComplexDefine = 207;
	public static readonly IncludeDirective = 208;
	public static readonly Whitespace = 209;
	public static readonly Newline = 210;
	public static readonly BlockComment = 211;
	public static readonly LineComment = 212;
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
	public static readonly RULE_declarationSpecifier = 27;
	public static readonly RULE_typeSpecifier = 28;
	public static readonly RULE_builtInTypeSpecifier = 29;
	public static readonly RULE_specifierQualifierList = 30;
	public static readonly RULE_declarator = 31;
	public static readonly RULE_directDeclarator = 32;
	public static readonly RULE_nestedParenthesesBlock = 33;
	public static readonly RULE_parameterTypeList = 34;
	public static readonly RULE_parameterList = 35;
	public static readonly RULE_parameterDeclaration = 36;
	public static readonly RULE_identifierList = 37;
	public static readonly RULE_typeName = 38;
	public static readonly RULE_directAbstractDeclarator = 39;
	public static readonly RULE_typedefName = 40;
	public static readonly RULE_initializer = 41;
	public static readonly RULE_initializerList = 42;
	public static readonly RULE_designation = 43;
	public static readonly RULE_designatorList = 44;
	public static readonly RULE_designator = 45;
	public static readonly RULE_statement = 46;
	public static readonly RULE_labeledStatement = 47;
	public static readonly RULE_compoundStatement = 48;
	public static readonly RULE_blockItemList = 49;
	public static readonly RULE_blockItem = 50;
	public static readonly RULE_expressionStatement = 51;
	public static readonly RULE_selectionStatement = 52;
	public static readonly RULE_iterationStatement = 53;
	public static readonly RULE_forCondition = 54;
	public static readonly RULE_forDeclaration = 55;
	public static readonly RULE_forExpression = 56;
	public static readonly RULE_jumpStatement = 57;
	public static readonly RULE_compilationUnit = 58;
	public static readonly RULE_translationUnit = 59;
	public static readonly RULE_externalDeclaration = 60;
	public static readonly RULE_functionDefinition = 61;
	public static readonly RULE_declarationList = 62;
	public static readonly literalNames: (string | null)[] = [ null, "'Element'", 
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
                                                            "'...'", "'__asm'", 
                                                            "'__asm__'", 
                                                            "'volatile'", 
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
                                                            "'.'" ];
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
                                                             "While", "LeftParen", 
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
                                                             "Dot", "Constant", 
                                                             "Identifier", 
                                                             "DigitSequence", 
                                                             "StringLiteral", 
                                                             "ComplexDefine", 
                                                             "IncludeDirective", 
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
		"declarationSpecifier", "typeSpecifier", "builtInTypeSpecifier", "specifierQualifierList", 
		"declarator", "directDeclarator", "nestedParenthesesBlock", "parameterTypeList", 
		"parameterList", "parameterDeclaration", "identifierList", "typeName", 
		"directAbstractDeclarator", "typedefName", "initializer", "initializerList", 
		"designation", "designatorList", "designator", "statement", "labeledStatement", 
		"compoundStatement", "blockItemList", "blockItem", "expressionStatement", 
		"selectionStatement", "iterationStatement", "forCondition", "forDeclaration", 
		"forExpression", "jumpStatement", "compilationUnit", "translationUnit", 
		"externalDeclaration", "functionDefinition", "declarationList",
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
			this.state = 137;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 204:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 126;
				this.match(proglang12dParser.Identifier);
				}
				break;
			case 203:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 127;
				this.match(proglang12dParser.Constant);
				}
				break;
			case 206:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 129;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 128;
					this.match(proglang12dParser.StringLiteral);
					}
					}
					this.state = 131;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===206);
				}
				break;
			case 160:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 133;
				this.match(proglang12dParser.LeftParen);
				this.state = 134;
				this.expression();
				this.state = 135;
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
			this.state = 139;
			this.genericAssociation();
			this.state = 144;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===188) {
				{
				{
				this.state = 140;
				this.match(proglang12dParser.Comma);
				this.state = 141;
				this.genericAssociation();
				}
				}
				this.state = 146;
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
			this.state = 149;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 146:
			case 151:
			case 155:
			case 158:
				{
				this.state = 147;
				this.typeName();
				}
				break;
			case 148:
				{
				this.state = 148;
				this.match(proglang12dParser.Default);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 151;
			this.match(proglang12dParser.Colon);
			this.state = 152;
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
			this.state = 154;
			this.primaryExpression();
			this.state = 168;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 40965) !== 0)) {
				{
				this.state = 166;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 162:
					{
					this.state = 155;
					this.match(proglang12dParser.LeftBracket);
					this.state = 156;
					this.expression();
					this.state = 157;
					this.match(proglang12dParser.RightBracket);
					}
					break;
				case 160:
					{
					this.state = 159;
					this.match(proglang12dParser.LeftParen);
					this.state = 161;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 16838657) !== 0) || ((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 11) !== 0)) {
						{
						this.state = 160;
						this.argumentExpressionList();
						}
					}

					this.state = 163;
					this.match(proglang12dParser.RightParen);
					}
					break;
				case 173:
					{
					this.state = 164;
					this.match(proglang12dParser.PlusPlus);
					}
					break;
				case 175:
					{
					this.state = 165;
					this.match(proglang12dParser.MinusMinus);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 170;
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
			this.state = 171;
			this.assignmentExpression();
			this.state = 176;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===188) {
				{
				{
				this.state = 172;
				this.match(proglang12dParser.Comma);
				this.state = 173;
				this.assignmentExpression();
				}
				}
				this.state = 178;
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
			this.state = 182;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===173 || _la===175) {
				{
				{
				this.state = 179;
				_la = this._input.LA(1);
				if(!(_la===173 || _la===175)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				}
				this.state = 184;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 189;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 160:
			case 203:
			case 204:
			case 206:
				{
				this.state = 185;
				this.postfixExpression();
				}
				break;
			case 172:
			case 174:
			case 184:
				{
				this.state = 186;
				this.unaryOperator();
				this.state = 187;
				this.castExpression();
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
			this.state = 191;
			_la = this._input.LA(1);
			if(!(((((_la - 172)) & ~0x1F) === 0 && ((1 << (_la - 172)) & 4101) !== 0))) {
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
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 193;
			this.unaryExpression();
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
			this.state = 195;
			this.castExpression();
			this.state = 200;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 176)) & ~0x1F) === 0 && ((1 << (_la - 176)) & 7) !== 0)) {
				{
				{
				this.state = 196;
				_la = this._input.LA(1);
				if(!(((((_la - 176)) & ~0x1F) === 0 && ((1 << (_la - 176)) & 7) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 197;
				this.castExpression();
				}
				}
				this.state = 202;
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
			this.state = 203;
			this.multiplicativeExpression();
			this.state = 208;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===172 || _la===174) {
				{
				{
				this.state = 204;
				_la = this._input.LA(1);
				if(!(_la===172 || _la===174)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 205;
				this.multiplicativeExpression();
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
	public shiftExpression(): ShiftExpressionContext {
		let localctx: ShiftExpressionContext = new ShiftExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, proglang12dParser.RULE_shiftExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 211;
			this.additiveExpression();
			this.state = 216;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===170 || _la===171) {
				{
				{
				this.state = 212;
				_la = this._input.LA(1);
				if(!(_la===170 || _la===171)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 213;
				this.additiveExpression();
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
	public relationalExpression(): RelationalExpressionContext {
		let localctx: RelationalExpressionContext = new RelationalExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, proglang12dParser.RULE_relationalExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 219;
			this.shiftExpression();
			this.state = 224;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 15) !== 0)) {
				{
				{
				this.state = 220;
				_la = this._input.LA(1);
				if(!(((((_la - 166)) & ~0x1F) === 0 && ((1 << (_la - 166)) & 15) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 221;
				this.shiftExpression();
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
	public equalityExpression(): EqualityExpressionContext {
		let localctx: EqualityExpressionContext = new EqualityExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, proglang12dParser.RULE_equalityExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 227;
			this.relationalExpression();
			this.state = 232;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===200 || _la===201) {
				{
				{
				this.state = 228;
				_la = this._input.LA(1);
				if(!(_la===200 || _la===201)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 229;
				this.relationalExpression();
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
	public andExpression(): AndExpressionContext {
		let localctx: AndExpressionContext = new AndExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, proglang12dParser.RULE_andExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 235;
			this.equalityExpression();
			this.state = 240;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===179) {
				{
				{
				this.state = 236;
				this.match(proglang12dParser.And);
				this.state = 237;
				this.equalityExpression();
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
	public exclusiveOrExpression(): ExclusiveOrExpressionContext {
		let localctx: ExclusiveOrExpressionContext = new ExclusiveOrExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, proglang12dParser.RULE_exclusiveOrExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 243;
			this.andExpression();
			this.state = 248;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===183) {
				{
				{
				this.state = 244;
				this.match(proglang12dParser.Caret);
				this.state = 245;
				this.andExpression();
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
	public inclusiveOrExpression(): InclusiveOrExpressionContext {
		let localctx: InclusiveOrExpressionContext = new InclusiveOrExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, proglang12dParser.RULE_inclusiveOrExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 251;
			this.exclusiveOrExpression();
			this.state = 256;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===180) {
				{
				{
				this.state = 252;
				this.match(proglang12dParser.Or);
				this.state = 253;
				this.exclusiveOrExpression();
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
	public logicalAndExpression(): LogicalAndExpressionContext {
		let localctx: LogicalAndExpressionContext = new LogicalAndExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, proglang12dParser.RULE_logicalAndExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 259;
			this.inclusiveOrExpression();
			this.state = 264;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===181) {
				{
				{
				this.state = 260;
				this.match(proglang12dParser.AndAnd);
				this.state = 261;
				this.inclusiveOrExpression();
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
	public logicalOrExpression(): LogicalOrExpressionContext {
		let localctx: LogicalOrExpressionContext = new LogicalOrExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, proglang12dParser.RULE_logicalOrExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 267;
			this.logicalAndExpression();
			this.state = 272;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===182) {
				{
				{
				this.state = 268;
				this.match(proglang12dParser.OrOr);
				this.state = 269;
				this.logicalAndExpression();
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
	public conditionalExpression(): ConditionalExpressionContext {
		let localctx: ConditionalExpressionContext = new ConditionalExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, proglang12dParser.RULE_conditionalExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 275;
			this.logicalOrExpression();
			this.state = 281;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===185) {
				{
				this.state = 276;
				this.match(proglang12dParser.Question);
				this.state = 277;
				this.expression();
				this.state = 278;
				this.match(proglang12dParser.Colon);
				this.state = 279;
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
			this.state = 288;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 283;
				this.conditionalExpression();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 284;
				this.unaryExpression();
				this.state = 285;
				this.assignmentOperator();
				this.state = 286;
				this.assignmentExpression();
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
			this.state = 290;
			_la = this._input.LA(1);
			if(!(((((_la - 189)) & ~0x1F) === 0 && ((1 << (_la - 189)) & 63) !== 0))) {
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
			this.state = 292;
			this.assignmentExpression();
			this.state = 297;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===188) {
				{
				{
				this.state = 293;
				this.match(proglang12dParser.Comma);
				this.state = 294;
				this.assignmentExpression();
				}
				}
				this.state = 299;
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
			this.state = 300;
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
			this.state = 302;
			this.declarationSpecifiers();
			this.state = 303;
			this.initDeclaratorList();
			this.state = 304;
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
			this.state = 306;
			this.initDeclarator();
			this.state = 311;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===188) {
				{
				{
				this.state = 307;
				this.match(proglang12dParser.Comma);
				this.state = 308;
				this.initDeclarator();
				}
				}
				this.state = 313;
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
			this.state = 314;
			this.declarator();
			this.state = 317;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===189) {
				{
				this.state = 315;
				this.match(proglang12dParser.Assign);
				this.state = 316;
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
			this.state = 320;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 319;
				this.declarationSpecifier();
				}
				}
				this.state = 322;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216612351) !== 0));
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
		this.enterRule(localctx, 54, proglang12dParser.RULE_declarationSpecifier);
		try {
			this.state = 326;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 146:
			case 151:
			case 155:
			case 158:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 324;
				this.typeSpecifier();
				}
				break;
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
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 325;
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
		this.enterRule(localctx, 56, proglang12dParser.RULE_typeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 328;
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
		this.enterRule(localctx, 58, proglang12dParser.RULE_builtInTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 330;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 2047) !== 0))) {
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
		this.enterRule(localctx, 60, proglang12dParser.RULE_specifierQualifierList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 332;
			this.typeSpecifier();
			this.state = 334;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 146)) & ~0x1F) === 0 && ((1 << (_la - 146)) & 4641) !== 0)) {
				{
				this.state = 333;
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
		this.enterRule(localctx, 62, proglang12dParser.RULE_declarator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 336;
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
		let _startState: number = 64;
		this.enterRecursionRule(localctx, 64, proglang12dParser.RULE_directDeclarator, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 339;
			this.match(proglang12dParser.Identifier);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 360;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 358;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
					case 1:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directDeclarator);
						this.state = 341;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 342;
						this.match(proglang12dParser.LeftBracket);
						this.state = 344;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 16838657) !== 0) || ((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 11) !== 0)) {
							{
							this.state = 343;
							this.constantExpression();
							}
						}

						this.state = 346;
						this.match(proglang12dParser.RightBracket);
						}
						break;
					case 2:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directDeclarator);
						this.state = 347;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 348;
						this.match(proglang12dParser.LeftParen);
						this.state = 349;
						this.parameterTypeList();
						this.state = 350;
						this.match(proglang12dParser.RightParen);
						}
						break;
					case 3:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directDeclarator);
						this.state = 352;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 353;
						this.match(proglang12dParser.LeftParen);
						this.state = 355;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===204) {
							{
							this.state = 354;
							this.identifierList();
							}
						}

						this.state = 357;
						this.match(proglang12dParser.RightParen);
						}
						break;
					}
					}
				}
				this.state = 362;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
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
		this.enterRule(localctx, 66, proglang12dParser.RULE_nestedParenthesesBlock);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 370;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967293) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 2097151) !== 0)) {
				{
				this.state = 368;
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
				case 187:
				case 188:
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
					{
					this.state = 363;
					_la = this._input.LA(1);
					if(_la<=0 || _la===160 || _la===161) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					break;
				case 160:
					{
					this.state = 364;
					this.match(proglang12dParser.LeftParen);
					this.state = 365;
					this.nestedParenthesesBlock();
					this.state = 366;
					this.match(proglang12dParser.RightParen);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 372;
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
		this.enterRule(localctx, 68, proglang12dParser.RULE_parameterTypeList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 373;
			this.parameterList();
			this.state = 376;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===188) {
				{
				this.state = 374;
				this.match(proglang12dParser.Comma);
				this.state = 375;
				this.match(proglang12dParser.T__138);
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
		this.enterRule(localctx, 70, proglang12dParser.RULE_parameterList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 378;
			this.parameterDeclaration();
			this.state = 383;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 35, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 379;
					this.match(proglang12dParser.Comma);
					this.state = 380;
					this.parameterDeclaration();
					}
					}
				}
				this.state = 385;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 35, this._ctx);
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
		this.enterRule(localctx, 72, proglang12dParser.RULE_parameterDeclaration);
		let _la: number;
		try {
			this.state = 399;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 386;
				this.declarationSpecifiers();
				this.state = 388;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===204) {
					{
					this.state = 387;
					this.match(proglang12dParser.Identifier);
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 390;
				this.declarationSpecifiers();
				this.state = 391;
				this.match(proglang12dParser.And);
				this.state = 392;
				this.match(proglang12dParser.Identifier);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 394;
				this.declarationSpecifiers();
				this.state = 395;
				this.match(proglang12dParser.Identifier);
				this.state = 396;
				this.match(proglang12dParser.LeftBracket);
				this.state = 397;
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
		this.enterRule(localctx, 74, proglang12dParser.RULE_identifierList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 401;
			this.match(proglang12dParser.Identifier);
			this.state = 406;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===188) {
				{
				{
				this.state = 402;
				this.match(proglang12dParser.Comma);
				this.state = 403;
				this.match(proglang12dParser.Identifier);
				}
				}
				this.state = 408;
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
		this.enterRule(localctx, 76, proglang12dParser.RULE_typeName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 409;
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
		let _startState: number = 78;
		this.enterRecursionRule(localctx, 78, proglang12dParser.RULE_directAbstractDeclarator, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 412;
			this.match(proglang12dParser.LeftBracket);
			this.state = 413;
			this.match(proglang12dParser.Star);
			this.state = 414;
			this.match(proglang12dParser.RightBracket);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 428;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 426;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 40, this._ctx) ) {
					case 1:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directAbstractDeclarator);
						this.state = 416;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 417;
						this.match(proglang12dParser.LeftBracket);
						this.state = 419;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 16838657) !== 0) || ((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 11) !== 0)) {
							{
							this.state = 418;
							this.assignmentExpression();
							}
						}

						this.state = 421;
						this.match(proglang12dParser.RightBracket);
						}
						break;
					case 2:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directAbstractDeclarator);
						this.state = 422;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 423;
						this.match(proglang12dParser.LeftBracket);
						this.state = 424;
						this.match(proglang12dParser.Star);
						this.state = 425;
						this.match(proglang12dParser.RightBracket);
						}
						break;
					}
					}
				}
				this.state = 430;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
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
		this.enterRule(localctx, 80, proglang12dParser.RULE_typedefName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 431;
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
		this.enterRule(localctx, 82, proglang12dParser.RULE_initializer);
		let _la: number;
		try {
			this.state = 441;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 160:
			case 172:
			case 173:
			case 174:
			case 175:
			case 184:
			case 203:
			case 204:
			case 206:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 433;
				this.assignmentExpression();
				}
				break;
			case 164:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 434;
				this.match(proglang12dParser.LeftBrace);
				this.state = 435;
				this.initializerList();
				this.state = 437;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===188) {
					{
					this.state = 436;
					this.match(proglang12dParser.Comma);
					}
				}

				this.state = 439;
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
		this.enterRule(localctx, 84, proglang12dParser.RULE_initializerList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 444;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===162 || _la===202) {
				{
				this.state = 443;
				this.designation();
				}
			}

			this.state = 446;
			this.initializer();
			this.state = 454;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 447;
					this.match(proglang12dParser.Comma);
					this.state = 449;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===162 || _la===202) {
						{
						this.state = 448;
						this.designation();
						}
					}

					this.state = 451;
					this.initializer();
					}
					}
				}
				this.state = 456;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
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
		this.enterRule(localctx, 86, proglang12dParser.RULE_designation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 457;
			this.designatorList();
			this.state = 458;
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
		this.enterRule(localctx, 88, proglang12dParser.RULE_designatorList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 461;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 460;
				this.designator();
				}
				}
				this.state = 463;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===162 || _la===202);
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
		this.enterRule(localctx, 90, proglang12dParser.RULE_designator);
		try {
			this.state = 471;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 162:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 465;
				this.match(proglang12dParser.LeftBracket);
				this.state = 466;
				this.constantExpression();
				this.state = 467;
				this.match(proglang12dParser.RightBracket);
				}
				break;
			case 202:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 469;
				this.match(proglang12dParser.Dot);
				this.state = 470;
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
		this.enterRule(localctx, 92, proglang12dParser.RULE_statement);
		let _la: number;
		try {
			this.state = 510;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 473;
				this.labeledStatement();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 474;
				this.compoundStatement();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 475;
				this.expressionStatement();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 476;
				this.selectionStatement();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 477;
				this.iterationStatement();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 478;
				this.jumpStatement();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 479;
				_la = this._input.LA(1);
				if(!(_la===140 || _la===141)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 480;
				_la = this._input.LA(1);
				if(!(_la===142 || _la===143)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 481;
				this.match(proglang12dParser.LeftParen);
				this.state = 490;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 16838657) !== 0) || ((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 11) !== 0)) {
					{
					this.state = 482;
					this.logicalOrExpression();
					this.state = 487;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===188) {
						{
						{
						this.state = 483;
						this.match(proglang12dParser.Comma);
						this.state = 484;
						this.logicalOrExpression();
						}
						}
						this.state = 489;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 505;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===186) {
					{
					{
					this.state = 492;
					this.match(proglang12dParser.Colon);
					this.state = 501;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 16838657) !== 0) || ((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 11) !== 0)) {
						{
						this.state = 493;
						this.logicalOrExpression();
						this.state = 498;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la===188) {
							{
							{
							this.state = 494;
							this.match(proglang12dParser.Comma);
							this.state = 495;
							this.logicalOrExpression();
							}
							}
							this.state = 500;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						}
					}

					}
					}
					this.state = 507;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 508;
				this.match(proglang12dParser.RightParen);
				this.state = 509;
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
		this.enterRule(localctx, 94, proglang12dParser.RULE_labeledStatement);
		try {
			this.state = 523;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 204:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 512;
				this.match(proglang12dParser.Identifier);
				this.state = 513;
				this.match(proglang12dParser.Colon);
				this.state = 514;
				this.statement();
				}
				break;
			case 145:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 515;
				this.match(proglang12dParser.Case);
				this.state = 516;
				this.constantExpression();
				this.state = 517;
				this.match(proglang12dParser.Colon);
				this.state = 518;
				this.statement();
				}
				break;
			case 148:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 520;
				this.match(proglang12dParser.Default);
				this.state = 521;
				this.match(proglang12dParser.Colon);
				this.state = 522;
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
		this.enterRule(localctx, 96, proglang12dParser.RULE_compoundStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 525;
			this.match(proglang12dParser.LeftBrace);
			this.state = 527;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4290721791) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 151056401) !== 0) || ((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 11) !== 0)) {
				{
				this.state = 526;
				this.blockItemList();
				}
			}

			this.state = 529;
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
		this.enterRule(localctx, 98, proglang12dParser.RULE_blockItemList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 532;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 531;
				this.blockItem();
				}
				}
				this.state = 534;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4290721791) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 151056401) !== 0) || ((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 11) !== 0));
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
		this.enterRule(localctx, 100, proglang12dParser.RULE_blockItem);
		try {
			this.state = 538;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 140:
			case 141:
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
			case 160:
			case 164:
			case 172:
			case 173:
			case 174:
			case 175:
			case 184:
			case 187:
			case 203:
			case 204:
			case 206:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 536;
				this.statement();
				}
				break;
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
			case 146:
			case 151:
			case 155:
			case 158:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 537;
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
		this.enterRule(localctx, 102, proglang12dParser.RULE_expressionStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 541;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 16838657) !== 0) || ((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 11) !== 0)) {
				{
				this.state = 540;
				this.expression();
				}
			}

			this.state = 543;
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
		this.enterRule(localctx, 104, proglang12dParser.RULE_selectionStatement);
		try {
			this.state = 560;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 154:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 545;
				this.match(proglang12dParser.If);
				this.state = 546;
				this.match(proglang12dParser.LeftParen);
				this.state = 547;
				this.expression();
				this.state = 548;
				this.match(proglang12dParser.RightParen);
				this.state = 549;
				this.statement();
				this.state = 552;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 60, this._ctx) ) {
				case 1:
					{
					this.state = 550;
					this.match(proglang12dParser.Else);
					this.state = 551;
					this.statement();
					}
					break;
				}
				}
				break;
			case 157:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 554;
				this.match(proglang12dParser.Switch);
				this.state = 555;
				this.match(proglang12dParser.LeftParen);
				this.state = 556;
				this.expression();
				this.state = 557;
				this.match(proglang12dParser.RightParen);
				this.state = 558;
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
		this.enterRule(localctx, 106, proglang12dParser.RULE_iterationStatement);
		try {
			this.state = 582;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 159:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 562;
				this.match(proglang12dParser.While);
				this.state = 563;
				this.match(proglang12dParser.LeftParen);
				this.state = 564;
				this.expression();
				this.state = 565;
				this.match(proglang12dParser.RightParen);
				this.state = 566;
				this.statement();
				}
				break;
			case 149:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 568;
				this.match(proglang12dParser.Do);
				this.state = 569;
				this.statement();
				this.state = 570;
				this.match(proglang12dParser.While);
				this.state = 571;
				this.match(proglang12dParser.LeftParen);
				this.state = 572;
				this.expression();
				this.state = 573;
				this.match(proglang12dParser.RightParen);
				this.state = 574;
				this.match(proglang12dParser.Semi);
				}
				break;
			case 152:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 576;
				this.match(proglang12dParser.For);
				this.state = 577;
				this.match(proglang12dParser.LeftParen);
				this.state = 578;
				this.forCondition();
				this.state = 579;
				this.match(proglang12dParser.RightParen);
				this.state = 580;
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
		this.enterRule(localctx, 108, proglang12dParser.RULE_forCondition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 588;
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
			case 146:
			case 151:
			case 155:
			case 158:
				{
				this.state = 584;
				this.forDeclaration();
				}
				break;
			case 160:
			case 172:
			case 173:
			case 174:
			case 175:
			case 184:
			case 187:
			case 203:
			case 204:
			case 206:
				{
				this.state = 586;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 16838657) !== 0) || ((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 11) !== 0)) {
					{
					this.state = 585;
					this.expression();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 590;
			this.match(proglang12dParser.Semi);
			this.state = 592;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 16838657) !== 0) || ((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 11) !== 0)) {
				{
				this.state = 591;
				this.forExpression();
				}
			}

			this.state = 594;
			this.match(proglang12dParser.Semi);
			this.state = 596;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 16838657) !== 0) || ((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 11) !== 0)) {
				{
				this.state = 595;
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
		this.enterRule(localctx, 110, proglang12dParser.RULE_forDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 598;
			this.declarationSpecifiers();
			this.state = 599;
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
		this.enterRule(localctx, 112, proglang12dParser.RULE_forExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 601;
			this.assignmentExpression();
			this.state = 606;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===188) {
				{
				{
				this.state = 602;
				this.match(proglang12dParser.Comma);
				this.state = 603;
				this.assignmentExpression();
				}
				}
				this.state = 608;
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
		this.enterRule(localctx, 114, proglang12dParser.RULE_jumpStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 619;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 69, this._ctx) ) {
			case 1:
				{
				this.state = 609;
				this.match(proglang12dParser.Goto);
				this.state = 610;
				this.match(proglang12dParser.Identifier);
				}
				break;
			case 2:
				{
				this.state = 611;
				this.match(proglang12dParser.Continue);
				}
				break;
			case 3:
				{
				this.state = 612;
				this.match(proglang12dParser.Break);
				}
				break;
			case 4:
				{
				this.state = 613;
				this.match(proglang12dParser.Return);
				this.state = 615;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 16838657) !== 0) || ((((_la - 203)) & ~0x1F) === 0 && ((1 << (_la - 203)) & 11) !== 0)) {
					{
					this.state = 614;
					this.expression();
					}
				}

				}
				break;
			case 5:
				{
				this.state = 617;
				this.match(proglang12dParser.Goto);
				this.state = 618;
				this.unaryExpression();
				}
				break;
			}
			this.state = 621;
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
		this.enterRule(localctx, 116, proglang12dParser.RULE_compilationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 624;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216612351) !== 0) || _la===187 || _la===204) {
				{
				this.state = 623;
				this.translationUnit();
				}
			}

			this.state = 626;
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
		this.enterRule(localctx, 118, proglang12dParser.RULE_translationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 629;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 628;
				this.externalDeclaration();
				}
				}
				this.state = 631;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216612351) !== 0) || _la===187 || _la===204);
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
		this.enterRule(localctx, 120, proglang12dParser.RULE_externalDeclaration);
		try {
			this.state = 636;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 72, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 633;
				this.functionDefinition();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 634;
				this.declaration();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 635;
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
		this.enterRule(localctx, 122, proglang12dParser.RULE_functionDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 639;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216612351) !== 0)) {
				{
				this.state = 638;
				this.declarationSpecifiers();
				}
			}

			this.state = 641;
			this.declarator();
			this.state = 643;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216612351) !== 0)) {
				{
				this.state = 642;
				this.declarationList();
				}
			}

			this.state = 645;
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
		this.enterRule(localctx, 124, proglang12dParser.RULE_declarationList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 648;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 647;
				this.declaration();
				}
				}
				this.state = 650;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 1216612351) !== 0));
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
		case 32:
			return this.directDeclarator_sempred(localctx as DirectDeclaratorContext, predIndex);
		case 39:
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

	public static readonly _serializedATN: number[] = [4,1,212,653,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,
	7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,
	60,2,61,7,61,2,62,7,62,1,0,1,0,1,0,4,0,130,8,0,11,0,12,0,131,1,0,1,0,1,
	0,1,0,3,0,138,8,0,1,1,1,1,1,1,5,1,143,8,1,10,1,12,1,146,9,1,1,2,1,2,3,2,
	150,8,2,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,162,8,3,1,3,1,3,1,3,
	5,3,167,8,3,10,3,12,3,170,9,3,1,4,1,4,1,4,5,4,175,8,4,10,4,12,4,178,9,4,
	1,5,5,5,181,8,5,10,5,12,5,184,9,5,1,5,1,5,1,5,1,5,3,5,190,8,5,1,6,1,6,1,
	7,1,7,1,8,1,8,1,8,5,8,199,8,8,10,8,12,8,202,9,8,1,9,1,9,1,9,5,9,207,8,9,
	10,9,12,9,210,9,9,1,10,1,10,1,10,5,10,215,8,10,10,10,12,10,218,9,10,1,11,
	1,11,1,11,5,11,223,8,11,10,11,12,11,226,9,11,1,12,1,12,1,12,5,12,231,8,
	12,10,12,12,12,234,9,12,1,13,1,13,1,13,5,13,239,8,13,10,13,12,13,242,9,
	13,1,14,1,14,1,14,5,14,247,8,14,10,14,12,14,250,9,14,1,15,1,15,1,15,5,15,
	255,8,15,10,15,12,15,258,9,15,1,16,1,16,1,16,5,16,263,8,16,10,16,12,16,
	266,9,16,1,17,1,17,1,17,5,17,271,8,17,10,17,12,17,274,9,17,1,18,1,18,1,
	18,1,18,1,18,1,18,3,18,282,8,18,1,19,1,19,1,19,1,19,1,19,3,19,289,8,19,
	1,20,1,20,1,21,1,21,1,21,5,21,296,8,21,10,21,12,21,299,9,21,1,22,1,22,1,
	23,1,23,1,23,1,23,1,24,1,24,1,24,5,24,310,8,24,10,24,12,24,313,9,24,1,25,
	1,25,1,25,3,25,318,8,25,1,26,4,26,321,8,26,11,26,12,26,322,1,27,1,27,3,
	27,327,8,27,1,28,1,28,1,29,1,29,1,30,1,30,3,30,335,8,30,1,31,1,31,1,32,
	1,32,1,32,1,32,1,32,1,32,3,32,345,8,32,1,32,1,32,1,32,1,32,1,32,1,32,1,
	32,1,32,1,32,3,32,356,8,32,1,32,5,32,359,8,32,10,32,12,32,362,9,32,1,33,
	1,33,1,33,1,33,1,33,5,33,369,8,33,10,33,12,33,372,9,33,1,34,1,34,1,34,3,
	34,377,8,34,1,35,1,35,1,35,5,35,382,8,35,10,35,12,35,385,9,35,1,36,1,36,
	3,36,389,8,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,3,36,400,8,36,
	1,37,1,37,1,37,5,37,405,8,37,10,37,12,37,408,9,37,1,38,1,38,1,39,1,39,1,
	39,1,39,1,39,1,39,1,39,1,39,3,39,420,8,39,1,39,1,39,1,39,1,39,1,39,5,39,
	427,8,39,10,39,12,39,430,9,39,1,40,1,40,1,41,1,41,1,41,1,41,3,41,438,8,
	41,1,41,1,41,3,41,442,8,41,1,42,3,42,445,8,42,1,42,1,42,1,42,3,42,450,8,
	42,1,42,5,42,453,8,42,10,42,12,42,456,9,42,1,43,1,43,1,43,1,44,4,44,462,
	8,44,11,44,12,44,463,1,45,1,45,1,45,1,45,1,45,1,45,3,45,472,8,45,1,46,1,
	46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,1,46,5,46,486,8,46,10,46,
	12,46,489,9,46,3,46,491,8,46,1,46,1,46,1,46,1,46,5,46,497,8,46,10,46,12,
	46,500,9,46,3,46,502,8,46,5,46,504,8,46,10,46,12,46,507,9,46,1,46,1,46,
	3,46,511,8,46,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,1,47,3,
	47,524,8,47,1,48,1,48,3,48,528,8,48,1,48,1,48,1,49,4,49,533,8,49,11,49,
	12,49,534,1,50,1,50,3,50,539,8,50,1,51,3,51,542,8,51,1,51,1,51,1,52,1,52,
	1,52,1,52,1,52,1,52,1,52,3,52,553,8,52,1,52,1,52,1,52,1,52,1,52,1,52,3,
	52,561,8,52,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,
	1,53,1,53,1,53,1,53,1,53,1,53,1,53,1,53,3,53,583,8,53,1,54,1,54,3,54,587,
	8,54,3,54,589,8,54,1,54,1,54,3,54,593,8,54,1,54,1,54,3,54,597,8,54,1,55,
	1,55,1,55,1,56,1,56,1,56,5,56,605,8,56,10,56,12,56,608,9,56,1,57,1,57,1,
	57,1,57,1,57,1,57,3,57,616,8,57,1,57,1,57,3,57,620,8,57,1,57,1,57,1,58,
	3,58,625,8,58,1,58,1,58,1,59,4,59,630,8,59,11,59,12,59,631,1,60,1,60,1,
	60,3,60,637,8,60,1,61,3,61,640,8,61,1,61,1,61,3,61,644,8,61,1,61,1,61,1,
	62,4,62,649,8,62,11,62,12,62,650,1,62,0,2,64,78,63,0,2,4,6,8,10,12,14,16,
	18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,
	66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,
	110,112,114,116,118,120,122,124,0,13,2,0,173,173,175,175,3,0,172,172,174,
	174,184,184,1,0,176,178,2,0,172,172,174,174,1,0,170,171,1,0,166,169,1,0,
	200,201,1,0,189,194,4,0,146,146,151,151,155,155,158,158,1,0,1,138,1,0,160,
	161,1,0,140,141,1,0,142,143,682,0,137,1,0,0,0,2,139,1,0,0,0,4,149,1,0,0,
	0,6,154,1,0,0,0,8,171,1,0,0,0,10,182,1,0,0,0,12,191,1,0,0,0,14,193,1,0,
	0,0,16,195,1,0,0,0,18,203,1,0,0,0,20,211,1,0,0,0,22,219,1,0,0,0,24,227,
	1,0,0,0,26,235,1,0,0,0,28,243,1,0,0,0,30,251,1,0,0,0,32,259,1,0,0,0,34,
	267,1,0,0,0,36,275,1,0,0,0,38,288,1,0,0,0,40,290,1,0,0,0,42,292,1,0,0,0,
	44,300,1,0,0,0,46,302,1,0,0,0,48,306,1,0,0,0,50,314,1,0,0,0,52,320,1,0,
	0,0,54,326,1,0,0,0,56,328,1,0,0,0,58,330,1,0,0,0,60,332,1,0,0,0,62,336,
	1,0,0,0,64,338,1,0,0,0,66,370,1,0,0,0,68,373,1,0,0,0,70,378,1,0,0,0,72,
	399,1,0,0,0,74,401,1,0,0,0,76,409,1,0,0,0,78,411,1,0,0,0,80,431,1,0,0,0,
	82,441,1,0,0,0,84,444,1,0,0,0,86,457,1,0,0,0,88,461,1,0,0,0,90,471,1,0,
	0,0,92,510,1,0,0,0,94,523,1,0,0,0,96,525,1,0,0,0,98,532,1,0,0,0,100,538,
	1,0,0,0,102,541,1,0,0,0,104,560,1,0,0,0,106,582,1,0,0,0,108,588,1,0,0,0,
	110,598,1,0,0,0,112,601,1,0,0,0,114,619,1,0,0,0,116,624,1,0,0,0,118,629,
	1,0,0,0,120,636,1,0,0,0,122,639,1,0,0,0,124,648,1,0,0,0,126,138,5,204,0,
	0,127,138,5,203,0,0,128,130,5,206,0,0,129,128,1,0,0,0,130,131,1,0,0,0,131,
	129,1,0,0,0,131,132,1,0,0,0,132,138,1,0,0,0,133,134,5,160,0,0,134,135,3,
	42,21,0,135,136,5,161,0,0,136,138,1,0,0,0,137,126,1,0,0,0,137,127,1,0,0,
	0,137,129,1,0,0,0,137,133,1,0,0,0,138,1,1,0,0,0,139,144,3,4,2,0,140,141,
	5,188,0,0,141,143,3,4,2,0,142,140,1,0,0,0,143,146,1,0,0,0,144,142,1,0,0,
	0,144,145,1,0,0,0,145,3,1,0,0,0,146,144,1,0,0,0,147,150,3,76,38,0,148,150,
	5,148,0,0,149,147,1,0,0,0,149,148,1,0,0,0,150,151,1,0,0,0,151,152,5,186,
	0,0,152,153,3,38,19,0,153,5,1,0,0,0,154,168,3,0,0,0,155,156,5,162,0,0,156,
	157,3,42,21,0,157,158,5,163,0,0,158,167,1,0,0,0,159,161,5,160,0,0,160,162,
	3,8,4,0,161,160,1,0,0,0,161,162,1,0,0,0,162,163,1,0,0,0,163,167,5,161,0,
	0,164,167,5,173,0,0,165,167,5,175,0,0,166,155,1,0,0,0,166,159,1,0,0,0,166,
	164,1,0,0,0,166,165,1,0,0,0,167,170,1,0,0,0,168,166,1,0,0,0,168,169,1,0,
	0,0,169,7,1,0,0,0,170,168,1,0,0,0,171,176,3,38,19,0,172,173,5,188,0,0,173,
	175,3,38,19,0,174,172,1,0,0,0,175,178,1,0,0,0,176,174,1,0,0,0,176,177,1,
	0,0,0,177,9,1,0,0,0,178,176,1,0,0,0,179,181,7,0,0,0,180,179,1,0,0,0,181,
	184,1,0,0,0,182,180,1,0,0,0,182,183,1,0,0,0,183,189,1,0,0,0,184,182,1,0,
	0,0,185,190,3,6,3,0,186,187,3,12,6,0,187,188,3,14,7,0,188,190,1,0,0,0,189,
	185,1,0,0,0,189,186,1,0,0,0,190,11,1,0,0,0,191,192,7,1,0,0,192,13,1,0,0,
	0,193,194,3,10,5,0,194,15,1,0,0,0,195,200,3,14,7,0,196,197,7,2,0,0,197,
	199,3,14,7,0,198,196,1,0,0,0,199,202,1,0,0,0,200,198,1,0,0,0,200,201,1,
	0,0,0,201,17,1,0,0,0,202,200,1,0,0,0,203,208,3,16,8,0,204,205,7,3,0,0,205,
	207,3,16,8,0,206,204,1,0,0,0,207,210,1,0,0,0,208,206,1,0,0,0,208,209,1,
	0,0,0,209,19,1,0,0,0,210,208,1,0,0,0,211,216,3,18,9,0,212,213,7,4,0,0,213,
	215,3,18,9,0,214,212,1,0,0,0,215,218,1,0,0,0,216,214,1,0,0,0,216,217,1,
	0,0,0,217,21,1,0,0,0,218,216,1,0,0,0,219,224,3,20,10,0,220,221,7,5,0,0,
	221,223,3,20,10,0,222,220,1,0,0,0,223,226,1,0,0,0,224,222,1,0,0,0,224,225,
	1,0,0,0,225,23,1,0,0,0,226,224,1,0,0,0,227,232,3,22,11,0,228,229,7,6,0,
	0,229,231,3,22,11,0,230,228,1,0,0,0,231,234,1,0,0,0,232,230,1,0,0,0,232,
	233,1,0,0,0,233,25,1,0,0,0,234,232,1,0,0,0,235,240,3,24,12,0,236,237,5,
	179,0,0,237,239,3,24,12,0,238,236,1,0,0,0,239,242,1,0,0,0,240,238,1,0,0,
	0,240,241,1,0,0,0,241,27,1,0,0,0,242,240,1,0,0,0,243,248,3,26,13,0,244,
	245,5,183,0,0,245,247,3,26,13,0,246,244,1,0,0,0,247,250,1,0,0,0,248,246,
	1,0,0,0,248,249,1,0,0,0,249,29,1,0,0,0,250,248,1,0,0,0,251,256,3,28,14,
	0,252,253,5,180,0,0,253,255,3,28,14,0,254,252,1,0,0,0,255,258,1,0,0,0,256,
	254,1,0,0,0,256,257,1,0,0,0,257,31,1,0,0,0,258,256,1,0,0,0,259,264,3,30,
	15,0,260,261,5,181,0,0,261,263,3,30,15,0,262,260,1,0,0,0,263,266,1,0,0,
	0,264,262,1,0,0,0,264,265,1,0,0,0,265,33,1,0,0,0,266,264,1,0,0,0,267,272,
	3,32,16,0,268,269,5,182,0,0,269,271,3,32,16,0,270,268,1,0,0,0,271,274,1,
	0,0,0,272,270,1,0,0,0,272,273,1,0,0,0,273,35,1,0,0,0,274,272,1,0,0,0,275,
	281,3,34,17,0,276,277,5,185,0,0,277,278,3,42,21,0,278,279,5,186,0,0,279,
	280,3,36,18,0,280,282,1,0,0,0,281,276,1,0,0,0,281,282,1,0,0,0,282,37,1,
	0,0,0,283,289,3,36,18,0,284,285,3,10,5,0,285,286,3,40,20,0,286,287,3,38,
	19,0,287,289,1,0,0,0,288,283,1,0,0,0,288,284,1,0,0,0,289,39,1,0,0,0,290,
	291,7,7,0,0,291,41,1,0,0,0,292,297,3,38,19,0,293,294,5,188,0,0,294,296,
	3,38,19,0,295,293,1,0,0,0,296,299,1,0,0,0,297,295,1,0,0,0,297,298,1,0,0,
	0,298,43,1,0,0,0,299,297,1,0,0,0,300,301,3,36,18,0,301,45,1,0,0,0,302,303,
	3,52,26,0,303,304,3,48,24,0,304,305,5,187,0,0,305,47,1,0,0,0,306,311,3,
	50,25,0,307,308,5,188,0,0,308,310,3,50,25,0,309,307,1,0,0,0,310,313,1,0,
	0,0,311,309,1,0,0,0,311,312,1,0,0,0,312,49,1,0,0,0,313,311,1,0,0,0,314,
	317,3,62,31,0,315,316,5,189,0,0,316,318,3,82,41,0,317,315,1,0,0,0,317,318,
	1,0,0,0,318,51,1,0,0,0,319,321,3,54,27,0,320,319,1,0,0,0,321,322,1,0,0,
	0,322,320,1,0,0,0,322,323,1,0,0,0,323,53,1,0,0,0,324,327,3,56,28,0,325,
	327,3,58,29,0,326,324,1,0,0,0,326,325,1,0,0,0,327,55,1,0,0,0,328,329,7,
	8,0,0,329,57,1,0,0,0,330,331,7,9,0,0,331,59,1,0,0,0,332,334,3,56,28,0,333,
	335,3,60,30,0,334,333,1,0,0,0,334,335,1,0,0,0,335,61,1,0,0,0,336,337,3,
	64,32,0,337,63,1,0,0,0,338,339,6,32,-1,0,339,340,5,204,0,0,340,360,1,0,
	0,0,341,342,10,3,0,0,342,344,5,162,0,0,343,345,3,44,22,0,344,343,1,0,0,
	0,344,345,1,0,0,0,345,346,1,0,0,0,346,359,5,163,0,0,347,348,10,2,0,0,348,
	349,5,160,0,0,349,350,3,68,34,0,350,351,5,161,0,0,351,359,1,0,0,0,352,353,
	10,1,0,0,353,355,5,160,0,0,354,356,3,74,37,0,355,354,1,0,0,0,355,356,1,
	0,0,0,356,357,1,0,0,0,357,359,5,161,0,0,358,341,1,0,0,0,358,347,1,0,0,0,
	358,352,1,0,0,0,359,362,1,0,0,0,360,358,1,0,0,0,360,361,1,0,0,0,361,65,
	1,0,0,0,362,360,1,0,0,0,363,369,8,10,0,0,364,365,5,160,0,0,365,366,3,66,
	33,0,366,367,5,161,0,0,367,369,1,0,0,0,368,363,1,0,0,0,368,364,1,0,0,0,
	369,372,1,0,0,0,370,368,1,0,0,0,370,371,1,0,0,0,371,67,1,0,0,0,372,370,
	1,0,0,0,373,376,3,70,35,0,374,375,5,188,0,0,375,377,5,139,0,0,376,374,1,
	0,0,0,376,377,1,0,0,0,377,69,1,0,0,0,378,383,3,72,36,0,379,380,5,188,0,
	0,380,382,3,72,36,0,381,379,1,0,0,0,382,385,1,0,0,0,383,381,1,0,0,0,383,
	384,1,0,0,0,384,71,1,0,0,0,385,383,1,0,0,0,386,388,3,52,26,0,387,389,5,
	204,0,0,388,387,1,0,0,0,388,389,1,0,0,0,389,400,1,0,0,0,390,391,3,52,26,
	0,391,392,5,179,0,0,392,393,5,204,0,0,393,400,1,0,0,0,394,395,3,52,26,0,
	395,396,5,204,0,0,396,397,5,162,0,0,397,398,5,163,0,0,398,400,1,0,0,0,399,
	386,1,0,0,0,399,390,1,0,0,0,399,394,1,0,0,0,400,73,1,0,0,0,401,406,5,204,
	0,0,402,403,5,188,0,0,403,405,5,204,0,0,404,402,1,0,0,0,405,408,1,0,0,0,
	406,404,1,0,0,0,406,407,1,0,0,0,407,75,1,0,0,0,408,406,1,0,0,0,409,410,
	3,60,30,0,410,77,1,0,0,0,411,412,6,39,-1,0,412,413,5,162,0,0,413,414,5,
	176,0,0,414,415,5,163,0,0,415,428,1,0,0,0,416,417,10,2,0,0,417,419,5,162,
	0,0,418,420,3,38,19,0,419,418,1,0,0,0,419,420,1,0,0,0,420,421,1,0,0,0,421,
	427,5,163,0,0,422,423,10,1,0,0,423,424,5,162,0,0,424,425,5,176,0,0,425,
	427,5,163,0,0,426,416,1,0,0,0,426,422,1,0,0,0,427,430,1,0,0,0,428,426,1,
	0,0,0,428,429,1,0,0,0,429,79,1,0,0,0,430,428,1,0,0,0,431,432,5,204,0,0,
	432,81,1,0,0,0,433,442,3,38,19,0,434,435,5,164,0,0,435,437,3,84,42,0,436,
	438,5,188,0,0,437,436,1,0,0,0,437,438,1,0,0,0,438,439,1,0,0,0,439,440,5,
	165,0,0,440,442,1,0,0,0,441,433,1,0,0,0,441,434,1,0,0,0,442,83,1,0,0,0,
	443,445,3,86,43,0,444,443,1,0,0,0,444,445,1,0,0,0,445,446,1,0,0,0,446,454,
	3,82,41,0,447,449,5,188,0,0,448,450,3,86,43,0,449,448,1,0,0,0,449,450,1,
	0,0,0,450,451,1,0,0,0,451,453,3,82,41,0,452,447,1,0,0,0,453,456,1,0,0,0,
	454,452,1,0,0,0,454,455,1,0,0,0,455,85,1,0,0,0,456,454,1,0,0,0,457,458,
	3,88,44,0,458,459,5,189,0,0,459,87,1,0,0,0,460,462,3,90,45,0,461,460,1,
	0,0,0,462,463,1,0,0,0,463,461,1,0,0,0,463,464,1,0,0,0,464,89,1,0,0,0,465,
	466,5,162,0,0,466,467,3,44,22,0,467,468,5,163,0,0,468,472,1,0,0,0,469,470,
	5,202,0,0,470,472,5,204,0,0,471,465,1,0,0,0,471,469,1,0,0,0,472,91,1,0,
	0,0,473,511,3,94,47,0,474,511,3,96,48,0,475,511,3,102,51,0,476,511,3,104,
	52,0,477,511,3,106,53,0,478,511,3,114,57,0,479,480,7,11,0,0,480,481,7,12,
	0,0,481,490,5,160,0,0,482,487,3,34,17,0,483,484,5,188,0,0,484,486,3,34,
	17,0,485,483,1,0,0,0,486,489,1,0,0,0,487,485,1,0,0,0,487,488,1,0,0,0,488,
	491,1,0,0,0,489,487,1,0,0,0,490,482,1,0,0,0,490,491,1,0,0,0,491,505,1,0,
	0,0,492,501,5,186,0,0,493,498,3,34,17,0,494,495,5,188,0,0,495,497,3,34,
	17,0,496,494,1,0,0,0,497,500,1,0,0,0,498,496,1,0,0,0,498,499,1,0,0,0,499,
	502,1,0,0,0,500,498,1,0,0,0,501,493,1,0,0,0,501,502,1,0,0,0,502,504,1,0,
	0,0,503,492,1,0,0,0,504,507,1,0,0,0,505,503,1,0,0,0,505,506,1,0,0,0,506,
	508,1,0,0,0,507,505,1,0,0,0,508,509,5,161,0,0,509,511,5,187,0,0,510,473,
	1,0,0,0,510,474,1,0,0,0,510,475,1,0,0,0,510,476,1,0,0,0,510,477,1,0,0,0,
	510,478,1,0,0,0,510,479,1,0,0,0,511,93,1,0,0,0,512,513,5,204,0,0,513,514,
	5,186,0,0,514,524,3,92,46,0,515,516,5,145,0,0,516,517,3,44,22,0,517,518,
	5,186,0,0,518,519,3,92,46,0,519,524,1,0,0,0,520,521,5,148,0,0,521,522,5,
	186,0,0,522,524,3,96,48,0,523,512,1,0,0,0,523,515,1,0,0,0,523,520,1,0,0,
	0,524,95,1,0,0,0,525,527,5,164,0,0,526,528,3,98,49,0,527,526,1,0,0,0,527,
	528,1,0,0,0,528,529,1,0,0,0,529,530,5,165,0,0,530,97,1,0,0,0,531,533,3,
	100,50,0,532,531,1,0,0,0,533,534,1,0,0,0,534,532,1,0,0,0,534,535,1,0,0,
	0,535,99,1,0,0,0,536,539,3,92,46,0,537,539,3,46,23,0,538,536,1,0,0,0,538,
	537,1,0,0,0,539,101,1,0,0,0,540,542,3,42,21,0,541,540,1,0,0,0,541,542,1,
	0,0,0,542,543,1,0,0,0,543,544,5,187,0,0,544,103,1,0,0,0,545,546,5,154,0,
	0,546,547,5,160,0,0,547,548,3,42,21,0,548,549,5,161,0,0,549,552,3,92,46,
	0,550,551,5,150,0,0,551,553,3,92,46,0,552,550,1,0,0,0,552,553,1,0,0,0,553,
	561,1,0,0,0,554,555,5,157,0,0,555,556,5,160,0,0,556,557,3,42,21,0,557,558,
	5,161,0,0,558,559,3,92,46,0,559,561,1,0,0,0,560,545,1,0,0,0,560,554,1,0,
	0,0,561,105,1,0,0,0,562,563,5,159,0,0,563,564,5,160,0,0,564,565,3,42,21,
	0,565,566,5,161,0,0,566,567,3,92,46,0,567,583,1,0,0,0,568,569,5,149,0,0,
	569,570,3,92,46,0,570,571,5,159,0,0,571,572,5,160,0,0,572,573,3,42,21,0,
	573,574,5,161,0,0,574,575,5,187,0,0,575,583,1,0,0,0,576,577,5,152,0,0,577,
	578,5,160,0,0,578,579,3,108,54,0,579,580,5,161,0,0,580,581,3,92,46,0,581,
	583,1,0,0,0,582,562,1,0,0,0,582,568,1,0,0,0,582,576,1,0,0,0,583,107,1,0,
	0,0,584,589,3,110,55,0,585,587,3,42,21,0,586,585,1,0,0,0,586,587,1,0,0,
	0,587,589,1,0,0,0,588,584,1,0,0,0,588,586,1,0,0,0,589,590,1,0,0,0,590,592,
	5,187,0,0,591,593,3,112,56,0,592,591,1,0,0,0,592,593,1,0,0,0,593,594,1,
	0,0,0,594,596,5,187,0,0,595,597,3,112,56,0,596,595,1,0,0,0,596,597,1,0,
	0,0,597,109,1,0,0,0,598,599,3,52,26,0,599,600,3,48,24,0,600,111,1,0,0,0,
	601,606,3,38,19,0,602,603,5,188,0,0,603,605,3,38,19,0,604,602,1,0,0,0,605,
	608,1,0,0,0,606,604,1,0,0,0,606,607,1,0,0,0,607,113,1,0,0,0,608,606,1,0,
	0,0,609,610,5,153,0,0,610,620,5,204,0,0,611,620,5,147,0,0,612,620,5,144,
	0,0,613,615,5,156,0,0,614,616,3,42,21,0,615,614,1,0,0,0,615,616,1,0,0,0,
	616,620,1,0,0,0,617,618,5,153,0,0,618,620,3,10,5,0,619,609,1,0,0,0,619,
	611,1,0,0,0,619,612,1,0,0,0,619,613,1,0,0,0,619,617,1,0,0,0,620,621,1,0,
	0,0,621,622,5,187,0,0,622,115,1,0,0,0,623,625,3,118,59,0,624,623,1,0,0,
	0,624,625,1,0,0,0,625,626,1,0,0,0,626,627,5,0,0,1,627,117,1,0,0,0,628,630,
	3,120,60,0,629,628,1,0,0,0,630,631,1,0,0,0,631,629,1,0,0,0,631,632,1,0,
	0,0,632,119,1,0,0,0,633,637,3,122,61,0,634,637,3,46,23,0,635,637,5,187,
	0,0,636,633,1,0,0,0,636,634,1,0,0,0,636,635,1,0,0,0,637,121,1,0,0,0,638,
	640,3,52,26,0,639,638,1,0,0,0,639,640,1,0,0,0,640,641,1,0,0,0,641,643,3,
	62,31,0,642,644,3,124,62,0,643,642,1,0,0,0,643,644,1,0,0,0,644,645,1,0,
	0,0,645,646,3,96,48,0,646,123,1,0,0,0,647,649,3,46,23,0,648,647,1,0,0,0,
	649,650,1,0,0,0,650,648,1,0,0,0,650,651,1,0,0,0,651,125,1,0,0,0,76,131,
	137,144,149,161,166,168,176,182,189,200,208,216,224,232,240,248,256,264,
	272,281,288,297,311,317,322,326,334,344,355,358,360,368,370,376,383,388,
	399,406,419,426,428,437,441,444,449,454,463,471,487,490,498,501,505,510,
	523,527,534,538,541,552,560,582,586,588,592,596,606,615,619,624,631,636,
	639,643,650];

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
	public declarationSpecifiers(): DeclarationSpecifiersContext {
		return this.getTypedRuleContext(DeclarationSpecifiersContext, 0) as DeclarationSpecifiersContext;
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
	public Default(): TerminalNode {
		return this.getToken(proglang12dParser.Default, 0);
	}
	public compoundStatement(): CompoundStatementContext {
		return this.getTypedRuleContext(CompoundStatementContext, 0) as CompoundStatementContext;
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
