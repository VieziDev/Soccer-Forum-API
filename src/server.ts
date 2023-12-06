import express from 'express';
import connectDatabase from './database/database'
import authRoutes from './routes/authRoutes';


const app = express();

connectDatabase();

// Middlewares
app.use(express.json());

// Rotas de autenticação
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



export default app;
