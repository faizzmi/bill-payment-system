const express = require("express");
const router = express.Router();

const billModel = require("../models/bill_model");
const paymentModel = require("../models/payment_model");

// POST /api/payments - Process bill payment
router.post("/payments", async (req, res, next) => {
  try {
    const { bill_id, amount, payment_method } = req.body;

    if (!bill_id || !amount || !payment_method) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const bill = await billModel.getBillById(bill_id);
    if (!bill) {
      return res.status(404).json({ success: false, message: "Bill not found" });
    }
    if (bill.status === "paid") {
      return res.status(400).json({ success: false, message: "Bill already paid" });
    }
    if (parseFloat(amount) !== parseFloat(bill.bill_amount)) {
      return res.status(400).json({ success: false, message: "Payment amount does not match bill" });
    }
    if (!["credit_card", "bank_transfer", "cash"].includes(payment_method.toLowerCase())) {
      return res.status(400).json({ success: false, message: "Invalid payment method" });
    }

    // Create payment record
    const payment = await paymentModel.createPayment({ bill_id, amount, payment_method });

    // Update bill status
    await billModel.updateBillStatus(bill_id, "paid");

    res.status(201).json({
      success: true,
      message: "Payment processed successfully",
      payment_id: payment.id,
      new_bill_status: "paid",
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/payment-history - Get payment records
router.get("/payment-history", async (req, res, next) => {
  try {
    const { customer_id, bill_id } = req.query;
    const payments = await paymentModel.getPayments({ customer_id, bill_id });

    res.json({ success: true, data: payments });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
