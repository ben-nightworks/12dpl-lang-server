import { describe, expect, test } from "bun:test";
import { PrototypeService } from "../server/src/services/prototypeService.ts";

describe("PrototypeService", () => {
	test("loads prototypes and can resolve common functions", async () => {
		const service = new PrototypeService();
		await service.ready;
		const proto = service.getPrototype("Sin");
		expect(proto).toBeDefined();
		expect(proto?.name).toBe("Sin");

		const sig = service.getPrototypeSignature("Sin");
		expect(typeof sig).toBe("string");
		expect(sig?.includes("Sin(")).toBe(true);

		const items = service.getCompletionItems();
		expect(items.length).toBeGreaterThan(1000);

		// Overloads: ensure at least one well-known overloaded function yields >1 signatures.
		const overloads = service.getPrototypes("Set_data");
		expect(overloads.length).toBeGreaterThan(1);

		// And ensure completion returns distinct items for those overloads.
		const overloadItems = items.filter(i => (i as any).filterText === "Set_data");
		expect(overloadItems.length).toBeGreaterThan(1);
	});
});
