import axios from 'axios'

export default {
    findAll: async () => {
        return await axios.get(`${import.meta.env.VITE_SEVER}/todo`)
    },
    create: async (data) => {
        return await axios.post(`${import.meta.env.VITE_SEVER}/todo`, data)
    },
    update: async (taskId, data) => {
        return await axios.patch(`${import.meta.env.VITE_SEVER}/todo/${taskId}`, data)
    },
    delete: async (taskId) => {
        return await axios.delete(`${import.meta.env.VITE_SEVER}/todo/${taskId}`)
    }
}