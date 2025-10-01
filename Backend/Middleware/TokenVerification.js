import jwt from 'jsonwebtoken'

const TokenAuthentication = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]     

        if (!token) return res.status(401).json({ message: 'No token provided' })
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid Token.' })
            req.id = decoded.id
            next()
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Server Error' })
    }
}

export default TokenAuthentication