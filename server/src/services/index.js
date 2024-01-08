import jwt from 'jsonwebtoken'
export const tokenJWT = {
    createToken: (userData) => {
        let token = jwt.sign(userData, "HAKATHON_AD", { expiresIn: '1d' })
        return token
    },
    decodeToken: (token) =>{
        return jwt.verify(token, "HAKATHON_AD")
    }
}