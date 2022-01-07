import UserModel from "../model/UserModel.js";

export const login = (req, res) => {
  UserModel.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (user) {
        if (user.password == req.body.password) {
          console.log(`User  ${user.email} has logged in `);
          res.json(user);
        }
        if (user.password != req.body.password) {
          res.json({ login: false, message: "Wrong password" });
        }
      }
      else{
        res.json({login: false, message: "Invalid Email Address"})
      }
    }
  );
};
