import express from "express";
import "express-async-errors";
import Cors from "cors";
import morgan from "morgan";
const app = express();
app.use(express.json());
app.use(Cors());
app.use(morgan("tiny"));
app.use((req, res, next) => {
    res.sendStatus(200);
});
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
