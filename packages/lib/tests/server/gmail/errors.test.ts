import { describe, it, expect } from "vitest";
import {
	GmailError,
	GmailAuthError,
	GmailTokenError,
	GmailSendError,
	GmailFetchError,
	GmailAttachmentError,
	GmailRateLimitError,
} from "../../../src/server/gmail/errors";

describe("GmailError", () => {
	it("基本的なエラーメッセージとコードを設定できる", () => {
		const error = new GmailError("テストエラー", "TEST_ERROR", 400);
		expect(error.message).toBe("テストエラー");
		expect(error.code).toBe("TEST_ERROR");
		expect(error.status).toBe(400);
		expect(error.name).toBe("GmailError");
	});

	it("fromApiErrorメソッドでAPIエラーからGmailErrorを作成できる", () => {
		const apiError = {
			error: {
				message: "APIエラー",
				status: "ERROR_STATUS",
				code: 500,
			},
		};

		type ApiErrorType = {
			error: {
				message: string;
				status: string;
				code: number;
			};
		};

		const error = GmailError.fromApiError(apiError as ApiErrorType);
		expect(error.message).toBe("APIエラー");
		expect(error.code).toBe("ERROR_STATUS");
		expect(error.status).toBe(500);
	});
});

describe("GmailAuthError", () => {
	it("認証エラーを作成できる", () => {
		const error = new GmailAuthError("認証エラー", "AUTH_ERROR");
		expect(error.message).toBe("認証エラー");
		expect(error.code).toBe("AUTH_ERROR");
		expect(error.name).toBe("GmailAuthError");
	});
});

describe("GmailTokenError", () => {
	it("トークンエラーを作成できる", () => {
		const error = new GmailTokenError("トークンエラー", "TOKEN_ERROR");
		expect(error.message).toBe("トークンエラー");
		expect(error.code).toBe("TOKEN_ERROR");
		expect(error.name).toBe("GmailTokenError");
	});
});

describe("GmailSendError", () => {
	it("送信エラーを作成できる", () => {
		const error = new GmailSendError("送信エラー", "SEND_ERROR");
		expect(error.message).toBe("送信エラー");
		expect(error.code).toBe("SEND_ERROR");
		expect(error.name).toBe("GmailSendError");
	});
});

describe("GmailFetchError", () => {
	it("取得エラーを作成できる", () => {
		const error = new GmailFetchError("取得エラー", "FETCH_ERROR");
		expect(error.message).toBe("取得エラー");
		expect(error.code).toBe("FETCH_ERROR");
		expect(error.name).toBe("GmailFetchError");
	});
});

describe("GmailAttachmentError", () => {
	it("添付ファイルエラーを作成できる", () => {
		const error = new GmailAttachmentError(
			"添付ファイルエラー",
			"ATTACHMENT_ERROR",
		);
		expect(error.message).toBe("添付ファイルエラー");
		expect(error.code).toBe("ATTACHMENT_ERROR");
		expect(error.name).toBe("GmailAttachmentError");
	});
});

describe("GmailRateLimitError", () => {
	it("レート制限エラーを作成できる", () => {
		const error = new GmailRateLimitError("レート制限エラー", 60);
		expect(error.message).toBe("レート制限エラー");
		expect(error.retryAfter).toBe(60);
		expect(error.name).toBe("GmailRateLimitError");
	});
});
