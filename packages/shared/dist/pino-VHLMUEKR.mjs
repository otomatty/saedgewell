import './chunk-FJBZBVPE.mjs';
import { pino } from 'pino';

var Logger = pino({
  browser: {
    asObject: true
  },
  level: "debug",
  base: {
    env: process.env.NODE_ENV
  },
  errorKey: "error"
});

export { Logger };
//# sourceMappingURL=pino-VHLMUEKR.mjs.map
//# sourceMappingURL=pino-VHLMUEKR.mjs.map