// authRoutes.ts

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import 'dotenv/config'
import { authenticateToken } from 'middlewares/authMiddleware';
import AuthController from 'controllers/authController';

require('dotenv').config()

const router = express.Router();
const authController = new AuthController();

// Rota de registro de usuário
router.post('/register', authController.registerUser);

// Rota de login de usuário
router.post('/login', authController.loginUser);


router.get('/')

export default router;
