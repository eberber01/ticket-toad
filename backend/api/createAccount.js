import UserModel from "../model/UserModel.js";


export const createAccount = (req, res) => {
  UserModel.create(
    {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    },
    (err, user) => {
      res.send(user);
    }
  );
};
