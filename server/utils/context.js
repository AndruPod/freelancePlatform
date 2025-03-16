import jwt from "jsonwebtoken";

const createContext = async ({req}) => {

    try {
        const authToken = req.headers.authorization;

        if(!authToken){
            return {user: null, error: "No token provided"}
        }

        const token = authToken.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        return {user: decoded, error: null};

    } catch(e) {
        console.log(e);
        return {user: null, error: "Unauthorized"};
    }
}

export default createContext;