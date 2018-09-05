let router = require('express').Router()
let Tasks = require('../models/task')

router.get('/lists/:listId/tasks', (req, res, next) => {
    Tasks.find({ listId: req.params.listId })
        .then(tasks => {
            res.send(tasks)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

router.post('/tasks', (req, res, next) => {
    Tasks.create(req.body)
        .then(tasks => {
            res.send(tasks)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})
router.put('/tasks/:taskId', (req, res, next) => {
    Tasks.findByIdAndUpdate(req.params.taskId, req.body)
        .then(() => res.send({
            message: 'Task moved!'
        }))
        .catch(err => {
            console.log(err)
            next()
        })
})

router.delete('/tasks/:taskId', (req, res, next) => {
    Tasks.findByIdAndRemove(req.params.taskId)
        .then(() => res.send({
            message: 'Deleted!'
        }))
})

module.exports = router

