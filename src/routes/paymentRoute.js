import { Router } from "express";
import {
  addPayment,
  deletePayments,
  editPayment,
  getAllPayments,
  getSinglePayment,
} from "../controllers/payments.js";

const paymentRouter = Router();

paymentRouter
  .route("/payments")
  .get(getAllPayments)
  .post(addPayment)
  .put(editPayment)
  .delete(deletePayments);

paymentRouter.route("payments/:id").get(getSinglePayment);

export { paymentRouter };
