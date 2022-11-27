import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.substr(0,5) === 'eyJhb'; // check it is from google auth or custom auth

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id
        } else {    
            // decodedData = jwt.decode(token);
            req.userId = token;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;
