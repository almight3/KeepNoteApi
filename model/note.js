import mongoose from "mongoose";
const {Schema} = mongoose;

const notesScheam = new Schema({
    user:{
       type:mongoose.Schema.ObjectId,
       ref:"User",
       required:true
    },
    title:{
        type:String,
        required:[true,"title is required"]
    },
    description:{
        type:String,
        required:[true,"discription is required"]
    },
    label:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

});

const Notes = mongoose.model("Notes",notesScheam)

export default Notes
