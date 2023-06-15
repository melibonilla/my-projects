// libreria de mongo
const mongoose = require('mongoose');

// se hace el esquema de la base datos que serían las tareas
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true
      }
});


const Task = mongoose.model('Task', taskSchema);

// se exporta el esquema
module.exports = Task;