import User from "../model/user.js";
import catchAsyncError from "../middleware/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";



const register = catchAsyncError(async(req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name:name,
        email:email,
        password:password
    }); 
    sendToken(user,201,res);
});

const login = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email:email}).select("+password");
    
    if(!user){
     return next(new ErrorHandler("Invalid username or password",401))
    };
    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch ){
     return next(new ErrorHandler("Invalid username or password",401))
    };

    sendToken(user,201,res);
});


const logoutUser = catchAsyncError(async(req,res,next)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success:true,
        message:"user loged out succefully"
      });
}); 
