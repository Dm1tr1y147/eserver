# eServer (@dm1sh/eserver)

One more "middleware-oriented" webserver written with only core NodeJS functions using TypeScript. It also supports express middlewares.

# Installation

```bash
yarn add @dm1sh/eserver
# or
npm install @dm1sh/eserver
```

# Usage

```typescript
import eServer from "@dm1sh/eserver"
import cors from "cors"

const app = new eServer()

app.use(cors())

app.route("/", (req, res) => res.send("Welcome home"))

app.listen(5000)
```
