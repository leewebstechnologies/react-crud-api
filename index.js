import express from "express";
import mysql2 from "mysql2";
import dotenv from "dotenv";


dotenv.config();

const app = express();

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MySQL_PASSWORD,
  database: "test",
});

// An Express server middleware: It allows us to send any JSON file using a client
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello this is the backend."); //How to make API request using an express server
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `description`, `cover`) VALUES (?)";
  const values = [req.body.title, req.body.description, req.body.cover];

  db.query(q, [values], (error, data) => {
    if (error) return res.json(error);
    return res.json("Book has been created successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
