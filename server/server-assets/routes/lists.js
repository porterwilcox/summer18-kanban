let router = require('express').Router()
let Lists = require('../models/list')

router.get('/:boardId', (req, res, next) => {
    Lists.find({boardId: req.params.boardId})
    .then(lists => {
        res.send(lists)
    })
    .catch(err => {
        console.log(err)
        next()
    })
})

module.exports = router
