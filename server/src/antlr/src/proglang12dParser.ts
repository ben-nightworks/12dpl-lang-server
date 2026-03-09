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
	public static readonly T__143 = 144;
	public static readonly T__144 = 145;
	public static readonly T__145 = 146;
	public static readonly T__146 = 147;
	public static readonly T__147 = 148;
	public static readonly T__148 = 149;
	public static readonly T__149 = 150;
	public static readonly T__150 = 151;
	public static readonly T__151 = 152;
	public static readonly T__152 = 153;
	public static readonly T__153 = 154;
	public static readonly T__154 = 155;
	public static readonly T__155 = 156;
	public static readonly T__156 = 157;
	public static readonly T__157 = 158;
	public static readonly T__158 = 159;
	public static readonly T__159 = 160;
	public static readonly T__160 = 161;
	public static readonly T__161 = 162;
	public static readonly T__162 = 163;
	public static readonly T__163 = 164;
	public static readonly T__164 = 165;
	public static readonly T__165 = 166;
	public static readonly T__166 = 167;
	public static readonly T__167 = 168;
	public static readonly T__168 = 169;
	public static readonly T__169 = 170;
	public static readonly T__170 = 171;
	public static readonly T__171 = 172;
	public static readonly T__172 = 173;
	public static readonly T__173 = 174;
	public static readonly T__174 = 175;
	public static readonly T__175 = 176;
	public static readonly T__176 = 177;
	public static readonly T__177 = 178;
	public static readonly T__178 = 179;
	public static readonly T__179 = 180;
	public static readonly T__180 = 181;
	public static readonly T__181 = 182;
	public static readonly T__182 = 183;
	public static readonly T__183 = 184;
	public static readonly T__184 = 185;
	public static readonly T__185 = 186;
	public static readonly T__186 = 187;
	public static readonly T__187 = 188;
	public static readonly T__188 = 189;
	public static readonly T__189 = 190;
	public static readonly T__190 = 191;
	public static readonly T__191 = 192;
	public static readonly T__192 = 193;
	public static readonly T__193 = 194;
	public static readonly T__194 = 195;
	public static readonly T__195 = 196;
	public static readonly T__196 = 197;
	public static readonly T__197 = 198;
	public static readonly T__198 = 199;
	public static readonly T__199 = 200;
	public static readonly T__200 = 201;
	public static readonly T__201 = 202;
	public static readonly T__202 = 203;
	public static readonly T__203 = 204;
	public static readonly T__204 = 205;
	public static readonly T__205 = 206;
	public static readonly T__206 = 207;
	public static readonly T__207 = 208;
	public static readonly T__208 = 209;
	public static readonly T__209 = 210;
	public static readonly T__210 = 211;
	public static readonly T__211 = 212;
	public static readonly T__212 = 213;
	public static readonly T__213 = 214;
	public static readonly T__214 = 215;
	public static readonly T__215 = 216;
	public static readonly T__216 = 217;
	public static readonly T__217 = 218;
	public static readonly T__218 = 219;
	public static readonly T__219 = 220;
	public static readonly T__220 = 221;
	public static readonly T__221 = 222;
	public static readonly T__222 = 223;
	public static readonly T__223 = 224;
	public static readonly T__224 = 225;
	public static readonly T__225 = 226;
	public static readonly T__226 = 227;
	public static readonly T__227 = 228;
	public static readonly T__228 = 229;
	public static readonly T__229 = 230;
	public static readonly T__230 = 231;
	public static readonly T__231 = 232;
	public static readonly T__232 = 233;
	public static readonly T__233 = 234;
	public static readonly T__234 = 235;
	public static readonly T__235 = 236;
	public static readonly T__236 = 237;
	public static readonly T__237 = 238;
	public static readonly T__238 = 239;
	public static readonly T__239 = 240;
	public static readonly T__240 = 241;
	public static readonly T__241 = 242;
	public static readonly T__242 = 243;
	public static readonly T__243 = 244;
	public static readonly T__244 = 245;
	public static readonly T__245 = 246;
	public static readonly T__246 = 247;
	public static readonly T__247 = 248;
	public static readonly T__248 = 249;
	public static readonly T__249 = 250;
	public static readonly T__250 = 251;
	public static readonly T__251 = 252;
	public static readonly T__252 = 253;
	public static readonly T__253 = 254;
	public static readonly T__254 = 255;
	public static readonly T__255 = 256;
	public static readonly T__256 = 257;
	public static readonly T__257 = 258;
	public static readonly T__258 = 259;
	public static readonly T__259 = 260;
	public static readonly T__260 = 261;
	public static readonly T__261 = 262;
	public static readonly T__262 = 263;
	public static readonly T__263 = 264;
	public static readonly T__264 = 265;
	public static readonly T__265 = 266;
	public static readonly T__266 = 267;
	public static readonly T__267 = 268;
	public static readonly T__268 = 269;
	public static readonly T__269 = 270;
	public static readonly T__270 = 271;
	public static readonly T__271 = 272;
	public static readonly T__272 = 273;
	public static readonly T__273 = 274;
	public static readonly T__274 = 275;
	public static readonly T__275 = 276;
	public static readonly T__276 = 277;
	public static readonly T__277 = 278;
	public static readonly T__278 = 279;
	public static readonly T__279 = 280;
	public static readonly T__280 = 281;
	public static readonly T__281 = 282;
	public static readonly T__282 = 283;
	public static readonly T__283 = 284;
	public static readonly T__284 = 285;
	public static readonly T__285 = 286;
	public static readonly T__286 = 287;
	public static readonly T__287 = 288;
	public static readonly T__288 = 289;
	public static readonly T__289 = 290;
	public static readonly T__290 = 291;
	public static readonly T__291 = 292;
	public static readonly T__292 = 293;
	public static readonly T__293 = 294;
	public static readonly T__294 = 295;
	public static readonly T__295 = 296;
	public static readonly T__296 = 297;
	public static readonly T__297 = 298;
	public static readonly T__298 = 299;
	public static readonly T__299 = 300;
	public static readonly T__300 = 301;
	public static readonly T__301 = 302;
	public static readonly T__302 = 303;
	public static readonly T__303 = 304;
	public static readonly T__304 = 305;
	public static readonly T__305 = 306;
	public static readonly T__306 = 307;
	public static readonly T__307 = 308;
	public static readonly T__308 = 309;
	public static readonly T__309 = 310;
	public static readonly T__310 = 311;
	public static readonly T__311 = 312;
	public static readonly T__312 = 313;
	public static readonly T__313 = 314;
	public static readonly T__314 = 315;
	public static readonly T__315 = 316;
	public static readonly T__316 = 317;
	public static readonly T__317 = 318;
	public static readonly T__318 = 319;
	public static readonly T__319 = 320;
	public static readonly T__320 = 321;
	public static readonly T__321 = 322;
	public static readonly T__322 = 323;
	public static readonly T__323 = 324;
	public static readonly T__324 = 325;
	public static readonly T__325 = 326;
	public static readonly T__326 = 327;
	public static readonly T__327 = 328;
	public static readonly T__328 = 329;
	public static readonly T__329 = 330;
	public static readonly T__330 = 331;
	public static readonly T__331 = 332;
	public static readonly T__332 = 333;
	public static readonly T__333 = 334;
	public static readonly T__334 = 335;
	public static readonly T__335 = 336;
	public static readonly T__336 = 337;
	public static readonly T__337 = 338;
	public static readonly T__338 = 339;
	public static readonly T__339 = 340;
	public static readonly T__340 = 341;
	public static readonly T__341 = 342;
	public static readonly T__342 = 343;
	public static readonly T__343 = 344;
	public static readonly T__344 = 345;
	public static readonly T__345 = 346;
	public static readonly T__346 = 347;
	public static readonly T__347 = 348;
	public static readonly T__348 = 349;
	public static readonly T__349 = 350;
	public static readonly T__350 = 351;
	public static readonly T__351 = 352;
	public static readonly T__352 = 353;
	public static readonly T__353 = 354;
	public static readonly T__354 = 355;
	public static readonly T__355 = 356;
	public static readonly T__356 = 357;
	public static readonly T__357 = 358;
	public static readonly T__358 = 359;
	public static readonly T__359 = 360;
	public static readonly Break = 361;
	public static readonly Case = 362;
	public static readonly Char = 363;
	public static readonly Continue = 364;
	public static readonly Default = 365;
	public static readonly Do = 366;
	public static readonly Else = 367;
	public static readonly Float = 368;
	public static readonly For = 369;
	public static readonly Goto = 370;
	public static readonly If = 371;
	public static readonly Int = 372;
	public static readonly Return = 373;
	public static readonly Switch = 374;
	public static readonly Void = 375;
	public static readonly While = 376;
	public static readonly LeftParen = 377;
	public static readonly RightParen = 378;
	public static readonly LeftBracket = 379;
	public static readonly RightBracket = 380;
	public static readonly LeftBrace = 381;
	public static readonly RightBrace = 382;
	public static readonly Less = 383;
	public static readonly LessEqual = 384;
	public static readonly Greater = 385;
	public static readonly GreaterEqual = 386;
	public static readonly LeftShift = 387;
	public static readonly RightShift = 388;
	public static readonly Plus = 389;
	public static readonly PlusPlus = 390;
	public static readonly Minus = 391;
	public static readonly MinusMinus = 392;
	public static readonly Star = 393;
	public static readonly Div = 394;
	public static readonly Mod = 395;
	public static readonly And = 396;
	public static readonly Or = 397;
	public static readonly AndAnd = 398;
	public static readonly OrOr = 399;
	public static readonly Caret = 400;
	public static readonly Not = 401;
	public static readonly Question = 402;
	public static readonly Colon = 403;
	public static readonly Semi = 404;
	public static readonly Comma = 405;
	public static readonly Assign = 406;
	public static readonly StarAssign = 407;
	public static readonly DivAssign = 408;
	public static readonly ModAssign = 409;
	public static readonly PlusAssign = 410;
	public static readonly MinusAssign = 411;
	public static readonly LeftShiftAssign = 412;
	public static readonly RightShiftAssign = 413;
	public static readonly AndAssign = 414;
	public static readonly XorAssign = 415;
	public static readonly OrAssign = 416;
	public static readonly Equal = 417;
	public static readonly NotEqual = 418;
	public static readonly Dot = 419;
	public static readonly Identifier = 420;
	public static readonly Constant = 421;
	public static readonly DigitSequence = 422;
	public static readonly StringLiteral = 423;
	public static readonly ComplexDefine = 424;
	public static readonly IncludeDirective = 425;
	public static readonly Whitespace = 426;
	public static readonly Newline = 427;
	public static readonly BlockComment = 428;
	public static readonly LineComment = 429;
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
	public static readonly RULE_builtInSetTypeSpecifier = 30;
	public static readonly RULE_builtInMultiSetTypeSpecifier = 31;
	public static readonly RULE_builtInMapTypeSpecifier = 32;
	public static readonly RULE_builtInMultiMapTypeSpecifier = 33;
	public static readonly RULE_specifierQualifierList = 34;
	public static readonly RULE_declarator = 35;
	public static readonly RULE_directDeclarator = 36;
	public static readonly RULE_nestedParenthesesBlock = 37;
	public static readonly RULE_parameterTypeList = 38;
	public static readonly RULE_parameterList = 39;
	public static readonly RULE_parameterDeclaration = 40;
	public static readonly RULE_identifierList = 41;
	public static readonly RULE_typeName = 42;
	public static readonly RULE_directAbstractDeclarator = 43;
	public static readonly RULE_typedefName = 44;
	public static readonly RULE_initializer = 45;
	public static readonly RULE_initializerList = 46;
	public static readonly RULE_designation = 47;
	public static readonly RULE_designatorList = 48;
	public static readonly RULE_designator = 49;
	public static readonly RULE_statement = 50;
	public static readonly RULE_labeledStatement = 51;
	public static readonly RULE_compoundStatement = 52;
	public static readonly RULE_blockItemList = 53;
	public static readonly RULE_blockItem = 54;
	public static readonly RULE_expressionStatement = 55;
	public static readonly RULE_selectionStatement = 56;
	public static readonly RULE_iterationStatement = 57;
	public static readonly RULE_forCondition = 58;
	public static readonly RULE_forDeclaration = 59;
	public static readonly RULE_forExpression = 60;
	public static readonly RULE_jumpStatement = 61;
	public static readonly RULE_compilationUnit = 62;
	public static readonly RULE_translationUnit = 63;
	public static readonly RULE_externalDeclaration = 64;
	public static readonly RULE_functionDefinition = 65;
	public static readonly RULE_declarationList = 66;
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
                                                            "'Projection_Box'", 
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
                                                            "'Integer64_Set'", 
                                                            "'Uid_Set'", 
                                                            "'Guid_Set'", 
                                                            "'Point_Set'", 
                                                            "'Vector2_Set'", 
                                                            "'Vector3_Set'", 
                                                            "'Vector4_Set'", 
                                                            "'Integer_Multiset'", 
                                                            "'Integer64_Multiset'", 
                                                            "'Real_Multiset'", 
                                                            "'Text_Multiset'", 
                                                            "'Uid_Multiset'", 
                                                            "'Guid_Multiset'", 
                                                            "'Point_Multiset'", 
                                                            "'Vector2_Multiset'", 
                                                            "'Vector3_Multiset'", 
                                                            "'Vector4_Multiset'", 
                                                            "'Integer_Integer_Map'", 
                                                            "'Integer64_Integer_Map'", 
                                                            "'Real_Integer_Map'", 
                                                            "'Text_Integer_Map'", 
                                                            "'Uid_Integer_Map'", 
                                                            "'Guid_Integer_Map'", 
                                                            "'Point_Integer_Map'", 
                                                            "'Vector2_Integer_Map'", 
                                                            "'Vector3_Integer_Map'", 
                                                            "'Vector4_Integer_Map'", 
                                                            "'Integer_Integer64_Map'", 
                                                            "'Integer64_Integer64_Map'", 
                                                            "'Real_Integer64_Map'", 
                                                            "'Text_Integer64_Map'", 
                                                            "'Uid_Integer64_Map'", 
                                                            "'Guid_Integer64_Map'", 
                                                            "'Point_Integer64_Map'", 
                                                            "'Vector2_Integer64_Map'", 
                                                            "'Vector3_Integer64_Map'", 
                                                            "'Vector4_Integer64_Map'", 
                                                            "'Integer_Real_Map'", 
                                                            "'Integer64_Real_Map'", 
                                                            "'Real_Real_Map'", 
                                                            "'Text_Real_Map'", 
                                                            "'Uid_Real_Map'", 
                                                            "'Guid_Real_Map'", 
                                                            "'Point_Real_Map'", 
                                                            "'Vector2_Real_Map'", 
                                                            "'Vector3_Real_Map'", 
                                                            "'Vector4_Real_Map'", 
                                                            "'Integer_Text_Map'", 
                                                            "'Integer64_Text_Map'", 
                                                            "'Real_Text_Map'", 
                                                            "'Text_Text_Map'", 
                                                            "'Uid_Text_Map'", 
                                                            "'Guid_Text_Map'", 
                                                            "'Point_Text_Map'", 
                                                            "'Vector2_Text_Map'", 
                                                            "'Vector3_Text_Map'", 
                                                            "'Vector4_Text_Map'", 
                                                            "'Integer_Uid_Map'", 
                                                            "'Integer64_Uid_Map'", 
                                                            "'Real_Uid_Map'", 
                                                            "'Text_Uid_Map'", 
                                                            "'Uid_Uid_Map'", 
                                                            "'Guid_Uid_Map'", 
                                                            "'Point_Uid_Map'", 
                                                            "'Vector2_Uid_Map'", 
                                                            "'Vector3_Uid_Map'", 
                                                            "'Vector4_Uid_Map'", 
                                                            "'Integer_Guid_Map'", 
                                                            "'Integer64_Guid_Map'", 
                                                            "'Real_Guid_Map'", 
                                                            "'Text_Guid_Map'", 
                                                            "'Uid_Guid_Map'", 
                                                            "'Guid_Guid_Map'", 
                                                            "'Point_Guid_Map'", 
                                                            "'Vector2_Guid_Map'", 
                                                            "'Vector3_Guid_Map'", 
                                                            "'Vector4_Guid_Map'", 
                                                            "'Integer_Point_Map'", 
                                                            "'Integer64_Point_Map'", 
                                                            "'Real_Point_Map'", 
                                                            "'Text_Point_Map'", 
                                                            "'Uid_Point_Map'", 
                                                            "'Guid_Point_Map'", 
                                                            "'Point_Point_Map'", 
                                                            "'Vector2_Point_Map'", 
                                                            "'Vector3_Point_Map'", 
                                                            "'Vector4_Point_Map'", 
                                                            "'Integer_Vector2_Map'", 
                                                            "'Integer64_Vector2_Map'", 
                                                            "'Real_Vector2_Map'", 
                                                            "'Text_Vector2_Map'", 
                                                            "'Uid_Vector2_Map'", 
                                                            "'Guid_Vector2_Map'", 
                                                            "'Point_Vector2_Map'", 
                                                            "'Vector2_Vector2_Map'", 
                                                            "'Vector3_Vector2_Map'", 
                                                            "'Vector4_Vector2_Map'", 
                                                            "'Integer_Vector3_Map'", 
                                                            "'Integer64_Vector3_Map'", 
                                                            "'Real_Vector3_Map'", 
                                                            "'Text_Vector3_Map'", 
                                                            "'Uid_Vector3_Map'", 
                                                            "'Guid_Vector3_Map'", 
                                                            "'Point_Vector3_Map'", 
                                                            "'Vector2_Vector3_Map'", 
                                                            "'Vector3_Vector3_Map'", 
                                                            "'Vector4_Vector3_Map'", 
                                                            "'Integer_Vector4_Map'", 
                                                            "'Integer64_Vector4_Map'", 
                                                            "'Real_Vector4_Map'", 
                                                            "'Text_Vector4_Map'", 
                                                            "'Uid_Vector4_Map'", 
                                                            "'Guid_Vector4_Map'", 
                                                            "'Point_Vector4_Map'", 
                                                            "'Vector2_Vector4_Map'", 
                                                            "'Vector3_Vector4_Map'", 
                                                            "'Vector4_Vector4_Map'", 
                                                            "'Integer_Integer_Multimap'", 
                                                            "'Integer64_Integer_Multimap'", 
                                                            "'Real_Integer_Multimap'", 
                                                            "'Text_Integer_Multimap'", 
                                                            "'Uid_Integer_Multimap'", 
                                                            "'Guid_Integer_Multimap'", 
                                                            "'Point_Integer_Multimap'", 
                                                            "'Vector2_Integer_Multimap'", 
                                                            "'Vector3_Integer_Multimap'", 
                                                            "'Vector4_Integer_Multimap'", 
                                                            "'Integer_Integer64_Multimap'", 
                                                            "'Integer64_Integer64_Multimap'", 
                                                            "'Real_Integer64_Multimap'", 
                                                            "'Text_Integer64_Multimap'", 
                                                            "'Uid_Integer64_Multimap'", 
                                                            "'Guid_Integer64_Multimap'", 
                                                            "'Point_Integer64_Multimap'", 
                                                            "'Vector2_Integer64_Multimap'", 
                                                            "'Vector3_Integer64_Multimap'", 
                                                            "'Vector4_Integer64_Multimap'", 
                                                            "'Integer_Real_Multimap'", 
                                                            "'Integer64_Real_Multimap'", 
                                                            "'Real_Real_Multimap'", 
                                                            "'Text_Real_Multimap'", 
                                                            "'Uid_Real_Multimap'", 
                                                            "'Guid_Real_Multimap'", 
                                                            "'Point_Real_Multimap'", 
                                                            "'Vector2_Real_Multimap'", 
                                                            "'Vector3_Real_Multimap'", 
                                                            "'Vector4_Real_Multimap'", 
                                                            "'Integer_Text_Multimap'", 
                                                            "'Integer64_Text_Multimap'", 
                                                            "'Real_Text_Multimap'", 
                                                            "'Text_Text_Multimap'", 
                                                            "'Uid_Text_Multimap'", 
                                                            "'Guid_Text_Multimap'", 
                                                            "'Point_Text_Multimap'", 
                                                            "'Vector2_Text_Multimap'", 
                                                            "'Vector3_Text_Multimap'", 
                                                            "'Vector4_Text_Multimap'", 
                                                            "'Integer_Uid_Multimap'", 
                                                            "'Integer64_Uid_Multimap'", 
                                                            "'Real_Uid_Multimap'", 
                                                            "'Text_Uid_Multimap'", 
                                                            "'Uid_Uid_Multimap'", 
                                                            "'Guid_Uid_Multimap'", 
                                                            "'Point_Uid_Multimap'", 
                                                            "'Vector2_Uid_Multimap'", 
                                                            "'Vector3_Uid_Multimap'", 
                                                            "'Vector4_Uid_Multimap'", 
                                                            "'Integer_Guid_Multimap'", 
                                                            "'Integer64_Guid_Multimap'", 
                                                            "'Real_Guid_Multimap'", 
                                                            "'Text_Guid_Multimap'", 
                                                            "'Uid_Guid_Multimap'", 
                                                            "'Guid_Guid_Multimap'", 
                                                            "'Point_Guid_Multimap'", 
                                                            "'Vector2_Guid_Multimap'", 
                                                            "'Vector3_Guid_Multimap'", 
                                                            "'Vector4_Guid_Multimap'", 
                                                            "'Integer_Point_Multimap'", 
                                                            "'Integer64_Point_Multimap'", 
                                                            "'Real_Point_Multimap'", 
                                                            "'Text_Point_Multimap'", 
                                                            "'Uid_Point_Multimap'", 
                                                            "'Guid_Point_Multimap'", 
                                                            "'Point_Point_Multimap'", 
                                                            "'Vector2_Point_Multimap'", 
                                                            "'Vector3_Point_Multimap'", 
                                                            "'Vector4_Point_Multimap'", 
                                                            "'Integer_Vector2_Multimap'", 
                                                            "'Integer64_Vector2_Multimap'", 
                                                            "'Real_Vector2_Multimap'", 
                                                            "'Text_Vector2_Multimap'", 
                                                            "'Uid_Vector2_Multimap'", 
                                                            "'Guid_Vector2_Multimap'", 
                                                            "'Point_Vector2_Multimap'", 
                                                            "'Vector2_Vector2_Multimap'", 
                                                            "'Vector3_Vector2_Multimap'", 
                                                            "'Vector4_Vector2_Multimap'", 
                                                            "'Integer_Vector3_Multimap'", 
                                                            "'Integer64_Vector3_Multimap'", 
                                                            "'Real_Vector3_Multimap'", 
                                                            "'Text_Vector3_Multimap'", 
                                                            "'Uid_Vector3_Multimap'", 
                                                            "'Guid_Vector3_Multimap'", 
                                                            "'Point_Vector3_Multimap'", 
                                                            "'Vector2_Vector3_Multimap'", 
                                                            "'Vector3_Vector3_Multimap'", 
                                                            "'Vector4_Vector3_Multimap'", 
                                                            "'Integer_Vector4_Multimap'", 
                                                            "'Integer64_Vector4_Multimap'", 
                                                            "'Real_Vector4_Multimap'", 
                                                            "'Text_Vector4_Multimap'", 
                                                            "'Uid_Vector4_Multimap'", 
                                                            "'Guid_Vector4_Multimap'", 
                                                            "'Point_Vector4_Multimap'", 
                                                            "'Vector2_Vector4_Multimap'", 
                                                            "'Vector3_Vector4_Multimap'", 
                                                            "'Vector4_Vector4_Multimap'", 
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
                                                             null, "Break", 
                                                             "Case", "Char", 
                                                             "Continue", 
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
		"declarationSpecifier", "typeSpecifier", "builtInTypeSpecifier", "builtInSetTypeSpecifier", 
		"builtInMultiSetTypeSpecifier", "builtInMapTypeSpecifier", "builtInMultiMapTypeSpecifier", 
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
			this.state = 145;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 420:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 134;
				this.match(proglang12dParser.Identifier);
				}
				break;
			case 421:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 135;
				this.match(proglang12dParser.Constant);
				}
				break;
			case 423:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 137;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 136;
					this.match(proglang12dParser.StringLiteral);
					}
					}
					this.state = 139;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===423);
				}
				break;
			case 377:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 141;
				this.match(proglang12dParser.LeftParen);
				this.state = 142;
				this.expression();
				this.state = 143;
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
			this.state = 147;
			this.genericAssociation();
			this.state = 152;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===405) {
				{
				{
				this.state = 148;
				this.match(proglang12dParser.Comma);
				this.state = 149;
				this.genericAssociation();
				}
				}
				this.state = 154;
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
			this.state = 157;
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
			case 245:
			case 246:
			case 247:
			case 248:
			case 249:
			case 250:
			case 251:
			case 252:
			case 253:
			case 254:
			case 255:
			case 256:
			case 257:
			case 258:
			case 259:
			case 260:
			case 261:
			case 262:
			case 263:
			case 264:
			case 265:
			case 266:
			case 267:
			case 268:
			case 269:
			case 270:
			case 271:
			case 272:
			case 273:
			case 274:
			case 275:
			case 276:
			case 277:
			case 278:
			case 279:
			case 280:
			case 281:
			case 282:
			case 283:
			case 284:
			case 285:
			case 286:
			case 287:
			case 288:
			case 289:
			case 290:
			case 291:
			case 292:
			case 293:
			case 294:
			case 295:
			case 296:
			case 297:
			case 298:
			case 299:
			case 300:
			case 301:
			case 302:
			case 303:
			case 304:
			case 305:
			case 306:
			case 307:
			case 308:
			case 309:
			case 310:
			case 311:
			case 312:
			case 313:
			case 314:
			case 315:
			case 316:
			case 317:
			case 318:
			case 319:
			case 320:
			case 321:
			case 322:
			case 323:
			case 324:
			case 325:
			case 326:
			case 327:
			case 328:
			case 329:
			case 330:
			case 331:
			case 332:
			case 333:
			case 334:
			case 335:
			case 336:
			case 337:
			case 338:
			case 339:
			case 340:
			case 341:
			case 342:
			case 343:
			case 344:
			case 345:
			case 346:
			case 347:
			case 348:
			case 349:
			case 350:
			case 351:
			case 352:
			case 353:
			case 354:
			case 355:
			case 363:
			case 368:
			case 372:
			case 375:
				{
				this.state = 155;
				this.typeName();
				}
				break;
			case 365:
				{
				this.state = 156;
				this.match(proglang12dParser.Default);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 159;
			this.match(proglang12dParser.Colon);
			this.state = 160;
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
			this.state = 162;
			this.primaryExpression();
			this.state = 176;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 377)) & ~0x1F) === 0 && ((1 << (_la - 377)) & 40965) !== 0)) {
				{
				this.state = 174;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 379:
					{
					this.state = 163;
					this.match(proglang12dParser.LeftBracket);
					this.state = 164;
					this.expression();
					this.state = 165;
					this.match(proglang12dParser.RightBracket);
					}
					break;
				case 377:
					{
					this.state = 167;
					this.match(proglang12dParser.LeftParen);
					this.state = 169;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (((((_la - 377)) & ~0x1F) === 0 && ((1 << (_la - 377)) & 16838657) !== 0) || ((((_la - 420)) & ~0x1F) === 0 && ((1 << (_la - 420)) & 11) !== 0)) {
						{
						this.state = 168;
						this.argumentExpressionList();
						}
					}

					this.state = 171;
					this.match(proglang12dParser.RightParen);
					}
					break;
				case 390:
					{
					this.state = 172;
					this.match(proglang12dParser.PlusPlus);
					}
					break;
				case 392:
					{
					this.state = 173;
					this.match(proglang12dParser.MinusMinus);
					}
					break;
				default:
					throw new NoViableAltException(this);
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
	public argumentExpressionList(): ArgumentExpressionListContext {
		let localctx: ArgumentExpressionListContext = new ArgumentExpressionListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, proglang12dParser.RULE_argumentExpressionList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 179;
			this.assignmentExpression();
			this.state = 184;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===405) {
				{
				{
				this.state = 180;
				this.match(proglang12dParser.Comma);
				this.state = 181;
				this.assignmentExpression();
				}
				}
				this.state = 186;
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
			this.state = 190;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===390 || _la===392) {
				{
				{
				this.state = 187;
				_la = this._input.LA(1);
				if(!(_la===390 || _la===392)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				}
				this.state = 192;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 197;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 377:
			case 420:
			case 421:
			case 423:
				{
				this.state = 193;
				this.postfixExpression();
				}
				break;
			case 389:
			case 391:
			case 401:
				{
				this.state = 194;
				this.unaryOperator();
				this.state = 195;
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
			this.state = 199;
			_la = this._input.LA(1);
			if(!(((((_la - 389)) & ~0x1F) === 0 && ((1 << (_la - 389)) & 4101) !== 0))) {
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
			this.state = 201;
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
			this.state = 203;
			this.castExpression();
			this.state = 208;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 393)) & ~0x1F) === 0 && ((1 << (_la - 393)) & 7) !== 0)) {
				{
				{
				this.state = 204;
				_la = this._input.LA(1);
				if(!(((((_la - 393)) & ~0x1F) === 0 && ((1 << (_la - 393)) & 7) !== 0))) {
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
			while (_la===389 || _la===391) {
				{
				{
				this.state = 212;
				_la = this._input.LA(1);
				if(!(_la===389 || _la===391)) {
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
			while (_la===387 || _la===388) {
				{
				{
				this.state = 220;
				_la = this._input.LA(1);
				if(!(_la===387 || _la===388)) {
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
			while (((((_la - 383)) & ~0x1F) === 0 && ((1 << (_la - 383)) & 15) !== 0)) {
				{
				{
				this.state = 228;
				_la = this._input.LA(1);
				if(!(((((_la - 383)) & ~0x1F) === 0 && ((1 << (_la - 383)) & 15) !== 0))) {
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
			while (_la===417 || _la===418) {
				{
				{
				this.state = 236;
				_la = this._input.LA(1);
				if(!(_la===417 || _la===418)) {
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
			while (_la===396) {
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
			while (_la===400) {
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
			while (_la===397) {
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
			while (_la===398) {
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
			while (_la===399) {
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
			if (_la===402) {
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
			this.state = 296;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 21, this._ctx) ) {
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
			this.state = 298;
			_la = this._input.LA(1);
			if(!(((((_la - 406)) & ~0x1F) === 0 && ((1 << (_la - 406)) & 63) !== 0))) {
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
			this.state = 300;
			this.assignmentExpression();
			this.state = 305;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===405) {
				{
				{
				this.state = 301;
				this.match(proglang12dParser.Comma);
				this.state = 302;
				this.assignmentExpression();
				}
				}
				this.state = 307;
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
			this.state = 308;
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
			this.state = 310;
			this.declarationSpecifiers();
			this.state = 311;
			this.initDeclaratorList();
			this.state = 312;
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
			this.state = 314;
			this.initDeclarator();
			this.state = 319;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===405) {
				{
				{
				this.state = 315;
				this.match(proglang12dParser.Comma);
				this.state = 316;
				this.initDeclarator();
				}
				}
				this.state = 321;
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
			this.state = 322;
			this.declarator();
			this.state = 325;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===406) {
				{
				this.state = 323;
				this.match(proglang12dParser.Assign);
				this.state = 324;
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
			this.state = 328;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 327;
				this.declarationSpecifier();
				}
				}
				this.state = 330;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 9504783) !== 0));
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
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 332;
			this.typeSpecifier();
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
		try {
			this.state = 343;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 334;
				this.match(proglang12dParser.Void);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 335;
				this.match(proglang12dParser.Char);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 336;
				this.match(proglang12dParser.Int);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 337;
				this.match(proglang12dParser.Float);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 338;
				this.builtInTypeSpecifier();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 339;
				this.builtInSetTypeSpecifier();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 340;
				this.builtInMultiSetTypeSpecifier();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 341;
				this.builtInMapTypeSpecifier();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 342;
				this.builtInMultiMapTypeSpecifier();
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
	public builtInTypeSpecifier(): BuiltInTypeSpecifierContext {
		let localctx: BuiltInTypeSpecifierContext = new BuiltInTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, proglang12dParser.RULE_builtInTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 345;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4095) !== 0))) {
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
	public builtInSetTypeSpecifier(): BuiltInSetTypeSpecifierContext {
		let localctx: BuiltInSetTypeSpecifierContext = new BuiltInSetTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, proglang12dParser.RULE_builtInSetTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 347;
			_la = this._input.LA(1);
			if(!(((((_la - 130)) & ~0x1F) === 0 && ((1 << (_la - 130)) & 65097) !== 0))) {
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
	public builtInMultiSetTypeSpecifier(): BuiltInMultiSetTypeSpecifierContext {
		let localctx: BuiltInMultiSetTypeSpecifierContext = new BuiltInMultiSetTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, proglang12dParser.RULE_builtInMultiSetTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 349;
			_la = this._input.LA(1);
			if(!(((((_la - 146)) & ~0x1F) === 0 && ((1 << (_la - 146)) & 1023) !== 0))) {
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
	public builtInMapTypeSpecifier(): BuiltInMapTypeSpecifierContext {
		let localctx: BuiltInMapTypeSpecifierContext = new BuiltInMapTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, proglang12dParser.RULE_builtInMapTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 351;
			_la = this._input.LA(1);
			if(!(((((_la - 156)) & ~0x1F) === 0 && ((1 << (_la - 156)) & 4294967295) !== 0) || ((((_la - 188)) & ~0x1F) === 0 && ((1 << (_la - 188)) & 4294967295) !== 0) || ((((_la - 220)) & ~0x1F) === 0 && ((1 << (_la - 220)) & 4294967295) !== 0) || ((((_la - 252)) & ~0x1F) === 0 && ((1 << (_la - 252)) & 15) !== 0))) {
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
	public builtInMultiMapTypeSpecifier(): BuiltInMultiMapTypeSpecifierContext {
		let localctx: BuiltInMultiMapTypeSpecifierContext = new BuiltInMultiMapTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, proglang12dParser.RULE_builtInMultiMapTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 353;
			_la = this._input.LA(1);
			if(!(((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 15) !== 0))) {
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
		this.enterRule(localctx, 68, proglang12dParser.RULE_specifierQualifierList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 355;
			this.typeSpecifier();
			this.state = 357;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 9504783) !== 0)) {
				{
				this.state = 356;
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
		this.enterRule(localctx, 70, proglang12dParser.RULE_declarator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 359;
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
		let _startState: number = 72;
		this.enterRecursionRule(localctx, 72, proglang12dParser.RULE_directDeclarator, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 362;
			this.match(proglang12dParser.Identifier);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 383;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 381;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
					case 1:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directDeclarator);
						this.state = 364;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 365;
						this.match(proglang12dParser.LeftBracket);
						this.state = 367;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (((((_la - 377)) & ~0x1F) === 0 && ((1 << (_la - 377)) & 16838657) !== 0) || ((((_la - 420)) & ~0x1F) === 0 && ((1 << (_la - 420)) & 11) !== 0)) {
							{
							this.state = 366;
							this.constantExpression();
							}
						}

						this.state = 369;
						this.match(proglang12dParser.RightBracket);
						}
						break;
					case 2:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directDeclarator);
						this.state = 370;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 371;
						this.match(proglang12dParser.LeftParen);
						this.state = 372;
						this.parameterTypeList();
						this.state = 373;
						this.match(proglang12dParser.RightParen);
						}
						break;
					case 3:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directDeclarator);
						this.state = 375;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 376;
						this.match(proglang12dParser.LeftParen);
						this.state = 378;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===420) {
							{
							this.state = 377;
							this.identifierList();
							}
						}

						this.state = 380;
						this.match(proglang12dParser.RightParen);
						}
						break;
					}
					}
				}
				this.state = 385;
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
		this.enterRule(localctx, 74, proglang12dParser.RULE_nestedParenthesesBlock);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 393;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 4227858431) !== 0) || ((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 4294967295) !== 0) || ((((_la - 416)) & ~0x1F) === 0 && ((1 << (_la - 416)) & 16383) !== 0)) {
				{
				this.state = 391;
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
				case 245:
				case 246:
				case 247:
				case 248:
				case 249:
				case 250:
				case 251:
				case 252:
				case 253:
				case 254:
				case 255:
				case 256:
				case 257:
				case 258:
				case 259:
				case 260:
				case 261:
				case 262:
				case 263:
				case 264:
				case 265:
				case 266:
				case 267:
				case 268:
				case 269:
				case 270:
				case 271:
				case 272:
				case 273:
				case 274:
				case 275:
				case 276:
				case 277:
				case 278:
				case 279:
				case 280:
				case 281:
				case 282:
				case 283:
				case 284:
				case 285:
				case 286:
				case 287:
				case 288:
				case 289:
				case 290:
				case 291:
				case 292:
				case 293:
				case 294:
				case 295:
				case 296:
				case 297:
				case 298:
				case 299:
				case 300:
				case 301:
				case 302:
				case 303:
				case 304:
				case 305:
				case 306:
				case 307:
				case 308:
				case 309:
				case 310:
				case 311:
				case 312:
				case 313:
				case 314:
				case 315:
				case 316:
				case 317:
				case 318:
				case 319:
				case 320:
				case 321:
				case 322:
				case 323:
				case 324:
				case 325:
				case 326:
				case 327:
				case 328:
				case 329:
				case 330:
				case 331:
				case 332:
				case 333:
				case 334:
				case 335:
				case 336:
				case 337:
				case 338:
				case 339:
				case 340:
				case 341:
				case 342:
				case 343:
				case 344:
				case 345:
				case 346:
				case 347:
				case 348:
				case 349:
				case 350:
				case 351:
				case 352:
				case 353:
				case 354:
				case 355:
				case 356:
				case 357:
				case 358:
				case 359:
				case 360:
				case 361:
				case 362:
				case 363:
				case 364:
				case 365:
				case 366:
				case 367:
				case 368:
				case 369:
				case 370:
				case 371:
				case 372:
				case 373:
				case 374:
				case 375:
				case 376:
				case 379:
				case 380:
				case 381:
				case 382:
				case 383:
				case 384:
				case 385:
				case 386:
				case 387:
				case 388:
				case 389:
				case 390:
				case 391:
				case 392:
				case 393:
				case 394:
				case 395:
				case 396:
				case 397:
				case 398:
				case 399:
				case 400:
				case 401:
				case 402:
				case 403:
				case 404:
				case 405:
				case 406:
				case 407:
				case 408:
				case 409:
				case 410:
				case 411:
				case 412:
				case 413:
				case 414:
				case 415:
				case 416:
				case 417:
				case 418:
				case 419:
				case 420:
				case 421:
				case 422:
				case 423:
				case 424:
				case 425:
				case 426:
				case 427:
				case 428:
				case 429:
					{
					this.state = 386;
					_la = this._input.LA(1);
					if(_la<=0 || _la===377 || _la===378) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					break;
				case 377:
					{
					this.state = 387;
					this.match(proglang12dParser.LeftParen);
					this.state = 388;
					this.nestedParenthesesBlock();
					this.state = 389;
					this.match(proglang12dParser.RightParen);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 395;
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
		this.enterRule(localctx, 76, proglang12dParser.RULE_parameterTypeList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 396;
			this.parameterList();
			this.state = 399;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===405) {
				{
				this.state = 397;
				this.match(proglang12dParser.Comma);
				this.state = 398;
				this.match(proglang12dParser.T__355);
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
		this.enterRule(localctx, 78, proglang12dParser.RULE_parameterList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 401;
			this.parameterDeclaration();
			this.state = 406;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 35, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 402;
					this.match(proglang12dParser.Comma);
					this.state = 403;
					this.parameterDeclaration();
					}
					}
				}
				this.state = 408;
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
		this.enterRule(localctx, 80, proglang12dParser.RULE_parameterDeclaration);
		let _la: number;
		try {
			this.state = 422;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 409;
				this.declarationSpecifiers();
				this.state = 411;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===420) {
					{
					this.state = 410;
					this.match(proglang12dParser.Identifier);
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 413;
				this.declarationSpecifiers();
				this.state = 414;
				this.match(proglang12dParser.And);
				this.state = 415;
				this.match(proglang12dParser.Identifier);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 417;
				this.declarationSpecifiers();
				this.state = 418;
				this.match(proglang12dParser.Identifier);
				this.state = 419;
				this.match(proglang12dParser.LeftBracket);
				this.state = 420;
				this.match(proglang12dParser.RightBracket);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 399;
				this.declarationSpecifiers();
				this.state = 400;
				this.match(proglang12dParser.And);
				this.state = 401;
				this.match(proglang12dParser.Identifier);
				this.state = 402;
				this.match(proglang12dParser.LeftBracket);
				this.state = 403;
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
		this.enterRule(localctx, 82, proglang12dParser.RULE_identifierList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 424;
			this.match(proglang12dParser.Identifier);
			this.state = 429;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===405) {
				{
				{
				this.state = 425;
				this.match(proglang12dParser.Comma);
				this.state = 426;
				this.match(proglang12dParser.Identifier);
				}
				}
				this.state = 431;
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
		this.enterRule(localctx, 84, proglang12dParser.RULE_typeName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 432;
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
		let _startState: number = 86;
		this.enterRecursionRule(localctx, 86, proglang12dParser.RULE_directAbstractDeclarator, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 435;
			this.match(proglang12dParser.LeftBracket);
			this.state = 436;
			this.match(proglang12dParser.Star);
			this.state = 437;
			this.match(proglang12dParser.RightBracket);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 451;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 449;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 40, this._ctx) ) {
					case 1:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directAbstractDeclarator);
						this.state = 439;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 440;
						this.match(proglang12dParser.LeftBracket);
						this.state = 442;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (((((_la - 377)) & ~0x1F) === 0 && ((1 << (_la - 377)) & 16838657) !== 0) || ((((_la - 420)) & ~0x1F) === 0 && ((1 << (_la - 420)) & 11) !== 0)) {
							{
							this.state = 441;
							this.assignmentExpression();
							}
						}

						this.state = 444;
						this.match(proglang12dParser.RightBracket);
						}
						break;
					case 2:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directAbstractDeclarator);
						this.state = 445;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 446;
						this.match(proglang12dParser.LeftBracket);
						this.state = 447;
						this.match(proglang12dParser.Star);
						this.state = 448;
						this.match(proglang12dParser.RightBracket);
						}
						break;
					}
					}
				}
				this.state = 453;
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
		this.enterRule(localctx, 88, proglang12dParser.RULE_typedefName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 454;
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
		this.enterRule(localctx, 90, proglang12dParser.RULE_initializer);
		let _la: number;
		try {
			this.state = 464;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 377:
			case 389:
			case 390:
			case 391:
			case 392:
			case 401:
			case 420:
			case 421:
			case 423:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 456;
				this.assignmentExpression();
				}
				break;
			case 381:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 457;
				this.match(proglang12dParser.LeftBrace);
				this.state = 458;
				this.initializerList();
				this.state = 460;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===405) {
					{
					this.state = 459;
					this.match(proglang12dParser.Comma);
					}
				}

				this.state = 462;
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
		this.enterRule(localctx, 92, proglang12dParser.RULE_initializerList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 467;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===379 || _la===419) {
				{
				this.state = 466;
				this.designation();
				}
			}

			this.state = 469;
			this.initializer();
			this.state = 477;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 46, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 470;
					this.match(proglang12dParser.Comma);
					this.state = 472;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===379 || _la===419) {
						{
						this.state = 471;
						this.designation();
						}
					}

					this.state = 474;
					this.initializer();
					}
					}
				}
				this.state = 479;
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
		this.enterRule(localctx, 94, proglang12dParser.RULE_designation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 480;
			this.designatorList();
			this.state = 481;
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
		this.enterRule(localctx, 96, proglang12dParser.RULE_designatorList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 484;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 483;
				this.designator();
				}
				}
				this.state = 486;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===379 || _la===419);
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
		this.enterRule(localctx, 98, proglang12dParser.RULE_designator);
		try {
			this.state = 494;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 379:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 488;
				this.match(proglang12dParser.LeftBracket);
				this.state = 489;
				this.constantExpression();
				this.state = 490;
				this.match(proglang12dParser.RightBracket);
				}
				break;
			case 419:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 492;
				this.match(proglang12dParser.Dot);
				this.state = 493;
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
		this.enterRule(localctx, 100, proglang12dParser.RULE_statement);
		let _la: number;
		try {
			this.state = 533;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 496;
				this.labeledStatement();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 497;
				this.compoundStatement();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 498;
				this.expressionStatement();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 499;
				this.selectionStatement();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 500;
				this.iterationStatement();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 501;
				this.jumpStatement();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 502;
				_la = this._input.LA(1);
				if(!(_la===357 || _la===358)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 503;
				_la = this._input.LA(1);
				if(!(_la===359 || _la===360)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 504;
				this.match(proglang12dParser.LeftParen);
				this.state = 513;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 377)) & ~0x1F) === 0 && ((1 << (_la - 377)) & 16838657) !== 0) || ((((_la - 420)) & ~0x1F) === 0 && ((1 << (_la - 420)) & 11) !== 0)) {
					{
					this.state = 505;
					this.logicalOrExpression();
					this.state = 510;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===405) {
						{
						{
						this.state = 506;
						this.match(proglang12dParser.Comma);
						this.state = 507;
						this.logicalOrExpression();
						}
						}
						this.state = 512;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 528;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===403) {
					{
					{
					this.state = 515;
					this.match(proglang12dParser.Colon);
					this.state = 524;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (((((_la - 377)) & ~0x1F) === 0 && ((1 << (_la - 377)) & 16838657) !== 0) || ((((_la - 420)) & ~0x1F) === 0 && ((1 << (_la - 420)) & 11) !== 0)) {
						{
						this.state = 516;
						this.logicalOrExpression();
						this.state = 521;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la===405) {
							{
							{
							this.state = 517;
							this.match(proglang12dParser.Comma);
							this.state = 518;
							this.logicalOrExpression();
							}
							}
							this.state = 523;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						}
					}

					}
					}
					this.state = 530;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 531;
				this.match(proglang12dParser.RightParen);
				this.state = 532;
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
		this.enterRule(localctx, 102, proglang12dParser.RULE_labeledStatement);
		try {
			this.state = 546;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 420:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 535;
				this.match(proglang12dParser.Identifier);
				this.state = 536;
				this.match(proglang12dParser.Colon);
				this.state = 537;
				this.statement();
				}
				break;
			case 362:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 538;
				this.match(proglang12dParser.Case);
				this.state = 539;
				this.constantExpression();
				this.state = 540;
				this.match(proglang12dParser.Colon);
				this.state = 541;
				this.statement();
				}
				break;
			case 365:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 543;
				this.match(proglang12dParser.Default);
				this.state = 544;
				this.match(proglang12dParser.Colon);
				this.state = 545;
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
		this.enterRule(localctx, 104, proglang12dParser.RULE_compoundStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 548;
			this.match(proglang12dParser.LeftBrace);
			this.state = 550;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 603946607) !== 0) || ((((_la - 389)) & ~0x1F) === 0 && ((1 << (_la - 389)) & 2147520527) !== 0) || _la===421 || _la===423) {
				{
				this.state = 549;
				this.blockItemList();
				}
			}

			this.state = 552;
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
		this.enterRule(localctx, 106, proglang12dParser.RULE_blockItemList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 555;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 554;
				this.blockItem();
				}
				}
				this.state = 557;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 603946607) !== 0) || ((((_la - 389)) & ~0x1F) === 0 && ((1 << (_la - 389)) & 2147520527) !== 0) || _la===421 || _la===423);
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
		this.enterRule(localctx, 108, proglang12dParser.RULE_blockItem);
		try {
			this.state = 561;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 357:
			case 358:
			case 361:
			case 362:
			case 364:
			case 365:
			case 366:
			case 369:
			case 370:
			case 371:
			case 373:
			case 374:
			case 376:
			case 377:
			case 381:
			case 389:
			case 390:
			case 391:
			case 392:
			case 401:
			case 404:
			case 420:
			case 421:
			case 423:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 559;
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
			case 245:
			case 246:
			case 247:
			case 248:
			case 249:
			case 250:
			case 251:
			case 252:
			case 253:
			case 254:
			case 255:
			case 256:
			case 257:
			case 258:
			case 259:
			case 260:
			case 261:
			case 262:
			case 263:
			case 264:
			case 265:
			case 266:
			case 267:
			case 268:
			case 269:
			case 270:
			case 271:
			case 272:
			case 273:
			case 274:
			case 275:
			case 276:
			case 277:
			case 278:
			case 279:
			case 280:
			case 281:
			case 282:
			case 283:
			case 284:
			case 285:
			case 286:
			case 287:
			case 288:
			case 289:
			case 290:
			case 291:
			case 292:
			case 293:
			case 294:
			case 295:
			case 296:
			case 297:
			case 298:
			case 299:
			case 300:
			case 301:
			case 302:
			case 303:
			case 304:
			case 305:
			case 306:
			case 307:
			case 308:
			case 309:
			case 310:
			case 311:
			case 312:
			case 313:
			case 314:
			case 315:
			case 316:
			case 317:
			case 318:
			case 319:
			case 320:
			case 321:
			case 322:
			case 323:
			case 324:
			case 325:
			case 326:
			case 327:
			case 328:
			case 329:
			case 330:
			case 331:
			case 332:
			case 333:
			case 334:
			case 335:
			case 336:
			case 337:
			case 338:
			case 339:
			case 340:
			case 341:
			case 342:
			case 343:
			case 344:
			case 345:
			case 346:
			case 347:
			case 348:
			case 349:
			case 350:
			case 351:
			case 352:
			case 353:
			case 354:
			case 355:
			case 363:
			case 368:
			case 372:
			case 375:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 560;
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
		this.enterRule(localctx, 110, proglang12dParser.RULE_expressionStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 564;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 377)) & ~0x1F) === 0 && ((1 << (_la - 377)) & 16838657) !== 0) || ((((_la - 420)) & ~0x1F) === 0 && ((1 << (_la - 420)) & 11) !== 0)) {
				{
				this.state = 563;
				this.expression();
				}
			}

			this.state = 566;
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
		this.enterRule(localctx, 112, proglang12dParser.RULE_selectionStatement);
		try {
			this.state = 583;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 371:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 568;
				this.match(proglang12dParser.If);
				this.state = 569;
				this.match(proglang12dParser.LeftParen);
				this.state = 570;
				this.expression();
				this.state = 571;
				this.match(proglang12dParser.RightParen);
				this.state = 572;
				this.statement();
				this.state = 575;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 60, this._ctx) ) {
				case 1:
					{
					this.state = 573;
					this.match(proglang12dParser.Else);
					this.state = 574;
					this.statement();
					}
					break;
				}
				}
				break;
			case 374:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 577;
				this.match(proglang12dParser.Switch);
				this.state = 578;
				this.match(proglang12dParser.LeftParen);
				this.state = 579;
				this.expression();
				this.state = 580;
				this.match(proglang12dParser.RightParen);
				this.state = 581;
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
		this.enterRule(localctx, 114, proglang12dParser.RULE_iterationStatement);
		try {
			this.state = 605;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 376:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 585;
				this.match(proglang12dParser.While);
				this.state = 586;
				this.match(proglang12dParser.LeftParen);
				this.state = 587;
				this.expression();
				this.state = 588;
				this.match(proglang12dParser.RightParen);
				this.state = 589;
				this.statement();
				}
				break;
			case 366:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 591;
				this.match(proglang12dParser.Do);
				this.state = 592;
				this.statement();
				this.state = 593;
				this.match(proglang12dParser.While);
				this.state = 594;
				this.match(proglang12dParser.LeftParen);
				this.state = 595;
				this.expression();
				this.state = 596;
				this.match(proglang12dParser.RightParen);
				this.state = 597;
				this.match(proglang12dParser.Semi);
				}
				break;
			case 369:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 599;
				this.match(proglang12dParser.For);
				this.state = 600;
				this.match(proglang12dParser.LeftParen);
				this.state = 601;
				this.forCondition();
				this.state = 602;
				this.match(proglang12dParser.RightParen);
				this.state = 603;
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
		this.enterRule(localctx, 116, proglang12dParser.RULE_forCondition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 611;
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
			case 245:
			case 246:
			case 247:
			case 248:
			case 249:
			case 250:
			case 251:
			case 252:
			case 253:
			case 254:
			case 255:
			case 256:
			case 257:
			case 258:
			case 259:
			case 260:
			case 261:
			case 262:
			case 263:
			case 264:
			case 265:
			case 266:
			case 267:
			case 268:
			case 269:
			case 270:
			case 271:
			case 272:
			case 273:
			case 274:
			case 275:
			case 276:
			case 277:
			case 278:
			case 279:
			case 280:
			case 281:
			case 282:
			case 283:
			case 284:
			case 285:
			case 286:
			case 287:
			case 288:
			case 289:
			case 290:
			case 291:
			case 292:
			case 293:
			case 294:
			case 295:
			case 296:
			case 297:
			case 298:
			case 299:
			case 300:
			case 301:
			case 302:
			case 303:
			case 304:
			case 305:
			case 306:
			case 307:
			case 308:
			case 309:
			case 310:
			case 311:
			case 312:
			case 313:
			case 314:
			case 315:
			case 316:
			case 317:
			case 318:
			case 319:
			case 320:
			case 321:
			case 322:
			case 323:
			case 324:
			case 325:
			case 326:
			case 327:
			case 328:
			case 329:
			case 330:
			case 331:
			case 332:
			case 333:
			case 334:
			case 335:
			case 336:
			case 337:
			case 338:
			case 339:
			case 340:
			case 341:
			case 342:
			case 343:
			case 344:
			case 345:
			case 346:
			case 347:
			case 348:
			case 349:
			case 350:
			case 351:
			case 352:
			case 353:
			case 354:
			case 355:
			case 363:
			case 368:
			case 372:
			case 375:
				{
				this.state = 607;
				this.forDeclaration();
				}
				break;
			case 377:
			case 389:
			case 390:
			case 391:
			case 392:
			case 401:
			case 404:
			case 420:
			case 421:
			case 423:
				{
				this.state = 609;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 377)) & ~0x1F) === 0 && ((1 << (_la - 377)) & 16838657) !== 0) || ((((_la - 420)) & ~0x1F) === 0 && ((1 << (_la - 420)) & 11) !== 0)) {
					{
					this.state = 608;
					this.expression();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 613;
			this.match(proglang12dParser.Semi);
			this.state = 615;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 377)) & ~0x1F) === 0 && ((1 << (_la - 377)) & 16838657) !== 0) || ((((_la - 420)) & ~0x1F) === 0 && ((1 << (_la - 420)) & 11) !== 0)) {
				{
				this.state = 614;
				this.forExpression();
				}
			}

			this.state = 617;
			this.match(proglang12dParser.Semi);
			this.state = 619;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 377)) & ~0x1F) === 0 && ((1 << (_la - 377)) & 16838657) !== 0) || ((((_la - 420)) & ~0x1F) === 0 && ((1 << (_la - 420)) & 11) !== 0)) {
				{
				this.state = 618;
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
		this.enterRule(localctx, 118, proglang12dParser.RULE_forDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 621;
			this.declarationSpecifiers();
			this.state = 622;
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
		this.enterRule(localctx, 120, proglang12dParser.RULE_forExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 624;
			this.assignmentExpression();
			this.state = 629;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===405) {
				{
				{
				this.state = 625;
				this.match(proglang12dParser.Comma);
				this.state = 626;
				this.assignmentExpression();
				}
				}
				this.state = 631;
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
		this.enterRule(localctx, 122, proglang12dParser.RULE_jumpStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 642;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 69, this._ctx) ) {
			case 1:
				{
				this.state = 632;
				this.match(proglang12dParser.Goto);
				this.state = 633;
				this.match(proglang12dParser.Identifier);
				}
				break;
			case 2:
				{
				this.state = 634;
				this.match(proglang12dParser.Continue);
				}
				break;
			case 3:
				{
				this.state = 635;
				this.match(proglang12dParser.Break);
				}
				break;
			case 4:
				{
				this.state = 636;
				this.match(proglang12dParser.Return);
				this.state = 638;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 377)) & ~0x1F) === 0 && ((1 << (_la - 377)) & 16838657) !== 0) || ((((_la - 420)) & ~0x1F) === 0 && ((1 << (_la - 420)) & 11) !== 0)) {
					{
					this.state = 637;
					this.expression();
					}
				}

				}
				break;
			case 5:
				{
				this.state = 640;
				this.match(proglang12dParser.Goto);
				this.state = 641;
				this.unaryExpression();
				}
				break;
			}
			this.state = 644;
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
		this.enterRule(localctx, 124, proglang12dParser.RULE_compilationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 647;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 9504783) !== 0) || _la===404 || _la===420) {
				{
				this.state = 646;
				this.translationUnit();
				}
			}

			this.state = 649;
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
		this.enterRule(localctx, 126, proglang12dParser.RULE_translationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 652;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 651;
				this.externalDeclaration();
				}
				}
				this.state = 654;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 9504783) !== 0) || _la===404 || _la===420);
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
		this.enterRule(localctx, 128, proglang12dParser.RULE_externalDeclaration);
		try {
			this.state = 659;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 72, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 656;
				this.functionDefinition();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 657;
				this.declaration();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 658;
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
		this.enterRule(localctx, 130, proglang12dParser.RULE_functionDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 662;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 9504783) !== 0)) {
				{
				this.state = 661;
				this.declarationSpecifiers();
				}
			}

			this.state = 664;
			this.declarator();
			this.state = 666;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 9504783) !== 0)) {
				{
				this.state = 665;
				this.declarationList();
				}
			}

			this.state = 668;
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
		this.enterRule(localctx, 132, proglang12dParser.RULE_declarationList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 671;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 670;
				this.declaration();
				}
				}
				this.state = 673;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 9504783) !== 0));
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
		case 36:
			return this.directDeclarator_sempred(localctx as DirectDeclaratorContext, predIndex);
		case 43:
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

	public static readonly _serializedATN: number[] = [4,1,429,676,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,
	7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,
	60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,1,0,1,0,
	1,0,4,0,138,8,0,11,0,12,0,139,1,0,1,0,1,0,1,0,3,0,146,8,0,1,1,1,1,1,1,5,
	1,151,8,1,10,1,12,1,154,9,1,1,2,1,2,3,2,158,8,2,1,2,1,2,1,2,1,3,1,3,1,3,
	1,3,1,3,1,3,1,3,3,3,170,8,3,1,3,1,3,1,3,5,3,175,8,3,10,3,12,3,178,9,3,1,
	4,1,4,1,4,5,4,183,8,4,10,4,12,4,186,9,4,1,5,5,5,189,8,5,10,5,12,5,192,9,
	5,1,5,1,5,1,5,1,5,3,5,198,8,5,1,6,1,6,1,7,1,7,1,8,1,8,1,8,5,8,207,8,8,10,
	8,12,8,210,9,8,1,9,1,9,1,9,5,9,215,8,9,10,9,12,9,218,9,9,1,10,1,10,1,10,
	5,10,223,8,10,10,10,12,10,226,9,10,1,11,1,11,1,11,5,11,231,8,11,10,11,12,
	11,234,9,11,1,12,1,12,1,12,5,12,239,8,12,10,12,12,12,242,9,12,1,13,1,13,
	1,13,5,13,247,8,13,10,13,12,13,250,9,13,1,14,1,14,1,14,5,14,255,8,14,10,
	14,12,14,258,9,14,1,15,1,15,1,15,5,15,263,8,15,10,15,12,15,266,9,15,1,16,
	1,16,1,16,5,16,271,8,16,10,16,12,16,274,9,16,1,17,1,17,1,17,5,17,279,8,
	17,10,17,12,17,282,9,17,1,18,1,18,1,18,1,18,1,18,1,18,3,18,290,8,18,1,19,
	1,19,1,19,1,19,1,19,3,19,297,8,19,1,20,1,20,1,21,1,21,1,21,5,21,304,8,21,
	10,21,12,21,307,9,21,1,22,1,22,1,23,1,23,1,23,1,23,1,24,1,24,1,24,5,24,
	318,8,24,10,24,12,24,321,9,24,1,25,1,25,1,25,3,25,326,8,25,1,26,4,26,329,
	8,26,11,26,12,26,330,1,27,1,27,1,28,1,28,1,28,1,28,1,28,1,28,1,28,1,28,
	1,28,3,28,344,8,28,1,29,1,29,1,30,1,30,1,31,1,31,1,32,1,32,1,33,1,33,1,
	34,1,34,3,34,358,8,34,1,35,1,35,1,36,1,36,1,36,1,36,1,36,1,36,3,36,368,
	8,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,3,36,379,8,36,1,36,5,
	36,382,8,36,10,36,12,36,385,9,36,1,37,1,37,1,37,1,37,1,37,5,37,392,8,37,
	10,37,12,37,395,9,37,1,38,1,38,1,38,3,38,400,8,38,1,39,1,39,1,39,5,39,405,
	8,39,10,39,12,39,408,9,39,1,40,1,40,3,40,412,8,40,1,40,1,40,1,40,1,40,1,
	40,1,40,1,40,1,40,1,40,3,40,423,8,40,1,41,1,41,1,41,5,41,428,8,41,10,41,
	12,41,431,9,41,1,42,1,42,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,3,43,443,
	8,43,1,43,1,43,1,43,1,43,1,43,5,43,450,8,43,10,43,12,43,453,9,43,1,44,1,
	44,1,45,1,45,1,45,1,45,3,45,461,8,45,1,45,1,45,3,45,465,8,45,1,46,3,46,
	468,8,46,1,46,1,46,1,46,3,46,473,8,46,1,46,5,46,476,8,46,10,46,12,46,479,
	9,46,1,47,1,47,1,47,1,48,4,48,485,8,48,11,48,12,48,486,1,49,1,49,1,49,1,
	49,1,49,1,49,3,49,495,8,49,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,
	1,50,1,50,1,50,5,50,509,8,50,10,50,12,50,512,9,50,3,50,514,8,50,1,50,1,
	50,1,50,1,50,5,50,520,8,50,10,50,12,50,523,9,50,3,50,525,8,50,5,50,527,
	8,50,10,50,12,50,530,9,50,1,50,1,50,3,50,534,8,50,1,51,1,51,1,51,1,51,1,
	51,1,51,1,51,1,51,1,51,1,51,1,51,3,51,547,8,51,1,52,1,52,3,52,551,8,52,
	1,52,1,52,1,53,4,53,556,8,53,11,53,12,53,557,1,54,1,54,3,54,562,8,54,1,
	55,3,55,565,8,55,1,55,1,55,1,56,1,56,1,56,1,56,1,56,1,56,1,56,3,56,576,
	8,56,1,56,1,56,1,56,1,56,1,56,1,56,3,56,584,8,56,1,57,1,57,1,57,1,57,1,
	57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,1,57,
	1,57,3,57,606,8,57,1,58,1,58,3,58,610,8,58,3,58,612,8,58,1,58,1,58,3,58,
	616,8,58,1,58,1,58,3,58,620,8,58,1,59,1,59,1,59,1,60,1,60,1,60,5,60,628,
	8,60,10,60,12,60,631,9,60,1,61,1,61,1,61,1,61,1,61,1,61,3,61,639,8,61,1,
	61,1,61,3,61,643,8,61,1,61,1,61,1,62,3,62,648,8,62,1,62,1,62,1,63,4,63,
	653,8,63,11,63,12,63,654,1,64,1,64,1,64,3,64,660,8,64,1,65,3,65,663,8,65,
	1,65,1,65,3,65,667,8,65,1,65,1,65,1,66,4,66,672,8,66,11,66,12,66,673,1,
	66,0,2,72,86,67,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,
	40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,
	88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,
	128,130,132,0,16,2,0,390,390,392,392,3,0,389,389,391,391,401,401,1,0,393,
	395,2,0,389,389,391,391,1,0,387,388,1,0,383,386,1,0,417,418,1,0,406,411,
	1,0,1,138,4,0,130,130,133,133,136,136,139,145,1,0,146,155,1,0,156,255,1,
	0,256,355,1,0,377,378,1,0,357,358,1,0,359,360,708,0,145,1,0,0,0,2,147,1,
	0,0,0,4,157,1,0,0,0,6,162,1,0,0,0,8,179,1,0,0,0,10,190,1,0,0,0,12,199,1,
	0,0,0,14,201,1,0,0,0,16,203,1,0,0,0,18,211,1,0,0,0,20,219,1,0,0,0,22,227,
	1,0,0,0,24,235,1,0,0,0,26,243,1,0,0,0,28,251,1,0,0,0,30,259,1,0,0,0,32,
	267,1,0,0,0,34,275,1,0,0,0,36,283,1,0,0,0,38,296,1,0,0,0,40,298,1,0,0,0,
	42,300,1,0,0,0,44,308,1,0,0,0,46,310,1,0,0,0,48,314,1,0,0,0,50,322,1,0,
	0,0,52,328,1,0,0,0,54,332,1,0,0,0,56,343,1,0,0,0,58,345,1,0,0,0,60,347,
	1,0,0,0,62,349,1,0,0,0,64,351,1,0,0,0,66,353,1,0,0,0,68,355,1,0,0,0,70,
	359,1,0,0,0,72,361,1,0,0,0,74,393,1,0,0,0,76,396,1,0,0,0,78,401,1,0,0,0,
	80,422,1,0,0,0,82,424,1,0,0,0,84,432,1,0,0,0,86,434,1,0,0,0,88,454,1,0,
	0,0,90,464,1,0,0,0,92,467,1,0,0,0,94,480,1,0,0,0,96,484,1,0,0,0,98,494,
	1,0,0,0,100,533,1,0,0,0,102,546,1,0,0,0,104,548,1,0,0,0,106,555,1,0,0,0,
	108,561,1,0,0,0,110,564,1,0,0,0,112,583,1,0,0,0,114,605,1,0,0,0,116,611,
	1,0,0,0,118,621,1,0,0,0,120,624,1,0,0,0,122,642,1,0,0,0,124,647,1,0,0,0,
	126,652,1,0,0,0,128,659,1,0,0,0,130,662,1,0,0,0,132,671,1,0,0,0,134,146,
	5,420,0,0,135,146,5,421,0,0,136,138,5,423,0,0,137,136,1,0,0,0,138,139,1,
	0,0,0,139,137,1,0,0,0,139,140,1,0,0,0,140,146,1,0,0,0,141,142,5,377,0,0,
	142,143,3,42,21,0,143,144,5,378,0,0,144,146,1,0,0,0,145,134,1,0,0,0,145,
	135,1,0,0,0,145,137,1,0,0,0,145,141,1,0,0,0,146,1,1,0,0,0,147,152,3,4,2,
	0,148,149,5,405,0,0,149,151,3,4,2,0,150,148,1,0,0,0,151,154,1,0,0,0,152,
	150,1,0,0,0,152,153,1,0,0,0,153,3,1,0,0,0,154,152,1,0,0,0,155,158,3,84,
	42,0,156,158,5,365,0,0,157,155,1,0,0,0,157,156,1,0,0,0,158,159,1,0,0,0,
	159,160,5,403,0,0,160,161,3,38,19,0,161,5,1,0,0,0,162,176,3,0,0,0,163,164,
	5,379,0,0,164,165,3,42,21,0,165,166,5,380,0,0,166,175,1,0,0,0,167,169,5,
	377,0,0,168,170,3,8,4,0,169,168,1,0,0,0,169,170,1,0,0,0,170,171,1,0,0,0,
	171,175,5,378,0,0,172,175,5,390,0,0,173,175,5,392,0,0,174,163,1,0,0,0,174,
	167,1,0,0,0,174,172,1,0,0,0,174,173,1,0,0,0,175,178,1,0,0,0,176,174,1,0,
	0,0,176,177,1,0,0,0,177,7,1,0,0,0,178,176,1,0,0,0,179,184,3,38,19,0,180,
	181,5,405,0,0,181,183,3,38,19,0,182,180,1,0,0,0,183,186,1,0,0,0,184,182,
	1,0,0,0,184,185,1,0,0,0,185,9,1,0,0,0,186,184,1,0,0,0,187,189,7,0,0,0,188,
	187,1,0,0,0,189,192,1,0,0,0,190,188,1,0,0,0,190,191,1,0,0,0,191,197,1,0,
	0,0,192,190,1,0,0,0,193,198,3,6,3,0,194,195,3,12,6,0,195,196,3,14,7,0,196,
	198,1,0,0,0,197,193,1,0,0,0,197,194,1,0,0,0,198,11,1,0,0,0,199,200,7,1,
	0,0,200,13,1,0,0,0,201,202,3,10,5,0,202,15,1,0,0,0,203,208,3,14,7,0,204,
	205,7,2,0,0,205,207,3,14,7,0,206,204,1,0,0,0,207,210,1,0,0,0,208,206,1,
	0,0,0,208,209,1,0,0,0,209,17,1,0,0,0,210,208,1,0,0,0,211,216,3,16,8,0,212,
	213,7,3,0,0,213,215,3,16,8,0,214,212,1,0,0,0,215,218,1,0,0,0,216,214,1,
	0,0,0,216,217,1,0,0,0,217,19,1,0,0,0,218,216,1,0,0,0,219,224,3,18,9,0,220,
	221,7,4,0,0,221,223,3,18,9,0,222,220,1,0,0,0,223,226,1,0,0,0,224,222,1,
	0,0,0,224,225,1,0,0,0,225,21,1,0,0,0,226,224,1,0,0,0,227,232,3,20,10,0,
	228,229,7,5,0,0,229,231,3,20,10,0,230,228,1,0,0,0,231,234,1,0,0,0,232,230,
	1,0,0,0,232,233,1,0,0,0,233,23,1,0,0,0,234,232,1,0,0,0,235,240,3,22,11,
	0,236,237,7,6,0,0,237,239,3,22,11,0,238,236,1,0,0,0,239,242,1,0,0,0,240,
	238,1,0,0,0,240,241,1,0,0,0,241,25,1,0,0,0,242,240,1,0,0,0,243,248,3,24,
	12,0,244,245,5,396,0,0,245,247,3,24,12,0,246,244,1,0,0,0,247,250,1,0,0,
	0,248,246,1,0,0,0,248,249,1,0,0,0,249,27,1,0,0,0,250,248,1,0,0,0,251,256,
	3,26,13,0,252,253,5,400,0,0,253,255,3,26,13,0,254,252,1,0,0,0,255,258,1,
	0,0,0,256,254,1,0,0,0,256,257,1,0,0,0,257,29,1,0,0,0,258,256,1,0,0,0,259,
	264,3,28,14,0,260,261,5,397,0,0,261,263,3,28,14,0,262,260,1,0,0,0,263,266,
	1,0,0,0,264,262,1,0,0,0,264,265,1,0,0,0,265,31,1,0,0,0,266,264,1,0,0,0,
	267,272,3,30,15,0,268,269,5,398,0,0,269,271,3,30,15,0,270,268,1,0,0,0,271,
	274,1,0,0,0,272,270,1,0,0,0,272,273,1,0,0,0,273,33,1,0,0,0,274,272,1,0,
	0,0,275,280,3,32,16,0,276,277,5,399,0,0,277,279,3,32,16,0,278,276,1,0,0,
	0,279,282,1,0,0,0,280,278,1,0,0,0,280,281,1,0,0,0,281,35,1,0,0,0,282,280,
	1,0,0,0,283,289,3,34,17,0,284,285,5,402,0,0,285,286,3,42,21,0,286,287,5,
	403,0,0,287,288,3,36,18,0,288,290,1,0,0,0,289,284,1,0,0,0,289,290,1,0,0,
	0,290,37,1,0,0,0,291,297,3,36,18,0,292,293,3,10,5,0,293,294,3,40,20,0,294,
	295,3,38,19,0,295,297,1,0,0,0,296,291,1,0,0,0,296,292,1,0,0,0,297,39,1,
	0,0,0,298,299,7,7,0,0,299,41,1,0,0,0,300,305,3,38,19,0,301,302,5,405,0,
	0,302,304,3,38,19,0,303,301,1,0,0,0,304,307,1,0,0,0,305,303,1,0,0,0,305,
	306,1,0,0,0,306,43,1,0,0,0,307,305,1,0,0,0,308,309,3,36,18,0,309,45,1,0,
	0,0,310,311,3,52,26,0,311,312,3,48,24,0,312,313,5,404,0,0,313,47,1,0,0,
	0,314,319,3,50,25,0,315,316,5,405,0,0,316,318,3,50,25,0,317,315,1,0,0,0,
	318,321,1,0,0,0,319,317,1,0,0,0,319,320,1,0,0,0,320,49,1,0,0,0,321,319,
	1,0,0,0,322,325,3,70,35,0,323,324,5,406,0,0,324,326,3,90,45,0,325,323,1,
	0,0,0,325,326,1,0,0,0,326,51,1,0,0,0,327,329,3,54,27,0,328,327,1,0,0,0,
	329,330,1,0,0,0,330,328,1,0,0,0,330,331,1,0,0,0,331,53,1,0,0,0,332,333,
	3,56,28,0,333,55,1,0,0,0,334,344,5,375,0,0,335,344,5,363,0,0,336,344,5,
	372,0,0,337,344,5,368,0,0,338,344,3,58,29,0,339,344,3,60,30,0,340,344,3,
	62,31,0,341,344,3,64,32,0,342,344,3,66,33,0,343,334,1,0,0,0,343,335,1,0,
	0,0,343,336,1,0,0,0,343,337,1,0,0,0,343,338,1,0,0,0,343,339,1,0,0,0,343,
	340,1,0,0,0,343,341,1,0,0,0,343,342,1,0,0,0,344,57,1,0,0,0,345,346,7,8,
	0,0,346,59,1,0,0,0,347,348,7,9,0,0,348,61,1,0,0,0,349,350,7,10,0,0,350,
	63,1,0,0,0,351,352,7,11,0,0,352,65,1,0,0,0,353,354,7,12,0,0,354,67,1,0,
	0,0,355,357,3,56,28,0,356,358,3,68,34,0,357,356,1,0,0,0,357,358,1,0,0,0,
	358,69,1,0,0,0,359,360,3,72,36,0,360,71,1,0,0,0,361,362,6,36,-1,0,362,363,
	5,420,0,0,363,383,1,0,0,0,364,365,10,3,0,0,365,367,5,379,0,0,366,368,3,
	44,22,0,367,366,1,0,0,0,367,368,1,0,0,0,368,369,1,0,0,0,369,382,5,380,0,
	0,370,371,10,2,0,0,371,372,5,377,0,0,372,373,3,76,38,0,373,374,5,378,0,
	0,374,382,1,0,0,0,375,376,10,1,0,0,376,378,5,377,0,0,377,379,3,82,41,0,
	378,377,1,0,0,0,378,379,1,0,0,0,379,380,1,0,0,0,380,382,5,378,0,0,381,364,
	1,0,0,0,381,370,1,0,0,0,381,375,1,0,0,0,382,385,1,0,0,0,383,381,1,0,0,0,
	383,384,1,0,0,0,384,73,1,0,0,0,385,383,1,0,0,0,386,392,8,13,0,0,387,388,
	5,377,0,0,388,389,3,74,37,0,389,390,5,378,0,0,390,392,1,0,0,0,391,386,1,
	0,0,0,391,387,1,0,0,0,392,395,1,0,0,0,393,391,1,0,0,0,393,394,1,0,0,0,394,
	75,1,0,0,0,395,393,1,0,0,0,396,399,3,78,39,0,397,398,5,405,0,0,398,400,
	5,356,0,0,399,397,1,0,0,0,399,400,1,0,0,0,400,77,1,0,0,0,401,406,3,80,40,
	0,402,403,5,405,0,0,403,405,3,80,40,0,404,402,1,0,0,0,405,408,1,0,0,0,406,
	404,1,0,0,0,406,407,1,0,0,0,407,79,1,0,0,0,408,406,1,0,0,0,409,411,3,52,
	26,0,410,412,5,420,0,0,411,410,1,0,0,0,411,412,1,0,0,0,412,423,1,0,0,0,
	413,414,3,52,26,0,414,415,5,396,0,0,415,416,5,420,0,0,416,423,1,0,0,0,417,
	418,3,52,26,0,418,419,5,420,0,0,419,420,5,379,0,0,420,421,5,380,0,0,421,
	423,1,0,0,0,422,409,1,0,0,0,422,413,1,0,0,0,422,417,1,0,0,0,423,81,1,0,
	0,0,424,429,5,420,0,0,425,426,5,405,0,0,426,428,5,420,0,0,427,425,1,0,0,
	0,428,431,1,0,0,0,429,427,1,0,0,0,429,430,1,0,0,0,430,83,1,0,0,0,431,429,
	1,0,0,0,432,433,3,68,34,0,433,85,1,0,0,0,434,435,6,43,-1,0,435,436,5,379,
	0,0,436,437,5,393,0,0,437,438,5,380,0,0,438,451,1,0,0,0,439,440,10,2,0,
	0,440,442,5,379,0,0,441,443,3,38,19,0,442,441,1,0,0,0,442,443,1,0,0,0,443,
	444,1,0,0,0,444,450,5,380,0,0,445,446,10,1,0,0,446,447,5,379,0,0,447,448,
	5,393,0,0,448,450,5,380,0,0,449,439,1,0,0,0,449,445,1,0,0,0,450,453,1,0,
	0,0,451,449,1,0,0,0,451,452,1,0,0,0,452,87,1,0,0,0,453,451,1,0,0,0,454,
	455,5,420,0,0,455,89,1,0,0,0,456,465,3,38,19,0,457,458,5,381,0,0,458,460,
	3,92,46,0,459,461,5,405,0,0,460,459,1,0,0,0,460,461,1,0,0,0,461,462,1,0,
	0,0,462,463,5,382,0,0,463,465,1,0,0,0,464,456,1,0,0,0,464,457,1,0,0,0,465,
	91,1,0,0,0,466,468,3,94,47,0,467,466,1,0,0,0,467,468,1,0,0,0,468,469,1,
	0,0,0,469,477,3,90,45,0,470,472,5,405,0,0,471,473,3,94,47,0,472,471,1,0,
	0,0,472,473,1,0,0,0,473,474,1,0,0,0,474,476,3,90,45,0,475,470,1,0,0,0,476,
	479,1,0,0,0,477,475,1,0,0,0,477,478,1,0,0,0,478,93,1,0,0,0,479,477,1,0,
	0,0,480,481,3,96,48,0,481,482,5,406,0,0,482,95,1,0,0,0,483,485,3,98,49,
	0,484,483,1,0,0,0,485,486,1,0,0,0,486,484,1,0,0,0,486,487,1,0,0,0,487,97,
	1,0,0,0,488,489,5,379,0,0,489,490,3,44,22,0,490,491,5,380,0,0,491,495,1,
	0,0,0,492,493,5,419,0,0,493,495,5,420,0,0,494,488,1,0,0,0,494,492,1,0,0,
	0,495,99,1,0,0,0,496,534,3,102,51,0,497,534,3,104,52,0,498,534,3,110,55,
	0,499,534,3,112,56,0,500,534,3,114,57,0,501,534,3,122,61,0,502,503,7,14,
	0,0,503,504,7,15,0,0,504,513,5,377,0,0,505,510,3,34,17,0,506,507,5,405,
	0,0,507,509,3,34,17,0,508,506,1,0,0,0,509,512,1,0,0,0,510,508,1,0,0,0,510,
	511,1,0,0,0,511,514,1,0,0,0,512,510,1,0,0,0,513,505,1,0,0,0,513,514,1,0,
	0,0,514,528,1,0,0,0,515,524,5,403,0,0,516,521,3,34,17,0,517,518,5,405,0,
	0,518,520,3,34,17,0,519,517,1,0,0,0,520,523,1,0,0,0,521,519,1,0,0,0,521,
	522,1,0,0,0,522,525,1,0,0,0,523,521,1,0,0,0,524,516,1,0,0,0,524,525,1,0,
	0,0,525,527,1,0,0,0,526,515,1,0,0,0,527,530,1,0,0,0,528,526,1,0,0,0,528,
	529,1,0,0,0,529,531,1,0,0,0,530,528,1,0,0,0,531,532,5,378,0,0,532,534,5,
	404,0,0,533,496,1,0,0,0,533,497,1,0,0,0,533,498,1,0,0,0,533,499,1,0,0,0,
	533,500,1,0,0,0,533,501,1,0,0,0,533,502,1,0,0,0,534,101,1,0,0,0,535,536,
	5,420,0,0,536,537,5,403,0,0,537,547,3,100,50,0,538,539,5,362,0,0,539,540,
	3,44,22,0,540,541,5,403,0,0,541,542,3,100,50,0,542,547,1,0,0,0,543,544,
	5,365,0,0,544,545,5,403,0,0,545,547,3,104,52,0,546,535,1,0,0,0,546,538,
	1,0,0,0,546,543,1,0,0,0,547,103,1,0,0,0,548,550,5,381,0,0,549,551,3,106,
	53,0,550,549,1,0,0,0,550,551,1,0,0,0,551,552,1,0,0,0,552,553,5,382,0,0,
	553,105,1,0,0,0,554,556,3,108,54,0,555,554,1,0,0,0,556,557,1,0,0,0,557,
	555,1,0,0,0,557,558,1,0,0,0,558,107,1,0,0,0,559,562,3,100,50,0,560,562,
	3,46,23,0,561,559,1,0,0,0,561,560,1,0,0,0,562,109,1,0,0,0,563,565,3,42,
	21,0,564,563,1,0,0,0,564,565,1,0,0,0,565,566,1,0,0,0,566,567,5,404,0,0,
	567,111,1,0,0,0,568,569,5,371,0,0,569,570,5,377,0,0,570,571,3,42,21,0,571,
	572,5,378,0,0,572,575,3,100,50,0,573,574,5,367,0,0,574,576,3,100,50,0,575,
	573,1,0,0,0,575,576,1,0,0,0,576,584,1,0,0,0,577,578,5,374,0,0,578,579,5,
	377,0,0,579,580,3,42,21,0,580,581,5,378,0,0,581,582,3,100,50,0,582,584,
	1,0,0,0,583,568,1,0,0,0,583,577,1,0,0,0,584,113,1,0,0,0,585,586,5,376,0,
	0,586,587,5,377,0,0,587,588,3,42,21,0,588,589,5,378,0,0,589,590,3,100,50,
	0,590,606,1,0,0,0,591,592,5,366,0,0,592,593,3,100,50,0,593,594,5,376,0,
	0,594,595,5,377,0,0,595,596,3,42,21,0,596,597,5,378,0,0,597,598,5,404,0,
	0,598,606,1,0,0,0,599,600,5,369,0,0,600,601,5,377,0,0,601,602,3,116,58,
	0,602,603,5,378,0,0,603,604,3,100,50,0,604,606,1,0,0,0,605,585,1,0,0,0,
	605,591,1,0,0,0,605,599,1,0,0,0,606,115,1,0,0,0,607,612,3,118,59,0,608,
	610,3,42,21,0,609,608,1,0,0,0,609,610,1,0,0,0,610,612,1,0,0,0,611,607,1,
	0,0,0,611,609,1,0,0,0,612,613,1,0,0,0,613,615,5,404,0,0,614,616,3,120,60,
	0,615,614,1,0,0,0,615,616,1,0,0,0,616,617,1,0,0,0,617,619,5,404,0,0,618,
	620,3,120,60,0,619,618,1,0,0,0,619,620,1,0,0,0,620,117,1,0,0,0,621,622,
	3,52,26,0,622,623,3,48,24,0,623,119,1,0,0,0,624,629,3,38,19,0,625,626,5,
	405,0,0,626,628,3,38,19,0,627,625,1,0,0,0,628,631,1,0,0,0,629,627,1,0,0,
	0,629,630,1,0,0,0,630,121,1,0,0,0,631,629,1,0,0,0,632,633,5,370,0,0,633,
	643,5,420,0,0,634,643,5,364,0,0,635,643,5,361,0,0,636,638,5,373,0,0,637,
	639,3,42,21,0,638,637,1,0,0,0,638,639,1,0,0,0,639,643,1,0,0,0,640,641,5,
	370,0,0,641,643,3,10,5,0,642,632,1,0,0,0,642,634,1,0,0,0,642,635,1,0,0,
	0,642,636,1,0,0,0,642,640,1,0,0,0,643,644,1,0,0,0,644,645,5,404,0,0,645,
	123,1,0,0,0,646,648,3,126,63,0,647,646,1,0,0,0,647,648,1,0,0,0,648,649,
	1,0,0,0,649,650,5,0,0,1,650,125,1,0,0,0,651,653,3,128,64,0,652,651,1,0,
	0,0,653,654,1,0,0,0,654,652,1,0,0,0,654,655,1,0,0,0,655,127,1,0,0,0,656,
	660,3,130,65,0,657,660,3,46,23,0,658,660,5,404,0,0,659,656,1,0,0,0,659,
	657,1,0,0,0,659,658,1,0,0,0,660,129,1,0,0,0,661,663,3,52,26,0,662,661,1,
	0,0,0,662,663,1,0,0,0,663,664,1,0,0,0,664,666,3,70,35,0,665,667,3,132,66,
	0,666,665,1,0,0,0,666,667,1,0,0,0,667,668,1,0,0,0,668,669,3,104,52,0,669,
	131,1,0,0,0,670,672,3,46,23,0,671,670,1,0,0,0,672,673,1,0,0,0,673,671,1,
	0,0,0,673,674,1,0,0,0,674,133,1,0,0,0,76,139,145,152,157,169,174,176,184,
	190,197,208,216,224,232,240,248,256,264,272,280,289,296,305,319,325,330,
	343,357,367,378,381,383,391,393,399,406,411,422,429,442,449,451,460,464,
	467,472,477,486,494,510,513,521,524,528,533,546,550,557,561,564,575,583,
	605,609,611,615,619,629,638,642,647,654,659,662,666,673];

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


export class DeclarationSpecifierContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
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
	public builtInTypeSpecifier(): BuiltInTypeSpecifierContext {
		return this.getTypedRuleContext(BuiltInTypeSpecifierContext, 0) as BuiltInTypeSpecifierContext;
	}
	public builtInSetTypeSpecifier(): BuiltInSetTypeSpecifierContext {
		return this.getTypedRuleContext(BuiltInSetTypeSpecifierContext, 0) as BuiltInSetTypeSpecifierContext;
	}
	public builtInMultiSetTypeSpecifier(): BuiltInMultiSetTypeSpecifierContext {
		return this.getTypedRuleContext(BuiltInMultiSetTypeSpecifierContext, 0) as BuiltInMultiSetTypeSpecifierContext;
	}
	public builtInMapTypeSpecifier(): BuiltInMapTypeSpecifierContext {
		return this.getTypedRuleContext(BuiltInMapTypeSpecifierContext, 0) as BuiltInMapTypeSpecifierContext;
	}
	public builtInMultiMapTypeSpecifier(): BuiltInMultiMapTypeSpecifierContext {
		return this.getTypedRuleContext(BuiltInMultiMapTypeSpecifierContext, 0) as BuiltInMultiMapTypeSpecifierContext;
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


export class BuiltInSetTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_builtInSetTypeSpecifier;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterBuiltInSetTypeSpecifier) {
	 		listener.enterBuiltInSetTypeSpecifier(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitBuiltInSetTypeSpecifier) {
	 		listener.exitBuiltInSetTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitBuiltInSetTypeSpecifier) {
			return visitor.visitBuiltInSetTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BuiltInMultiSetTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_builtInMultiSetTypeSpecifier;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterBuiltInMultiSetTypeSpecifier) {
	 		listener.enterBuiltInMultiSetTypeSpecifier(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitBuiltInMultiSetTypeSpecifier) {
	 		listener.exitBuiltInMultiSetTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitBuiltInMultiSetTypeSpecifier) {
			return visitor.visitBuiltInMultiSetTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BuiltInMapTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_builtInMapTypeSpecifier;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterBuiltInMapTypeSpecifier) {
	 		listener.enterBuiltInMapTypeSpecifier(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitBuiltInMapTypeSpecifier) {
	 		listener.exitBuiltInMapTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitBuiltInMapTypeSpecifier) {
			return visitor.visitBuiltInMapTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BuiltInMultiMapTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_builtInMultiMapTypeSpecifier;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterBuiltInMultiMapTypeSpecifier) {
	 		listener.enterBuiltInMultiMapTypeSpecifier(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitBuiltInMultiMapTypeSpecifier) {
	 		listener.exitBuiltInMultiMapTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitBuiltInMultiMapTypeSpecifier) {
			return visitor.visitBuiltInMultiMapTypeSpecifier(this);
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
