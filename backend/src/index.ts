import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
const app = express();
const port = process.env.BACKEND_PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Example app listening at http://localhost:${port}`);
});
