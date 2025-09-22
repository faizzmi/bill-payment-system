const express = require("express");
const router = express.Router();

const billModel = require("../models/bill_model");
const customerModel = require("../models/customer_model");

// POST /api/bills - Generate monthly bill
router.post("/", async (req, res, next) => {
  try {
    const { customer_id, billing_month, kwh_usage, due_date } = req.body;

    // Validation
    if (!customer_id || !billing_month || !kwh_usage || !due_date) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    if (kwh_usage <= 0 || kwh_usage > 9999) {
      return res.status(400).json({ success: false, message: "Invalid kWh usage" });
    }

    const customer = await customerModel.getCustomerById(customer_id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    // Bill calculation
    const bill_amount = parseFloat((kwh_usage * 0.12).toFixed(2));
    // parse billing_month to first day of the month
    const [year, month] = billing_month.split('-');
    const billingDate = `${year}-${month.padStart(2, '0')}-01`; // YYYY-MM-DD


    const newBill = await billModel.createBill({
        customer_id,
        billing_month: billingDate,
        kwh_usage,
        bill_amount,
        due_date
      });

    res.status(201).json({ success: true, data: newBill });
  } catch (err) {
    next(err);
  }
});

// GET /api/bills/pending - Get all unpaid bills
router.get("/pending", async (req, res, next) => {
  try {
    const bills = await billModel.getPendingBills();
    res.json({ success: true, data: bills });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
