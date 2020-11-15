const eServer = require("@dm1sh/eserver")
// import cors from "cors"

const app = new eServer()

// app.use(cors())

app.route("/", (req, res) => res.send("Welcome home"))

app.listen(5000)
