import express, { response } from 'express';
import connectDatabase from './database/database';
import router from 'routes/router';
import swaggerUi from "swagger-ui-express";
import swaggerDocs from './swagger.json';

const app = express();

connectDatabase();

// Middlewares
app.use(express.json());

app.get("/terms", (req, res) => {
  return res.json({
    message: "Termos de Serviço",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use("/v1", router);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



export default app;
