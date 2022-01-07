import TeamModel from "../model/TeamModel.js";
import UserModel from "../model/UserModel.js";

export const joinTeam = (req, res) => {
    console.log(req.body)

  TeamModel.findOne({ accessCode: req.body.accessCode }, (err, Team) => {
    if (Team) {
      Team.users.push(req.body.email);

      UserModel.updateOne(
        {
          email: req.body.email,
        },
        { team: true },(err, User)=>{
            console.log(User)
        }
      );
      Team.save()

    } else {
      res.json({message: "Invalid Code" })
    }
    
  });
};
