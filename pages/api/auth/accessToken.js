import { findInDB} from '../../../utils/connectDB';
import { createAccessToken } from '../../../utils/generateToken';
import jwt from 'jsonwebtoken'

var ObjectId = require('mongodb').ObjectId;
export default async (req, res) => {
    try {
        const rf_token = req.cookies.refresh_token;
        if (!rf_token) return res.status(400).json({ err: "please login now!" })
        const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET)
        if (!result) return res.status(400).json({ err: "your token in incorrect or has expired." })
        const user = await findInDB('user',{_id:new ObjectId(result.id)})
        if (!user) return res.status(400).json({ err: 'user does not exist.' })

        const access_token = createAccessToken({ id: user._id })
        res.json({
            access_token,
            user
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}


