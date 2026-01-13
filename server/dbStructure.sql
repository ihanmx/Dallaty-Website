CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150),
    description TEXT,
    location VARCHAR(100),
    file VARCHAR(255), -- stores file path
    resource VARCHAR(100),
    terms BOOLEAN DEFAULT false,
    fees BOOLEAN DEFAULT false
);