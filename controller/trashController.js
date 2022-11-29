import catchAsyncError from "../middleware/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import Trash from "../model/trash.js";
import Notes from "../model/note.js";


// fetch all note in trash
export const getAllNoteFromTrash = catchAsyncError(async()=>{
 const trashNotes = await Trash.find({user:req.user._id})
  resizeBy.status(200).json({
    success:true,
    trashNotes
  }); 
});

// restore notes