let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Comment'

let schema = new Schema({
    description: {type: String, required: true},
    taskId: {type: ObjectId, ref: 'Task', required: true},
    timestamp: {type: Number, required: true, default: Date.now()}
})

module.exports = mongoose.model(schemaName, schema)