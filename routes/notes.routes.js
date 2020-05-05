const { Router } = require("express")
const Notes = require("../models/Notes")
const med = require("./../middleware/med.middleware")
const router = Router()

router.post("/add", med, async (req, res) => {
    try {

        const { name, dateFrom, dateTo, timeFrom, timeTo } = req.body

        const notes = new Notes({
            name, dateFrom, dateTo, timeFrom, timeTo, owner: req.user.userId
        })

        await notes.save()

        res.status(201).json({ notes, message: "Дело добавлено" })

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" })
    }
})

router.get("/:id", med, async (req, res) => {
    try {
        await Notes.find({ owner: req.user.userId }, (error, data) => {
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