const db = require('../database/db');

async function getCustomerById(id) {
  const res = await db.query('SELECT * FROM customers WHERE id = $1', [id]);
  return res.rows[0];
}

module.exports = { getCustomerById };
