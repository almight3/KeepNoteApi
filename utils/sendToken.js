const sendToken = (user,statusCode,res)=>{
    const token = user.generateJWT()
    const userDetail = {
        _id:user._id,
        name:user.name,
        email:user.email,
    }
    res.status(statusCode).json({
        success:true,
        user:userDetail,
        token
    });
}

export default sendToken