import { loginService , registerService } from "../services/v1/authService.js";
import logger from "../utils/logger.js";


export const loginController = async(req,res) => {
    logger.info(`Login attempt for email : ${req.body.email}`);
    try{
        const response = await loginService(req.validatedBody);
        return res.success({
            data:response,
            message:"Logged in successfully",
        });
    }catch(err){
        logger.error(`Login error: ${err}`);
        throw err;
    }
}

export const registerController = async(req,res) => {
    logger.info(`Registration attempt for email : ${req.body.email}`);
    try{
        const response = await registerService(req.validatedBody);
        logger.info(`User registered with email ${req.validatedBody.email}`);
        return res.success({
            data:response,
            message:"Registration successful",
        });
    }catch(err){
        logger.error(`Registration error: ${err}`);
        throw err;
    }
}