const db = require('../database/db');

async function createBill({ customer_id, billing_month, kwh_usage, bill_amount, due_date }) {
  const result = await db.query(
    `INSERT INTO bills (customer_id, billing_month, kwh_usage, bill_amount, due_date, status)
     VALUES ($1, $2, $3, $4, $5, 'pending') RETURNING *`,
    [customer_id, billing_month, kwh_usage, bill_amount, due_date]
  );
  return result.rows[0];
}

async function getPendingBills() {
  const result = await db.query(
    `SELECT b.*, c.name AS customer_name, c.email, c.account_number
     FROM bills b
     JOIN customers c ON c.id = b.customer_id
     WHERE b.status = 'pending'
     ORDER BY b.due_date ASC`
  );
  return result.rows;
}

async function getBillById(id) {
  const result = await db.query(`SELECT * FROM bills WHERE id = $1`, [id]);
  return result.rows[0];
}

async function updateBillStatus(id, status) {
  const result = await db.query(
    `UPDATE bills SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
}

module.exports = { createBill, getPendingBills, getBillById, updateBillStatus };
