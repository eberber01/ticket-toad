
import { ObjectID } from "bson";
import { ObjectId } from "mongodb";
import  mongoose  from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    team:{
        type: Boolean,
        required: true,
        default: false
    }
}, {versionKey: false})


const UserModel = mongoose.model("users", UserSchema)

export default UserModel;