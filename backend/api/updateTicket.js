import TeamModel from "../model/TeamModel.js";


export const updateTicket =  (req, res) => {
  console.log(req.body.description);
  TeamModel.updateOne(
    { "tickets._id": req.body._id },
    {
      $set: {
        "tickets.$.title": req.body.title,
        "tickets.$.description": req.body.description,
        "tickets.$.status": req.body.status,
        "tickets.$.assigned": req.body.assigned,
      },
    },
    (err, Ticket) => {
      console.log(Ticket);
    }
  );
};
