import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "client" },
    Project: { type: Schema.Types.ObjectId, ref: "project" },
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    datePaind: { type: Date, required: true },
    method: {
      type: String,
      enum: ["Cash", "M-pesa", "Bank transfer"],
      default: "M-pesa",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = new model("payment", paymentSchema);

export { Payment };
