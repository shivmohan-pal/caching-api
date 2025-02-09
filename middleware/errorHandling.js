const CreateError = (status, message) => {
    const error = new Error();
    error.message = message;
    error.status = status;
    return error;
}

const ErrorHandler = (err,req,res,next)=>{
 const message = err.message || "Internal Server Error";
 const status = err.status || 500;
 res.send({status,message});
}

module.exports = {
    CreateError,ErrorHandler
}