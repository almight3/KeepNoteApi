import User from "../model/user.js";
import catchAsyncError from "../middleware/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";



export const register = catchAsyncError(async(req,res,next)=>{
    const {name,email,password} = req.body.formData;
     
    const userExist  = await User.findOne({email:email})
    if(userExist){
        return next(new ErrorHandler("user already register with this mail",400))
    }
    
    const user = await User.create({
        name:name,
        email:email,
        password:password
    }); 
    sendToken(user,201,res);
});

export const login = catchAsyncError(async(req,res,next)=>{
    const {email,password} = req.body.formData;
    console.log(req.body)

    const user = await User.findOne({email:email})
    
    if(!user){
     return next(new ErrorHandler("Invalid email or password",401))
    };
    // const isPasswordMatch = await user.comparePassword(password)
    // if(!isPasswordMatch ){
    //  return next(new ErrorHandler("Invalid email or password",401))
    // };
    console.log(user)

    sendToken(user,201,res);
});


export const logout = catchAsyncError(async(req,res,next)=>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success:true,
        message:"user loged out succefully"
      });
}); 

export const loadUser = catchAsyncError(async(req,res)=>{
    const user = await User.findById(req.user._id)
    res.status(200).json({
        success:true,
        user
    });
});
