const db = require('../database/db');

async function createPayment({ bill_id, amount, payment_method }) {
  const result = await db.query(
    `INSERT INTO payments (bill_id, amount, payment_method, status)
     VALUES ($1, $2, $3, 'success') RETURNING *`,
    [bill_id, amount, payment_method]
  );
  return result.rows[0];
}

async function getPayments({ customer_id, bill_id }) {
  let query = `
    SELECT p.*, b.customer_id, b.billing_month, b.kwh_usage, b.bill_amount
    FROM payments p
    JOIN bills b ON b.id = p.bill_id`;
  const params = [];
  const clauses = [];

  if (customer_id) {
    params.push(customer_id);
    clauses.push(`b.customer_id = $${params.length}`);
  }
  if (bill_id) {
    params.push(bill_id);
    clauses.push(`b.id = $${params.length}`);
  }

  if (clauses.length) query += ' WHERE ' + clauses.join(' AND ');
  query += ' ORDER BY p.payment_date DESC LIMIT 100';

  const result = await db.query(query, params);
  return result.rows;
}

module.exports = { createPayment, getPayments };
