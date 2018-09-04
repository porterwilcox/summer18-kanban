var mongoose = require('mongoose')
var connectionString = 'mongodb://kanban:kanban11@ds018558.mlab.com:18558/kanban'
var connection = mongoose.connection


mongoose.connect(connectionString, { useMongoClient: true })

connection.on('error', err => {
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', () => {
  console.log('Connected to Database')
})