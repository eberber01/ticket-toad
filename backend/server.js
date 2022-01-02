import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongodb, { MongoClient } from "mongodb";
import mongoose from "mongoose";
import TeamModel from "./model/TeamModel.js";
import UserModel from "./model/UserModel.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.TICKET_TOAD_TEST_DB;
app.use(express.json());
app.use(cors());
var ObjectId = mongoose.Types.ObjectId;

mongoose.connect(CONNECTION_URL).then(console.log("Connected to database"));

//fix
app.post("/getTickets", (req, res) => {
  TeamModel.findOne({ users: req.body.email }, (err, Team) => {
    res.json(Team.tickets);
  });
});

app.post("/getTeamUsers", (req, res) => {
  TeamModel.findOne({ users: req.body.email }, (err, Team) => {
    res.json(Team.users);
  });
});

app.post("/login", (req, res) => {
  UserModel.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (user.password == req.body.password) {
        console.log("logged in true");
        res.json(user);
      } else if (user.password != req.body.password) {
        res.json({ login: false });
      } else {
        res.json({ login: null });
      }
    }
  );
});
app.post("/createAccount", (req, res) => {
  UserModel.create(
    {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    },
    (err, user) => {
      res.send(user);
    }
  );
});

app.post("/createNewTicket", (req, res) => {
  TeamModel.findOne({ users: req.body.email }, (err, Team) => {
    Team.tickets.push({
      // ticketID: req.body.ticketID,
      title: req.body.title,
      description: req.body.description,
      creator: req.body.creator,
      assigned: req.body.assigned,
      status: req.body.status,
    });
    Team.save();
  });
});

app.post("/updateTicket", async (req, res) => {
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
});

app.post("/findTicket", (req, res) => {
  TeamModel.findOne(
    { "tickets._id": new ObjectId(req.body._id) },
    { "tickets.$": 1 },
    (err, ticket) => {
      console.log(ticket);
      res.json(ticket);
    }
  );
});

app.post("/deleteTicket", (req, res) => {
  TeamModel.updateOne(
    { "tickets._id": req.body._id },
    { $pull: { tickets: { _id: req.body._id } } },
    { safe: true, multi: true },
    (err, obj) => {
      console.log(obj);
    }
  );
});

app.post("/createTeam", async (req, res) => {
  await TeamModel.create({
    name: req.body.team,
    admin: req.body.email,
    users: req.body.email,
  });

  await UserModel.updateOne(
    {
      email: req.body.email,
    },
    { team: true }
  );
});

app.post("/createComment", (req, res) => {
  TeamModel.findByIdAndUpdate({
    
    "_id": req.body._id
  }, { $push :{ "tickets.$.comments": {
    title: req.body.title,
    description: req.body.description,
    user: req.body.user
  }}}, (err, obj)=>{
    console.log(obj)
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
