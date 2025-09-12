import { Client } from "../database/models/client.js";

// Get all clients
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();

    res.status(200).json({
      success: true,
      data: clients,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Cannot find clients",
    });
  }
};

// Get single client
export const getSingleClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    const oneClient = await Client.findById(clientId);

    res.status(200).json({
      success: true,
      message: "Client found!",
      data: oneClient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Cannot get a single client",
    });
  }
};

// Adding clients
export const addClients = async (req, res) => {
  try {
    const { name, email, phoneNo, address, companyName } = req.body;

    const trimmedName = name.trim();

    const trimmedEmail = email.trim();

    const trimmedCompanyName = companyName.trim();

    const clientData = {
      name: trimmedName,
      email: trimmedEmail,
      phoneNo,
      address,
      companyName: trimmedCompanyName,
    };

    const newClient = await Client.create(clientData);

    res.status(200).json({
      success: true,
      message: "client posted successfully!",
      data: newClient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Cannot add clients",
    });
  }
};

// Edit client

export const editClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    const client = await Client.findOneAndUpdate({ _id: clientId }, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "client edited successfully!",
      data: client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Cannot edit clients",
    });
  }
};

//delete Client
export const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    const deletedClient = await Client.deleteOne({ _id: clientId });

    res.status(200).json({
      success: true,
      message: "client deleted successfully!",
      deletedCount: deletedClient.deletedCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Cannot delete clients",
    });
  }
};
