import express from 'express';

const routes = express.Router();

routes.get("/users", (request, response) => {
    console.log(request.body);
    const users = [{ name: "Matheus" }, { name: "Andre" }];
  
    return response.json(users);
  });
  

  export default routes;