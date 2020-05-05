const { Router } = require("express")
const Account = require("../models/Account")
const med = require("./../middleware/med.middleware")
const router = Router()

router.post("/add", med, async (req, res) => {
    try {

        const { name, surname, middlename, age, height, weight, bloodType } = req.body

        const card = new Account({
            name, surname, middlename, age, height, weight, bloodType, owner: req.user.userId
        })

        await card.save()

        res.status(201).json({ card, message: "Медкарта изменена" })

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

router.get("/:id", med, async (req, res) => {
    try {
        await Account.find({ owner: req.user.userId }, (error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(data)
            }
        })
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

module.exports = router