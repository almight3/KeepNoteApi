import Notes from "../model/note.js";
import catchAsyncError from "../middleware/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

// create notes
export const createNote = catchAsyncError(async(req,res,next)=>{
    req.body.user = req.user._id;
    console.log(req.body)
    const notes = await Notes.create(req.body);
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

    const notes = await Notes.findByIdAndUpdate(id,req.body)

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

    const notes = await Notes.findByIdAndDelete(id)

    res.status(200).json({
        success:true,
        notes
    });

});




