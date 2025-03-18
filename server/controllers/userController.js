import {User} from "../models/models.js";
import bcrypt from "bcrypt";
import ApiError from "../error/ApiError.js";
import jwt from "jsonwebtoken";

const generateJwt = (id, username, role) => {
    return jwt.sign(
        { id, username, role },
        process.env.JWT_SECRET_KEY,
        {expiresIn: '24h'});
}


class UserController {

    async register(username, password, role) {
        try {
            if(!username || !password) {
                return ApiError.badRequest("Username or password is required");
            }

            const candidate = await User.findOne({where: {username}});
            if (candidate) {
                return ApiError.badRequest("User already exists");
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = await User.create({
                username: username,
                password: hashedPassword,
                role: role
            });

            const token = generateJwt(user.id, user.username, user.role);
            return {user, token};

        } catch (e) {
            console.error(e);
        }
    }

    async login(username, password) {

        try {
            if(!username || !password) {
                return ApiError.badRequest("Username or password is required");
            }

            const user = await User.findOne({where: {username}});
            if (!user) {
                return ApiError.badRequest("User does not exist");
            }

            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                return ApiError.badRequest("Password is incorrect");
            }

            const token = generateJwt(user.id, user.username, user.role);

            return {user, token};

        } catch (e) {
            return ApiError.internal("Something went wrong", e);
        }
    }

    async getAllUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch(e) {
            return ApiError.internal("Something went wrong", e);
        }
        // return [
        //     {id: 0, username: "111", email: "123@", role: "user"},
        //     {id: 1, username: "222", email: "222@", role: "user"},
        //     {id: 2, username: "333", email: "333@", role: "user"},
        //     {id: 3, username: "444", email: "444@", role: "user"},
        //     {id: 4, username: "555", email: "555@", role: "user"},
        // ]
    }

    async getOneUser(id) {
        try {

            if(!id) {
                return ApiError.badRequest("User ID should be provided");
            }

            const user = await User.findOne({where: {id}});
            if (!user) {
                return ApiError.badRequest("User does not exist");
            }

            return user;

        } catch(e) {
            return ApiError.internal("Something went wrong", e);
        }
    }

}

export default new UserController()