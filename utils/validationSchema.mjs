export const userVadationSchema = {
  name: {
    isString: {
      errorMessage: "Name Should Be String...",
    },
    notEmpty: {
      errorMessage: "Name must be entered",
    },
    isLength: {
      options: {
        min: 5,
        max: 25,
      },
      errorMessage: "Name should be of length 10 - 25",
    },
  },
  age: {
    isNumeric: {
      errorMessage: "age Sholud me a number",
    },
    notEmpty: {
      errorMessage: "age should be entered",
    },
    isInt: {
      options: {
        min: 10,
        max: 25,
      },
      errorMessage: "Age Should be between 10 - 25",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Email should be given",
    },
  },
};
