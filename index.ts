import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
router(app);

app.get('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'not found' });
});

// app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//       console.error(err);
//       return res.sendStatus(400); // Bad request
//   }
//   next();
// });

module.exports = app;