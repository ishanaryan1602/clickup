import { prisma } from "../../prisma/prisma.js";
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { encryptPassword, comparePassword } from "../../utils/encryptPassword.js";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../../utils/tokens.js";

const loginService = async (login_data) => {
    const { email, password } = login_data;
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            const err = new Error("User not found");
            err.status = StatusCodes.NOT_FOUND;
            err.info = ReasonPhrases.NOT_FOUND;
            err.errors = [{ field: "user_id", issue: "User not found" }];
            throw err;
        }

        const is_password_valid = await comparePassword(password, user.password);
        if (!is_password_valid) {
            const err = new Error("Invalid credentials");
            err.status = StatusCodes.UNAUTHORIZED;
            err.info = ReasonPhrases.UNAUTHORIZED;
            err.errors = [{ field: "password", issue: "Incorrect credentials" }];
            throw err;
        }

        const { password: _, ...sanitised_user } = user;
        const access_token = generateAccessToken(sanitised_user);
        const refresh_token = generateRefreshToken(sanitised_user);

        return { user: sanitised_user, access_token, refresh_token };
    } catch (err) {
        throw err;
    }
}

const registerService = async (login_data) => {
    const { email, password, username } = login_data;
    try {
        const hashed_password = await encryptPassword(password);
        const user = await prisma.user.create({
            data: {
                name: username,
                password: hashed_password,
                email
            }
        })

        const { password: _, ...sanitised_user } = user;
        const access_token = generateAccessToken(sanitised_user);
        const refresh_token = generateRefreshToken(sanitised_user);

        await prisma.refreshToken.upsert({
            where: { user_id: user.user_id },
            update: { refresh_token: refresh_token },
            create: { user_id: user.user_id, refresh_token: refresh_token },
        });

        return { user: sanitised_user, access_token, refresh_token };
    } catch (err) {
        throw err;
    }
}

const generateAccessTokenFromRefreshTokenService = async (refresh_token) => {
    try {

        if(!refresh_token){
            const err = new Error("No token found");
            err.status = StatusCodes.BAD_REQUEST;
            err.info = ReasonPhrases.BAD_REQUEST;
            err.errors = [{ field: "token", issue: "No token found" }];
            throw err;
        }

        const {user_id} = verifyToken(refresh_token);

        if(!user_id){
            const err = new Error("Invalid token");
            err.status = StatusCodes.UNAUTHORIZED;
            err.info = ReasonPhrases.UNAUTHORIZED;
            err.errors = [{ field: "token", issue: "Invlaid token" }];
            throw err;
        }

        const user = await prisma.user.findFirst({
            where:{
                user_id
            },
            select:{
                user_id:true,
                name:true,
                email:true,
                role:true
            }
        })

        const access_token = generateAccessToken(user);

        return access_token;

    } catch (err) {
        throw err;
    }
}

export { loginService, registerService, generateAccessTokenFromRefreshTokenService };