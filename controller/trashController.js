import catchAsyncError from "../middleware/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import Trash from "../model/trash.js";
import Notes from "../model/note.js";


// fetch all note in trash
export const getAllNoteFromTrash = catchAsyncError(async(req,res)=>{
 const trashNotes = await Trash.find({user:req.user._id})
  res.status(200).json({
    success:true,
    trashNotes
  }); 
});

// delete from trash 
export const deleteNotesFromTrash = catchAsyncError(async(req,res)=>{
  await Trash.findByIdAndDelete(req.params.id);
  const trashNotes = await Trash.find({user:req.user._id})
  res.status(202).json({
    success:true,
    trashNotes
  }); 

});

//restore note from trash
export const restoreNotesFromTrash = catchAsyncError(async(req,res)=>{
  const trashData = {
    user:req.user._id,
    title:req.body.data.title,
    content:req.body.data.content,
    priority:req.body.data.priority,
    label:req.body.data.label,
    pinned:req.body.data.pinned,
    theme:req.body.data.theme,
    createdAt:req.body.data.createdAt
  }
  await Notes.create(trashData);
  await Trash.findByIdAndDelete(req.body.data._id);
  const trashNotes = await Trash.find({user:req.user._id})
  const notes = await Notes.find({user:req.user._id})

  res.status(202).json({
    success:true,
    trashNotes,
    notes
  }); 

})



// restore notes