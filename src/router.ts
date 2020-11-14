import { DynObject } from "./types"

const processURL = (
  url: string
): {
  path: string
  query: DynObject<string>
} => {
  const qPos = url.indexOf("?")

  const path = url.substring(0, qPos > 0 ? qPos : undefined).toLowerCase()

  const query: DynObject<string> = {}

  if (qPos > 0)
    url
      .substring(qPos + 1)
      .split("&")
      .map((queryParam) => {
        const tokens = queryParam.split("=")

        query[decodeURI(tokens[0])] = decodeURI(tokens[1])
      })

  return {
    path,
    query,
  }
}

export default processURL
