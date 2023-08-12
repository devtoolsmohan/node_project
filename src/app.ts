import express from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from "./routes/postRoutes";
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 5000;

app.use(bodyParser.json());
app.use('/api/', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


