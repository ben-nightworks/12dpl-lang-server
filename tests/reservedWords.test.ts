import { describe, expect, test } from "bun:test";
import { getAllReservedWords, getReservedWordCategory, isContainerType, isReservedWord } from "../server/src/reservedWords.ts";

describe("reservedWords", () => {
	test("recognizes reserved types and control flow", () => {
		expect(isReservedWord("Integer")).toBe(true);
		expect(getReservedWordCategory("Integer")).toBe("Type");
		expect(isReservedWord("while")).toBe(true);
		expect(getReservedWordCategory("while")).toBe("Control Flow");
	});

	test("recognizes container type patterns", () => {
		expect(isContainerType("Integer_Map")).toBe(true);
		expect(isContainerType("Integer_Text_Map")).toBe(true);
		expect(isReservedWord("Integer_Text_Map")).toBe(true);
		expect(getReservedWordCategory("Integer_Text_Map")).toBe("Container Type");
	});

	test("exports a non-empty reserved word list", () => {
		const all = getAllReservedWords();
		expect(all.length).toBeGreaterThan(50);
		expect(all).toContain("Integer");
	});
});
