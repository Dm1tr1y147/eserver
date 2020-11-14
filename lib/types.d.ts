/// <reference types="node" />
import * as http from "http";
export declare type MiddlewareT = (req: RequestT, res: ResponseT, next: (err?: Error | undefined) => void) => void;
export declare type RouteT = {
    path: string;
    middlewares?: MiddlewareT[];
    callback: MiddlewareT;
};
declare type RouteHandlerT = (path: string, callback: MiddlewareT) => void;
export declare type ListenT = (port: number, callback: () => void) => void;
export interface EServerT {
    listen: ListenT;
    route: RouteHandlerT;
    use: (middleware: MiddlewareT) => void;
}
export declare type RequestT = http.IncomingMessage & {
    path?: string;
    query?: DynObject<string>;
};
export declare type DynObject<T> = {
    [key: string]: T;
};
export declare type JSONT = (obj: DynObject<string>) => void;
export declare type SendT = (content: number | string | boolean) => void;
export declare type RedirectT = (url: string) => void;
export declare type ResponseT = http.ServerResponse & {
    json: JSONT;
    send: SendT;
    redirect: RedirectT;
};
export declare type NextT = (err?: Error | undefined) => void;
export declare type UseCustomRes = (res: ResponseT) => JSONT | SendT | RedirectT;
export {};
//# sourceMappingURL=types.d.ts.map