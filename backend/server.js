const express = require('express');
const billsRouter = require("./routes/bills.js");
const paymentsRouter = require("./routes/payments.js");

const app = express();

app.use(express.json());

// mount routers
app.use("/api/bills", billsRouter);
app.use("/api", paymentsRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
