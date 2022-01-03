import express from "express";
import { getTickets } from "../api/getTickets.js";
import { getTeamUsers } from "../api/getTeamUsers.js";
import { login } from "../api/login.js";
import { createAccount } from "../api/createAccount.js";
import { createNewTicket } from "../api/createNewTicket.js";
import { updateTicket } from "../api/updateTicket.js";
import { findTicket } from "../api/findTicket.js";
import { deleteTicket } from "../api/deleteTicket.js";
import { createTeam } from "../api/createTeam.js";
import { joinTeam } from "../api/joinTeam.js";

const route = express.Router();

//api

route.post("/getTickets", getTickets);

route.post("/getTeamUsers", getTeamUsers);

route.post("/login", login);

route.post("/createAccount", createAccount);

route.post("/createNewTicket", createNewTicket);

route.post("/updateTicket", updateTicket);

route.post("/findTicket", findTicket);

route.post("/deleteTicket", deleteTicket);

route.post("/createTeam", createTeam);

route.post("/joinTeam", joinTeam)

// route.post("/createComment", (req, res) => {
//   TeamModel.findByIdAndUpdate({

//     "_id": req.body._id
//   }, { $push :{ "tickets.$.comments": {
//     title: req.body.title,
//     description: req.body.description,
//     user: req.body.user
//   }}}, (err, obj)=>{
//     console.log(obj)
//   });
// });

export default route;
