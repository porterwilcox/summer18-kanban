let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'

let schema = new Schema({
    title: {type: String, required: true},
    listId: {type: ObjectId, ref: 'List', required: true},
    timestamp: {type: Number, required: true},
    completed: {type: Boolean, default: false, required: true}
})

module.exports = mongoose.model(schemaName, schema)
