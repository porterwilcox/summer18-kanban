let router = require('express').Router()
let Comments = require('../models/comment')

router.get('/:taskId', (req, res, next) => {
    Comments.find({ taskId: req.params.taskId })
        .then(comments => {
            res.send(comments)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

router.post('/', (req, res, next) => {
    Comments.create(req.body)
    .then(comments => {
        res.send(comments)
    })
    .catch(err => {
        console.log(err)
        next()
    })
})

router.delete('/:commentId', (req, res, next) => {
    Comments.findByIdAndRemove(req.params.commentId)
    .then(res => res.send({
        message: 'Deleted!'
    }))
})

module.exports = router
