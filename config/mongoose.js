// llama a la librería de mongo
const mongoose = require('mongoose');

// se conecta a la base de datos del hermano de melissa
 mongoose.connect('mongodb+srv://thorpeandrewgon:Alohomora7.@cluster0.xcpxi0s.mongodb.net/toDO?retryWrites=true&w=majority', { useNewUrlParser: true });
//mongoose.connect('mongodb+srv://expovoca2023:Mlsb1029@expoapp.gdu3fza.mongodb.net/ExpoApp?retryWrites=true&w=majority', { useNewUrlParser: true });

// ve si la cexion fue exitosa
const db = mongoose.connection;

// en caso de error
db.on('error', console.error.bind(console, "Error in connecting to MongoDB"));

// cuando la base funciona da el mensaje
db.once('open', function(){
    console.log('Connected to Database');
});

// se exporta la base de datos
module.exports = db;