import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from './lib/User';

const payload = (name) => {
  return jwt.sign({ name }, process.env.SECRET, {
    expiresIn: 60 * 60 * 12
  });
}

export const loginUser = (req, res) => {
  const { username, password } = req.body; 

  User.findOne({ username: username.toLowerCase() }, function(err, user) {
    if (err) {
      return res.status(500).send();
    }

    if (!user) {
      return res.status(400).send({
        message: 'Wrong username/password',
      });
    }

    const check = bcrypt.compareSync(password, user.password);
    if (check) {
      const token = payload(user.fullname);

      return res.status(200).send({
        message: 'User logged in',
        data: token
      });
    }
    return res.status(400).send({
      message: 'Wrong username/password',
    });
  });
}

export const registerUser = (req, res) => {
  const { username, password, fullname } = req.body;

  User.findOne({ username: username.toLowerCase() }, function(err, user) {
    if (err) {
      return res.status(500).send();
    }

    if (!user) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
    
      const new_user = new User();
      new_user.fullname = fullname.toLowerCase();
      new_user.username = username.toLowerCase();
      new_user.password = hash;
    
      new_user.save(function(err, savedUser) {
        if (err) {
          return res.status(500).send();
        }

        const token = payload(fullname.toLowerCase());
        return res.status(200).send({
          message: 'User signed up!',
          data: token,
        });
      });
    }

    return res.status(400).send({
      message: 'Username already exists',
    });
  });
}