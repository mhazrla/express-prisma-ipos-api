import express from 'express';
import "dotenv/config";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from Express + TS + Prisma!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
