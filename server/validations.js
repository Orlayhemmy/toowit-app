export const loginValidation = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({
      message: 'All or some fields are not defined'
    });
  }

  if(username && !/^[a-zA-Z ]+$/.test(username)) {
    return res.status(400).send({
      message: 'Username can only be letters and numbers'
    });
  }
  next();
}

export const registerValidation =  (req, res, next) => {
  const { username, password, fullname } = req.body;
  let error = {};

  if (!username || !password || !fullname ) {
    return res.status(400).send({
      message: 'All or some fields are not defined'
    });
  }

  Object.entries(req.body).forEach(entry => {
      if (entry[1] !== null) {
        if (!/^[a-zA-Z ]+$/.test(entry[1])) {
          if (entry[0] === 'fullname') {
            error = {
              ...error,
              [`${entry[0]}`]: `${entry[0]} can only contain letters`,
            };
          }
          if (entry[0] === 'username') {
            error = {
              ...error,
              [`${entry[0]}`]: `${entry[0]} can only contain letters and numbers`,
            };
          }
        }
        if (entry[1].length < 5 || entry[1].length > 30 ) {
          if (entry[0] === 'fullname' || entry[0] === 'username') {
            error = {
              ...error,
              [`${entry[0]}`]: `${entry[0]} must be more than 5 characters but less than 30`,
            }
          }
        }
      }
    return error;
  });
  const isValid = Object.keys(error).length === 0;
  if (!isValid) {
    return res.status(400).send(error);
  }
  next();
}