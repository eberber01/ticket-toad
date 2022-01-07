import TeamModel from "../model/TeamModel.js";
import UserModel from "../model/UserModel.js"


export const createTeam =  (req, res) => {
   TeamModel.create({
    name: req.body.team,
    admin: req.body.email,
    users: req.body.email
  });

  UserModel.updateOne(
    {
      email: req.body.email,
    },
    { team: true }
  );
};