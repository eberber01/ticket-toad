import TeamModel from '../model/TeamModel.js'

export const getTickets = (req, res) => {
  TeamModel.findOne({ users: req.body.email }, (err, Team) => {
    res.json(Team.tickets);
  });
};