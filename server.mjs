import express from "express";

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

app.post("/api/addData", (req, res) => {
  const { name, age, email } = req.body;
  if (name && age && email) {
    const newUser = {
      id: userData.length + 1,
      name: name,
      age: age,
      email: email,
    };
    userData.push(newUser);

    res.sendStatus(201);
  }

  res.sendStatus(400);
});

app.put("/api/updateData/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  console.log(req);
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) return res.sendStatus(400);

  const userIndex = userData.findIndex((user) => user.id === parsedId);

  if (userIndex === -1) return res.sendStatus(404);

  userData[userIndex] = {
    id: parsedId,
    ...body,
  };
  res.status(200).send({ status: "ok", msg: "Updated" });
});

app.patch("/api/updateData/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  console.log(req);
  const parsedId = parseInt(id);

  if (isNaN(parsedId)) return res.sendStatus(400);

  const userIndex = userData.findIndex((user) => user.id === parsedId);

  if (userIndex === -1) return res.sendStatus(404);

  userData[userIndex] = {
    ...userData[userIndex],
    ...body,
  };
  res.status(200).send({ status: "ok", msg: "Updated" });
});

app.delete("/api/deleteData/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const userIndex = userData.findIndex((user) => user.id === parsedId);
  if (userIndex === -1) return res.sendStatus(404);

  userData.splice(userIndex, 1);
  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
