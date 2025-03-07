// ../../node_modules/server-only/index.js
throw new Error(
  "This module cannot be imported from a Client Component module. It should only be used from a Server Component."
);

// src/utils/index.ts
var zodParseFactory = (schema) => (data) => {
  try {
    return schema.parse(data);
  } catch (err) {
    console.error(err);
    throw new Error(`Invalid data: ${err}`);
  }
};

export { zodParseFactory };
//# sourceMappingURL=chunk-WR2JIB65.mjs.map
//# sourceMappingURL=chunk-WR2JIB65.mjs.map