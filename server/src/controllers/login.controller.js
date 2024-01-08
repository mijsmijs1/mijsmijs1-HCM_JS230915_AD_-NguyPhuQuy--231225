import { isTemplateLiteralTypeNode } from "typescript"
import { loginModel } from "../models/login.model"
import { tokenJWT } from "../services"
export const loginController = {
    decodeToken: (req, res) => {
        return res.status(200).json({
            message: "decodeTOken OK!",
            data: req.tokenData
        })
    },
    login: async (req, res) => {
        try {
            let { data, message } = await loginModel.findUser(req.body.loginId)
            if (!data) {
                throw {
                    message
                }
            }
            if (data.password != req.body.password) {
                throw {
                    message: "Password is incorrect"
                }
            }
            return res.status(200).json({
                token: tokenJWT.createToken(data),
                message: "Login Ok!"
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message || "Loi sever!"
            })
        }
    },
    register: async (req, res) => {
        try {
            let { data, message } = await loginModel.create(req.body)
            if (!data) {
                throw {
                    message
                }
            }
            return res.status(200).json({
                message
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message || "Loi sever!"
            })
        }
    }
}
