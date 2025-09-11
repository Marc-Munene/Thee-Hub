import { Schema, model } from "mongoose";

const clientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    companyName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Client = new model("client", clientSchema);

export { Client };
