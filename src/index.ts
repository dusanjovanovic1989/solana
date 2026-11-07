import { createServer } from "node:http";

const server = createServer((request, response) => {
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  if (request.method === "GET" && request.url === "/health") {
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }

  response.writeHead(404);
  response.end(JSON.stringify({ message: "Ruta ne postoji" }));
});

const port = 3000;

server.listen(port, "127.0.0.1", () => {
  console.log(`Server radi na http://localhost:${port}`);
});