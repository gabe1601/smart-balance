CREATE TABLE transaction(
    id SERIAL PRIMARY KEY,
    description VARCHAR (255),
    quantity INTEGER
    value DECIMAL (10,2),
    date DATE,
    type VARCHAR (30),
    buyer VARCHAR (255)
);