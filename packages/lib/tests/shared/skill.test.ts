import { describe, it, expect } from "vitest";
import { getLevelText } from "../../src/shared/skill";

describe("getLevelText", () => {
	it("レベル1の場合は「基礎レベル」を返す", () => {
		expect(getLevelText(1)).toBe("基礎レベル");
	});

	it("レベル2の場合は「実務経験あり」を返す", () => {
		expect(getLevelText(2)).toBe("実務経験あり");
	});

	it("レベル3の場合は「実践的」を返す", () => {
		expect(getLevelText(3)).toBe("実践的");
	});

	it("レベル4の場合は「熟練」を返す", () => {
		expect(getLevelText(4)).toBe("熟練");
	});

	it("レベル5の場合は「エキスパート」を返す", () => {
		expect(getLevelText(5)).toBe("エキスパート");
	});

	it("定義されていないレベルの場合は「不明」を返す", () => {
		expect(getLevelText(0)).toBe("不明");
		expect(getLevelText(6)).toBe("不明");
		expect(getLevelText(-1)).toBe("不明");
	});
});
