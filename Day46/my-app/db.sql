
-- ==========================================
-- 1. EXTENSION
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 2. USERS
-- ==========================================
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES (
    '410544b2-4001-4271-9855-fec4b6a6442a',
    'User',
    'user@nextmail.com',
    '$2b$10$jSjt02MQY.zQ4VTdwRThAeSDgEW3cHuiaKYZ5jXIA1VgOPtVBk/Gi'
)
ON CONFLICT (id) DO NOTHING;

-- ==========================================
-- 3. CUSTOMERS
-- ==========================================
CREATE TABLE IF NOT EXISTS customers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

INSERT INTO customers (id, name, email, image_url)
VALUES
(
    '13d07535-c59e-4157-a011-f8d2ef4e0cbb',
    'Balazs Orban',
    'balazs@orban.com',
    '/customers/balazs-orban.png'
),
(
    '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    'Delba de Oliveira',
    'delba@oliveira.com',
    '/customers/delba-de-oliveira.png'
),
(
    '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    'Lee Robinson',
    'lee@robinson.com',
    '/customers/lee-robinson.png'
),
(
    '76d65c26-f784-44a2-ac19-586678f7c2f2',
    'Michael Novotny',
    'michael@novotny.com',
    '/customers/michael-novotny.png'
),
(
    'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
    'Amy Burns',
    'amy@burns.com',
    '/customers/amy-burns.png'
),
(
    'd6e15727-9feb-48be-ab06-f3f8392484c5',
    'Evil Rabbit',
    'evil@rabbit.com',
    '/customers/evil-rabbit.png'
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    email = EXCLUDED.email,
    image_url = EXCLUDED.image_url;

-- ==========================================
-- 4. INVOICES
-- ==========================================
CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL REFERENCES customers(id),
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

-- Chỉ thêm hóa đơn nếu chưa có bản ghi tương ứng
INSERT INTO invoices (customer_id, amount, status, date)
SELECT *
FROM (
    VALUES
    ('3958dc9e-742f-4377-85e9-fec4b6a6442a'::UUID, 100000, 'pending', '2022-10-17'::DATE),
    ('3958dc9e-742f-4377-85e9-fec4b6a6442a'::UUID, 20000, 'pending', '2022-06-12'::DATE),
    ('3958dc9e-742f-4377-85e9-fec4b6a6442a'::UUID, 444300, 'pending', '2022-11-26'::DATE),
    ('3958dc9e-712f-4377-85e9-fec4b6a6442a'::UUID, 55500, 'paid', '2022-12-06'::DATE),
    ('d6e15727-9feb-48be-ab06-f3f8392484c5'::UUID, 71949, 'paid', '2022-11-14'::DATE),
    ('d6e15727-9feb-48be-ab06-f3f8392484c5'::UUID, 1250, 'paid', '2022-10-29'::DATE),
    ('3958dc9e-742f-4377-85e9-fec4b6a6442a'::UUID, 32545, 'paid', '2023-06-17'::DATE),
    ('3958dc9e-742f-4377-85e9-fec4b6a6442a'::UUID, 1250, 'paid', '2023-04-24'::DATE)
) AS data(customer_id, amount, status, date)
WHERE NOT EXISTS (
    SELECT 1
    FROM invoices i
    WHERE i.customer_id = data.customer_id
      AND i.amount = data.amount
      AND i.status = data.status
      AND i.date = data.date
);

-- ==========================================
-- 5. REVENUE
-- ==========================================
CREATE TABLE IF NOT EXISTS revenue (
    month VARCHAR(4) NOT NULL UNIQUE,
    revenue INT NOT NULL
);

INSERT INTO revenue (month, revenue)
VALUES
('Jan', 2000),
('Feb', 1800),
('Mar', 2200),
('Apr', 2500),
('May', 2300),
('Jun', 3200),
('Jul', 3500),
('Aug', 3700),
('Sep', 2500),
('Oct', 2800),
('Nov', 3000),
('Dec', 4800)
ON CONFLICT (month) DO UPDATE SET
    revenue = EXCLUDED.revenue;

-- ==========================================
-- 6. KIỂM TRA DỮ LIỆU
-- ==========================================

-- Kiểm tra số lượng khách hàng
SELECT COUNT(*) AS total_customers FROM customers;

-- Kiểm tra số lượng hóa đơn
SELECT COUNT(*) AS total_invoices FROM invoices;

-- Kiểm tra doanh thu từng tháng
SELECT * FROM revenue ORDER BY
    CASE month
        WHEN 'Jan' THEN 1
        WHEN 'Feb' THEN 2
        WHEN 'Mar' THEN 3
        WHEN 'Apr' THEN 4
        WHEN 'May' THEN 5
        WHEN 'Jun' THEN 6
        WHEN 'Jul' THEN 7
        WHEN 'Aug' THEN 8
        WHEN 'Sep' THEN 9
        WHEN 'Oct' THEN 10
        WHEN 'Nov' THEN 11
        WHEN 'Dec' THEN 12
    END;
