import userModel from '../models/user';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import cred from '../config/const'
import uuidv3 from 'uuid/v3';
// import logger from '../utils/logger';

class UserController {

    constructor() {

    }


    login(data) {
        let userObj;
        let token;
        return new Promise((resolve, reject) => {

            userModel.findOne({ email: data.email })
                .then((userData) => {
                    if (userData) {
                        userObj = userData;
                        return new Promise((resolve, reject) => {
                            bcrypt.compare(data.password.toString(), userData.password, (err, isMatch) => {
                                if (err)
                                    reject(err);
                                resolve(isMatch)
                            })
                        })
                    } else {
                        reject({ code: 400, msg: 'No User found' });
                    }
                })
                .then((equal) => {
                    if (equal) {
                        return true
                    } else {
                        reject({ code: 400, msg: 'No Password matched' });
                    }
                })
                .then((isMatch) => {
                    let tokenObj = {
                        userId: userObj.userId
                    };
                    token = jwt.sign(tokenObj, cred().secret, { expiresIn: '24h' });
                    return token
                })
                .then((token) => {
                    let finalOutput = {
                        'status': 'authorized',
                        'userId': userObj.userId,
                        'email': userObj.email,
                        'sessionToken': token,
                        'expiresIn': '24h'
                    };
                    resolve(finalOutput);
                })
                .catch((err) => {
                    reject({ code: 500, msg: err });
                });
        })
    }

    register(data) {
        return new Promise((resolve, reject) => {
            let newUser = new userModel();
            newUser.email = data.email;
            newUser.password = data.password;
            newUser.userId=uuidv4();
            newUser.save((err, savedUser) => {
                if (err) {
                    reject({ code: 500, msg: err });
                } else {
                    resolve(savedUser);
                }
            })
        })
    }
}

export default new UserController();