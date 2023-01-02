import Users from "../../../models/userModel";
import { findInDB, insertInDB } from '../../../utils/connectDB';
import { valid } from '../../../utils/valid';
import bcrypt from 'bcrypt'




export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
}

const register = async (req, res) => {

  try {

    const { name, email, password, confirmPassword } = req.body;

    const errMsg = valid(name, email, password, confirmPassword);
    if (errMsg) return res.status(400).json({ err: errMsg });
    const user = await findInDB('user',{email})
    if (user) return res.status(400).json({ err: 'This email already exists.' })

    const passwordHash = await bcrypt.hash(password, 12)

    const newUser = new Users({ name, email, password: passwordHash, confirmPassword })
    await insertInDB('user', newUser)
    return res.json({ msg: "register Success!" });

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

