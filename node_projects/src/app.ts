import express from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from "./routes/postRoutes";
import bodyParser from 'body-parser';


const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.use(bodyParser.json());
app.use('/', userRoutes);
app.use('/posts', postRoutes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

