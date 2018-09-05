let router = require('express').Router()
let Lists = require('../models/list')

router.get('/board/:boardId/lists', (req, res, next) => {
    Lists.find({ boardId: req.params.boardId })
        .then(lists => {
            res.send(lists)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

router.post('/lists', (req, res, next) => {
    Lists.create(req.body)
        .then(lists => {
            return res.send(lists)
        })
        .catch(err => {
            console.log(err)
            next()
        })
})

router.delete('/lists/:listId', (req, res, next) => {
    Lists.findByIdAndRemove(req.params.listId)
        .then(() => res.send({
            message: 'Deleted!'
        }))
        .catch(err => {
            console.log(err)
            next()
        })
})
module.exports = router
