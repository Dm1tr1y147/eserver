import { createServer } from 'http';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}

const pushMiddlewares = (arr, element) => {
    if (Array.isArray(element))
        element.forEach((el) => pushMiddlewares(arr, el));
    else {
        if (typeof element != "function")
            throw new Error("Route callback must be a function");
        arr.push(element);
    }
};
const logger = (req, res, next) => {
    console.log(`Accessed ${req.url} from ${req.headers["user-agent"]}`); // eslint-disable-line
    next();
};

const useJson = (res) => (obj) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(obj));
    res.end();
};
const useSend = (res) => (content) => {
    if (typeof content === "object" ||
        typeof content === "undefined" ||
        typeof content === "function")
        throw new Error("Content must be displayable");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    switch (typeof content) {
        case "boolean":
            res.write(content ? "true" : "false");
            break;
        case "number":
        case "bigint":
            res.write(content.toString());
            break;
        default:
            res.write(content);
    }
    res.end();
};

const processURL = (url) => {
    const qPos = url.indexOf("?");
    const path = url.substring(0, qPos > 0 ? qPos : undefined).toLowerCase();
    const query = {};
    if (qPos > 0)
        url
            .substring(qPos + 1)
            .split("&")
            .map((queryParam) => {
            const tokens = queryParam.split("=");
            query[decodeURI(tokens[0])] = decodeURI(tokens[1]);
        });
    return {
        path,
        query,
    };
};

var _stack, _router;
class eServer {
    constructor() {
        _stack.set(this, void 0);
        _router.set(this, void 0);
        __classPrivateFieldSet(this, _stack, []);
        __classPrivateFieldSet(this, _router, {});
    }
    handle(req, res, callback) {
        let idx = 0;
        // @ts-ignore
        if (req.url)
            req = Object.assign(Object.assign({}, req), processURL(req.url));
        // @ts-ignore
        res = Object.assign(Object.assign({}, res), { send: useSend(res), json: useJson(res) });
        const stack = [
            ...__classPrivateFieldGet(this, _stack),
            ...(req.path && __classPrivateFieldGet(this, _router)[req.path] ? __classPrivateFieldGet(this, _router)[req.path] : []),
        ];
        const next = (err) => {
            if (err)
                return setImmediate(() => callback(err));
            if (idx === stack.length) {
                return setImmediate(() => callback());
            }
            const layer = stack[idx++];
            setImmediate(() => {
                try {
                    layer(req, res, next);
                }
                catch (err) {
                    next(err);
                }
            });
        };
        next();
    }
    use(middleware) {
        if (typeof middleware !== "function")
            throw new Error("Middleware must be a function");
        pushMiddlewares(__classPrivateFieldGet(this, _stack), middleware);
    }
    route(path, ...callbacks) {
        if (typeof callbacks[0] !== "function")
            throw new Error("Route callback must be a function");
        path = path.toLowerCase();
        if (!__classPrivateFieldGet(this, _router)[path])
            __classPrivateFieldGet(this, _router)[path] = [];
        pushMiddlewares(__classPrivateFieldGet(this, _router)[path], callbacks);
    }
    listen(port, callback) {
        const handler = (req, res) => this.handle(req, res, (err) => {
            if (err) {
                console.log(err); // eslint-disable-line
                res.statusCode = 500;
                res.end();
            }
            else {
                res.statusCode = 404;
                res.write("Not found: 404");
                res.end();
            }
        });
        return createServer(handler).listen(port, callback);
    }
}
_stack = new WeakMap(), _router = new WeakMap();

export default eServer;
export { logger };
