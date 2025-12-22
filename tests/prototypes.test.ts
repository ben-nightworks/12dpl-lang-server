import { describe, expect, test } from "bun:test";
import { prototypesLoader } from "../server/src/prototypes.ts";

describe("prototypesLoader", () => {
	test("loads prototypes and can resolve common functions", async () => {
		await prototypesLoader.load();
		const proto = prototypesLoader.getPrototype("Sin");
		expect(proto).toBeDefined();
		expect(proto?.name).toBe("Sin");

		const sig = prototypesLoader.getPrototypeSignature("Sin");
		expect(typeof sig).toBe("string");
		expect(sig?.includes("Sin(")).toBe(true);

		const items = prototypesLoader.getCompletionItems();
		expect(items.length).toBeGreaterThan(1000);

		// Overloads: ensure at least one well-known overloaded function yields >1 signatures.
		const overloads = prototypesLoader.getPrototypes("Set_data");
		expect(overloads.length).toBeGreaterThan(1);

		// And ensure completion returns distinct items for those overloads.
		const overloadItems = items.filter(i => (i as any).filterText === "Set_data");
		expect(overloadItems.length).toBeGreaterThan(1);
	});
});
