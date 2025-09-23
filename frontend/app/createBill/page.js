"use client";

import { useState } from "react";
import InputField from "@/components/InputField";
import Message from "@/components/Message";

export default function CreateBill() {
  const getCurrentMonth = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  };

  const [form, setForm] = useState({
    customer_id: "",
    billing_month: getCurrentMonth(),
    kwh_usage: "",
    due_date: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customer_id || !form.billing_month || !form.kwh_usage || !form.due_date) {
      setMessage("Please fill in all fields before submitting.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("Bill created successfully!");
        setForm({
          customer_id: "",
          billing_month: getCurrentMonth(),
          kwh_usage: "",
          due_date: "",
        });
      } else setMessage("Failed to create bill.");
    } catch (err) {
      console.error(err);
      setMessage("Error: Could not connect to server");
    }
  };

  return (
    <div>
      <main className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Create a Bill</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Customer ID" type="number" name="customer_id" value={form.customer_id} onChange={handleChange} placeholder="Customer ID" />
          <InputField label="Billing Month" type="month" name="billing_month" value={form.billing_month} onChange={handleChange} />
          <InputField label="kWh Usage" type="number" name="kwh_usage" value={form.kwh_usage} onChange={handleChange} placeholder="kWh Usage" />
          <InputField label="Due Date" type="date" name="due_date" value={form.due_date} onChange={handleChange} />

          <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Create
          </button>
        </form>

        {message && <Message text={message} />}
      </main>
    </div>
  );
}
