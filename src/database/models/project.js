import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "client" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    StartDate: { type: String, required: true },
    deadline: { type: String, required: true },
    budget: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Planned", "Ongoing", "completed"],
      default: "Planned",
    },
  },
  {
    timestamps: true,
  }
);

const Project = new model("project", projectSchema);

export { Project };
