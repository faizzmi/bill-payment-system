CREATE DATABASE electricity_billing;

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