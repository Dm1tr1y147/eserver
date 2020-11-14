import { MiddlewareT } from "./types";
declare const pushMiddlewares: (arr: MiddlewareT[], element: MiddlewareT | MiddlewareT[]) => void;
declare const logger: MiddlewareT;
export { pushMiddlewares, logger };
//# sourceMappingURL=middlewares.d.ts.map