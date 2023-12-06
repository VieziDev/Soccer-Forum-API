// // authRoutes.ts

// import express from 'express';
// import UserController from '../controllers/userController';
// import { authenticateToken } from '../middlewares/authMiddleware';

// const router = express.Router();

// router.post('/register', UserController.register);
// router.post('/login', UserController.login);

// // Exemplo de rota protegida utilizando o middleware de autenticação
// router.get('/rota-protegida', authenticateToken, (req, res) => {
//   res.status(200).json({ message: 'Esta é uma rota protegida' });
// });

// export default router;
