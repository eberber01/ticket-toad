import TeamModel from "../model/TeamModel.js";


export const findTicket =  (req, res) => {
  TeamModel.findOne(
    { "tickets._id": req.body._id },
    { "tickets.$": 1 },
    (err, ticket) => {
      console.log(ticket);
      res.json(ticket);
    }
  );
};
