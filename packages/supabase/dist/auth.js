'use strict';

require('./chunk-DDAAVRWG.js');
require('server-only');

function createAuthCallbackService(client) {
  return new AuthCallbackService(client);
}
var AuthCallbackService = class {
  constructor(client) {
    this.client = client;
  }
  /**
   * @name verifyTokenHash
   * @description Verifies the token hash and type and redirects the user to the next page
   * This should be used when using a token hash to verify the user's email
   * @param request
   * @param params
   */
  async verifyTokenHash(request, params) {
    var _a, _b;
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const host = request.headers.get("host");
    if (url.host.includes("localhost:") && !(host == null ? void 0 : host.includes("localhost"))) {
      url.host = host;
      url.port = "";
    }
    url.pathname = params.redirectPath;
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const callbackParam = (_a = searchParams.get("next")) != null ? _a : searchParams.get("callback");
    let nextPath = null;
    const callbackUrl = callbackParam ? new URL(callbackParam) : null;
    if (callbackUrl) {
      const callbackNextPath = callbackUrl.searchParams.get("next");
      if (callbackNextPath) {
        nextPath = callbackNextPath;
      } else {
        nextPath = callbackUrl.pathname;
      }
    }
    const errorPath = (_b = params.errorPath) != null ? _b : "/auth/callback/error";
    searchParams.delete("token_hash");
    searchParams.delete("type");
    searchParams.delete("next");
    if (nextPath) {
      url.pathname = nextPath;
    }
    if (token_hash && type) {
      const { error } = await this.client.auth.verifyOtp({
        type,
        token_hash
      });
      if (!error) {
        return url;
      }
      if (error.code) {
        url.searchParams.set("code", error.code);
      }
      const errorMessage = getAuthErrorMessage({
        error: error.message,
        code: error.code
      });
      url.searchParams.set("error", errorMessage);
    }
    url.pathname = errorPath;
    return url;
  }
  /**
   * @name exchangeCodeForSession
   * @description Exchanges the auth code for a session and redirects the user to the next page or an error page
   * @param request
   * @param params
   */
  async exchangeCodeForSession(request, params) {
    var _a;
    const requestUrl = new URL(request.url);
    const searchParams = requestUrl.searchParams;
    const authCode = searchParams.get("code");
    const error = searchParams.get("error");
    const nextUrlPathFromParams = searchParams.get("next");
    const errorPath = (_a = params.errorPath) != null ? _a : "/auth/callback/error";
    const nextUrl = nextUrlPathFromParams != null ? nextUrlPathFromParams : params.redirectPath;
    if (authCode) {
      try {
        const { error: error2 } = await this.client.auth.exchangeCodeForSession(authCode);
        if (error2) {
          return onError({
            code: error2.code,
            error: error2.message,
            path: errorPath
          });
        }
      } catch (error2) {
        console.error(
          {
            error: error2,
            name: "auth.callback"
          },
          "An error occurred while exchanging code for session"
        );
        const message = error2 instanceof Error ? error2.message : error2;
        return onError({
          code: error2 == null ? void 0 : error2.code,
          error: message,
          path: errorPath
        });
      }
    }
    if (error) {
      return onError({
        error,
        path: errorPath
      });
    }
    return {
      nextPath: nextUrl
    };
  }
};
function onError({
  error,
  path,
  code
}) {
  const errorMessage = getAuthErrorMessage({ error, code });
  console.error(
    {
      error,
      name: "auth.callback"
    },
    "An error occurred while signing user in"
  );
  const searchParams = new URLSearchParams({
    error: errorMessage,
    code: code != null ? code : ""
  });
  const nextPath = `${path}?${searchParams.toString()}`;
  return {
    nextPath
  };
}
function isVerifierError(error) {
  return error.includes("both auth code and code verifier should be non-empty");
}
function getAuthErrorMessage(params) {
  if (params.code) {
    if (params.code === "otp_expired") {
      return "auth:errors.otp_expired";
    }
  }
  if (isVerifierError(params.error)) {
    return "auth:errors.codeVerifierMismatch";
  }
  return "auth:authenticationErrorAlertBody";
}

exports.createAuthCallbackService = createAuthCallbackService;
//# sourceMappingURL=auth.js.map
//# sourceMappingURL=auth.js.map