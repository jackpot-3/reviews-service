DROP DATABASE IF EXISTS reviews_db;
CREATE DATABASE IF NOT EXISTS reviews_db;


USE reviews_db;

CREATE TABLE products (
	id SERIAL PRIMARY KEY
);

CREATE TABLE reviews (
	id SERIAL PRIMARY KEY,
	product_id INT NOT NULL,
	username VARCHAR(50),
	is_verified INT NOT NULL,
	review_text TEXT,
	score INT NOT NULL,
	found_helpful INT,
	title VARCHAR (125),
	review_date DATE,
	FOREIGN KEY (product_id) REFERENCES products(id)
);
