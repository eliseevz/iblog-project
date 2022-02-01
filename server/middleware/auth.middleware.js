const tokenService = require("../services/token.service")
const User = require("../models/User")

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({
                message: "Unathorized"
            })
        }

        const data = tokenService.validateAccess(token)
        const findUser = await User.findById(data._id)

        req.user = {
            ...data,
            isAdmin: findUser.isAdmin
        }

        next()

    } catch (e) {
        return res.status(401).json({
            message: "Unathorized"
        })
    }
}