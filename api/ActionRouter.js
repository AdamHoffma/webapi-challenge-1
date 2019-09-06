const express = require('express')

const db = require('../data/helpers/actionModel.js')

const router = express.Router()

router.use(express.json())

router.post('/:id', (req, res) => {
    id = req.params.id
    const newAction = req.body.actions
    if(!newAction.description || !newAction.notes) {
        res.status(400).json({message: "Please provide description and notes"})
    } else {
        db.insert(newAction)
        .then(action => {
            db.get(action.id).then(actionAdd => {
                res.status(201).json(actionAdd)
            })
        })
        .catch(error => {
            res.status(500).json({error: "An error occured adding actions"})
        })
    }
})




module.exports = router