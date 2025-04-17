export const validateUserData = (req, res, next) => {
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

export const testMiddleWare = (req, res, next) => {
  console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
  next();
};
