import TeamModel from "../model/TeamModel.js";


export const deleteTicket = (req, res) => {
  TeamModel.updateOne(
    { "tickets._id": req.body._id },
    { $pull: { tickets: { _id: req.body._id } } },
    { safe: true, multi: true },
    (err, obj) => {
      console.log(obj);
    }
  );
};