import { Request, Response } from "express";
import db from "../database/connection";

export default class ConnectionsController {
  async index(request: Request, response: Response) {
    const totalConnections = await db("connections").count('user_id as total');
    return response.json(totalConnections[0]);
    /* ALTERNATIVE MODE (DESESTRUTURAÇÃO):
    const { total } = totalConnections[0];
    return response.json({total});
    */

  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    try {
      await db("connections").insert({
        user_id,
      });

      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({
        error: "Unexpected error while creating new connection",
      });
    }
  }
}
