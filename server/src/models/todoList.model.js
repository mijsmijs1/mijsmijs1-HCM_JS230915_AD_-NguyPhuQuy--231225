import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const todoModel = {
    create: async (data) => {
        try {
            let user = await prisma.todoList.create({
                data: {
                    ...data
                }
            })
            return {
                status: true,
                message: "Create OK!",
                data: user
            }
        } catch (err) {
            console.log('err', err);
            return {
                status: false,
                message: "Create Failed!",
                data: null
            }
        }
    },
    findAll: async () => {
        try {
            let data = await prisma.todoList.findMany()
            return {
                status: true,
                data,
                message: "Find All OK!"
            }
        } catch (err) {
            console.log('err', err);
            return {
                status: false,
                data: null,
                message: "Find All Failed!"
            }
        }

    },
    update: async (id, todoData) => {
        try {
            let data = await prisma.todoList.update({
                where: {
                    id: Number(id)
                },
                data: {
                    ...data,
                    ...todoData
                }
            })
            return {
                status: true,
                data,
                message: "Update OK!"
            }
        } catch (err) {
            console.log('err', err);
            return {
                status: false,
                data: null,
                message: "Update Failed!"
            }
        }
    },
    delete: async (id) => {
        try {
            let data = await prisma.todoList.delete({
                where: {
                    id: Number(id)
                }
            })
            return {
                status: true,
                data,
                message: "Delete OK!"
            }
        } catch (err) {
            console.log('err', err);
            return {
                status: false,
                data: null,
                message: "Delete Failed, Cannot find id in database!"
            }
        }
    }
}