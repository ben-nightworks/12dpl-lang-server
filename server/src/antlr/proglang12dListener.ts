// Generated from proglang12d.g4 by ANTLR 4.13.0

import {ParseTreeListener} from "antlr4";


import { PrimaryExpressionContext } from "./proglang12dParser";
import { GenericAssocListContext } from "./proglang12dParser";
import { GenericAssociationContext } from "./proglang12dParser";
import { PostfixExpressionContext } from "./proglang12dParser";
import { ArgumentExpressionListContext } from "./proglang12dParser";
import { UnaryExpressionContext } from "./proglang12dParser";
import { UnaryOperatorContext } from "./proglang12dParser";
import { CastExpressionContext } from "./proglang12dParser";
import { MultiplicativeExpressionContext } from "./proglang12dParser";
import { AdditiveExpressionContext } from "./proglang12dParser";
import { ShiftExpressionContext } from "./proglang12dParser";
import { RelationalExpressionContext } from "./proglang12dParser";
import { EqualityExpressionContext } from "./proglang12dParser";
import { AndExpressionContext } from "./proglang12dParser";
import { ExclusiveOrExpressionContext } from "./proglang12dParser";
import { InclusiveOrExpressionContext } from "./proglang12dParser";
import { LogicalAndExpressionContext } from "./proglang12dParser";
import { LogicalOrExpressionContext } from "./proglang12dParser";
import { ConditionalExpressionContext } from "./proglang12dParser";
import { AssignmentExpressionContext } from "./proglang12dParser";
import { AssignmentOperatorContext } from "./proglang12dParser";
import { ExpressionContext } from "./proglang12dParser";
import { ConstantExpressionContext } from "./proglang12dParser";
import { DeclarationContext } from "./proglang12dParser";
import { DeclarationSpecifiersContext } from "./proglang12dParser";
import { DeclarationSpecifiers2Context } from "./proglang12dParser";
import { DeclarationSpecifierContext } from "./proglang12dParser";
import { TypeSpecifierContext } from "./proglang12dParser";
import { BuiltInTypeSpecifierContext } from "./proglang12dParser";
import { SpecifierQualifierListContext } from "./proglang12dParser";
import { DeclaratorContext } from "./proglang12dParser";
import { DirectDeclaratorContext } from "./proglang12dParser";
import { NestedParenthesesBlockContext } from "./proglang12dParser";
import { ParameterTypeListContext } from "./proglang12dParser";
import { ParameterListContext } from "./proglang12dParser";
import { ParameterDeclarationContext } from "./proglang12dParser";
import { IdentifierListContext } from "./proglang12dParser";
import { TypeNameContext } from "./proglang12dParser";
import { DirectAbstractDeclaratorContext } from "./proglang12dParser";
import { TypedefNameContext } from "./proglang12dParser";
import { InitializerContext } from "./proglang12dParser";
import { InitializerListContext } from "./proglang12dParser";
import { DesignationContext } from "./proglang12dParser";
import { DesignatorListContext } from "./proglang12dParser";
import { DesignatorContext } from "./proglang12dParser";
import { StatementContext } from "./proglang12dParser";
import { LabeledStatementContext } from "./proglang12dParser";
import { CompoundStatementContext } from "./proglang12dParser";
import { BlockItemListContext } from "./proglang12dParser";
import { BlockItemContext } from "./proglang12dParser";
import { ExpressionStatementContext } from "./proglang12dParser";
import { SelectionStatementContext } from "./proglang12dParser";
import { IterationStatementContext } from "./proglang12dParser";
import { ForConditionContext } from "./proglang12dParser";
import { ForDeclarationContext } from "./proglang12dParser";
import { ForExpressionContext } from "./proglang12dParser";
import { JumpStatementContext } from "./proglang12dParser";
import { CompilationUnitContext } from "./proglang12dParser";
import { TranslationUnitContext } from "./proglang12dParser";
import { ExternalDeclarationContext } from "./proglang12dParser";
import { FunctionDefinitionContext } from "./proglang12dParser";
import { DeclarationListContext } from "./proglang12dParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `proglang12dParser`.
 */
export default class proglang12dListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `proglang12dParser.primaryExpression`.
	 * @param ctx the parse tree
	 */
	enterPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.primaryExpression`.
	 * @param ctx the parse tree
	 */
	exitPrimaryExpression?: (ctx: PrimaryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.genericAssocList`.
	 * @param ctx the parse tree
	 */
	enterGenericAssocList?: (ctx: GenericAssocListContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.genericAssocList`.
	 * @param ctx the parse tree
	 */
	exitGenericAssocList?: (ctx: GenericAssocListContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.genericAssociation`.
	 * @param ctx the parse tree
	 */
	enterGenericAssociation?: (ctx: GenericAssociationContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.genericAssociation`.
	 * @param ctx the parse tree
	 */
	exitGenericAssociation?: (ctx: GenericAssociationContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.postfixExpression`.
	 * @param ctx the parse tree
	 */
	enterPostfixExpression?: (ctx: PostfixExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.postfixExpression`.
	 * @param ctx the parse tree
	 */
	exitPostfixExpression?: (ctx: PostfixExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.argumentExpressionList`.
	 * @param ctx the parse tree
	 */
	enterArgumentExpressionList?: (ctx: ArgumentExpressionListContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.argumentExpressionList`.
	 * @param ctx the parse tree
	 */
	exitArgumentExpressionList?: (ctx: ArgumentExpressionListContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.unaryExpression`.
	 * @param ctx the parse tree
	 */
	enterUnaryExpression?: (ctx: UnaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.unaryExpression`.
	 * @param ctx the parse tree
	 */
	exitUnaryExpression?: (ctx: UnaryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.unaryOperator`.
	 * @param ctx the parse tree
	 */
	enterUnaryOperator?: (ctx: UnaryOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.unaryOperator`.
	 * @param ctx the parse tree
	 */
	exitUnaryOperator?: (ctx: UnaryOperatorContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.castExpression`.
	 * @param ctx the parse tree
	 */
	enterCastExpression?: (ctx: CastExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.castExpression`.
	 * @param ctx the parse tree
	 */
	exitCastExpression?: (ctx: CastExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.multiplicativeExpression`.
	 * @param ctx the parse tree
	 */
	enterMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.multiplicativeExpression`.
	 * @param ctx the parse tree
	 */
	exitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.additiveExpression`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.additiveExpression`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.shiftExpression`.
	 * @param ctx the parse tree
	 */
	enterShiftExpression?: (ctx: ShiftExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.shiftExpression`.
	 * @param ctx the parse tree
	 */
	exitShiftExpression?: (ctx: ShiftExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.relationalExpression`.
	 * @param ctx the parse tree
	 */
	enterRelationalExpression?: (ctx: RelationalExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.relationalExpression`.
	 * @param ctx the parse tree
	 */
	exitRelationalExpression?: (ctx: RelationalExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.equalityExpression`.
	 * @param ctx the parse tree
	 */
	enterEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.equalityExpression`.
	 * @param ctx the parse tree
	 */
	exitEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.andExpression`.
	 * @param ctx the parse tree
	 */
	enterAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.andExpression`.
	 * @param ctx the parse tree
	 */
	exitAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.exclusiveOrExpression`.
	 * @param ctx the parse tree
	 */
	enterExclusiveOrExpression?: (ctx: ExclusiveOrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.exclusiveOrExpression`.
	 * @param ctx the parse tree
	 */
	exitExclusiveOrExpression?: (ctx: ExclusiveOrExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.inclusiveOrExpression`.
	 * @param ctx the parse tree
	 */
	enterInclusiveOrExpression?: (ctx: InclusiveOrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.inclusiveOrExpression`.
	 * @param ctx the parse tree
	 */
	exitInclusiveOrExpression?: (ctx: InclusiveOrExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.logicalAndExpression`.
	 * @param ctx the parse tree
	 */
	enterLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.logicalAndExpression`.
	 * @param ctx the parse tree
	 */
	exitLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.logicalOrExpression`.
	 * @param ctx the parse tree
	 */
	enterLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.logicalOrExpression`.
	 * @param ctx the parse tree
	 */
	exitLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.conditionalExpression`.
	 * @param ctx the parse tree
	 */
	enterConditionalExpression?: (ctx: ConditionalExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.conditionalExpression`.
	 * @param ctx the parse tree
	 */
	exitConditionalExpression?: (ctx: ConditionalExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.assignmentExpression`.
	 * @param ctx the parse tree
	 */
	enterAssignmentExpression?: (ctx: AssignmentExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.assignmentExpression`.
	 * @param ctx the parse tree
	 */
	exitAssignmentExpression?: (ctx: AssignmentExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.assignmentOperator`.
	 * @param ctx the parse tree
	 */
	enterAssignmentOperator?: (ctx: AssignmentOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.assignmentOperator`.
	 * @param ctx the parse tree
	 */
	exitAssignmentOperator?: (ctx: AssignmentOperatorContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.constantExpression`.
	 * @param ctx the parse tree
	 */
	enterConstantExpression?: (ctx: ConstantExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.constantExpression`.
	 * @param ctx the parse tree
	 */
	exitConstantExpression?: (ctx: ConstantExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.declaration`.
	 * @param ctx the parse tree
	 */
	enterDeclaration?: (ctx: DeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.declaration`.
	 * @param ctx the parse tree
	 */
	exitDeclaration?: (ctx: DeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.declarationSpecifiers`.
	 * @param ctx the parse tree
	 */
	enterDeclarationSpecifiers?: (ctx: DeclarationSpecifiersContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.declarationSpecifiers`.
	 * @param ctx the parse tree
	 */
	exitDeclarationSpecifiers?: (ctx: DeclarationSpecifiersContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.declarationSpecifiers2`.
	 * @param ctx the parse tree
	 */
	enterDeclarationSpecifiers2?: (ctx: DeclarationSpecifiers2Context) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.declarationSpecifiers2`.
	 * @param ctx the parse tree
	 */
	exitDeclarationSpecifiers2?: (ctx: DeclarationSpecifiers2Context) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.declarationSpecifier`.
	 * @param ctx the parse tree
	 */
	enterDeclarationSpecifier?: (ctx: DeclarationSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.declarationSpecifier`.
	 * @param ctx the parse tree
	 */
	exitDeclarationSpecifier?: (ctx: DeclarationSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.typeSpecifier`.
	 * @param ctx the parse tree
	 */
	enterTypeSpecifier?: (ctx: TypeSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.typeSpecifier`.
	 * @param ctx the parse tree
	 */
	exitTypeSpecifier?: (ctx: TypeSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.builtInTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	enterBuiltInTypeSpecifier?: (ctx: BuiltInTypeSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.builtInTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	exitBuiltInTypeSpecifier?: (ctx: BuiltInTypeSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.specifierQualifierList`.
	 * @param ctx the parse tree
	 */
	enterSpecifierQualifierList?: (ctx: SpecifierQualifierListContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.specifierQualifierList`.
	 * @param ctx the parse tree
	 */
	exitSpecifierQualifierList?: (ctx: SpecifierQualifierListContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.declarator`.
	 * @param ctx the parse tree
	 */
	enterDeclarator?: (ctx: DeclaratorContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.declarator`.
	 * @param ctx the parse tree
	 */
	exitDeclarator?: (ctx: DeclaratorContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.directDeclarator`.
	 * @param ctx the parse tree
	 */
	enterDirectDeclarator?: (ctx: DirectDeclaratorContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.directDeclarator`.
	 * @param ctx the parse tree
	 */
	exitDirectDeclarator?: (ctx: DirectDeclaratorContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.nestedParenthesesBlock`.
	 * @param ctx the parse tree
	 */
	enterNestedParenthesesBlock?: (ctx: NestedParenthesesBlockContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.nestedParenthesesBlock`.
	 * @param ctx the parse tree
	 */
	exitNestedParenthesesBlock?: (ctx: NestedParenthesesBlockContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.parameterTypeList`.
	 * @param ctx the parse tree
	 */
	enterParameterTypeList?: (ctx: ParameterTypeListContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.parameterTypeList`.
	 * @param ctx the parse tree
	 */
	exitParameterTypeList?: (ctx: ParameterTypeListContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.parameterList`.
	 * @param ctx the parse tree
	 */
	enterParameterList?: (ctx: ParameterListContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.parameterList`.
	 * @param ctx the parse tree
	 */
	exitParameterList?: (ctx: ParameterListContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.parameterDeclaration`.
	 * @param ctx the parse tree
	 */
	enterParameterDeclaration?: (ctx: ParameterDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.parameterDeclaration`.
	 * @param ctx the parse tree
	 */
	exitParameterDeclaration?: (ctx: ParameterDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.identifierList`.
	 * @param ctx the parse tree
	 */
	enterIdentifierList?: (ctx: IdentifierListContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.identifierList`.
	 * @param ctx the parse tree
	 */
	exitIdentifierList?: (ctx: IdentifierListContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.typeName`.
	 * @param ctx the parse tree
	 */
	enterTypeName?: (ctx: TypeNameContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.typeName`.
	 * @param ctx the parse tree
	 */
	exitTypeName?: (ctx: TypeNameContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.directAbstractDeclarator`.
	 * @param ctx the parse tree
	 */
	enterDirectAbstractDeclarator?: (ctx: DirectAbstractDeclaratorContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.directAbstractDeclarator`.
	 * @param ctx the parse tree
	 */
	exitDirectAbstractDeclarator?: (ctx: DirectAbstractDeclaratorContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.typedefName`.
	 * @param ctx the parse tree
	 */
	enterTypedefName?: (ctx: TypedefNameContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.typedefName`.
	 * @param ctx the parse tree
	 */
	exitTypedefName?: (ctx: TypedefNameContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.initializer`.
	 * @param ctx the parse tree
	 */
	enterInitializer?: (ctx: InitializerContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.initializer`.
	 * @param ctx the parse tree
	 */
	exitInitializer?: (ctx: InitializerContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.initializerList`.
	 * @param ctx the parse tree
	 */
	enterInitializerList?: (ctx: InitializerListContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.initializerList`.
	 * @param ctx the parse tree
	 */
	exitInitializerList?: (ctx: InitializerListContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.designation`.
	 * @param ctx the parse tree
	 */
	enterDesignation?: (ctx: DesignationContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.designation`.
	 * @param ctx the parse tree
	 */
	exitDesignation?: (ctx: DesignationContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.designatorList`.
	 * @param ctx the parse tree
	 */
	enterDesignatorList?: (ctx: DesignatorListContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.designatorList`.
	 * @param ctx the parse tree
	 */
	exitDesignatorList?: (ctx: DesignatorListContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.designator`.
	 * @param ctx the parse tree
	 */
	enterDesignator?: (ctx: DesignatorContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.designator`.
	 * @param ctx the parse tree
	 */
	exitDesignator?: (ctx: DesignatorContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.labeledStatement`.
	 * @param ctx the parse tree
	 */
	enterLabeledStatement?: (ctx: LabeledStatementContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.labeledStatement`.
	 * @param ctx the parse tree
	 */
	exitLabeledStatement?: (ctx: LabeledStatementContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.compoundStatement`.
	 * @param ctx the parse tree
	 */
	enterCompoundStatement?: (ctx: CompoundStatementContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.compoundStatement`.
	 * @param ctx the parse tree
	 */
	exitCompoundStatement?: (ctx: CompoundStatementContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.blockItemList`.
	 * @param ctx the parse tree
	 */
	enterBlockItemList?: (ctx: BlockItemListContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.blockItemList`.
	 * @param ctx the parse tree
	 */
	exitBlockItemList?: (ctx: BlockItemListContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.blockItem`.
	 * @param ctx the parse tree
	 */
	enterBlockItem?: (ctx: BlockItemContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.blockItem`.
	 * @param ctx the parse tree
	 */
	exitBlockItem?: (ctx: BlockItemContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.expressionStatement`.
	 * @param ctx the parse tree
	 */
	enterExpressionStatement?: (ctx: ExpressionStatementContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.expressionStatement`.
	 * @param ctx the parse tree
	 */
	exitExpressionStatement?: (ctx: ExpressionStatementContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.selectionStatement`.
	 * @param ctx the parse tree
	 */
	enterSelectionStatement?: (ctx: SelectionStatementContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.selectionStatement`.
	 * @param ctx the parse tree
	 */
	exitSelectionStatement?: (ctx: SelectionStatementContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.iterationStatement`.
	 * @param ctx the parse tree
	 */
	enterIterationStatement?: (ctx: IterationStatementContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.iterationStatement`.
	 * @param ctx the parse tree
	 */
	exitIterationStatement?: (ctx: IterationStatementContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.forCondition`.
	 * @param ctx the parse tree
	 */
	enterForCondition?: (ctx: ForConditionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.forCondition`.
	 * @param ctx the parse tree
	 */
	exitForCondition?: (ctx: ForConditionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.forDeclaration`.
	 * @param ctx the parse tree
	 */
	enterForDeclaration?: (ctx: ForDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.forDeclaration`.
	 * @param ctx the parse tree
	 */
	exitForDeclaration?: (ctx: ForDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.forExpression`.
	 * @param ctx the parse tree
	 */
	enterForExpression?: (ctx: ForExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.forExpression`.
	 * @param ctx the parse tree
	 */
	exitForExpression?: (ctx: ForExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.jumpStatement`.
	 * @param ctx the parse tree
	 */
	enterJumpStatement?: (ctx: JumpStatementContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.jumpStatement`.
	 * @param ctx the parse tree
	 */
	exitJumpStatement?: (ctx: JumpStatementContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.compilationUnit`.
	 * @param ctx the parse tree
	 */
	enterCompilationUnit?: (ctx: CompilationUnitContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.compilationUnit`.
	 * @param ctx the parse tree
	 */
	exitCompilationUnit?: (ctx: CompilationUnitContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.translationUnit`.
	 * @param ctx the parse tree
	 */
	enterTranslationUnit?: (ctx: TranslationUnitContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.translationUnit`.
	 * @param ctx the parse tree
	 */
	exitTranslationUnit?: (ctx: TranslationUnitContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.externalDeclaration`.
	 * @param ctx the parse tree
	 */
	enterExternalDeclaration?: (ctx: ExternalDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.externalDeclaration`.
	 * @param ctx the parse tree
	 */
	exitExternalDeclaration?: (ctx: ExternalDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.functionDefinition`.
	 * @param ctx the parse tree
	 */
	enterFunctionDefinition?: (ctx: FunctionDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.functionDefinition`.
	 * @param ctx the parse tree
	 */
	exitFunctionDefinition?: (ctx: FunctionDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `proglang12dParser.declarationList`.
	 * @param ctx the parse tree
	 */
	enterDeclarationList?: (ctx: DeclarationListContext) => void;
	/**
	 * Exit a parse tree produced by `proglang12dParser.declarationList`.
	 * @param ctx the parse tree
	 */
	exitDeclarationList?: (ctx: DeclarationListContext) => void;
}

