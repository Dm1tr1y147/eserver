import eServer, { logger } from "@dm1sh/eserver"

const app = new eServer()

app.use(logger)

app.use((req, res, next) => {
  next()
})

app.route("/", (req, res) => {
  res.send(
    `Requested path ${req.path ?? "undefined"} with ${JSON.stringify(
      req.query
    )} params`
  )
})

app.route("/redirect", (req, res) => {
  res.redirect("google.com")
})

app.route("/text", (req, res) => {
  res.send("Text")
})

app.route("/json", (req, res) => {
  res.json({ test: "test" })
})

app.listen(5000, () => console.log("Started server on ", 5000)) // eslint-disable-line

export { app }
