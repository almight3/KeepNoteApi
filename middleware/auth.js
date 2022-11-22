import User from "../model/user.js";
import catchAsyncError from "../middleware/asyncErrorHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const authenticateUser = catchAsyncError(async (req,res,next)=>{

    const token = req.headers.authorization;
    if(!token || token === "null") {
      return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
    req.user = await User.findById(decodedData.id);
  
    next();
    
});