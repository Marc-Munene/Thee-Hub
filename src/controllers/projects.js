import { Client } from "../database/models/client";
import { Project } from "../database/models/project";

// get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("client");

    res.status(200).json({
      success: true,
      message: "Projects fetched successfully!",
      data: projects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Cannot get projects",
    });
  }
};

// Get projects by single client
export const getProjectBySingleClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    const projects = await Project.findById({ client: clientId });

    if (!projects.length) {
      return res.status(404).json({
        success: false,
        message: "No projects found for this client",
      });
    }

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error!",
    });
  }
};

// Add projects
export const addProjects = async (req, res) => {
  try {
    const { client, title, description, startDate, deadline, budget, status } =
      req.body;

    //   checks if the client (passed as an ID) actually exists in the Client collection.
    // const clientId = await Client.findById(client);

    const projectData = {
      client,
      title,
      description,
      startDate,
      deadline,
      budget,
      status,
    };

    const newProject = Project.create(projectData);

    res.status(200).json({
      success: true,
      message: "Project added successfully!",
      data: newProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Cannot add projects",
    });
  }
};

// Edit projects
export const editProjects = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findOneAndUpdate(
      { _id: projectId },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Project edited successfully!",
      data: project,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Update Failed!",
    });
  }
};

// delete Projects
export const deleteProjects = async (req, res) => {
  try {
    const projectId = req.params.id;

    const deletedProject = await Project.deleteOne({ _id: projectId });

    res.status(200).json({
      success: true,
      message: "Project deleted succesffully",
      deletedCount: deletedProject.deletedCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Deletion failed!!",
    });
  }
};
