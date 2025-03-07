import { checkRequiresMultiFactorAuthentication } from './chunk-2DCHAVVE.mjs';
import './chunk-FJBZBVPE.mjs';

// src/require-user.ts
var MULTI_FACTOR_AUTH_VERIFY_PATH = "/auth/verify";
var SIGN_IN_PATH = "/auth/sign-in";
async function requireUser(client) {
  const { data, error } = await client.auth.getUser();
  if (!data.user || error) {
    return {
      data: null,
      error: new AuthenticationError(),
      redirectTo: SIGN_IN_PATH
    };
  }
  const requiresMfa = await checkRequiresMultiFactorAuthentication(client);
  if (requiresMfa) {
    return {
      data: null,
      error: new MultiFactorAuthError(),
      redirectTo: MULTI_FACTOR_AUTH_VERIFY_PATH
    };
  }
  return {
    error: null,
    data: data.user
  };
}
var AuthenticationError = class extends Error {
  constructor() {
    super("Authentication required");
  }
};
var MultiFactorAuthError = class extends Error {
  constructor() {
    super("Multi-factor authentication required");
  }
};

export { requireUser };
//# sourceMappingURL=require-user.mjs.map
//# sourceMappingURL=require-user.mjs.map