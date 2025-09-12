import { Router } from "express";
import {
  addProjects,
  deleteProjects,
  editProjects,
  getProjectBySingleClient,
  getProjects,
} from "../controllers/projects.js";

const projectRouter = Router();

// Getting and Adding
projectRouter.route("/projects").get(getProjects).post(addProjects);

// Edit and delete
projectRouter.route("/projects/:id").put(editProjects).delete(deleteProjects);

// getting single project by id
projectRouter.route("projects/client/:clientId", getProjectBySingleClient);

export { projectRouter };
