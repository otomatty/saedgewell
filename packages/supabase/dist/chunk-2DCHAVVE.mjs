// src/check-requires-mfa.ts
var ASSURANCE_LEVEL_2 = "aal2";
async function checkRequiresMultiFactorAuthentication(client) {
  client.auth.suppressGetSessionWarning = true;
  const assuranceLevel = await client.auth.mfa.getAuthenticatorAssuranceLevel();
  client.auth.suppressGetSessionWarning = false;
  if (assuranceLevel.error) {
    throw new Error(assuranceLevel.error.message);
  }
  const { nextLevel, currentLevel } = assuranceLevel.data;
  return nextLevel === ASSURANCE_LEVEL_2 && nextLevel !== currentLevel;
}

export { checkRequiresMultiFactorAuthentication };
//# sourceMappingURL=chunk-2DCHAVVE.mjs.map
//# sourceMappingURL=chunk-2DCHAVVE.mjs.map