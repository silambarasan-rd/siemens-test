const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("server/db.json");
const middlewares = jsonServer.defaults();

const TOKEN_TTL_MS = 1000 * 60 * 60;
const activeTokens = new Map();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }

  const token = `token-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  activeTokens.set(token, Date.now() + TOKEN_TTL_MS);

  return res.status(200).json({ token });
});

server.use((req, res, next) => {
  if (req.path === "/login") {
    return next();
  }

  const authHeader = req.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token." });
  }

  const token = authHeader.replace("Bearer ", "");
  const expiresAt = activeTokens.get(token);
  if (!expiresAt || expiresAt < Date.now()) {
    activeTokens.delete(token);
    return res.status(401).json({ message: "Token expired." });
  }

  return next();
});

server.use(router);

server.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log("JSON Server running at http://localhost:4000");
});
