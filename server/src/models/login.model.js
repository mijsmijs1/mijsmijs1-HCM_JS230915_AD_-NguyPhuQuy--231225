import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
export const loginModel = {
    findUser: async (loginId) => {
        try {
            let user = await prisma.users.findUnique({
                where: {
                    loginId: loginId
                }
            })
            if (!user) {
                throw {
                    message: "User not found"
                }
            }
            return {
                message: "Find Ok!",
                data: user
            }
        } catch (err) {
            return {
                message: err.message || "Find Failed, SEVER ERROR!",
                data: null
            }
        }
    },
    create: async (newUser) => {
        try {
            let user = await prisma.users.create({
                data: {
                    ...newUser,
                    createAt: String(Date.now())
                }
            })
            return {
                message: "Create Ok!",
                data: user
            }
        } catch (err) {
            let message = ''
            if (err.meta.target == 'users_loginId_key') {
                message = "LoginId already exists!"
            } else {
                message = "Create Failed!, SEVER ERROR"
            }
            return {
                message,
                data: null
            }
        }
    }
}