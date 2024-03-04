// controllers/AuthController.ts

import { Request, Response } from 'express';
import UserService from '../services/authService';

const userService = new UserService();

export default class AuthController {
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      const userExists = await userService.checkIfUserExists(email);

      if (userExists) {
        res.status(400).json({ message: 'O usuário já existe' });
        return;
      }

      await userService.registerUser(username, email, password);
      res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const accessToken = await userService.loginUser(email, password);

      if (!accessToken) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      res.status(200).json({
        message: "Login successful",
        accessToken
      });
    } catch (e) {
      const error = e as Error;
      res.status(500).json({ error: error.message });
    }
  }
}
