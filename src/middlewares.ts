import { MiddlewareT } from "./types"

const pushMiddlewares = (
  arr: MiddlewareT[],
  element: MiddlewareT | MiddlewareT[]
): void => {
  if (Array.isArray(element)) element.forEach((el) => pushMiddlewares(arr, el))
  else {
    if (typeof element != "function")
      throw new Error("Route callback must be a function")
    arr.push(element)
  }
}

const logger: MiddlewareT = (req, res, next) => {
  console.log(`Accessed ${req.url} from ${req.headers["user-agent"]}`) // eslint-disable-line
  next()
}

export { pushMiddlewares, logger }
