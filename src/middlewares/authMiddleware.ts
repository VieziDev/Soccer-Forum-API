import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

require('dotenv').config()

declare global {
  namespace Express {
    interface Request {
      user?: any; // Define o tipo de 'user' conforme necessário
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Token de autenticação não fornecido' });
  } else {
    jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
      if (err) {
        res.status(403).json({ message: 'Token inválido' });
      } else {
        req.user = user;
        next();
      }
    });
  }
};
