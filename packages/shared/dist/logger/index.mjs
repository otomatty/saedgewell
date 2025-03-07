import '../chunk-FJBZBVPE.mjs';

// src/logger/index.ts
var _a;
var LOGGER = (_a = process.env.LOGGER) != null ? _a : "pino";
async function getLogger() {
  switch (LOGGER) {
    case "pino": {
      const { Logger: PinoLogger } = await import('../pino-VHLMUEKR.mjs');
      return PinoLogger;
    }
    default:
      throw new Error(`Unknown logger: ${process.env.LOGGER}`);
  }
}

export { getLogger };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map