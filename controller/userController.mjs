import { validationResult, matchedData, cookie } from "express-validator";
import { userData } from "../utils/constants.mjs";

//get Method
const allData = (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  console.log(req.signedCookies.key);
  if(!req.signedCookies.key || !req.signedCookies.key === "value"){
    return res.status(400).send({msg : "No Cookie"})
  }
  const { col, val } = req.query;
  if (col && val) {
    const users = userData.filter((user) => {
      return user[col]?.toString().toLowerCase().includes(val.toLowerCase());
    });

    return res.status(201).send({ data: users, cookie: req.cookies });
  }
  res.status(201).send({ data: userData, cookie: req.cookies });
};
//get Method
const dataFromParams = (req, res) => {
  const { id } = req.params;
  console.log(id, "ugyftdrzertyunm");
  const user = userData.filter((user) => user.id === parseInt(id));
  console.log(user);
  if (user.length == 0) return res.sendStatus(404);
  res.status(201).send(user);
};

//postMethod
const addData = (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ error: result.array() });
  }
  const data = matchedData(req);

  const { name, age, email } = data;

  const newUser = {
    id: userData.length + 1,
    name,
    age,
    email,
  };

  userData.push(newUser);

  return res.status(201).send({ status: "ok", data: data });
};

//put Method
const completeDataUpdate = (req, res) => {
  const { body, userIndex } = req;

  userData[userIndex] = {
    id: userData[userIndex].id,
    ...body,
  };
  res.status(200).send({ status: "ok", msg: "Updated" });
};

//patch Method
const partialDataUpdate = (req, res) => {
  const { body, userIndex } = req;

  userData[userIndex] = {
    ...userData[userIndex],
    ...body,
  };
  res.status(200).send({ status: "ok", msg: "Updated" });
};

//delete Method
const deleteData = (req, res) => {
  const { userIndex } = req;

  userData.splice(userIndex, 1);
  return res.sendStatus(200);
};

export {
  addData,
  completeDataUpdate,
  partialDataUpdate,
  deleteData,
  allData,
  dataFromParams,
};
