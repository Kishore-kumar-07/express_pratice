import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const validateUser = (req, res, next) => {
  const authHead = req.headers["authorization"];
  const token = authHead && authHead.split(" ")[1];
  console.log(token);
  if (token === null) return res.sendStatus(403);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      console.log("IN err");
      return res.sendStatus(401);
    }
    console.log("From MiddleWare", user);
    req.user = user;
    next();
  });
};
