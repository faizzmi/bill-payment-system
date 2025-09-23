"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-6">
      <Link href="/">Home</Link>
      <Link href="/createBill">Create Bill</Link>
      <Link href="/pendingBill">Pending Bills</Link>
      <Link href="/payBill">Pay Bill</Link>
      <Link href="/paymentHistory">Payment History</Link>
    </nav>
  );
}
