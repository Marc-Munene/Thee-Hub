import { Payment } from "../database/models/payment.js";

// Getting all payments
export const getAllPayments = async (req, res) => {
  try {
    const allPayments = await Payment.find().populate("project client");

    const pendingPayments = allPayments.map((payment) => {
      const remainingAmount = payment.totalAmount - payment.paidAmount;

      return {
        ...payment.toObject(),
        remainingAmount,
      };
    });

    res.status(200).json({
      success: true,
      message: "payments fetched successfully!",
      data: pendingPayments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Fetching failed!!",
    });
  }
};

// get single payment
export const getSinglePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;

    const payment = await Payment.findById(paymentId).populate(
      "project client"
    );

    const remainingAmount = payment.totalAmount - payment.paidAmount;

    res.status(200).json({
      success: true,
      message: "Payment retrived successfully!",
      data: { ...payment.toObject(), remainingAmount },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Fetching failed!!",
    });
  }
};

// Post payment
export const addPayment = async (req, res) => {
  try {
    const { client, project, totalAmount, paidAmount, paidDate, method } =
      req.body;

    const paymentData = {
      client,
      project,
      totalAmount,
      paidAmount,
      paidDate,
      method,
    };

    const newPayment = await Payment.create(paymentData);

    const remainingAmount = totalAmount - paidAmount;

    res.status(200).json({
      success: true,
      message: "Payment added successfully",
      data: { ...newPayment.toObject(), remainingAmount },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add payment!!",
    });
  }
};

// Edit payment
export const editPayment = async (req, res) => {
  try {
    const paymentId = req.params.id;

    const payment = await Payment.findOneAndUpdate(
      { _id: paymentId },
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "payment editted successfully!",
      data: payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "editing failed!!",
    });
  }
};

// DELETE
export const deletePayments = async (req, res) => {
  try {
    const paymentId = req.params.id;

    const deletedPayment = await Payment.deleteOne({ _id: paymentId });

    res.status(200).json({
      success: true,
      message: "payment deleted successfully!",
      deletedCount: deletedPayment.deletedCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Cannot delete payments",
    });
  }
};
