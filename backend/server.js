import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import route from "./routes/router.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

/* -------------------------------------------------------------------------- */
/*                       SET MONGODB CONNECTION URL HERE                      */
/* -------------------------------------------------------------------------- */
const CONNECTION_URL = process.env.TICKET_TOAD_DB;

app.use(express.json());
app.use(cors());
app.use("/", route);

mongoose.connect(CONNECTION_URL).then(console.log("Connected to database"));

app.listen(PORT || 4000, () => {
  console.log(`Server is running`);
});
