'use strict';

var chunkT2D4HDOR_js = require('./chunk-T2D4HDOR.js');
require('./chunk-DDAAVRWG.js');

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
  const requiresMfa = await chunkT2D4HDOR_js.checkRequiresMultiFactorAuthentication(client);
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

exports.requireUser = requireUser;
//# sourceMappingURL=require-user.js.map
//# sourceMappingURL=require-user.js.map