const express = require('express')

const db = require('../data/helpers/projectModel.js')

const router = express.Router()

router.use(express.json())



router.get('/', (req, res) => {
    db.get()
    .then(project => {
        res.status(200).json(project)
    })
})

router.get('/:proid', (req, res) => {
    const proId = req.params.proid
    db.get(proId)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({error: "The project could not retreived"})
    })
})

router.post('/', (req, res) => {
    const newPro = req.body
    
    if (!newPro.name || !newPro.description) {
        res.status(400).json({message: "Please provide a name and description"})
    } else {
        db.insert(newPro)
        .then(project => {
            db.get(project.id).then(project => {
                res.status(201).json(project)
            })
        })
        .catch(error => {
            res.status(500).json({error: "We were unable to add your project"})
        })
    }
})

router.put('/:proid', (req, res) => {
    const changePro = req.body
    const changeId = req.params.proid
    if (!changePro.name || !changePro.description) {
        res.status(400).json({message: "Please provide name and description"})
    } else {
        db.get(changeId).then(change => {
            if (change.length < 1 || change == undefined) {
                res.status(404).json({message: "No project with that id exists"})
            } else {
                db.update(changeId, changePro)
                .then(change => {
                    res.status(200).json(change)
                })
                .catch(error => {
                    res.status(500).json({error: "This project could not be changed"})
                })
            }
        })
    }
})

router.delete('/:proid', (req, res) => {
    const proId = req.params.proid
    db.remove(proId)
    .then(project => {
        if (project.length < 1 || project == undefined) {
            res.status(404).json({message: "There is no project with that id"})
        } else {
            res.status(200).json({message: "project has been deleted"})
        }
    })
    .catch(error => {
        res.status(500).json({error: "Could not delete project"})
    })
})







module.exports = router