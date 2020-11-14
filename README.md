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

const app = new eServer()

app.listen(5000)
```
