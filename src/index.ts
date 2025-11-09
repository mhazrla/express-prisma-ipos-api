import "dotenv/config";
import app from "./app";

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express + TS + Prisma!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

