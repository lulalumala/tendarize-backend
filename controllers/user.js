const User = require("../models/register")
const bcrypt = require('bcrypt')

const registerUser = async (req, res) => {
    try {
        const { userName, password, email, profile } = req.body
        // if user exists
        const exists = await User.findOne({ email }) || await User.findOne({ userName });
        console.log(exists)
        if (exists) {
            return res.json({ error: "A user with that username or email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const register = new User({
            userName,
            password: hashedPassword,
            email,
            profile
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
        const user = await User.findOne({ userName })
        if (!user) {
            return res.status(404).json({ error: "user does not exists" })
        }

        const validateUserPassword = await bcrypt.compare(password, user.password)
        if (!validateUserPassword) {
            return res.status(404).json({ error: "Incorrect username or password" })
        }

        res.status(200).json(user)

    } catch (error) {
        return res.json(error)
    }
}

const updateProfile = async (req, res) => {
    try {
        const {email:userEmail} = req.body
        const { physical, postal, code, phone, email } = req.body.address
        const {logo, name, registration, licence, placeOfRegistration}=req.body.company

        
        const updateData = {
            address: {
                physical,
                postal,
                code,
                phone,
                email
            },
            company: {
                logo,
                name,
                registration,
                licence,
                placeOfRegistration   
            }
        }

        console.log(physical)

        const updatedUser = await User.findOneAndUpdate({email:userEmail},updateData)
        res.status(201).json(updatedUser)
    } catch (error) {
        return res.json(error)
    }
}

module.exports = { loginUser, registerUser, updateProfile }