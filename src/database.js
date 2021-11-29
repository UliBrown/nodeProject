//Añadimos libreria para el pool de conexiones
const mongoose = require('mongoose');
const { Pool } = require("pg");


//Seteamos los parámetros de conexion hacia ps
const pool = new Pool({
	user: 'postgres', 
	host: '127.0.0.1', 
	database: 'Ammper', 
	password: 'ps12345', 
	port: 5432
});


//Añadimos parametros de conexion hacia mongo, adicional añadir a index.js
mongoose.connect('mongodb://localhost/ammperDb', {
//Añadimos configuracion adicional a mongo para mostrar info en consola
	useUnifiedTopology: true, 
	useNewUrlParser: true
})
	.then(db => console.log('Conexion establecida hacia MongoDb'))
	.catch(err => console.error(err))

module.exports = pool;