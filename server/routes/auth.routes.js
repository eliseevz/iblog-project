const express = require("express")
const router = express.Router({ mergeParams: true})
const bcrypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const chalk = require("chalk")
const User = require("../models/User")
const tokenService = require("../services/token.service")

// signUp
// 1. get data from req (pass, email)
// 2. validate data
// 3. check if user already exists
// 4. hash password
// 5. create user
// 6. generate tokens

router.post("/signUp", [
    check("email", "email введен некорректно").isEmail(),
    check("password", "минимальная длинна пароля 6 символов").isLength({min: 6}),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400
                    }
                })
            }
            const {email, password} = req.body
            const existingUser = await User.findOne({email})
            if (existingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_EXISTS",
                        code: 400,
                    }
                })
            }
            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = await User.create({
                ...req.body,
                articles: [],
                password: hashedPassword
            })


            const tokens = tokenService.generate({
                _id: newUser._id
            })

            await tokenService.save(newUser._id, tokens.refreshToken)

            res.status(201).send({
                ...tokens,
                userId: newUser._id,
                user: newUser
            })

        } catch (e) {
            res.status(500).json({
                message: "На сервере что то пошло не так. Попробуйте позже",
                e: e.message
            })
        }

}])

// login
// 1. Validate
// 2. Find user
// 3. compare hashed password
// 4. generate tokens
// 5. return data

router.post("/signInWithPassword", [
    check("email", "email введен некорректно").normalizeEmail().isEmail(),
    check("password", "Пароль не может быть пустым").exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400
                    }
                })
            }

            const {email, password} = req.body
            const existingUser = await User.findOne({email})
            if (!existingUser) {
                return res.status(400).send({
                    error: {
                        message: "EMAIL_NOT_FOUND",
                        code: 400
                    }
                })
            }

            const isPasswordEqual = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordEqual) {
                return res.status(400).send({
                    error: {
                        message: "INVALID_PASSWORD",
                        code: 400
                    }
                })
            }

            const tokens = tokenService.generate({
                _id: existingUser._id
            })

            await tokenService.save(existingUser._id, tokens.refreshToken)

            return res.status(200).send({
                ...tokens,
                userId: existingUser._id
            })



        } catch (e) {
            res.status(500).json({
                message: "На сервере что то пошло не так. Попробуйте позже",
                e: e.message
            })
        }
}])

router.post("/token", async (req, res) => {
    try {
        const {refresh_token: refreshToken} = req.body
        const data = tokenService.validateRefresh(refreshToken)
        const dbToken = await tokenService.findToken(refreshToken)

        if (!data || !dbToken || data._id !== dbToken?.user?.toString()) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const tokens = await tokenService.generate({
            _id: data._id
        })
        await tokenService.save(data._id, tokens.refreshToken)

        res.status(200).send({...tokens, userId: data._id})
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        })
    }
})

module.exports = router