const User = require("../models/register")


const registerUser = async (req, res) => {
    try {
        const { userName, password, email } = req.body
        // if user exists
        const exists = await User.findOne({ email }) || User.findOne({ userName })
        if (exists) {
            return res.json({ error: "A user with that username or email already exists" })
        }

        const register = new User({
            userName,
            password,
            email
        })

        const saveUser = await register.save()
        res.status(201).json(saveUser)

    } catch (error) {
        return res.json(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: "user does not exists" })
        }
        res.status(200).json(user)

    } catch (error) {
        return res.json(error)
    }
}
module.exports = { loginUser, registerUser }