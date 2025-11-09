import express from 'express';
import "dotenv/config";
import cors from 'cors';
import customerRouter from './routes/customerRoute';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from Express + TS + Prisma!');
});
app.use('/api/v1/', customerRouter);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

