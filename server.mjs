import express from "express";
import { body, validationResult, matchedData } from "express-validator";

const app = express();

const port = process.env.PORT || 3000;
var userData = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 25,
    email: "alice.johnson@example.com",
  },
  {
    id: 2,
    name: "Bob Smith",
    age: 30,
    email: "bob.smith@example.com",
  },
  {
    id: 3,
    name: "Charlie Lee",
    age: 28,
    email: "charlie.lee@example.com",
  },
  {
    id: 4,
    name: "Diana Green",
    age: 22,
    email: "diana.green@example.com",
  },
  {
    id: 5,
    name: "Ethan Brown",
    age: 35,
    email: "ethan.brown@example.com",
  },
  {
    id: 6,
    name: "Fiona White",
    age: 29,
    email: "fiona.white@example.com",
  },
  {
    id: 7,
    name: "George Wilson",
    age: 32,
    email: "george.wilson@example.com",
  },
  {
    id: 8,
    name: "Hannah Davis",
    age: 26,
    email: "hannah.davis@example.com",
  },
  {
    id: 9,
    name: "Ian Miller",
    age: 27,
    email: "ian.miller@example.com",
  },
  {
    id: 10,
    name: "Julia Clark",
    age: 24,
    email: "julia.clark@example.com",
  },
];

app.use(express.json());

const testMiddleWare = (req, res, next) => {
  console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
  next();
};

const validateUserData = (req, res, next) => {
  console.log("middle ware");
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) return res.sendStatus(400);

  const userIndex = userData.findIndex((user) => user.id === parsedId);

  if (userIndex === -1) return res.sendStatus(404);

  req.userIndex = userIndex;

  next();
};

app.use(testMiddleWare);

app.get("/", (req, res) => {
  res.status(200).send({ msg: "HELLO" });
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = userData.filter((user) => user.id === id);
  if (user.length == 0) return res.sendStatus(404);
  res.status(201).send(user);
});

app.get("/api/users", (req, res) => {
  const { col, val } = req.query;
  console.log(col, val);
  if (col && val) {
    const users = userData.filter((user) => {
      return user[col]?.toString().toLowerCase().includes(val.toLowerCase());
    });

    res.status(201).send(users);
  }

  res.status(201).send(userData);
});

app.post(
  "/api/addData",
  [
    body("name")
      .isString()
      .withMessage("Name should be string")
      .notEmpty()
      .withMessage("Name must be given")
      .isLength({ min: 5, max: 15 }),
    body("age")
      .isNumeric()
      .withMessage("Age should be numeric")
      .notEmpty()
      .withMessage("Age should be given")
      .isInt({ min: 10, max: 25 })
      .withMessage("Age should be in the range 10 - 25"),
    body("email").notEmpty().withMessage("Email should be entered"),
  ],
  (req, res) => {
    const result = validationResult(req);


    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }

    const { name, age, email } = req.body;

    const newUser = {
      id: userData.length + 1,
      name,
      age,
      email,
    };

    userData.push(newUser);

    return res.sendStatus(201); 
  }
);

app.put("/api/updateData/:id", validateUserData, (req, res) => {
  const { body, userIndex } = req;

  userData[userIndex] = {
    id: userData[userIndex].id,
    ...body,
  };
  res.status(200).send({ status: "ok", msg: "Updated" });
});

app.patch("/api/updateData/:id", validateUserData, (req, res) => {
  const { body, userIndex } = req;

  userData[userIndex] = {
    ...userData[userIndex],
    ...body,
  };
  res.status(200).send({ status: "ok", msg: "Updated" });
});

app.delete("/api/deleteData/:id", validateUserData, (req, res) => {
  const { userIndex } = req;

  userData.splice(userIndex, 1);
  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
