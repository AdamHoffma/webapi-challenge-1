const express = require('express')

const db = require('../data/helpers/actionModel.js')

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
    db.get()
    .then(action => {
        res.status(200).json(action)
    })
})

router.get('/:actid', (req, res) => {
    const actId = req.params.actid
    db.get(actId)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({error: "The action could not retreived"})
    })
})

router.put('/:id', (req, res) => {
    const changeAct = req.body
    const changeId = req.params.id
    if (!changeAct.notes || !changeAct.description) {
        res.status(400).json({message: "please enter notes and description"})
    } else {
        db.get(changeId).then(change => {
            if (change.length < 1 || change == undefined) {
                res.status(404).json({message: "No action with that id exists"})
            } else {
                db.update(changeId, changeAct)
                .then(change => {
                    res.status(200).json(change)
                })
                .catch(error => {
                    res.status(500).json({error: "This action could not be changed"})
                })
            }
        })
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    db.remove(id)
    .then(action => {
        if(action.length < 1 || action == undefined) {
            res.status(404).json({message: "There is not action with that id"})
        } else {
            res.status(200).json({message: "action has been deleted"})
        }
    })
    .catch(error => {
        res.status(500).json({error: "Could not delete this action"})
    })
})

router.post('/', (req, res) => {
    const {project_id, description, notes} = req.body
    if(!project_id || !description || !notes) {
        res.status(400).json({message: "Please enter id, notes and description"})
    }
    db.insert({project_id, description, notes})
    .then(({id}) => {
        db.get(id, res)
    })
    .catch(error => {
        res.status(500).json({error: "Could not add action"})
    })
})




module.exports = router