"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";

export default function PendingBills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function loadBills() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/bills/pending`);
        if (res.ok) {
          const json = await res.json();
          setBills(json.data || []); // access data array from response
        } else {
          setError(`Failed to fetch bills. Status: ${res.status}`);
        }
      } catch (err) {
        console.error("Error fetching pending bills:", err);
        setError("Error fetching pending bills");
      } finally {
        setLoading(false);
      }
    }

    loadBills();
  }, []);

  return (
    <main className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-center">Pending Bills</h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && bills.length === 0 && (
        <p className="text-center text-gray-500">No pending bills</p>
      )}

      {!loading && !error && bills.length > 0 && (
        <ul className="space-y-4">
          {bills.map((bill) => (
            <Card key={bill.id}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Customer</span>
                <span className="text-sm text-gray-700">{bill.customer_name}</span>
              </div>

              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Account</span>
                <span className="text-sm text-gray-700">{bill.account_number}</span>
              </div>

              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Billing Month</span>
                <span className="text-sm text-gray-700">
                  {new Date(bill.billing_month).toLocaleString("default", { month: "long", year: "numeric" })}
                </span>
              </div>

              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Usage</span>
                <span className="text-sm text-gray-700">{bill.kwh_usage} kWh</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Due Date</span>
                <span className="text-sm text-gray-700">
                  {new Date(bill.due_date).toLocaleDateString()}
                </span>
              </div>
            </Card>
          ))}
        </ul>
      )}
    </main>
  );
}
