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
	public static readonly T__360 = 361;
	public static readonly T__361 = 362;
	public static readonly T__362 = 363;
	public static readonly T__363 = 364;
	public static readonly T__364 = 365;
	public static readonly T__365 = 366;
	public static readonly T__366 = 367;
	public static readonly Break = 368;
	public static readonly Case = 369;
	public static readonly Char = 370;
	public static readonly Continue = 371;
	public static readonly Default = 372;
	public static readonly Do = 373;
	public static readonly Else = 374;
	public static readonly Float = 375;
	public static readonly For = 376;
	public static readonly Goto = 377;
	public static readonly If = 378;
	public static readonly Int = 379;
	public static readonly Return = 380;
	public static readonly Switch = 381;
	public static readonly Void = 382;
	public static readonly While = 383;
	public static readonly LeftParen = 384;
	public static readonly RightParen = 385;
	public static readonly LeftBracket = 386;
	public static readonly RightBracket = 387;
	public static readonly LeftBrace = 388;
	public static readonly RightBrace = 389;
	public static readonly Less = 390;
	public static readonly LessEqual = 391;
	public static readonly Greater = 392;
	public static readonly GreaterEqual = 393;
	public static readonly LeftShift = 394;
	public static readonly RightShift = 395;
	public static readonly Plus = 396;
	public static readonly PlusPlus = 397;
	public static readonly Minus = 398;
	public static readonly MinusMinus = 399;
	public static readonly Star = 400;
	public static readonly Div = 401;
	public static readonly Mod = 402;
	public static readonly And = 403;
	public static readonly Or = 404;
	public static readonly AndAnd = 405;
	public static readonly OrOr = 406;
	public static readonly Caret = 407;
	public static readonly Not = 408;
	public static readonly Question = 409;
	public static readonly Colon = 410;
	public static readonly Semi = 411;
	public static readonly Comma = 412;
	public static readonly Assign = 413;
	public static readonly StarAssign = 414;
	public static readonly DivAssign = 415;
	public static readonly ModAssign = 416;
	public static readonly PlusAssign = 417;
	public static readonly MinusAssign = 418;
	public static readonly LeftShiftAssign = 419;
	public static readonly RightShiftAssign = 420;
	public static readonly AndAssign = 421;
	public static readonly XorAssign = 422;
	public static readonly OrAssign = 423;
	public static readonly Equal = 424;
	public static readonly NotEqual = 425;
	public static readonly Dot = 426;
	public static readonly Constant = 427;
	public static readonly Identifier = 428;
	public static readonly DigitSequence = 429;
	public static readonly StringLiteral = 430;
	public static readonly ComplexDefine = 431;
	public static readonly IncludeDirective = 432;
	public static readonly Whitespace = 433;
	public static readonly Newline = 434;
	public static readonly BlockComment = 435;
	public static readonly LineComment = 436;
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
	public static readonly RULE_builtInWidgetTypeSpecifier = 30;
	public static readonly RULE_builtInSetTypeSpecifier = 31;
	public static readonly RULE_builtInMultiSetTypeSpecifier = 32;
	public static readonly RULE_builtInMapTypeSpecifier = 33;
	public static readonly RULE_builtInMultiMapTypeSpecifier = 34;
	public static readonly RULE_specifierQualifierList = 35;
	public static readonly RULE_declarator = 36;
	public static readonly RULE_directDeclarator = 37;
	public static readonly RULE_nestedParenthesesBlock = 38;
	public static readonly RULE_parameterTypeList = 39;
	public static readonly RULE_parameterList = 40;
	public static readonly RULE_parameterDeclaration = 41;
	public static readonly RULE_identifierList = 42;
	public static readonly RULE_typeName = 43;
	public static readonly RULE_directAbstractDeclarator = 44;
	public static readonly RULE_typedefName = 45;
	public static readonly RULE_initializer = 46;
	public static readonly RULE_initializerList = 47;
	public static readonly RULE_designation = 48;
	public static readonly RULE_designatorList = 49;
	public static readonly RULE_designator = 50;
	public static readonly RULE_statement = 51;
	public static readonly RULE_labeledStatement = 52;
	public static readonly RULE_compoundStatement = 53;
	public static readonly RULE_blockItemList = 54;
	public static readonly RULE_blockItem = 55;
	public static readonly RULE_expressionStatement = 56;
	public static readonly RULE_selectionStatement = 57;
	public static readonly RULE_iterationStatement = 58;
	public static readonly RULE_forCondition = 59;
	public static readonly RULE_forDeclaration = 60;
	public static readonly RULE_forExpression = 61;
	public static readonly RULE_jumpStatement = 62;
	public static readonly RULE_compilationUnit = 63;
	public static readonly RULE_translationUnit = 64;
	public static readonly RULE_externalDeclaration = 65;
	public static readonly RULE_functionDefinition = 66;
	public static readonly RULE_declarationList = 67;
	public static readonly literalNames: (string | null)[] = [ null, "'Element'", 
                                                            "'Model'", "'Dynamic_Element'", 
                                                            "'Tin'", "'Menu'", 
                                                            "'Dynamic_Text'", 
                                                            "'Point'", "'Line'", 
                                                            "'Arc'", "'Segment'", 
                                                            "'File'", "'View'", 
                                                            "'Widget'", 
                                                            "'Map_File'", 
                                                            "'Apply_Many_Function'", 
                                                            "'Kerb_Return_Function'", 
                                                            "'Function'", 
                                                            "'Macro_Function'", 
                                                            "'Apply_Function'", 
                                                            "'Undo_List'", 
                                                            "'Undo'", "'Textstyle_Data'", 
                                                            "'SDR_Attribute'", 
                                                            "'Dynamic_Integer'", 
                                                            "'Dynamic_Real'", 
                                                            "'Uid'", "'Attributes'", 
                                                            "'Equality_Info'", 
                                                            "'Equality_Label'", 
                                                            "'Vector2'", 
                                                            "'Vector3'", 
                                                            "'Vector4'", 
                                                            "'Matrix3'", 
                                                            "'Matrix4'", 
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
                                                            "'Unknown'", 
                                                            "'Log_Line'", 
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
                                                            "'Spiral'", 
                                                            "'Parabola'", 
                                                            "'Chain_Parameters'", 
                                                            "'Macro_Handle'", 
                                                            "'View_Draw'", 
                                                            "'User_Input_Replay'", 
                                                            "'Panel'", "'Sheet_Panel'", 
                                                            "'Vertical_Group'", 
                                                            "'Horizontal_Group'", 
                                                            "'Widget_Pages'", 
                                                            "'Button'", 
                                                            "'Select_Button'", 
                                                            "'Message_Box'", 
                                                            "'Colour_Message_Box'", 
                                                            "'Log_Box'", 
                                                            "'Angle_Box'", 
                                                            "'Attributes_Box'", 
                                                            "'Billboard_Box'", 
                                                            "'Bitmap_Fill_Box'", 
                                                            "'Bitmap_List_Box'", 
                                                            "'Chainage_Box'", 
                                                            "'Choice_Box'", 
                                                            "'Colour_Box'", 
                                                            "'Date_Time_Box'", 
                                                            "'Directory_Box'", 
                                                            "'Draw_Box'", 
                                                            "'File_Box'", 
                                                            "'Function_Box'", 
                                                            "'Graph_Box'", 
                                                            "'GridCtrl_Box'", 
                                                            "'HyperLink_Box'", 
                                                            "'Input_Box'", 
                                                            "'Integer_Box'", 
                                                            "'Justify_Box'", 
                                                            "'Linestyle_Box'", 
                                                            "'List_Box'", 
                                                            "'ListCtrl_Box'", 
                                                            "'Map_File_Box'", 
                                                            "'Model_Box'", 
                                                            "'Name_Box'", 
                                                            "'Named_Tick_Box'", 
                                                            "'New_Select_Box'", 
                                                            "'New_XYZ_Box'", 
                                                            "'Overlay_Widget'", 
                                                            "'Plotter_Box'", 
                                                            "'Polygon_Box'", 
                                                            "'Projection_Box'", 
                                                            "'Real_Box'", 
                                                            "'Report_Box'", 
                                                            "'Screen_Text'", 
                                                            "'Select_Box'", 
                                                            "'Select_Boxes'", 
                                                            "'Sheet_Size_Box'", 
                                                            "'Slider_Box'", 
                                                            "'Source_Box'", 
                                                            "'Symbol_Box'", 
                                                            "'Tab_Box'", 
                                                            "'Target_Box'", 
                                                            "'Template_Box'", 
                                                            "'Text_Edit_Box'", 
                                                            "'Text_Style_Box'", 
                                                            "'Text_Units_Box'", 
                                                            "'Textstyle_Data_Box'", 
                                                            "'Texture_Box'", 
                                                            "'Tick_Box'", 
                                                            "'Time_Zone_Box'", 
                                                            "'Time_Zone_Box_Box'", 
                                                            "'Tin_Box'", 
                                                            "'Tree_Box'", 
                                                            "'Tree_Page'", 
                                                            "'View_Box'", 
                                                            "'XYZ_Box'", 
                                                            "'Hydro_Box'", 
                                                            "'Weight_Box'", 
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
		"declarationSpecifier", "typeSpecifier", "builtInTypeSpecifier", "builtInWidgetTypeSpecifier", 
		"builtInSetTypeSpecifier", "builtInMultiSetTypeSpecifier", "builtInMapTypeSpecifier", 
		"builtInMultiMapTypeSpecifier", "specifierQualifierList", "declarator", 
		"directDeclarator", "nestedParenthesesBlock", "parameterTypeList", "parameterList", 
		"parameterDeclaration", "identifierList", "typeName", "directAbstractDeclarator", 
		"typedefName", "initializer", "initializerList", "designation", "designatorList", 
		"designator", "statement", "labeledStatement", "compoundStatement", "blockItemList", 
		"blockItem", "expressionStatement", "selectionStatement", "iterationStatement", 
		"forCondition", "forDeclaration", "forExpression", "jumpStatement", "compilationUnit", 
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
			this.state = 147;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 428:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 136;
				this.match(proglang12dParser.Identifier);
				}
				break;
			case 427:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 137;
				this.match(proglang12dParser.Constant);
				}
				break;
			case 430:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 139;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 138;
					this.match(proglang12dParser.StringLiteral);
					}
					}
					this.state = 141;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===430);
				}
				break;
			case 384:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 143;
				this.match(proglang12dParser.LeftParen);
				this.state = 144;
				this.expression();
				this.state = 145;
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
			this.state = 149;
			this.genericAssociation();
			this.state = 154;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===412) {
				{
				{
				this.state = 150;
				this.match(proglang12dParser.Comma);
				this.state = 151;
				this.genericAssociation();
				}
				}
				this.state = 156;
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
			this.state = 159;
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
			case 370:
			case 375:
			case 379:
			case 382:
				{
				this.state = 157;
				this.typeName();
				}
				break;
			case 372:
				{
				this.state = 158;
				this.match(proglang12dParser.Default);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 161;
			this.match(proglang12dParser.Colon);
			this.state = 162;
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
			this.state = 164;
			this.primaryExpression();
			this.state = 178;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 40965) !== 0)) {
				{
				this.state = 176;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 386:
					{
					this.state = 165;
					this.match(proglang12dParser.LeftBracket);
					this.state = 166;
					this.expression();
					this.state = 167;
					this.match(proglang12dParser.RightBracket);
					}
					break;
				case 384:
					{
					this.state = 169;
					this.match(proglang12dParser.LeftParen);
					this.state = 171;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 16838657) !== 0) || ((((_la - 427)) & ~0x1F) === 0 && ((1 << (_la - 427)) & 11) !== 0)) {
						{
						this.state = 170;
						this.argumentExpressionList();
						}
					}

					this.state = 173;
					this.match(proglang12dParser.RightParen);
					}
					break;
				case 397:
					{
					this.state = 174;
					this.match(proglang12dParser.PlusPlus);
					}
					break;
				case 399:
					{
					this.state = 175;
					this.match(proglang12dParser.MinusMinus);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 180;
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
			this.state = 181;
			this.assignmentExpression();
			this.state = 186;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===412) {
				{
				{
				this.state = 182;
				this.match(proglang12dParser.Comma);
				this.state = 183;
				this.assignmentExpression();
				}
				}
				this.state = 188;
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
			this.state = 192;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===397 || _la===399) {
				{
				{
				this.state = 189;
				_la = this._input.LA(1);
				if(!(_la===397 || _la===399)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				}
				this.state = 194;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 199;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 384:
			case 427:
			case 428:
			case 430:
				{
				this.state = 195;
				this.postfixExpression();
				}
				break;
			case 396:
			case 398:
			case 408:
				{
				this.state = 196;
				this.unaryOperator();
				this.state = 197;
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
			this.state = 201;
			_la = this._input.LA(1);
			if(!(((((_la - 396)) & ~0x1F) === 0 && ((1 << (_la - 396)) & 4101) !== 0))) {
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
			this.state = 203;
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
			this.state = 205;
			this.castExpression();
			this.state = 210;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 400)) & ~0x1F) === 0 && ((1 << (_la - 400)) & 7) !== 0)) {
				{
				{
				this.state = 206;
				_la = this._input.LA(1);
				if(!(((((_la - 400)) & ~0x1F) === 0 && ((1 << (_la - 400)) & 7) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 207;
				this.castExpression();
				}
				}
				this.state = 212;
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
			this.state = 213;
			this.multiplicativeExpression();
			this.state = 218;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===396 || _la===398) {
				{
				{
				this.state = 214;
				_la = this._input.LA(1);
				if(!(_la===396 || _la===398)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 215;
				this.multiplicativeExpression();
				}
				}
				this.state = 220;
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
			this.state = 221;
			this.additiveExpression();
			this.state = 226;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===394 || _la===395) {
				{
				{
				this.state = 222;
				_la = this._input.LA(1);
				if(!(_la===394 || _la===395)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 223;
				this.additiveExpression();
				}
				}
				this.state = 228;
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
			this.state = 229;
			this.shiftExpression();
			this.state = 234;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 390)) & ~0x1F) === 0 && ((1 << (_la - 390)) & 15) !== 0)) {
				{
				{
				this.state = 230;
				_la = this._input.LA(1);
				if(!(((((_la - 390)) & ~0x1F) === 0 && ((1 << (_la - 390)) & 15) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 231;
				this.shiftExpression();
				}
				}
				this.state = 236;
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
			this.state = 237;
			this.relationalExpression();
			this.state = 242;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===424 || _la===425) {
				{
				{
				this.state = 238;
				_la = this._input.LA(1);
				if(!(_la===424 || _la===425)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 239;
				this.relationalExpression();
				}
				}
				this.state = 244;
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
			this.state = 245;
			this.equalityExpression();
			this.state = 250;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===403) {
				{
				{
				this.state = 246;
				this.match(proglang12dParser.And);
				this.state = 247;
				this.equalityExpression();
				}
				}
				this.state = 252;
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
			this.state = 253;
			this.andExpression();
			this.state = 258;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===407) {
				{
				{
				this.state = 254;
				this.match(proglang12dParser.Caret);
				this.state = 255;
				this.andExpression();
				}
				}
				this.state = 260;
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
			this.state = 261;
			this.exclusiveOrExpression();
			this.state = 266;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===404) {
				{
				{
				this.state = 262;
				this.match(proglang12dParser.Or);
				this.state = 263;
				this.exclusiveOrExpression();
				}
				}
				this.state = 268;
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
			this.state = 269;
			this.inclusiveOrExpression();
			this.state = 274;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===405) {
				{
				{
				this.state = 270;
				this.match(proglang12dParser.AndAnd);
				this.state = 271;
				this.inclusiveOrExpression();
				}
				}
				this.state = 276;
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
			this.state = 277;
			this.logicalAndExpression();
			this.state = 282;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===406) {
				{
				{
				this.state = 278;
				this.match(proglang12dParser.OrOr);
				this.state = 279;
				this.logicalAndExpression();
				}
				}
				this.state = 284;
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
			this.state = 285;
			this.logicalOrExpression();
			this.state = 291;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===409) {
				{
				this.state = 286;
				this.match(proglang12dParser.Question);
				this.state = 287;
				this.expression();
				this.state = 288;
				this.match(proglang12dParser.Colon);
				this.state = 289;
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
			this.state = 298;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 293;
				this.conditionalExpression();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 294;
				this.unaryExpression();
				this.state = 295;
				this.assignmentOperator();
				this.state = 296;
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
			this.state = 300;
			_la = this._input.LA(1);
			if(!(((((_la - 413)) & ~0x1F) === 0 && ((1 << (_la - 413)) & 2047) !== 0))) {
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
			this.state = 302;
			this.assignmentExpression();
			this.state = 307;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===412) {
				{
				{
				this.state = 303;
				this.match(proglang12dParser.Comma);
				this.state = 304;
				this.assignmentExpression();
				}
				}
				this.state = 309;
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
			this.state = 310;
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
			this.state = 312;
			this.declarationSpecifiers();
			this.state = 313;
			this.initDeclaratorList();
			this.state = 314;
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
			this.state = 316;
			this.initDeclarator();
			this.state = 321;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===412) {
				{
				{
				this.state = 317;
				this.match(proglang12dParser.Comma);
				this.state = 318;
				this.initDeclarator();
				}
				}
				this.state = 323;
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
			this.state = 324;
			this.declarator();
			this.state = 327;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===413) {
				{
				this.state = 325;
				this.match(proglang12dParser.Assign);
				this.state = 326;
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
			this.state = 330;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 329;
				this.declarationSpecifier();
				}
				}
				this.state = 332;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 1216612351) !== 0));
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
			this.state = 334;
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
			this.state = 345;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 336;
				this.match(proglang12dParser.Void);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 337;
				this.match(proglang12dParser.Char);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 338;
				this.match(proglang12dParser.Int);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 339;
				this.match(proglang12dParser.Float);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 340;
				this.builtInTypeSpecifier();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 341;
				this.builtInSetTypeSpecifier();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 342;
				this.builtInMultiSetTypeSpecifier();
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 343;
				this.builtInMapTypeSpecifier();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 344;
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
		try {
			this.state = 424;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
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
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 347;
				this.builtInWidgetTypeSpecifier();
				}
				break;
			case 1:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 348;
				this.match(proglang12dParser.T__0);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 349;
				this.match(proglang12dParser.T__1);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 350;
				this.match(proglang12dParser.T__2);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 351;
				this.match(proglang12dParser.T__3);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 352;
				this.match(proglang12dParser.T__4);
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 353;
				this.match(proglang12dParser.T__5);
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 354;
				this.match(proglang12dParser.T__6);
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 355;
				this.match(proglang12dParser.T__7);
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 356;
				this.match(proglang12dParser.T__8);
				}
				break;
			case 10:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 357;
				this.match(proglang12dParser.T__9);
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 358;
				this.match(proglang12dParser.T__10);
				}
				break;
			case 12:
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 359;
				this.match(proglang12dParser.T__11);
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 14);
				{
				this.state = 360;
				this.match(proglang12dParser.T__12);
				}
				break;
			case 14:
				this.enterOuterAlt(localctx, 15);
				{
				this.state = 361;
				this.match(proglang12dParser.T__13);
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 16);
				{
				this.state = 362;
				this.match(proglang12dParser.T__14);
				}
				break;
			case 16:
				this.enterOuterAlt(localctx, 17);
				{
				this.state = 363;
				this.match(proglang12dParser.T__15);
				}
				break;
			case 17:
				this.enterOuterAlt(localctx, 18);
				{
				this.state = 364;
				this.match(proglang12dParser.T__16);
				}
				break;
			case 18:
				this.enterOuterAlt(localctx, 19);
				{
				this.state = 365;
				this.match(proglang12dParser.T__17);
				}
				break;
			case 19:
				this.enterOuterAlt(localctx, 20);
				{
				this.state = 366;
				this.match(proglang12dParser.T__18);
				}
				break;
			case 20:
				this.enterOuterAlt(localctx, 21);
				{
				this.state = 367;
				this.match(proglang12dParser.T__19);
				}
				break;
			case 21:
				this.enterOuterAlt(localctx, 22);
				{
				this.state = 368;
				this.match(proglang12dParser.T__20);
				}
				break;
			case 22:
				this.enterOuterAlt(localctx, 23);
				{
				this.state = 369;
				this.match(proglang12dParser.T__21);
				}
				break;
			case 23:
				this.enterOuterAlt(localctx, 24);
				{
				this.state = 370;
				this.match(proglang12dParser.T__22);
				}
				break;
			case 24:
				this.enterOuterAlt(localctx, 25);
				{
				this.state = 371;
				this.match(proglang12dParser.T__23);
				}
				break;
			case 25:
				this.enterOuterAlt(localctx, 26);
				{
				this.state = 372;
				this.match(proglang12dParser.T__24);
				}
				break;
			case 26:
				this.enterOuterAlt(localctx, 27);
				{
				this.state = 373;
				this.match(proglang12dParser.T__25);
				}
				break;
			case 27:
				this.enterOuterAlt(localctx, 28);
				{
				this.state = 374;
				this.match(proglang12dParser.T__26);
				}
				break;
			case 28:
				this.enterOuterAlt(localctx, 29);
				{
				this.state = 375;
				this.match(proglang12dParser.T__27);
				}
				break;
			case 29:
				this.enterOuterAlt(localctx, 30);
				{
				this.state = 376;
				this.match(proglang12dParser.T__28);
				}
				break;
			case 30:
				this.enterOuterAlt(localctx, 31);
				{
				this.state = 377;
				this.match(proglang12dParser.T__29);
				}
				break;
			case 31:
				this.enterOuterAlt(localctx, 32);
				{
				this.state = 378;
				this.match(proglang12dParser.T__30);
				}
				break;
			case 32:
				this.enterOuterAlt(localctx, 33);
				{
				this.state = 379;
				this.match(proglang12dParser.T__31);
				}
				break;
			case 33:
				this.enterOuterAlt(localctx, 34);
				{
				this.state = 380;
				this.match(proglang12dParser.T__32);
				}
				break;
			case 34:
				this.enterOuterAlt(localctx, 35);
				{
				this.state = 381;
				this.match(proglang12dParser.T__33);
				}
				break;
			case 35:
				this.enterOuterAlt(localctx, 36);
				{
				this.state = 382;
				this.match(proglang12dParser.T__34);
				}
				break;
			case 36:
				this.enterOuterAlt(localctx, 37);
				{
				this.state = 383;
				this.match(proglang12dParser.T__35);
				}
				break;
			case 37:
				this.enterOuterAlt(localctx, 38);
				{
				this.state = 384;
				this.match(proglang12dParser.T__36);
				}
				break;
			case 38:
				this.enterOuterAlt(localctx, 39);
				{
				this.state = 385;
				this.match(proglang12dParser.T__37);
				}
				break;
			case 39:
				this.enterOuterAlt(localctx, 40);
				{
				this.state = 386;
				this.match(proglang12dParser.T__38);
				}
				break;
			case 40:
				this.enterOuterAlt(localctx, 41);
				{
				this.state = 387;
				this.match(proglang12dParser.T__39);
				}
				break;
			case 41:
				this.enterOuterAlt(localctx, 42);
				{
				this.state = 388;
				this.match(proglang12dParser.T__40);
				}
				break;
			case 42:
				this.enterOuterAlt(localctx, 43);
				{
				this.state = 389;
				this.match(proglang12dParser.T__41);
				}
				break;
			case 43:
				this.enterOuterAlt(localctx, 44);
				{
				this.state = 390;
				this.match(proglang12dParser.T__42);
				}
				break;
			case 44:
				this.enterOuterAlt(localctx, 45);
				{
				this.state = 391;
				this.match(proglang12dParser.T__43);
				}
				break;
			case 45:
				this.enterOuterAlt(localctx, 46);
				{
				this.state = 392;
				this.match(proglang12dParser.T__44);
				}
				break;
			case 46:
				this.enterOuterAlt(localctx, 47);
				{
				this.state = 393;
				this.match(proglang12dParser.T__45);
				}
				break;
			case 47:
				this.enterOuterAlt(localctx, 48);
				{
				this.state = 394;
				this.match(proglang12dParser.T__46);
				}
				break;
			case 48:
				this.enterOuterAlt(localctx, 49);
				{
				this.state = 395;
				this.match(proglang12dParser.T__47);
				}
				break;
			case 49:
				this.enterOuterAlt(localctx, 50);
				{
				this.state = 396;
				this.match(proglang12dParser.T__48);
				}
				break;
			case 50:
				this.enterOuterAlt(localctx, 51);
				{
				this.state = 397;
				this.match(proglang12dParser.T__49);
				}
				break;
			case 51:
				this.enterOuterAlt(localctx, 52);
				{
				this.state = 398;
				this.match(proglang12dParser.T__50);
				}
				break;
			case 52:
				this.enterOuterAlt(localctx, 53);
				{
				this.state = 399;
				this.match(proglang12dParser.T__51);
				}
				break;
			case 53:
				this.enterOuterAlt(localctx, 54);
				{
				this.state = 400;
				this.match(proglang12dParser.T__52);
				}
				break;
			case 54:
				this.enterOuterAlt(localctx, 55);
				{
				this.state = 401;
				this.match(proglang12dParser.T__53);
				}
				break;
			case 55:
				this.enterOuterAlt(localctx, 56);
				{
				this.state = 402;
				this.match(proglang12dParser.T__54);
				}
				break;
			case 56:
				this.enterOuterAlt(localctx, 57);
				{
				this.state = 403;
				this.match(proglang12dParser.T__55);
				}
				break;
			case 57:
				this.enterOuterAlt(localctx, 58);
				{
				this.state = 404;
				this.match(proglang12dParser.T__56);
				}
				break;
			case 58:
				this.enterOuterAlt(localctx, 59);
				{
				this.state = 405;
				this.match(proglang12dParser.T__57);
				}
				break;
			case 59:
				this.enterOuterAlt(localctx, 60);
				{
				this.state = 406;
				this.match(proglang12dParser.T__58);
				}
				break;
			case 60:
				this.enterOuterAlt(localctx, 61);
				{
				this.state = 407;
				this.match(proglang12dParser.T__59);
				}
				break;
			case 61:
				this.enterOuterAlt(localctx, 62);
				{
				this.state = 408;
				this.match(proglang12dParser.T__60);
				}
				break;
			case 62:
				this.enterOuterAlt(localctx, 63);
				{
				this.state = 409;
				this.match(proglang12dParser.T__61);
				}
				break;
			case 63:
				this.enterOuterAlt(localctx, 64);
				{
				this.state = 410;
				this.match(proglang12dParser.T__62);
				}
				break;
			case 64:
				this.enterOuterAlt(localctx, 65);
				{
				this.state = 411;
				this.match(proglang12dParser.T__63);
				}
				break;
			case 65:
				this.enterOuterAlt(localctx, 66);
				{
				this.state = 412;
				this.match(proglang12dParser.T__64);
				}
				break;
			case 66:
				this.enterOuterAlt(localctx, 67);
				{
				this.state = 413;
				this.match(proglang12dParser.T__65);
				}
				break;
			case 67:
				this.enterOuterAlt(localctx, 68);
				{
				this.state = 414;
				this.match(proglang12dParser.T__66);
				}
				break;
			case 68:
				this.enterOuterAlt(localctx, 69);
				{
				this.state = 415;
				this.match(proglang12dParser.T__67);
				}
				break;
			case 69:
				this.enterOuterAlt(localctx, 70);
				{
				this.state = 416;
				this.match(proglang12dParser.T__68);
				}
				break;
			case 70:
				this.enterOuterAlt(localctx, 71);
				{
				this.state = 417;
				this.match(proglang12dParser.T__69);
				}
				break;
			case 71:
				this.enterOuterAlt(localctx, 72);
				{
				this.state = 418;
				this.match(proglang12dParser.T__70);
				}
				break;
			case 72:
				this.enterOuterAlt(localctx, 73);
				{
				this.state = 419;
				this.match(proglang12dParser.T__71);
				}
				break;
			case 73:
				this.enterOuterAlt(localctx, 74);
				{
				this.state = 420;
				this.match(proglang12dParser.T__72);
				}
				break;
			case 74:
				this.enterOuterAlt(localctx, 75);
				{
				this.state = 421;
				this.match(proglang12dParser.T__73);
				}
				break;
			case 75:
				this.enterOuterAlt(localctx, 76);
				{
				this.state = 422;
				this.match(proglang12dParser.T__74);
				}
				break;
			case 76:
				this.enterOuterAlt(localctx, 77);
				{
				this.state = 423;
				this.match(proglang12dParser.T__75);
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
	public builtInWidgetTypeSpecifier(): BuiltInWidgetTypeSpecifierContext {
		let localctx: BuiltInWidgetTypeSpecifierContext = new BuiltInWidgetTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, proglang12dParser.RULE_builtInWidgetTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 426;
			_la = this._input.LA(1);
			if(!(((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 4294967295) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & 4294967295) !== 0) || ((((_la - 141)) & ~0x1F) === 0 && ((1 << (_la - 141)) & 31) !== 0))) {
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
		this.enterRule(localctx, 62, proglang12dParser.RULE_builtInSetTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 428;
			_la = this._input.LA(1);
			if(!(((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 73) !== 0) || ((((_la - 146)) & ~0x1F) === 0 && ((1 << (_la - 146)) & 127) !== 0))) {
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
		this.enterRule(localctx, 64, proglang12dParser.RULE_builtInMultiSetTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 430;
			_la = this._input.LA(1);
			if(!(((((_la - 153)) & ~0x1F) === 0 && ((1 << (_la - 153)) & 1023) !== 0))) {
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
		this.enterRule(localctx, 66, proglang12dParser.RULE_builtInMapTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 432;
			_la = this._input.LA(1);
			if(!(((((_la - 163)) & ~0x1F) === 0 && ((1 << (_la - 163)) & 4294967295) !== 0) || ((((_la - 195)) & ~0x1F) === 0 && ((1 << (_la - 195)) & 4294967295) !== 0) || ((((_la - 227)) & ~0x1F) === 0 && ((1 << (_la - 227)) & 4294967295) !== 0) || ((((_la - 259)) & ~0x1F) === 0 && ((1 << (_la - 259)) & 15) !== 0))) {
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
		this.enterRule(localctx, 68, proglang12dParser.RULE_builtInMultiMapTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 434;
			_la = this._input.LA(1);
			if(!(((((_la - 263)) & ~0x1F) === 0 && ((1 << (_la - 263)) & 4294967295) !== 0) || ((((_la - 295)) & ~0x1F) === 0 && ((1 << (_la - 295)) & 4294967295) !== 0) || ((((_la - 327)) & ~0x1F) === 0 && ((1 << (_la - 327)) & 4294967295) !== 0) || ((((_la - 359)) & ~0x1F) === 0 && ((1 << (_la - 359)) & 15) !== 0))) {
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
		this.enterRule(localctx, 70, proglang12dParser.RULE_specifierQualifierList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 436;
			this.typeSpecifier();
			this.state = 438;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 1216612351) !== 0)) {
				{
				this.state = 437;
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
		this.enterRule(localctx, 72, proglang12dParser.RULE_declarator);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 440;
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
		let _startState: number = 74;
		this.enterRecursionRule(localctx, 74, proglang12dParser.RULE_directDeclarator, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 443;
			this.match(proglang12dParser.Identifier);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 464;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 462;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 31, this._ctx) ) {
					case 1:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directDeclarator);
						this.state = 445;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 446;
						this.match(proglang12dParser.LeftBracket);
						this.state = 448;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 16838657) !== 0) || ((((_la - 427)) & ~0x1F) === 0 && ((1 << (_la - 427)) & 11) !== 0)) {
							{
							this.state = 447;
							this.constantExpression();
							}
						}

						this.state = 450;
						this.match(proglang12dParser.RightBracket);
						}
						break;
					case 2:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directDeclarator);
						this.state = 451;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 452;
						this.match(proglang12dParser.LeftParen);
						this.state = 453;
						this.parameterTypeList();
						this.state = 454;
						this.match(proglang12dParser.RightParen);
						}
						break;
					case 3:
						{
						localctx = new DirectDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directDeclarator);
						this.state = 456;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 457;
						this.match(proglang12dParser.LeftParen);
						this.state = 459;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===428) {
							{
							this.state = 458;
							this.identifierList();
							}
						}

						this.state = 461;
						this.match(proglang12dParser.RightParen);
						}
						break;
					}
					}
				}
				this.state = 466;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 32, this._ctx);
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
		this.enterRule(localctx, 76, proglang12dParser.RULE_nestedParenthesesBlock);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 474;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 4294967295) !== 0) || ((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 4294967293) !== 0) || ((((_la - 416)) & ~0x1F) === 0 && ((1 << (_la - 416)) & 2097151) !== 0)) {
				{
				this.state = 472;
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
				case 377:
				case 378:
				case 379:
				case 380:
				case 381:
				case 382:
				case 383:
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
				case 430:
				case 431:
				case 432:
				case 433:
				case 434:
				case 435:
				case 436:
					{
					this.state = 467;
					_la = this._input.LA(1);
					if(_la<=0 || _la===384 || _la===385) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					break;
				case 384:
					{
					this.state = 468;
					this.match(proglang12dParser.LeftParen);
					this.state = 469;
					this.nestedParenthesesBlock();
					this.state = 470;
					this.match(proglang12dParser.RightParen);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 476;
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
		this.enterRule(localctx, 78, proglang12dParser.RULE_parameterTypeList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 477;
			this.parameterList();
			this.state = 480;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===412) {
				{
				this.state = 478;
				this.match(proglang12dParser.Comma);
				this.state = 479;
				this.match(proglang12dParser.T__362);
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
		this.enterRule(localctx, 80, proglang12dParser.RULE_parameterList);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 482;
			this.parameterDeclaration();
			this.state = 487;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 36, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 483;
					this.match(proglang12dParser.Comma);
					this.state = 484;
					this.parameterDeclaration();
					}
					}
				}
				this.state = 489;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 36, this._ctx);
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
		this.enterRule(localctx, 82, proglang12dParser.RULE_parameterDeclaration);
		let _la: number;
		try {
			this.state = 509;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 38, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 490;
				this.declarationSpecifiers();
				this.state = 492;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===428) {
					{
					this.state = 491;
					this.match(proglang12dParser.Identifier);
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 494;
				this.declarationSpecifiers();
				this.state = 495;
				this.match(proglang12dParser.And);
				this.state = 496;
				this.match(proglang12dParser.Identifier);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 498;
				this.declarationSpecifiers();
				this.state = 499;
				this.match(proglang12dParser.Identifier);
				this.state = 500;
				this.match(proglang12dParser.LeftBracket);
				this.state = 501;
				this.match(proglang12dParser.RightBracket);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 503;
				this.declarationSpecifiers();
				this.state = 504;
				this.match(proglang12dParser.And);
				this.state = 505;
				this.match(proglang12dParser.Identifier);
				this.state = 506;
				this.match(proglang12dParser.LeftBracket);
				this.state = 507;
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
		this.enterRule(localctx, 84, proglang12dParser.RULE_identifierList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 511;
			this.match(proglang12dParser.Identifier);
			this.state = 516;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===412) {
				{
				{
				this.state = 512;
				this.match(proglang12dParser.Comma);
				this.state = 513;
				this.match(proglang12dParser.Identifier);
				}
				}
				this.state = 518;
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
		this.enterRule(localctx, 86, proglang12dParser.RULE_typeName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 519;
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
		let _startState: number = 88;
		this.enterRecursionRule(localctx, 88, proglang12dParser.RULE_directAbstractDeclarator, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			this.state = 522;
			this.match(proglang12dParser.LeftBracket);
			this.state = 523;
			this.match(proglang12dParser.Star);
			this.state = 524;
			this.match(proglang12dParser.RightBracket);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 538;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 42, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 536;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 41, this._ctx) ) {
					case 1:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directAbstractDeclarator);
						this.state = 526;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 527;
						this.match(proglang12dParser.LeftBracket);
						this.state = 529;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 16838657) !== 0) || ((((_la - 427)) & ~0x1F) === 0 && ((1 << (_la - 427)) & 11) !== 0)) {
							{
							this.state = 528;
							this.assignmentExpression();
							}
						}

						this.state = 531;
						this.match(proglang12dParser.RightBracket);
						}
						break;
					case 2:
						{
						localctx = new DirectAbstractDeclaratorContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, proglang12dParser.RULE_directAbstractDeclarator);
						this.state = 532;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 533;
						this.match(proglang12dParser.LeftBracket);
						this.state = 534;
						this.match(proglang12dParser.Star);
						this.state = 535;
						this.match(proglang12dParser.RightBracket);
						}
						break;
					}
					}
				}
				this.state = 540;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 42, this._ctx);
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
		this.enterRule(localctx, 90, proglang12dParser.RULE_typedefName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 541;
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
		this.enterRule(localctx, 92, proglang12dParser.RULE_initializer);
		let _la: number;
		try {
			this.state = 551;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 384:
			case 396:
			case 397:
			case 398:
			case 399:
			case 408:
			case 427:
			case 428:
			case 430:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 543;
				this.assignmentExpression();
				}
				break;
			case 388:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 544;
				this.match(proglang12dParser.LeftBrace);
				this.state = 545;
				this.initializerList();
				this.state = 547;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===412) {
					{
					this.state = 546;
					this.match(proglang12dParser.Comma);
					}
				}

				this.state = 549;
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
		this.enterRule(localctx, 94, proglang12dParser.RULE_initializerList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 554;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===386 || _la===426) {
				{
				this.state = 553;
				this.designation();
				}
			}

			this.state = 556;
			this.initializer();
			this.state = 564;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 47, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 557;
					this.match(proglang12dParser.Comma);
					this.state = 559;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===386 || _la===426) {
						{
						this.state = 558;
						this.designation();
						}
					}

					this.state = 561;
					this.initializer();
					}
					}
				}
				this.state = 566;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 47, this._ctx);
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
		this.enterRule(localctx, 96, proglang12dParser.RULE_designation);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 567;
			this.designatorList();
			this.state = 568;
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
		this.enterRule(localctx, 98, proglang12dParser.RULE_designatorList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 571;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 570;
				this.designator();
				}
				}
				this.state = 573;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===386 || _la===426);
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
		this.enterRule(localctx, 100, proglang12dParser.RULE_designator);
		try {
			this.state = 581;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 386:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 575;
				this.match(proglang12dParser.LeftBracket);
				this.state = 576;
				this.constantExpression();
				this.state = 577;
				this.match(proglang12dParser.RightBracket);
				}
				break;
			case 426:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 579;
				this.match(proglang12dParser.Dot);
				this.state = 580;
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
		this.enterRule(localctx, 102, proglang12dParser.RULE_statement);
		let _la: number;
		try {
			this.state = 620;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 55, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 583;
				this.labeledStatement();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 584;
				this.compoundStatement();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 585;
				this.expressionStatement();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 586;
				this.selectionStatement();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 587;
				this.iterationStatement();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 588;
				this.jumpStatement();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 589;
				_la = this._input.LA(1);
				if(!(_la===364 || _la===365)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 590;
				_la = this._input.LA(1);
				if(!(_la===366 || _la===367)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 591;
				this.match(proglang12dParser.LeftParen);
				this.state = 600;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 16838657) !== 0) || ((((_la - 427)) & ~0x1F) === 0 && ((1 << (_la - 427)) & 11) !== 0)) {
					{
					this.state = 592;
					this.logicalOrExpression();
					this.state = 597;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===412) {
						{
						{
						this.state = 593;
						this.match(proglang12dParser.Comma);
						this.state = 594;
						this.logicalOrExpression();
						}
						}
						this.state = 599;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 615;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===410) {
					{
					{
					this.state = 602;
					this.match(proglang12dParser.Colon);
					this.state = 611;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 16838657) !== 0) || ((((_la - 427)) & ~0x1F) === 0 && ((1 << (_la - 427)) & 11) !== 0)) {
						{
						this.state = 603;
						this.logicalOrExpression();
						this.state = 608;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						while (_la===412) {
							{
							{
							this.state = 604;
							this.match(proglang12dParser.Comma);
							this.state = 605;
							this.logicalOrExpression();
							}
							}
							this.state = 610;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
						}
						}
					}

					}
					}
					this.state = 617;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 618;
				this.match(proglang12dParser.RightParen);
				this.state = 619;
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
		this.enterRule(localctx, 104, proglang12dParser.RULE_labeledStatement);
		try {
			this.state = 633;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 428:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 622;
				this.match(proglang12dParser.Identifier);
				this.state = 623;
				this.match(proglang12dParser.Colon);
				this.state = 624;
				this.statement();
				}
				break;
			case 369:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 625;
				this.match(proglang12dParser.Case);
				this.state = 626;
				this.constantExpression();
				this.state = 627;
				this.match(proglang12dParser.Colon);
				this.state = 628;
				this.statement();
				}
				break;
			case 372:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 630;
				this.match(proglang12dParser.Default);
				this.state = 631;
				this.match(proglang12dParser.Colon);
				this.state = 632;
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
		this.enterRule(localctx, 106, proglang12dParser.RULE_compoundStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 635;
			this.match(proglang12dParser.LeftBrace);
			this.state = 637;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 4290721791) !== 0) || ((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 151056401) !== 0) || ((((_la - 427)) & ~0x1F) === 0 && ((1 << (_la - 427)) & 11) !== 0)) {
				{
				this.state = 636;
				this.blockItemList();
				}
			}

			this.state = 639;
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
		this.enterRule(localctx, 108, proglang12dParser.RULE_blockItemList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 642;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 641;
				this.blockItem();
				}
				}
				this.state = 644;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 4290721791) !== 0) || ((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 151056401) !== 0) || ((((_la - 427)) & ~0x1F) === 0 && ((1 << (_la - 427)) & 11) !== 0));
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
		this.enterRule(localctx, 110, proglang12dParser.RULE_blockItem);
		try {
			this.state = 648;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 364:
			case 365:
			case 368:
			case 369:
			case 371:
			case 372:
			case 373:
			case 376:
			case 377:
			case 378:
			case 380:
			case 381:
			case 383:
			case 384:
			case 388:
			case 396:
			case 397:
			case 398:
			case 399:
			case 408:
			case 411:
			case 427:
			case 428:
			case 430:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 646;
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
			case 356:
			case 357:
			case 358:
			case 359:
			case 360:
			case 361:
			case 362:
			case 370:
			case 375:
			case 379:
			case 382:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 647;
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
		this.enterRule(localctx, 112, proglang12dParser.RULE_expressionStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 651;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 16838657) !== 0) || ((((_la - 427)) & ~0x1F) === 0 && ((1 << (_la - 427)) & 11) !== 0)) {
				{
				this.state = 650;
				this.expression();
				}
			}

			this.state = 653;
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
		this.enterRule(localctx, 114, proglang12dParser.RULE_selectionStatement);
		try {
			this.state = 670;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 378:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 655;
				this.match(proglang12dParser.If);
				this.state = 656;
				this.match(proglang12dParser.LeftParen);
				this.state = 657;
				this.expression();
				this.state = 658;
				this.match(proglang12dParser.RightParen);
				this.state = 659;
				this.statement();
				this.state = 662;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 61, this._ctx) ) {
				case 1:
					{
					this.state = 660;
					this.match(proglang12dParser.Else);
					this.state = 661;
					this.statement();
					}
					break;
				}
				}
				break;
			case 381:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 664;
				this.match(proglang12dParser.Switch);
				this.state = 665;
				this.match(proglang12dParser.LeftParen);
				this.state = 666;
				this.expression();
				this.state = 667;
				this.match(proglang12dParser.RightParen);
				this.state = 668;
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
		this.enterRule(localctx, 116, proglang12dParser.RULE_iterationStatement);
		try {
			this.state = 692;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 383:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 672;
				this.match(proglang12dParser.While);
				this.state = 673;
				this.match(proglang12dParser.LeftParen);
				this.state = 674;
				this.expression();
				this.state = 675;
				this.match(proglang12dParser.RightParen);
				this.state = 676;
				this.statement();
				}
				break;
			case 373:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 678;
				this.match(proglang12dParser.Do);
				this.state = 679;
				this.statement();
				this.state = 680;
				this.match(proglang12dParser.While);
				this.state = 681;
				this.match(proglang12dParser.LeftParen);
				this.state = 682;
				this.expression();
				this.state = 683;
				this.match(proglang12dParser.RightParen);
				this.state = 684;
				this.match(proglang12dParser.Semi);
				}
				break;
			case 376:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 686;
				this.match(proglang12dParser.For);
				this.state = 687;
				this.match(proglang12dParser.LeftParen);
				this.state = 688;
				this.forCondition();
				this.state = 689;
				this.match(proglang12dParser.RightParen);
				this.state = 690;
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
		this.enterRule(localctx, 118, proglang12dParser.RULE_forCondition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 698;
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
			case 370:
			case 375:
			case 379:
			case 382:
				{
				this.state = 694;
				this.forDeclaration();
				}
				break;
			case 384:
			case 396:
			case 397:
			case 398:
			case 399:
			case 408:
			case 411:
			case 427:
			case 428:
			case 430:
				{
				this.state = 696;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 16838657) !== 0) || ((((_la - 427)) & ~0x1F) === 0 && ((1 << (_la - 427)) & 11) !== 0)) {
					{
					this.state = 695;
					this.expression();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 700;
			this.match(proglang12dParser.Semi);
			this.state = 702;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 16838657) !== 0) || ((((_la - 427)) & ~0x1F) === 0 && ((1 << (_la - 427)) & 11) !== 0)) {
				{
				this.state = 701;
				this.forExpression();
				}
			}

			this.state = 704;
			this.match(proglang12dParser.Semi);
			this.state = 706;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 16838657) !== 0) || ((((_la - 427)) & ~0x1F) === 0 && ((1 << (_la - 427)) & 11) !== 0)) {
				{
				this.state = 705;
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
		this.enterRule(localctx, 120, proglang12dParser.RULE_forDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 708;
			this.declarationSpecifiers();
			this.state = 709;
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
		this.enterRule(localctx, 122, proglang12dParser.RULE_forExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 711;
			this.assignmentExpression();
			this.state = 716;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===412) {
				{
				{
				this.state = 712;
				this.match(proglang12dParser.Comma);
				this.state = 713;
				this.assignmentExpression();
				}
				}
				this.state = 718;
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
		this.enterRule(localctx, 124, proglang12dParser.RULE_jumpStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 729;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 70, this._ctx) ) {
			case 1:
				{
				this.state = 719;
				this.match(proglang12dParser.Goto);
				this.state = 720;
				this.match(proglang12dParser.Identifier);
				}
				break;
			case 2:
				{
				this.state = 721;
				this.match(proglang12dParser.Continue);
				}
				break;
			case 3:
				{
				this.state = 722;
				this.match(proglang12dParser.Break);
				}
				break;
			case 4:
				{
				this.state = 723;
				this.match(proglang12dParser.Return);
				this.state = 725;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 384)) & ~0x1F) === 0 && ((1 << (_la - 384)) & 16838657) !== 0) || ((((_la - 427)) & ~0x1F) === 0 && ((1 << (_la - 427)) & 11) !== 0)) {
					{
					this.state = 724;
					this.expression();
					}
				}

				}
				break;
			case 5:
				{
				this.state = 727;
				this.match(proglang12dParser.Goto);
				this.state = 728;
				this.unaryExpression();
				}
				break;
			}
			this.state = 731;
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
		this.enterRule(localctx, 126, proglang12dParser.RULE_compilationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 734;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 1216612351) !== 0) || _la===411 || _la===428) {
				{
				this.state = 733;
				this.translationUnit();
				}
			}

			this.state = 736;
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
		this.enterRule(localctx, 128, proglang12dParser.RULE_translationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 739;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 738;
				this.externalDeclaration();
				}
				}
				this.state = 741;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 1216612351) !== 0) || _la===411 || _la===428);
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
		this.enterRule(localctx, 130, proglang12dParser.RULE_externalDeclaration);
		try {
			this.state = 746;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 73, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 743;
				this.functionDefinition();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 744;
				this.declaration();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 745;
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
		this.enterRule(localctx, 132, proglang12dParser.RULE_functionDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 749;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 1216612351) !== 0)) {
				{
				this.state = 748;
				this.declarationSpecifiers();
				}
			}

			this.state = 751;
			this.declarator();
			this.state = 753;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 1216612351) !== 0)) {
				{
				this.state = 752;
				this.declarationList();
				}
			}

			this.state = 755;
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
		this.enterRule(localctx, 134, proglang12dParser.RULE_declarationList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 758;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 757;
				this.declaration();
				}
				}
				this.state = 760;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294967294) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 4294967295) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 4294967295) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4294967295) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4294967295) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 4294967295) !== 0) || ((((_la - 192)) & ~0x1F) === 0 && ((1 << (_la - 192)) & 4294967295) !== 0) || ((((_la - 224)) & ~0x1F) === 0 && ((1 << (_la - 224)) & 4294967295) !== 0) || ((((_la - 256)) & ~0x1F) === 0 && ((1 << (_la - 256)) & 4294967295) !== 0) || ((((_la - 288)) & ~0x1F) === 0 && ((1 << (_la - 288)) & 4294967295) !== 0) || ((((_la - 320)) & ~0x1F) === 0 && ((1 << (_la - 320)) & 4294967295) !== 0) || ((((_la - 352)) & ~0x1F) === 0 && ((1 << (_la - 352)) & 1216612351) !== 0));
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
		case 37:
			return this.directDeclarator_sempred(localctx as DirectDeclaratorContext, predIndex);
		case 44:
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

	public static readonly _serializedATN: number[] = [4,1,436,763,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,
	7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,
	60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,2,67,7,67,
	1,0,1,0,1,0,4,0,140,8,0,11,0,12,0,141,1,0,1,0,1,0,1,0,3,0,148,8,0,1,1,1,
	1,1,1,5,1,153,8,1,10,1,12,1,156,9,1,1,2,1,2,3,2,160,8,2,1,2,1,2,1,2,1,3,
	1,3,1,3,1,3,1,3,1,3,1,3,3,3,172,8,3,1,3,1,3,1,3,5,3,177,8,3,10,3,12,3,180,
	9,3,1,4,1,4,1,4,5,4,185,8,4,10,4,12,4,188,9,4,1,5,5,5,191,8,5,10,5,12,5,
	194,9,5,1,5,1,5,1,5,1,5,3,5,200,8,5,1,6,1,6,1,7,1,7,1,8,1,8,1,8,5,8,209,
	8,8,10,8,12,8,212,9,8,1,9,1,9,1,9,5,9,217,8,9,10,9,12,9,220,9,9,1,10,1,
	10,1,10,5,10,225,8,10,10,10,12,10,228,9,10,1,11,1,11,1,11,5,11,233,8,11,
	10,11,12,11,236,9,11,1,12,1,12,1,12,5,12,241,8,12,10,12,12,12,244,9,12,
	1,13,1,13,1,13,5,13,249,8,13,10,13,12,13,252,9,13,1,14,1,14,1,14,5,14,257,
	8,14,10,14,12,14,260,9,14,1,15,1,15,1,15,5,15,265,8,15,10,15,12,15,268,
	9,15,1,16,1,16,1,16,5,16,273,8,16,10,16,12,16,276,9,16,1,17,1,17,1,17,5,
	17,281,8,17,10,17,12,17,284,9,17,1,18,1,18,1,18,1,18,1,18,1,18,3,18,292,
	8,18,1,19,1,19,1,19,1,19,1,19,3,19,299,8,19,1,20,1,20,1,21,1,21,1,21,5,
	21,306,8,21,10,21,12,21,309,9,21,1,22,1,22,1,23,1,23,1,23,1,23,1,24,1,24,
	1,24,5,24,320,8,24,10,24,12,24,323,9,24,1,25,1,25,1,25,3,25,328,8,25,1,
	26,4,26,331,8,26,11,26,12,26,332,1,27,1,27,1,28,1,28,1,28,1,28,1,28,1,28,
	1,28,1,28,1,28,3,28,346,8,28,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,
	29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,
	1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,
	29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,
	1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,
	29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,1,29,3,29,425,8,29,1,30,
	1,30,1,31,1,31,1,32,1,32,1,33,1,33,1,34,1,34,1,35,1,35,3,35,439,8,35,1,
	36,1,36,1,37,1,37,1,37,1,37,1,37,1,37,3,37,449,8,37,1,37,1,37,1,37,1,37,
	1,37,1,37,1,37,1,37,1,37,3,37,460,8,37,1,37,5,37,463,8,37,10,37,12,37,466,
	9,37,1,38,1,38,1,38,1,38,1,38,5,38,473,8,38,10,38,12,38,476,9,38,1,39,1,
	39,1,39,3,39,481,8,39,1,40,1,40,1,40,5,40,486,8,40,10,40,12,40,489,9,40,
	1,41,1,41,3,41,493,8,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,
	41,1,41,1,41,1,41,1,41,1,41,3,41,510,8,41,1,42,1,42,1,42,5,42,515,8,42,
	10,42,12,42,518,9,42,1,43,1,43,1,44,1,44,1,44,1,44,1,44,1,44,1,44,1,44,
	3,44,530,8,44,1,44,1,44,1,44,1,44,1,44,5,44,537,8,44,10,44,12,44,540,9,
	44,1,45,1,45,1,46,1,46,1,46,1,46,3,46,548,8,46,1,46,1,46,3,46,552,8,46,
	1,47,3,47,555,8,47,1,47,1,47,1,47,3,47,560,8,47,1,47,5,47,563,8,47,10,47,
	12,47,566,9,47,1,48,1,48,1,48,1,49,4,49,572,8,49,11,49,12,49,573,1,50,1,
	50,1,50,1,50,1,50,1,50,3,50,582,8,50,1,51,1,51,1,51,1,51,1,51,1,51,1,51,
	1,51,1,51,1,51,1,51,1,51,5,51,596,8,51,10,51,12,51,599,9,51,3,51,601,8,
	51,1,51,1,51,1,51,1,51,5,51,607,8,51,10,51,12,51,610,9,51,3,51,612,8,51,
	5,51,614,8,51,10,51,12,51,617,9,51,1,51,1,51,3,51,621,8,51,1,52,1,52,1,
	52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,1,52,3,52,634,8,52,1,53,1,53,3,53,
	638,8,53,1,53,1,53,1,54,4,54,643,8,54,11,54,12,54,644,1,55,1,55,3,55,649,
	8,55,1,56,3,56,652,8,56,1,56,1,56,1,57,1,57,1,57,1,57,1,57,1,57,1,57,3,
	57,663,8,57,1,57,1,57,1,57,1,57,1,57,1,57,3,57,671,8,57,1,58,1,58,1,58,
	1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,58,1,
	58,1,58,1,58,3,58,693,8,58,1,59,1,59,3,59,697,8,59,3,59,699,8,59,1,59,1,
	59,3,59,703,8,59,1,59,1,59,3,59,707,8,59,1,60,1,60,1,60,1,61,1,61,1,61,
	5,61,715,8,61,10,61,12,61,718,9,61,1,62,1,62,1,62,1,62,1,62,1,62,3,62,726,
	8,62,1,62,1,62,3,62,730,8,62,1,62,1,62,1,63,3,63,735,8,63,1,63,1,63,1,64,
	4,64,740,8,64,11,64,12,64,741,1,65,1,65,1,65,3,65,747,8,65,1,66,3,66,750,
	8,66,1,66,1,66,3,66,754,8,66,1,66,1,66,1,67,4,67,759,8,67,11,67,12,67,760,
	1,67,0,2,74,88,68,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,
	40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,
	88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,
	128,130,132,134,0,16,2,0,397,397,399,399,3,0,396,396,398,398,408,408,1,
	0,400,402,2,0,396,396,398,398,1,0,394,395,1,0,390,393,1,0,424,425,1,0,413,
	423,1,0,77,145,4,0,64,64,67,67,70,70,146,152,1,0,153,162,1,0,163,262,1,
	0,263,362,1,0,384,385,1,0,364,365,1,0,366,367,871,0,147,1,0,0,0,2,149,1,
	0,0,0,4,159,1,0,0,0,6,164,1,0,0,0,8,181,1,0,0,0,10,192,1,0,0,0,12,201,1,
	0,0,0,14,203,1,0,0,0,16,205,1,0,0,0,18,213,1,0,0,0,20,221,1,0,0,0,22,229,
	1,0,0,0,24,237,1,0,0,0,26,245,1,0,0,0,28,253,1,0,0,0,30,261,1,0,0,0,32,
	269,1,0,0,0,34,277,1,0,0,0,36,285,1,0,0,0,38,298,1,0,0,0,40,300,1,0,0,0,
	42,302,1,0,0,0,44,310,1,0,0,0,46,312,1,0,0,0,48,316,1,0,0,0,50,324,1,0,
	0,0,52,330,1,0,0,0,54,334,1,0,0,0,56,345,1,0,0,0,58,424,1,0,0,0,60,426,
	1,0,0,0,62,428,1,0,0,0,64,430,1,0,0,0,66,432,1,0,0,0,68,434,1,0,0,0,70,
	436,1,0,0,0,72,440,1,0,0,0,74,442,1,0,0,0,76,474,1,0,0,0,78,477,1,0,0,0,
	80,482,1,0,0,0,82,509,1,0,0,0,84,511,1,0,0,0,86,519,1,0,0,0,88,521,1,0,
	0,0,90,541,1,0,0,0,92,551,1,0,0,0,94,554,1,0,0,0,96,567,1,0,0,0,98,571,
	1,0,0,0,100,581,1,0,0,0,102,620,1,0,0,0,104,633,1,0,0,0,106,635,1,0,0,0,
	108,642,1,0,0,0,110,648,1,0,0,0,112,651,1,0,0,0,114,670,1,0,0,0,116,692,
	1,0,0,0,118,698,1,0,0,0,120,708,1,0,0,0,122,711,1,0,0,0,124,729,1,0,0,0,
	126,734,1,0,0,0,128,739,1,0,0,0,130,746,1,0,0,0,132,749,1,0,0,0,134,758,
	1,0,0,0,136,148,5,428,0,0,137,148,5,427,0,0,138,140,5,430,0,0,139,138,1,
	0,0,0,140,141,1,0,0,0,141,139,1,0,0,0,141,142,1,0,0,0,142,148,1,0,0,0,143,
	144,5,384,0,0,144,145,3,42,21,0,145,146,5,385,0,0,146,148,1,0,0,0,147,136,
	1,0,0,0,147,137,1,0,0,0,147,139,1,0,0,0,147,143,1,0,0,0,148,1,1,0,0,0,149,
	154,3,4,2,0,150,151,5,412,0,0,151,153,3,4,2,0,152,150,1,0,0,0,153,156,1,
	0,0,0,154,152,1,0,0,0,154,155,1,0,0,0,155,3,1,0,0,0,156,154,1,0,0,0,157,
	160,3,86,43,0,158,160,5,372,0,0,159,157,1,0,0,0,159,158,1,0,0,0,160,161,
	1,0,0,0,161,162,5,410,0,0,162,163,3,38,19,0,163,5,1,0,0,0,164,178,3,0,0,
	0,165,166,5,386,0,0,166,167,3,42,21,0,167,168,5,387,0,0,168,177,1,0,0,0,
	169,171,5,384,0,0,170,172,3,8,4,0,171,170,1,0,0,0,171,172,1,0,0,0,172,173,
	1,0,0,0,173,177,5,385,0,0,174,177,5,397,0,0,175,177,5,399,0,0,176,165,1,
	0,0,0,176,169,1,0,0,0,176,174,1,0,0,0,176,175,1,0,0,0,177,180,1,0,0,0,178,
	176,1,0,0,0,178,179,1,0,0,0,179,7,1,0,0,0,180,178,1,0,0,0,181,186,3,38,
	19,0,182,183,5,412,0,0,183,185,3,38,19,0,184,182,1,0,0,0,185,188,1,0,0,
	0,186,184,1,0,0,0,186,187,1,0,0,0,187,9,1,0,0,0,188,186,1,0,0,0,189,191,
	7,0,0,0,190,189,1,0,0,0,191,194,1,0,0,0,192,190,1,0,0,0,192,193,1,0,0,0,
	193,199,1,0,0,0,194,192,1,0,0,0,195,200,3,6,3,0,196,197,3,12,6,0,197,198,
	3,14,7,0,198,200,1,0,0,0,199,195,1,0,0,0,199,196,1,0,0,0,200,11,1,0,0,0,
	201,202,7,1,0,0,202,13,1,0,0,0,203,204,3,10,5,0,204,15,1,0,0,0,205,210,
	3,14,7,0,206,207,7,2,0,0,207,209,3,14,7,0,208,206,1,0,0,0,209,212,1,0,0,
	0,210,208,1,0,0,0,210,211,1,0,0,0,211,17,1,0,0,0,212,210,1,0,0,0,213,218,
	3,16,8,0,214,215,7,3,0,0,215,217,3,16,8,0,216,214,1,0,0,0,217,220,1,0,0,
	0,218,216,1,0,0,0,218,219,1,0,0,0,219,19,1,0,0,0,220,218,1,0,0,0,221,226,
	3,18,9,0,222,223,7,4,0,0,223,225,3,18,9,0,224,222,1,0,0,0,225,228,1,0,0,
	0,226,224,1,0,0,0,226,227,1,0,0,0,227,21,1,0,0,0,228,226,1,0,0,0,229,234,
	3,20,10,0,230,231,7,5,0,0,231,233,3,20,10,0,232,230,1,0,0,0,233,236,1,0,
	0,0,234,232,1,0,0,0,234,235,1,0,0,0,235,23,1,0,0,0,236,234,1,0,0,0,237,
	242,3,22,11,0,238,239,7,6,0,0,239,241,3,22,11,0,240,238,1,0,0,0,241,244,
	1,0,0,0,242,240,1,0,0,0,242,243,1,0,0,0,243,25,1,0,0,0,244,242,1,0,0,0,
	245,250,3,24,12,0,246,247,5,403,0,0,247,249,3,24,12,0,248,246,1,0,0,0,249,
	252,1,0,0,0,250,248,1,0,0,0,250,251,1,0,0,0,251,27,1,0,0,0,252,250,1,0,
	0,0,253,258,3,26,13,0,254,255,5,407,0,0,255,257,3,26,13,0,256,254,1,0,0,
	0,257,260,1,0,0,0,258,256,1,0,0,0,258,259,1,0,0,0,259,29,1,0,0,0,260,258,
	1,0,0,0,261,266,3,28,14,0,262,263,5,404,0,0,263,265,3,28,14,0,264,262,1,
	0,0,0,265,268,1,0,0,0,266,264,1,0,0,0,266,267,1,0,0,0,267,31,1,0,0,0,268,
	266,1,0,0,0,269,274,3,30,15,0,270,271,5,405,0,0,271,273,3,30,15,0,272,270,
	1,0,0,0,273,276,1,0,0,0,274,272,1,0,0,0,274,275,1,0,0,0,275,33,1,0,0,0,
	276,274,1,0,0,0,277,282,3,32,16,0,278,279,5,406,0,0,279,281,3,32,16,0,280,
	278,1,0,0,0,281,284,1,0,0,0,282,280,1,0,0,0,282,283,1,0,0,0,283,35,1,0,
	0,0,284,282,1,0,0,0,285,291,3,34,17,0,286,287,5,409,0,0,287,288,3,42,21,
	0,288,289,5,410,0,0,289,290,3,36,18,0,290,292,1,0,0,0,291,286,1,0,0,0,291,
	292,1,0,0,0,292,37,1,0,0,0,293,299,3,36,18,0,294,295,3,10,5,0,295,296,3,
	40,20,0,296,297,3,38,19,0,297,299,1,0,0,0,298,293,1,0,0,0,298,294,1,0,0,
	0,299,39,1,0,0,0,300,301,7,7,0,0,301,41,1,0,0,0,302,307,3,38,19,0,303,304,
	5,412,0,0,304,306,3,38,19,0,305,303,1,0,0,0,306,309,1,0,0,0,307,305,1,0,
	0,0,307,308,1,0,0,0,308,43,1,0,0,0,309,307,1,0,0,0,310,311,3,36,18,0,311,
	45,1,0,0,0,312,313,3,52,26,0,313,314,3,48,24,0,314,315,5,411,0,0,315,47,
	1,0,0,0,316,321,3,50,25,0,317,318,5,412,0,0,318,320,3,50,25,0,319,317,1,
	0,0,0,320,323,1,0,0,0,321,319,1,0,0,0,321,322,1,0,0,0,322,49,1,0,0,0,323,
	321,1,0,0,0,324,327,3,72,36,0,325,326,5,413,0,0,326,328,3,92,46,0,327,325,
	1,0,0,0,327,328,1,0,0,0,328,51,1,0,0,0,329,331,3,54,27,0,330,329,1,0,0,
	0,331,332,1,0,0,0,332,330,1,0,0,0,332,333,1,0,0,0,333,53,1,0,0,0,334,335,
	3,56,28,0,335,55,1,0,0,0,336,346,5,382,0,0,337,346,5,370,0,0,338,346,5,
	379,0,0,339,346,5,375,0,0,340,346,3,58,29,0,341,346,3,62,31,0,342,346,3,
	64,32,0,343,346,3,66,33,0,344,346,3,68,34,0,345,336,1,0,0,0,345,337,1,0,
	0,0,345,338,1,0,0,0,345,339,1,0,0,0,345,340,1,0,0,0,345,341,1,0,0,0,345,
	342,1,0,0,0,345,343,1,0,0,0,345,344,1,0,0,0,346,57,1,0,0,0,347,425,3,60,
	30,0,348,425,5,1,0,0,349,425,5,2,0,0,350,425,5,3,0,0,351,425,5,4,0,0,352,
	425,5,5,0,0,353,425,5,6,0,0,354,425,5,7,0,0,355,425,5,8,0,0,356,425,5,9,
	0,0,357,425,5,10,0,0,358,425,5,11,0,0,359,425,5,12,0,0,360,425,5,13,0,0,
	361,425,5,14,0,0,362,425,5,15,0,0,363,425,5,16,0,0,364,425,5,17,0,0,365,
	425,5,18,0,0,366,425,5,19,0,0,367,425,5,20,0,0,368,425,5,21,0,0,369,425,
	5,22,0,0,370,425,5,23,0,0,371,425,5,24,0,0,372,425,5,25,0,0,373,425,5,26,
	0,0,374,425,5,27,0,0,375,425,5,28,0,0,376,425,5,29,0,0,377,425,5,30,0,0,
	378,425,5,31,0,0,379,425,5,32,0,0,380,425,5,33,0,0,381,425,5,34,0,0,382,
	425,5,35,0,0,383,425,5,36,0,0,384,425,5,37,0,0,385,425,5,38,0,0,386,425,
	5,39,0,0,387,425,5,40,0,0,388,425,5,41,0,0,389,425,5,42,0,0,390,425,5,43,
	0,0,391,425,5,44,0,0,392,425,5,45,0,0,393,425,5,46,0,0,394,425,5,47,0,0,
	395,425,5,48,0,0,396,425,5,49,0,0,397,425,5,50,0,0,398,425,5,51,0,0,399,
	425,5,52,0,0,400,425,5,53,0,0,401,425,5,54,0,0,402,425,5,55,0,0,403,425,
	5,56,0,0,404,425,5,57,0,0,405,425,5,58,0,0,406,425,5,59,0,0,407,425,5,60,
	0,0,408,425,5,61,0,0,409,425,5,62,0,0,410,425,5,63,0,0,411,425,5,64,0,0,
	412,425,5,65,0,0,413,425,5,66,0,0,414,425,5,67,0,0,415,425,5,68,0,0,416,
	425,5,69,0,0,417,425,5,70,0,0,418,425,5,71,0,0,419,425,5,72,0,0,420,425,
	5,73,0,0,421,425,5,74,0,0,422,425,5,75,0,0,423,425,5,76,0,0,424,347,1,0,
	0,0,424,348,1,0,0,0,424,349,1,0,0,0,424,350,1,0,0,0,424,351,1,0,0,0,424,
	352,1,0,0,0,424,353,1,0,0,0,424,354,1,0,0,0,424,355,1,0,0,0,424,356,1,0,
	0,0,424,357,1,0,0,0,424,358,1,0,0,0,424,359,1,0,0,0,424,360,1,0,0,0,424,
	361,1,0,0,0,424,362,1,0,0,0,424,363,1,0,0,0,424,364,1,0,0,0,424,365,1,0,
	0,0,424,366,1,0,0,0,424,367,1,0,0,0,424,368,1,0,0,0,424,369,1,0,0,0,424,
	370,1,0,0,0,424,371,1,0,0,0,424,372,1,0,0,0,424,373,1,0,0,0,424,374,1,0,
	0,0,424,375,1,0,0,0,424,376,1,0,0,0,424,377,1,0,0,0,424,378,1,0,0,0,424,
	379,1,0,0,0,424,380,1,0,0,0,424,381,1,0,0,0,424,382,1,0,0,0,424,383,1,0,
	0,0,424,384,1,0,0,0,424,385,1,0,0,0,424,386,1,0,0,0,424,387,1,0,0,0,424,
	388,1,0,0,0,424,389,1,0,0,0,424,390,1,0,0,0,424,391,1,0,0,0,424,392,1,0,
	0,0,424,393,1,0,0,0,424,394,1,0,0,0,424,395,1,0,0,0,424,396,1,0,0,0,424,
	397,1,0,0,0,424,398,1,0,0,0,424,399,1,0,0,0,424,400,1,0,0,0,424,401,1,0,
	0,0,424,402,1,0,0,0,424,403,1,0,0,0,424,404,1,0,0,0,424,405,1,0,0,0,424,
	406,1,0,0,0,424,407,1,0,0,0,424,408,1,0,0,0,424,409,1,0,0,0,424,410,1,0,
	0,0,424,411,1,0,0,0,424,412,1,0,0,0,424,413,1,0,0,0,424,414,1,0,0,0,424,
	415,1,0,0,0,424,416,1,0,0,0,424,417,1,0,0,0,424,418,1,0,0,0,424,419,1,0,
	0,0,424,420,1,0,0,0,424,421,1,0,0,0,424,422,1,0,0,0,424,423,1,0,0,0,425,
	59,1,0,0,0,426,427,7,8,0,0,427,61,1,0,0,0,428,429,7,9,0,0,429,63,1,0,0,
	0,430,431,7,10,0,0,431,65,1,0,0,0,432,433,7,11,0,0,433,67,1,0,0,0,434,435,
	7,12,0,0,435,69,1,0,0,0,436,438,3,56,28,0,437,439,3,70,35,0,438,437,1,0,
	0,0,438,439,1,0,0,0,439,71,1,0,0,0,440,441,3,74,37,0,441,73,1,0,0,0,442,
	443,6,37,-1,0,443,444,5,428,0,0,444,464,1,0,0,0,445,446,10,3,0,0,446,448,
	5,386,0,0,447,449,3,44,22,0,448,447,1,0,0,0,448,449,1,0,0,0,449,450,1,0,
	0,0,450,463,5,387,0,0,451,452,10,2,0,0,452,453,5,384,0,0,453,454,3,78,39,
	0,454,455,5,385,0,0,455,463,1,0,0,0,456,457,10,1,0,0,457,459,5,384,0,0,
	458,460,3,84,42,0,459,458,1,0,0,0,459,460,1,0,0,0,460,461,1,0,0,0,461,463,
	5,385,0,0,462,445,1,0,0,0,462,451,1,0,0,0,462,456,1,0,0,0,463,466,1,0,0,
	0,464,462,1,0,0,0,464,465,1,0,0,0,465,75,1,0,0,0,466,464,1,0,0,0,467,473,
	8,13,0,0,468,469,5,384,0,0,469,470,3,76,38,0,470,471,5,385,0,0,471,473,
	1,0,0,0,472,467,1,0,0,0,472,468,1,0,0,0,473,476,1,0,0,0,474,472,1,0,0,0,
	474,475,1,0,0,0,475,77,1,0,0,0,476,474,1,0,0,0,477,480,3,80,40,0,478,479,
	5,412,0,0,479,481,5,363,0,0,480,478,1,0,0,0,480,481,1,0,0,0,481,79,1,0,
	0,0,482,487,3,82,41,0,483,484,5,412,0,0,484,486,3,82,41,0,485,483,1,0,0,
	0,486,489,1,0,0,0,487,485,1,0,0,0,487,488,1,0,0,0,488,81,1,0,0,0,489,487,
	1,0,0,0,490,492,3,52,26,0,491,493,5,428,0,0,492,491,1,0,0,0,492,493,1,0,
	0,0,493,510,1,0,0,0,494,495,3,52,26,0,495,496,5,403,0,0,496,497,5,428,0,
	0,497,510,1,0,0,0,498,499,3,52,26,0,499,500,5,428,0,0,500,501,5,386,0,0,
	501,502,5,387,0,0,502,510,1,0,0,0,503,504,3,52,26,0,504,505,5,403,0,0,505,
	506,5,428,0,0,506,507,5,386,0,0,507,508,5,387,0,0,508,510,1,0,0,0,509,490,
	1,0,0,0,509,494,1,0,0,0,509,498,1,0,0,0,509,503,1,0,0,0,510,83,1,0,0,0,
	511,516,5,428,0,0,512,513,5,412,0,0,513,515,5,428,0,0,514,512,1,0,0,0,515,
	518,1,0,0,0,516,514,1,0,0,0,516,517,1,0,0,0,517,85,1,0,0,0,518,516,1,0,
	0,0,519,520,3,70,35,0,520,87,1,0,0,0,521,522,6,44,-1,0,522,523,5,386,0,
	0,523,524,5,400,0,0,524,525,5,387,0,0,525,538,1,0,0,0,526,527,10,2,0,0,
	527,529,5,386,0,0,528,530,3,38,19,0,529,528,1,0,0,0,529,530,1,0,0,0,530,
	531,1,0,0,0,531,537,5,387,0,0,532,533,10,1,0,0,533,534,5,386,0,0,534,535,
	5,400,0,0,535,537,5,387,0,0,536,526,1,0,0,0,536,532,1,0,0,0,537,540,1,0,
	0,0,538,536,1,0,0,0,538,539,1,0,0,0,539,89,1,0,0,0,540,538,1,0,0,0,541,
	542,5,428,0,0,542,91,1,0,0,0,543,552,3,38,19,0,544,545,5,388,0,0,545,547,
	3,94,47,0,546,548,5,412,0,0,547,546,1,0,0,0,547,548,1,0,0,0,548,549,1,0,
	0,0,549,550,5,389,0,0,550,552,1,0,0,0,551,543,1,0,0,0,551,544,1,0,0,0,552,
	93,1,0,0,0,553,555,3,96,48,0,554,553,1,0,0,0,554,555,1,0,0,0,555,556,1,
	0,0,0,556,564,3,92,46,0,557,559,5,412,0,0,558,560,3,96,48,0,559,558,1,0,
	0,0,559,560,1,0,0,0,560,561,1,0,0,0,561,563,3,92,46,0,562,557,1,0,0,0,563,
	566,1,0,0,0,564,562,1,0,0,0,564,565,1,0,0,0,565,95,1,0,0,0,566,564,1,0,
	0,0,567,568,3,98,49,0,568,569,5,413,0,0,569,97,1,0,0,0,570,572,3,100,50,
	0,571,570,1,0,0,0,572,573,1,0,0,0,573,571,1,0,0,0,573,574,1,0,0,0,574,99,
	1,0,0,0,575,576,5,386,0,0,576,577,3,44,22,0,577,578,5,387,0,0,578,582,1,
	0,0,0,579,580,5,426,0,0,580,582,5,428,0,0,581,575,1,0,0,0,581,579,1,0,0,
	0,582,101,1,0,0,0,583,621,3,104,52,0,584,621,3,106,53,0,585,621,3,112,56,
	0,586,621,3,114,57,0,587,621,3,116,58,0,588,621,3,124,62,0,589,590,7,14,
	0,0,590,591,7,15,0,0,591,600,5,384,0,0,592,597,3,34,17,0,593,594,5,412,
	0,0,594,596,3,34,17,0,595,593,1,0,0,0,596,599,1,0,0,0,597,595,1,0,0,0,597,
	598,1,0,0,0,598,601,1,0,0,0,599,597,1,0,0,0,600,592,1,0,0,0,600,601,1,0,
	0,0,601,615,1,0,0,0,602,611,5,410,0,0,603,608,3,34,17,0,604,605,5,412,0,
	0,605,607,3,34,17,0,606,604,1,0,0,0,607,610,1,0,0,0,608,606,1,0,0,0,608,
	609,1,0,0,0,609,612,1,0,0,0,610,608,1,0,0,0,611,603,1,0,0,0,611,612,1,0,
	0,0,612,614,1,0,0,0,613,602,1,0,0,0,614,617,1,0,0,0,615,613,1,0,0,0,615,
	616,1,0,0,0,616,618,1,0,0,0,617,615,1,0,0,0,618,619,5,385,0,0,619,621,5,
	411,0,0,620,583,1,0,0,0,620,584,1,0,0,0,620,585,1,0,0,0,620,586,1,0,0,0,
	620,587,1,0,0,0,620,588,1,0,0,0,620,589,1,0,0,0,621,103,1,0,0,0,622,623,
	5,428,0,0,623,624,5,410,0,0,624,634,3,102,51,0,625,626,5,369,0,0,626,627,
	3,44,22,0,627,628,5,410,0,0,628,629,3,102,51,0,629,634,1,0,0,0,630,631,
	5,372,0,0,631,632,5,410,0,0,632,634,3,106,53,0,633,622,1,0,0,0,633,625,
	1,0,0,0,633,630,1,0,0,0,634,105,1,0,0,0,635,637,5,388,0,0,636,638,3,108,
	54,0,637,636,1,0,0,0,637,638,1,0,0,0,638,639,1,0,0,0,639,640,5,389,0,0,
	640,107,1,0,0,0,641,643,3,110,55,0,642,641,1,0,0,0,643,644,1,0,0,0,644,
	642,1,0,0,0,644,645,1,0,0,0,645,109,1,0,0,0,646,649,3,102,51,0,647,649,
	3,46,23,0,648,646,1,0,0,0,648,647,1,0,0,0,649,111,1,0,0,0,650,652,3,42,
	21,0,651,650,1,0,0,0,651,652,1,0,0,0,652,653,1,0,0,0,653,654,5,411,0,0,
	654,113,1,0,0,0,655,656,5,378,0,0,656,657,5,384,0,0,657,658,3,42,21,0,658,
	659,5,385,0,0,659,662,3,102,51,0,660,661,5,374,0,0,661,663,3,102,51,0,662,
	660,1,0,0,0,662,663,1,0,0,0,663,671,1,0,0,0,664,665,5,381,0,0,665,666,5,
	384,0,0,666,667,3,42,21,0,667,668,5,385,0,0,668,669,3,102,51,0,669,671,
	1,0,0,0,670,655,1,0,0,0,670,664,1,0,0,0,671,115,1,0,0,0,672,673,5,383,0,
	0,673,674,5,384,0,0,674,675,3,42,21,0,675,676,5,385,0,0,676,677,3,102,51,
	0,677,693,1,0,0,0,678,679,5,373,0,0,679,680,3,102,51,0,680,681,5,383,0,
	0,681,682,5,384,0,0,682,683,3,42,21,0,683,684,5,385,0,0,684,685,5,411,0,
	0,685,693,1,0,0,0,686,687,5,376,0,0,687,688,5,384,0,0,688,689,3,118,59,
	0,689,690,5,385,0,0,690,691,3,102,51,0,691,693,1,0,0,0,692,672,1,0,0,0,
	692,678,1,0,0,0,692,686,1,0,0,0,693,117,1,0,0,0,694,699,3,120,60,0,695,
	697,3,42,21,0,696,695,1,0,0,0,696,697,1,0,0,0,697,699,1,0,0,0,698,694,1,
	0,0,0,698,696,1,0,0,0,699,700,1,0,0,0,700,702,5,411,0,0,701,703,3,122,61,
	0,702,701,1,0,0,0,702,703,1,0,0,0,703,704,1,0,0,0,704,706,5,411,0,0,705,
	707,3,122,61,0,706,705,1,0,0,0,706,707,1,0,0,0,707,119,1,0,0,0,708,709,
	3,52,26,0,709,710,3,48,24,0,710,121,1,0,0,0,711,716,3,38,19,0,712,713,5,
	412,0,0,713,715,3,38,19,0,714,712,1,0,0,0,715,718,1,0,0,0,716,714,1,0,0,
	0,716,717,1,0,0,0,717,123,1,0,0,0,718,716,1,0,0,0,719,720,5,377,0,0,720,
	730,5,428,0,0,721,730,5,371,0,0,722,730,5,368,0,0,723,725,5,380,0,0,724,
	726,3,42,21,0,725,724,1,0,0,0,725,726,1,0,0,0,726,730,1,0,0,0,727,728,5,
	377,0,0,728,730,3,10,5,0,729,719,1,0,0,0,729,721,1,0,0,0,729,722,1,0,0,
	0,729,723,1,0,0,0,729,727,1,0,0,0,730,731,1,0,0,0,731,732,5,411,0,0,732,
	125,1,0,0,0,733,735,3,128,64,0,734,733,1,0,0,0,734,735,1,0,0,0,735,736,
	1,0,0,0,736,737,5,0,0,1,737,127,1,0,0,0,738,740,3,130,65,0,739,738,1,0,
	0,0,740,741,1,0,0,0,741,739,1,0,0,0,741,742,1,0,0,0,742,129,1,0,0,0,743,
	747,3,132,66,0,744,747,3,46,23,0,745,747,5,411,0,0,746,743,1,0,0,0,746,
	744,1,0,0,0,746,745,1,0,0,0,747,131,1,0,0,0,748,750,3,52,26,0,749,748,1,
	0,0,0,749,750,1,0,0,0,750,751,1,0,0,0,751,753,3,72,36,0,752,754,3,134,67,
	0,753,752,1,0,0,0,753,754,1,0,0,0,754,755,1,0,0,0,755,756,3,106,53,0,756,
	133,1,0,0,0,757,759,3,46,23,0,758,757,1,0,0,0,759,760,1,0,0,0,760,758,1,
	0,0,0,760,761,1,0,0,0,761,135,1,0,0,0,77,141,147,154,159,171,176,178,186,
	192,199,210,218,226,234,242,250,258,266,274,282,291,298,307,321,327,332,
	345,424,438,448,459,462,464,472,474,480,487,492,509,516,529,536,538,547,
	551,554,559,564,573,581,597,600,608,611,615,620,633,637,644,648,651,662,
	670,692,696,698,702,706,716,725,729,734,741,746,749,753,760];

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
	public builtInWidgetTypeSpecifier(): BuiltInWidgetTypeSpecifierContext {
		return this.getTypedRuleContext(BuiltInWidgetTypeSpecifierContext, 0) as BuiltInWidgetTypeSpecifierContext;
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


export class BuiltInWidgetTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: proglang12dParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return proglang12dParser.RULE_builtInWidgetTypeSpecifier;
	}
	public enterRule(listener: proglang12dListener): void {
	    if(listener.enterBuiltInWidgetTypeSpecifier) {
	 		listener.enterBuiltInWidgetTypeSpecifier(this);
		}
	}
	public exitRule(listener: proglang12dListener): void {
	    if(listener.exitBuiltInWidgetTypeSpecifier) {
	 		listener.exitBuiltInWidgetTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: proglang12dVisitor<Result>): Result {
		if (visitor.visitBuiltInWidgetTypeSpecifier) {
			return visitor.visitBuiltInWidgetTypeSpecifier(this);
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
