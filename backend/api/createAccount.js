import UserModel from "../model/UserModel.js";

export const createAccount = (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, User) => {
    if (User) {
      res.json({ accountCreated: false, message: "Email is already taken" });
    } else {
      UserModel.create(
        {
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
        },
        (err, user) => {
          res.json({accountCreated: true})
        }
      );
    }
  });
};
