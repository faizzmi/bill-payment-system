"use client";

import { useState } from "react";
import Card from "@/components/Card";

export default function PaymentHistory() {
  const [customerId, setCustomerId] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); 
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchHistory = async () => {
    if (!customerId) {
      setMessage("Please enter a Customer ID.");
      return;
    }

    setMessage(""); 
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/payment-history?customer_id=${customerId}`
      );

      if (!res.ok) {
        console.error("Failed to fetch payment history:", res.status);
        setHistory([]);
        setMessage("Failed to fetch payment history.");
        return;
      }

      const json = await res.json();
      setHistory(json.data || []);
      if ((json.data || []).length === 0) {
        setMessage("No payment history found.");
      }
    } catch (err) {
      console.error("Error fetching payment history:", err);
      setHistory([]);
      setMessage("Error fetching payment history.");
    } finally {
      setLoading(false);
    }
  };

  const paymentOptions = [
    { value: "credit_card", label: "Credit Card" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "cash", label: "Cash" },
  ];

  return (
    <div>
      <main className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Payment History
        </h2>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="customer_id" className="text-sm font-medium">
            Customer ID
          </label>
          <div className="flex gap-2">
            <input
              id="customer_id"
              type="number"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Enter Customer ID"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={fetchHistory}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {loading ? "Loading..." : "Check History"}
            </button>
          </div>
        </div>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        {!loading && history.length > 0 && (
          <ul className="space-y-3">
            {history.map((payment) => (
              <Card key={payment.id}>
                <p className="text-sm font-medium text-gray-500">Bill ID</p>
                <p className="text-lg font-semibold text-gray-900">
                  {payment.bill_id}
                </p>

                <p className="text-sm font-medium text-gray-500">Amount</p>
                <p className="text-lg font-semibold text-gray-900">
                  RM{payment.amount}
                </p>

                <p className="text-sm font-medium text-gray-500">Method</p>
                <p className="text-lg text-gray-700">
                  {
                    paymentOptions.find(
                      (option) => option.value === payment.payment_method
                    )?.label || payment.payment_method
                  }
                </p>

                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-lg text-gray-700">
                  {new Date(payment.payment_date).toLocaleString()}
                </p>
              </Card>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
