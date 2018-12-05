import * as jwt from "jsonwebtoken";


export default function validateUser(req, res, next) {

    var token = req.header('Authorization') || req.query.state;
    if (token) {
        console.log('In jwt verify middleware for userId');
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'Failed to authenticated user',
                    error: err
                });
            } else {
                req.userId = decoded.userId;
                console.log('req.userId set to- ' + req.userId);
                next();
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'No session token provided'
        });
    }
}