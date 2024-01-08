import { tokenJWT } from "../services"
import { loginModel } from "../models/login.model"
export const userMiddleware = {
    tokenValidate: async (req, res, next) => {
        try {
            let tokenData = tokenJWT.decodeToken(req.params.token || req.headers.token)

            if (!tokenData) {
                return res.status(500).json({
                    message: "Token is not valid!"
                })
            }
            let { data, message } = await loginModel.findUser(tokenData.loginId)
            if (!data) {
                return res.status(500).json({
                    message: "Token is not valid!"
                })
            }
            req.tokenData = data
            next()
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Token is not valid!"
            })
        }
    }
}