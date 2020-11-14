import * as http from "http"
import { pushMiddlewares } from "./middlewares"
import { useJson, useSend } from "./response"
import processURL from "./router"

import {
  MiddlewareT,
  EServerT,
  RequestT,
  DynObject,
  NextT,
  ResponseT,
} from "./types"

class eServer implements EServerT {
  #stack: MiddlewareT[]
  #router: DynObject<MiddlewareT[]>

  constructor() {
    this.#stack = []
    this.#router = {}
  }

  private handle(
    req: RequestT,
    res: http.ServerResponse,
    callback: (err?: Error) => void
  ) {
    let idx = 0

    // @ts-ignore
    if (req.url) req = { ...req, ...processURL(req.url) }

    // @ts-ignore
    res = { ...res, send: useSend(res), json: useJson(res) }

    const stack = [
      ...this.#stack,
      ...(req.path && this.#router[req.path] ? this.#router[req.path] : []),
    ]

    const next: NextT = (err) => {
      if (err) return setImmediate(() => callback(err))

      if (idx === stack.length) {
        return setImmediate(() => callback())
      }

      const layer = stack[idx++]

      setImmediate(() => {
        try {
          layer(req, res as ResponseT, next)
        } catch (err) {
          next(err)
        }
      })
    }

    next()
  }

  public use(middleware: MiddlewareT): void {
    if (typeof middleware !== "function")
      throw new Error("Middleware must be a function")

    pushMiddlewares(this.#stack, middleware)
  }

  public route(path: string, ...callbacks: MiddlewareT[]): void {
    if (typeof callbacks[0] !== "function")
      throw new Error("Route callback must be a function")

    path = path.toLowerCase()

    if (!this.#router[path]) this.#router[path] = []

    pushMiddlewares(this.#router[path], callbacks)
  }

  public listen(port: number, callback?: () => void): http.Server {
    const handler: http.RequestListener = (req, res) =>
      this.handle(req, res, (err: Error | undefined) => {
        if (err) {
          console.log(err) // eslint-disable-line
          res.statusCode = 500
          res.end()
        } else {
          res.statusCode = 404
          res.write("Not found: 404")
          res.end()
        }
      })

    return http.createServer(handler).listen(port, callback)
  }
}

export default eServer
export { logger } from "./middlewares"
export { RequestT, ResponseT } from "./types"
