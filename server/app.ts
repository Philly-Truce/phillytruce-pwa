import { Request, Response, NextFunction } from "express";
import express from "express";
import "express-async-errors";
import Cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(Cors());
app.use(morgan("tiny"));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
