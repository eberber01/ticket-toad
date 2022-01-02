import { ObjectId } from "mongodb";
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
    comments:{
        type: [Object],
        default: []
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
        type: Date,
        required: false,
        default: Date.now()
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
       
    }
    
})

const TeamModel = mongoose.model("teams", TeamSchema)

export default TeamModel;