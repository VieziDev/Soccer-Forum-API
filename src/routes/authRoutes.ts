// authRoutes.ts

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import 'dotenv/config'
import { authenticateToken } from 'middlewares/authMiddleware';

require('dotenv').config()

const router = express.Router();

// Rota de registro de usuário
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
});

// Rota de login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const accessToken = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY as string);
    res.status(200).json({ accessToken });
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: error.message });
  }
});

router.get('/rota-protegida', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Esta é uma rota protegida' });
});


router.get('/')

export default router;
