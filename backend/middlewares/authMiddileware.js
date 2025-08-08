import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';


export const middlewareToProtect = async () => {

    try {
        const token = req.headers.authorization.split("")[1];
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'token not provided'
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.usr = await User.findById(decoded.id).select("-password")
        next()
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'expired token',
            error: error.message

        })
    }
}



export const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Only ${role}s are allowed.`
            });
        }
        next();
    };
};