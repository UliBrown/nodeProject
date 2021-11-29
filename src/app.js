//Importacion de librerias
const express = require('express')
const morgan = require('morgan')

//Libreria para permitir conexiones entrantes
const cors = require('cors')

const app = express()

//Configuramos cors para que solo acepte peticiones http del puerto 4200
app.use(cors({origin:"http://localhost:4200"}));

//Asignacion de la variable PORT, en caso de estar configurada una variable de entorno la tomará 
//o de lo conrario asignará la 4000
app.set('port', process.env.PORT || 4000);

//Interceptor de peticiones http para mostrar por consola
app.use(morgan('dev'));

//Las peticiones pueden aceptar contentType: application/json
app.use(express.json());

//Puede entender formularios html
app.use(express.urlencoded({ extended: false }));

//Se añade ruta al archivo que contiene la configuracion de endpoint y router para ser usado por express
app.use(require('./routes/apiBelvoRoute.js'));

//Linea para poder exportar las propiedades de app en otros archivos
module.exports = app;