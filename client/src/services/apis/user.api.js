import axios from "axios";

export const userApi = {
    register: (user) => {
        return axios.post(`${import.meta.env.VITE_SEVER}/register`, user)
    },
    login: (data) => {
        return axios.post(`${import.meta.env.VITE_SEVER}/login`, data)
    },
    decodeToken: (token) => {
        return axios.post(`${import.meta.env.VITE_SEVER}/decode-token/${token}`)
    }
}