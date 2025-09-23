"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import Message from "@/components/Message";

export default function PayBill() {
  const [form, setForm] = useState({
    bill_id: "",
    amount: "",
    payment_method: "credit_card",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.bill_id || !form.amount || !form.payment_method) {
      setMessage("Please fill in all fields before submitting.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("Payment successful!");
        setForm({ bill_id: "", amount: "", payment_method: "credit_card" });
      } else setMessage("Payment failed.");
    } catch (err) {
      console.error(err);
      setMessage("Error: Could not connect to server");
    }
  };

  const paymentOptions = [
    { value: "credit_card", label: "Credit Card" },
    { value: "debit_card", label: "Debit Card" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "ewallet", label: "E-Wallet" },
  ];

  return (
    <div>
      <main className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Pay a Bill</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Bill ID" type="number" name="bill_id" value={form.bill_id} onChange={handleChange} placeholder="Bill ID" />
          <InputField label="Amount" type="number" step="0.01" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" />
          <SelectField label="Payment Method" name="payment_method" value={form.payment_method} onChange={handleChange} options={paymentOptions} />
          <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Pay
          </button>
        </form>

        {message && <Message text={message} />}
      </main>
    </div>
  );
}
