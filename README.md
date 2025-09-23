# Bill Payment System - Electricity Bills

## Overview

This project is a simplified **bill payment system** for electricity bills. It allows users to view pending bills, process payments, and check payment history. The project is built using a **Node.js + Express backend**, **PostgreSQL database**, and **Next.js frontend**.

---

## Table of Contents

- [Features](#features)  
- [Technology Stack](#technology-stack)  
- [Installation & Setup](#installation--setup)  
- [Database Configuration](#database-configuration)  
- [API Endpoints](#api-endpoints)  
- [Running the Application](#running-the-application)  
- [Sample Data](#sample-data)  
- [Assumptions & Design Decisions](#assumptions--design-decisions)

---

## Features

**Backend:**

- Generate monthly bills from usage  
- Retrieve all pending bills  
- Process bill payments  
- Retrieve payment history  

**Frontend:**

- Bill summary page  
- Payment form with amount and method selection  
- Payment confirmation with success/failure  
- Display of current month usage  

**Business Logic:**

- Electricity rate: $0.12 per kWh  
- Payment validation: amount must match bill amount  
- Update bill status to `paid` on successful payment  

**Validation:**

- kWh usage: positive, max 9999  
- Payment amount matches bill amount  
- Required fields checked for all operations  
- Dates validated for proper format  

---

## Technology Stack

**Backend:** Node.js, Express.js  
**Database:** PostgreSQL  
**Frontend:** Next.js (React)  
**Optional:** Tailwind CSS for styling  

---

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/bill-payment-system.git
cd bill-payment-system
```
2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Database Configuration

1. Create a PostgreSQL database:

```bash
CREATE DATABASE bill_payment;
```
2. Run schema to create tables:

```bash

#in schema.sql
-- customer table
CREATE TABLE Customers (
   id SERIAL PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   email VARCHAR(100) UNIQUE NOT NULL,
   account_number VARCHAR(20) UNIQUE NOT NULL,
   address TEXT NOT NULL
 );
 
-- bills table
CREATE TABLE Bills (
   id SERIAL PRIMARY KEY,
   customer_id INT REFERENCES Customers(id),
   billing_month DATE NOT NULL,
   kwh_usage DECIMAL(6,2) NOT NULL,
   bill_amount DECIMAL(10,2) NOT NULL,
   due_date DATE NOT NULL,
   status VARCHAR(20) DEFAULT 'pending'
 );

-- payment table
CREATE TABLE Payments (
   id SERIAL PRIMARY KEY,
   bill_id INT REFERENCES Bills(id),
   amount DECIMAL(10,2) NOT NULL,
   payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   payment_method VARCHAR(50) NOT NULL,
   status VARCHAR(20) DEFAULT 'paid'
 );
```

3. Configure database connection in backend/database/config.js (or .env):

```bash
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=bill_payment
DB_PORT=5432
```

## API Endpoints
### Bills
```bash
POST /api/bills
# Generate monthly bill from usage

GET /api/bills/pending
# Retrieve all unpaid bills
```

Sample Response:
```bash
{
  "success": true,
  "data": [
    {
      "id": 1,
      "customer_id": 1,
      "billing_month": "2024-09",
      "kwh_usage": 450,
      "bill_amount": 54.00,
      "due_date": "2024-10-15",
      "status": "pending"
    }
  ]
}
```
### Payments
```bash
POST /api/payments
## Process a bill payment
```
Request Body:
```bash
{
  "bill_id": 1,
  "amount": 54.00,
  "payment_method": "credit_card"
}
```

Response:
```bash
{
  "success": true,
  "message": "Payment processed successfully",
  "payment_id": 123,
  "new_bill_status": "paid"
}
```
### Payment History
```bash
GET /api/payment-history?customer_id=1
Retrieve payment records for a customer
```

## Running the Application

1. Backend:
```bash
cd backend
npm run dev
```

2. Frontend:
```bash
cd frontend
npm run dev
```

Visit: http://localhost:3000

### Add Sample Data
```bash
Add sample data in database/seed.sql:

INSERT INTO customers (name, email, account_number, address)
VALUES ('Faiz Azmi', 'faiz.azmi@example.com', 'ACC1001', 'Kuala Lumpur');

INSERT INTO bills (customer_id, billing_month, kwh_usage, bill_amount, due_date)
VALUES (1, '2025-08-31', 250, 30.00, '2025-10-14');
```

## Assumptions & Design Decisions

- Payment methods supported: Credit Card, Bank Transfer
- No authentication/authorization required
- Focus on functionality and data validation, minimal UI design

- API returns consistent response structure with success and message fields

- Frontend uses Next.js with Tailwind CSS for a simple, responsive layout
