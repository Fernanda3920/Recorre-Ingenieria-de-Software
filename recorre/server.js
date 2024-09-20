import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado a la base de datos SQLite.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`);

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const insertUserQuery = `INSERT INTO users (username, password) VALUES (?, ?)`;

  db.run(insertUserQuery, [username, password], function (err) {
    if (err) {
      return res.status(400).json({ message: 'El usuario ya existe o hubo un error.' });
    }
    return res.status(201).json({ message: 'Registro exitoso', userId: this.lastID });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.get(query, [username, password], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    return res.status(200).json({ message: 'Inicio de sesión exitoso', userId: row.id });
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
