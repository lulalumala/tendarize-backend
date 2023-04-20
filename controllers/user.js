const User = require("../models/register")
const bcrypt = require('bcrypt')
const Add = require("../models/advertise")
const One = require("../models/single")
const { json } = require("express")

const registerUser = async (req, res) => {
    try {
        const { userName, password, email, address, company } = req.body

        const exist = await User.findOne({email}) ||await User.findOne({userName})
        
        if (exist) {
            return res.json({error: "a user with the username or email already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        const registeredUser = new User({
            userName,
            password: hashpassword,
            email,
            address,
            company
        })

        console.log(registeredUser)
        const saveUser = await registeredUser.save()
        res.status(201).json(saveUser)
        console.log(saveUser)
    } catch (error) {
        return res.json(error)
    }


    // try {
    //     const { userName, password, email, address, company } = req.body
    //             const exists = await User.findOne({ email }) || await User.findOne({ userName });
    //     console.log(exists)
    //     if (exists) {
    //         return res.json({ error: "A user with that username or email already exists" })
    //     }
    //     const salt = await bcrypt.genSalt(10)
    //     const hashedPassword = await bcrypt.hash(password, salt)
    //     console.log(hashedPassword)

    //     const register = new User({
    //         userName,
    //         password: hashedPassword,
    //         email,
    //         address,
    //         company
    //     })

    //     console.log(register)

    //     const saveUser = await register.save()
    //     console.log(saveUser)
    //     res.status(201).json(saveUser)

    // } catch (error) {
    //     return res.json(error)
    // }

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
        const { userEmail } = req.body.userEmail
        const { physical, postal, code, phone, email } = req.body.address
        const { logo, name, registration, licence, placeOfRegistration } = req.body.company

        console.log(physical)

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
        const updatedUser = await User.findOneAndUpdate({ email: userEmail }, updateData)
        res.status(200).json(updatedUser)
    } catch (error) {
        return res.json(error)
    }
}

const updateAddress = async (req, res) => {
    try {

        const { userEmail } = req.body
        console.log(userEmail)
        const { physical, postal, code, phone, email } = req.body.address


        console.log(userEmail)

        const updateData = {
            address: {
                physical,
                postal,
                code,
                phone,
                email
            }
        }
        const updatedUser = await User.findOneAndUpdate({ email: userEmail }, updateData)
        res.status(200).json(updatedUser)
    } catch (error) {
        return res.json(error)
    }
}

const updateCompany = async (req, res) => {
    try {
        const { userEmail } = req.body

        const { logo, name, registration, licence, placeOfRegistration, profileComplete } = req.body.company
        const updateData = {

            company: {
                logo,
                name,
                registration,
                licence,
                placeOfRegistration,
                profileComplete
            }
        }
        const updatedUser = await User.findOneAndUpdate({ email: userEmail }, updateData)
        res.status(200).json(updatedUser)
    } catch (error) {
        return res.json(error)
    }
}



const advertise = async (req, res) => {
    try {
        const { lots, category, referenceNo, tenderName, enquiryAddress, firmsProvidingConsultancy, tenderDescription, JVmax, openingDate, closingDate, userId, company, address } = req.body

        const savedAdd = new Add({
            category,
            referenceNo,
            tenderName,
            lots,
            enquiryAddress,
            firmsProvidingConsultancy,
            tenderDescription,
            JVmax,
            openingDate,
            closingDate,
            userId,
            company,
            address
        })

        console.log(savedAdd)

        const savedResult = await savedAdd.save()
        res.status(201).json(savedResult)
    } catch (error) {
        return res.json(error)
    }
}

const allTenders = async (req, res) => {
    try {

        const tenders = await Add.find()
        res.status(200).json(tenders)

    } catch (error) {
        return res.json(error)
    }
}



module.exports = { loginUser, registerUser, updateProfile, advertise, updateAddress, updateCompany, allTenders }