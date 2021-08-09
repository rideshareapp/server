import express from "express";
import cors from "cors";
import router from "./routes";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
// app.disable("x-powered-by");

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

console.log(`App is listening on port ${process.env.PORT || 9000}.`);

module.exports = app;