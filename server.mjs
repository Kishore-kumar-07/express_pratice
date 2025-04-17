import express from "express";
import { testMiddleWare } from "./middleware/validationMiddleWare.mjs";
import userRouter from "./routes/userRoutes.mjs";
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cookieParser("hello_cookie"));

app.use(testMiddleWare);

app.use(userRouter);

app.get("/", (req, res) => {
  res.cookie("key", "value", { maxAge: 60000 * 60, signed: true });
  res.status(200).send({ msg: "HELLO" });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
