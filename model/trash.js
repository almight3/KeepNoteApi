import mongoose from "mongoose";
const {Schema} = mongoose;

const trashScheam = new Schema({
    id:{
        type:String,
        required:true
    },
    user:{
       type:mongoose.Schema.ObjectId,
       ref:"User",
       required:true
    },
    title:{
        type:String,
        required:[true,"title is required"]
    },
    content:{
        type:String,
        required:[true,"discription is required"]
    },
    label:{
        type:String,
        default:"Work"
    },
    priority:{
        type:String,
        default:"Medium" 
    },
    pinned:{
     type:Boolean,
     default:false
    },
    theme:{
        type:String,
        default:"#fafafa",
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

});

const Trash = mongoose.model("Trash",trashScheam)

export default Trash
