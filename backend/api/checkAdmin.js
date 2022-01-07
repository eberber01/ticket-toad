import TeamModel from "../model/TeamModel.js";

export const checkAdmin = (req, res) => {
  TeamModel.findOne({ admin: req.body.email }, (err, User) => {
    if (User) {
      res.json({admin: true});
    }
    else{
        res.json({admin: false})
    }
  });
};

