import { createServer } from "node:http";

type User = {
  id: number;
  name: string;
};

const users: User[] = [
  { id: 1, name: "Dušan" },
  { id: 2, name: "Ana" },
];

const server = createServer((request, response) => {
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  if (request.method === "GET" && request.url === "/health") {
    response.writeHead(200);
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (request.method === "GET" && request.url === "/users") {
    response.writeHead(200);
    response.end(JSON.stringify(users));
    return;
 }

 const match = request.url?.match(/^\/users\/(\d+)$/);

if (request.method === "GET" && match) {
  const id = Number(match[1]);
  const user = users.find((user) => user.id === id);

  if (!user) {
    response.writeHead(404);
    response.end(JSON.stringify({ message: "Korisnik ne postoji" }));
    return;
  }

  response.writeHead(200);
  response.end(JSON.stringify(user));
  return;
}

  response.writeHead(404);
  response.end(JSON.stringify({ message: "Ruta ne postoji" }));
});

const port = 3000;

server.listen(port, "127.0.0.1", () => {
  console.log(`Server radi na http://localhost:${port}`);
});