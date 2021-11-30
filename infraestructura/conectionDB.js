const mongoose = require('mongoose');
const urlDB = 'mongodb+srv://Claudia:Contraseñ4@clusterone.mflc7.mongodb.net/proyectos?retryWrites=true&w=majority'
mongoose.connect(urlDB)

const mongoDB = mongoose.connection;
mongoDB.on('open', _ =>{
    console.log("Conectado a la BD")
})