const { Router } = require("express")
const Stats = require("../models/Stats")
const med = require("./../middleware/med.middleware")
const router = Router()

router.post("/add", med, async (req, res) => {
    try {

        const { pulse, temp, pressure, sugar } = req.body

        const stats = new Stats({
            pulse, temp, pressure, sugar, owner: req.user.userId
        })

        await stats.save()

        res.status(201).json({ stats, message: "Показатели изменены" })

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

router.get("/:id", med, async (req, res) => {
    try {
        await Stats.find({ owner: req.user.userId }, (error, data) => {
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