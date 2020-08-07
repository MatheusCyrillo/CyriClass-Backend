import express from "express";

const app = express();

app.get("/users", (request, response) => {
  const users = [{ name: "Matheus" }, { name: "Andre" }];

  return response.json(users);
});

app.listen(3333);
