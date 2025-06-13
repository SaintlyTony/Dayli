import express from 'express';
import cors from 'cors';
import pool from './db.js';
import { authenticate, login } from './auth.js';

const app = express();
const fallbackMenu = [{id:1,name:'Овсянка',calories:300},{id:2,name:'Куриная грудка',calories:450}];
app.use(cors());
app.use(express.json());

app.post('/login', login);

app.get('/menu', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, name, calories FROM menu');
    res.json({ menu: rows });
  } catch (err) {
    console.error(err);
    res.status(200).json({ menu: fallbackMenu });
  }
});

app.post('/orders', authenticate, async (req, res) => {
  const { items, address } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO orders(items, address) VALUES($1, $2) RETURNING id',
      [JSON.stringify(items), address]
    );
    res.status(201).json({ id: rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.get('/orders', authenticate, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, items, address FROM orders');
    res.json({ orders: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

export default app;

