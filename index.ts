import express from "express";
import cors from "cors";
import { router as users } from "./routes/users";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/users', users);

app.get('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'not found' });
});

// app.use((req, res, next) => {
//   if (err.type === 'entity.parse.failed') {
//     return res.status(400).json({ message: 'bad request' });
//   }
//   next(err);
// });

module.exports = app;