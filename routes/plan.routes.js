const { Router } = require("express")
const Plan = require("../models/Plan")
const med = require("./../middleware/med.middleware")
const router = Router()

router.post("/add", med, async (req, res) => {
    try {

        const { problem, solution, actions } = req.body

        const plan = new Plan({
            problem, solution, actions, owner: req.user.userId
        })

        await plan.save()

        res.status(201).json({ plan, message: "План ухода изменён" })

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

router.get("/:id", med, async (req, res) => {
    try {
        await Plan.find({ owner: req.user.userId }, (error, data) => {
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