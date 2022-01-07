import TeamModel from "../model/TeamModel.js";

export const createNewTicket = (req, res) => {
  TeamModel.findOne({ users: req.body.email }, (err, Team) => {
    Team.tickets.unshift({
      // ticketID: req.body.ticketID,
      title: req.body.title,
      description: req.body.description,
      creator: req.body.creator,
      assigned: req.body.assigned,
      status: req.body.status,
    
    });
    Team.save();
  });
};