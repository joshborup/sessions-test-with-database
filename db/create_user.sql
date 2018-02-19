INSERT INTO Users (name, password) VALUES($1, $2);
SELECT * FROM Users
WHERE name = $1;