/// <reference types="node" />
import * as http from "http";
import { MiddlewareT, EServerT } from "./types";
declare class eServer implements EServerT {
    #private;
    constructor();
    private handle;
    use(middleware: MiddlewareT): void;
    route(path: string, ...callbacks: MiddlewareT[]): void;
    listen(port: number, callback?: () => void): http.Server;
}
export default eServer;
export { logger } from "./middlewares";
export { RequestT, ResponseT } from "./types";
//# sourceMappingURL=index.d.ts.map