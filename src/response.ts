import { JSONT, RedirectT, SendT, UseCustomRes } from "./types"

const useJson: UseCustomRes = (res): JSONT => (obj) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.write(JSON.stringify(obj))
  res.end()
}

const useSend: UseCustomRes = (res): SendT => (content) => {
  if (
    typeof content === "object" ||
    typeof content === "undefined" ||
    typeof content === "function"
  )
    throw new Error("Content must be displayable")

  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  switch (typeof content) {
    case "boolean":
      res.write(content ? "true" : "false")
      break
    case "number":
    case "bigint":
      res.write(content.toString())
      break
    default:
      res.write(content)
  }
  res.end()
}

const useRedirect: UseCustomRes = (res): RedirectT => (url) => {
  res.statusCode = 301
  res.setHeader("Location", url)
  res.end()
}

export { useJson, useSend, useRedirect }
