import * as http from "http"

export type MiddlewareT = (
  req: RequestT,
  res: ResponseT,
  next: (err?: Error | undefined) => void
) => void

export type RouteT = {
  path: string
  middlewares?: MiddlewareT[]
  callback: MiddlewareT
}

type RouteHandlerT = (path: string, callback: MiddlewareT) => void

export type ListenT = (port: number, callback: () => void) => void

export interface EServerT {
  listen: ListenT
  route: RouteHandlerT
  use: (middleware: MiddlewareT) => void
}

export type RequestT = http.IncomingMessage & {
  path?: string
  query?: DynObject<string>
}

export type DynObject<T> = {
  [key: string]: T
}

export type JSONT = (obj: DynObject<string>) => void

export type SendT = (content: number | string | boolean) => void

export type RedirectT = (url: string) => void

export type ResponseT = http.ServerResponse & {
  json: JSONT
  send: SendT
  redirect: RedirectT
}

export type NextT = (err?: Error | undefined) => void

export type UseCustomRes = (res: ResponseT) => JSONT | SendT | RedirectT
