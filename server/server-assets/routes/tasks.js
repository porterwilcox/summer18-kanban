let router = require('express').Router()
let Tasks = require('../models/task')

router.get('/:listId', (req, res, next) => {
    Tasks.find({ listId: req.params.listId })
        .then(tasks => {
            res.send(tasks)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

router.post('/', (req, res, next) => {
    Tasks.create(req.body)
        .then(tasks => {
            res.send(lists)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

router.delete('/:taskId', (req, res, next) => {
    Tasks.findByIdAndRemove(req.params.taskId)
    .then(() => res.send({
        message: 'Deleted!'
    }))
})

module.exports = router

