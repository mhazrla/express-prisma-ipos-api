import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import customerRouter from './routes/customerRoute';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/userRoute';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/users', userRouter);

export default app