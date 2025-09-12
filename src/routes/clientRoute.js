import { Router } from "express";
import {
  addClients,
  deleteClient,
  editClient,
  getClients,
  getSingleClient,
} from "../controllers/clients.js";

const clientRouter = Router();

clientRouter.route("/clients").get(getClients).post(addClients);

clientRouter
  .route("/clients/:id")
  .get(getSingleClient)
  .put(editClient)
  .delete(deleteClient);

export { clientRouter };
