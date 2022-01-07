import { newToadCode } from "../services/newToadCode.js";
import { newToadDate } from "../services/newToadDate.js";
import  mongoose  from "mongoose";

const { Schema } = mongoose;

const TicketSchema = new Schema({
    title:{
        type:String,
        required: false 
    },
    description:{
        type:String,
        required: false 
    },
    creator:{
        type: String,
        required: false
    },
    assigned:{
        type: String,
        required: false 
    },
    status:{
        type: String,
        required: false 
    },
    date:{
        type: String,
        required: true,
        default: newToadDate() 
    }
})

const TeamSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    admin: {
        type: [ String ],
        required: true
    },

    users:{
        type: [ String ],
        required: true
    },
    tickets:{
        type: [ TicketSchema ],
        required:false,
       
    },
    accessCode: {
        type: String,
        required: true,
        default: newToadCode()
        
    }
    
})

const TeamModel = mongoose.model("teams", TeamSchema)

export default TeamModel;