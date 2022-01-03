import TeamModel from "../model/TeamModel.js";
import UserModel from "../model/UserModel.js"


export const createTeam = async (req, res) => {
  await TeamModel.create({
    name: req.body.team,
    admin: req.body.email,
    users: req.body.email
  });

  await UserModel.updateOne(
    {
      email: req.body.email,
    },
    { team: true }
  );
};