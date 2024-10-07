import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";

export const verifyToken = async (req, res, next ) => {
    const token = req.cookies.access_token;
    console.log("token is: ", token)
    if(!token){
        
        return next(errorHandler(401,'unauthorized'))
    }
    jwt.verify(token, process.env.JWT_SECRET, ( err, user ) => {
        if(err) return next(errorHandler(403, 'Forbidden!!'))

        
        req.user = user; //this is not user, this is just an id of user
        console.log("req.user: ", req.user)
        next();
    })
}