import { prisma } from "../../prisma/prisma.js";
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { encryptPassword, comparePassword } from "../../utils/encryptPassword.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokens.js";
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

        return { user: sanitised_user, access_token };
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

        return { user: sanitised_user, access_token };
    } catch (err) {
        throw err;
    }
}

export { loginService, registerService };