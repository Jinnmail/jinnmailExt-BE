import express from 'express'
import userAuth from '../middlewares/userAuth'
import reqRes from '../middlewares/reqRes'
import user from '../controller/user';
import * as validator from '../middlewares/validator'


class UserRoute {
    router

    constructor() {
        this.router = express.Router()
        this.routes()
    }

    //writing routes here
    login(req, res) {
        user.login(req.body)
            .then((data) => {
                reqRes.responseHandler('Login Successful', data, res);
                res.end();
            })
            .catch((err) => {
                reqRes.httpErrorHandler(err, res)
                res.end()
            })
    }

    register(req, res) {
        user.register(req.body)
            .then((data) => {
                reqRes.responseHandler('signup Successfull', data, res);
            }).catch((err) => {
                reqRes.httpErrorHandler(err, res)
                res.end()
            })
    }

    routes() {
        this.router.post('/', validator.registerValidator, this.register);
        this.router.post('/session', validator.loginValidator, this.login);
        // this.router.post('/reset/password', this.resetPassword);
    }
}
export default new UserRoute().router