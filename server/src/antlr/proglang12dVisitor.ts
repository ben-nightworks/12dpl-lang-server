// Generated from server/src/proglang12d.g4 by ANTLR 4.13.1

import {ParseTreeVisitor} from 'antlr4';


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
import { InitDeclaratorListContext } from "./proglang12dParser";
import { InitDeclaratorContext } from "./proglang12dParser";
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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `proglang12dParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class proglang12dVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `proglang12dParser.primaryExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrimaryExpression?: (ctx: PrimaryExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.genericAssocList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenericAssocList?: (ctx: GenericAssocListContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.genericAssociation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGenericAssociation?: (ctx: GenericAssociationContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.postfixExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPostfixExpression?: (ctx: PostfixExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.argumentExpressionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgumentExpressionList?: (ctx: ArgumentExpressionListContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.unaryExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryExpression?: (ctx: UnaryExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.unaryOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryOperator?: (ctx: UnaryOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.castExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCastExpression?: (ctx: CastExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.multiplicativeExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.additiveExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpression?: (ctx: AdditiveExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.shiftExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShiftExpression?: (ctx: ShiftExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.relationalExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelationalExpression?: (ctx: RelationalExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.equalityExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualityExpression?: (ctx: EqualityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.andExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpression?: (ctx: AndExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.exclusiveOrExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExclusiveOrExpression?: (ctx: ExclusiveOrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.inclusiveOrExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInclusiveOrExpression?: (ctx: InclusiveOrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.logicalAndExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalAndExpression?: (ctx: LogicalAndExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.logicalOrExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalOrExpression?: (ctx: LogicalOrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.conditionalExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditionalExpression?: (ctx: ConditionalExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.assignmentExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentExpression?: (ctx: AssignmentExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.assignmentOperator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentOperator?: (ctx: AssignmentOperatorContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.constantExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstantExpression?: (ctx: ConstantExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.declaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclaration?: (ctx: DeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.initDeclaratorList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInitDeclaratorList?: (ctx: InitDeclaratorListContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.initDeclarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInitDeclarator?: (ctx: InitDeclaratorContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.declarationSpecifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarationSpecifiers?: (ctx: DeclarationSpecifiersContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.declarationSpecifiers2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarationSpecifiers2?: (ctx: DeclarationSpecifiers2Context) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.declarationSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarationSpecifier?: (ctx: DeclarationSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.typeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeSpecifier?: (ctx: TypeSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.builtInTypeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBuiltInTypeSpecifier?: (ctx: BuiltInTypeSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.specifierQualifierList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecifierQualifierList?: (ctx: SpecifierQualifierListContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.declarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarator?: (ctx: DeclaratorContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.directDeclarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirectDeclarator?: (ctx: DirectDeclaratorContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.nestedParenthesesBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNestedParenthesesBlock?: (ctx: NestedParenthesesBlockContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.parameterTypeList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameterTypeList?: (ctx: ParameterTypeListContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.parameterList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameterList?: (ctx: ParameterListContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.parameterDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameterDeclaration?: (ctx: ParameterDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.identifierList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierList?: (ctx: IdentifierListContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.typeName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeName?: (ctx: TypeNameContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.directAbstractDeclarator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirectAbstractDeclarator?: (ctx: DirectAbstractDeclaratorContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.typedefName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypedefName?: (ctx: TypedefNameContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.initializer`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInitializer?: (ctx: InitializerContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.initializerList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInitializerList?: (ctx: InitializerListContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.designation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDesignation?: (ctx: DesignationContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.designatorList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDesignatorList?: (ctx: DesignatorListContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.designator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDesignator?: (ctx: DesignatorContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.labeledStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLabeledStatement?: (ctx: LabeledStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.compoundStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompoundStatement?: (ctx: CompoundStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.blockItemList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlockItemList?: (ctx: BlockItemListContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.blockItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlockItem?: (ctx: BlockItemContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.expressionStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionStatement?: (ctx: ExpressionStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.selectionStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSelectionStatement?: (ctx: SelectionStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.iterationStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIterationStatement?: (ctx: IterationStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.forCondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForCondition?: (ctx: ForConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.forDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForDeclaration?: (ctx: ForDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.forExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForExpression?: (ctx: ForExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.jumpStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJumpStatement?: (ctx: JumpStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.compilationUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCompilationUnit?: (ctx: CompilationUnitContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.translationUnit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTranslationUnit?: (ctx: TranslationUnitContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.externalDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternalDeclaration?: (ctx: ExternalDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.functionDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionDefinition?: (ctx: FunctionDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `proglang12dParser.declarationList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclarationList?: (ctx: DeclarationListContext) => Result;
}

