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

 -- Sample Customers
INSERT INTO Customers (name, email, account_number, address)
VALUES 
('Faiz Azmi', 'faiz.azmi@example.com', 'ACC1001', 'Kuala Lumpur'),
('John Doe', 'john.doe@example.com', 'ACC1002', 'Penang');

-- Sample Bills
INSERT INTO Bills (customer_id, billing_month, kwh_usage, bill_amount, due_date, status)
VALUES
(1, '2025-08-31', 250, 30.00, '2025-09-15', 'pending'),
(1, '2025-09-30', 400, 48.00, '2025-10-15', 'pending'),
(2, '2025-08-31', 300, 36.00, '2025-09-20', 'pending');

-- Sample Payments
INSERT INTO Payments (bill_id, amount, payment_method, status)
VALUES
(1, 30.00, 'credit_card', 'paid'),
(3, 36.00, 'bank_transfer', 'paid');
