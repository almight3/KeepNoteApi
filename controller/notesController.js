import Notes from "../model/note.js";
import catchAsyncError from "../middleware/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import Trash from "../model/trash.js";

// create notes
export const createNote = catchAsyncError(async(req,res,next)=>{
    req.body.user = req.user._id;
    await Notes.create(req.body);
    const notes = await Notes.find({user:req.user._id})
    res.status(201).json({
        success:true,
        notes
    });
});

// get all notes 
export const getAllNotes = catchAsyncError(async(req,res,next)=>{
    const notes = await Notes.find({user:req.user._id})
    res.status(200).json({
        success:true,
        notes
     });
});


// get Notes details
export const getNoteDetail = catchAsyncError(async(req,res,next)=>{
    const {id} =  req.params;
    const noteDetails = await Notes.find({_id:id,user:req.user._id});

    res.status(200).json({
        success:true,
        noteDetails
    });
});

// update notes

export const updateNotes = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
     
    const noteExist = await Notes.findOne({_id:id,user:req.user._id});
      if(!noteExist){
        return next(new ErrorHandler("note not found",404))    
    }

    await Notes.findByIdAndUpdate(id,req.body)
    const notes = await Notes.find({user:req.user._id})
    res.status(201).json({
        success:true,
        notes
    });

});

// delete note 

export const deleteNote = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;

    const noteExist = await Notes.findOne({_id:id,user:req.user._id});
    if(!noteExist){
      return next(new ErrorHandler("note not found",404))    
    };

    const trashData = {
        id:id,
        user:req.user._id,
        title:noteExist.title,
        content:noteExist.content,
        priority:noteExist.priority,
        label:noteExist.label,
        pinned:noteExist.pinned,
        theme:noteExist.theme,
        createdAt:noteExist.createdAt
    }
    await Trash.create(trashData)
    await Notes.findByIdAndDelete(id)
    const notes = await Notes.find({user:req.user._id})

    res.status(200).json({
        success:true,
        notes
    });

});

export const pinNote = catchAsyncError(async(req,res)=>{
    await Notes.findByIdAndUpdate(req.body.id,{pinned:req.body.flag})
    const notes = await Notes.find({user:req.user._id})
    res.status(200).json({
        success:true,
        notes
    });
})



