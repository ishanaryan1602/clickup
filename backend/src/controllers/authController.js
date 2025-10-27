import { generateAccessTokenFromRefreshTokenService, loginService, registerService } from "../services/v1/authService.js";
import { setJWTAsCookie } from "../utils/cookies.js";
import logger from "../utils/logger.js";


export const loginController = async (req, res) => {
    logger.info(`Login attempt for email : ${req.body.email}`);
    try {
        const response = await loginService(req.validatedBody);
        setJWTAsCookie(res, data?.access_token, 'access_token');
        setJWTAsCookie(res, data?.refresh_token, 'refresh_token');
        return res.success({
            data: response,
            message: "Logged in successfully",
        });
    } catch (err) {
        logger.error(`Login error: ${err}`);
        throw err;
    }
}

export const registerController = async (req, res) => {
    logger.info(`Registration attempt for email : ${req.body.email}`);
    try {
        const response = await registerService(req.validatedBody);
        logger.info(`User registered with email ${req.validatedBody.email}`);
        return res.success({
            data: response,
            message: "Registration successful",
        });
    } catch (err) {
        logger.error(`Registration error: ${err}`);
        throw err;
    }
}

export const generateAccessTokenFromRefreshToken = async (req, res) => {
    logger.info('Generating refersh token');
    try {
        const refresh_token = req?.body?.refresh_token
        const response = await generateAccessTokenFromRefreshTokenService(refresh_token);
        return res.success({
            data: {access_token:response},
            message:"Access token generated succesfully"
        });
    } catch (err) {
        logger.error(`Error occured during generating access token: ${err}`);
        throw err;
    }
}