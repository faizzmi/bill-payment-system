const express = require('express');
const cors = require("cors");

const billsRouter = require("./routes/bills.js");
const paymentsRouter = require("./routes/payments.js");
const port  = process.env.PORT;

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// mount routers
app.use("/api/bills", billsRouter);
app.use("/api", paymentsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
