//Importmos ibrerias de conexion a la bd y para consumo de apis
const conexion = require("../database")
//const axios = require('axios')
const fetch = require('node-fetch')

//Creamos objeto para almacenaiento de funciones 
const apiBelvoController = {};

//Modelo para modelar datos
const mongSchem = require('../models/apiBelvoModel');

//URL PARA CONSUMO DE APIS
const API_URL = 'https://gateway.marvel.com:443/v1/public/comics?ts=${API_TS}&apikey=${API_PK}&hash=${API_HASH}';
const API_URL_EVENTS = 'https://gateway.marvel.com:443/v1/public/events?ts=${API_TS}&apikey=${API_PK}&hash=${API_HASH}';

//Llaves para el consumo de APIS
const API_TS = "1313";
const API_PK = "9c3c848045a6d6aeb9c8326840349a1e";
const API_PVK = "4711f1eaab7419bb02c75706d36bc93ed811a2b5";

//PARA GENERAR EL HASH MD5 SE COLOCA EN EL SIGUIENTE ORDEN SOLO LOS VALORES TS -> PVK -> PK
const API_HASH = "8a09996a474ba9dfb775328033f83a0a";

//Funciones de ApiBelvo*******************************************
apiBelvoController.getCatalogBAZ = async (req, res) => {
	console.log('Entrando a servicio BAZ');
	const OPTIONS = {
		"method": "GET", 
		"headers": {
//En el app en el campo urlencode se configura para bd mongo 
			"Content-Type": "application/json",
		}
	};
	const response = await fetch('https://gateway.marvel.com:443/v1/public/events?ts=1313&apikey=9c3c848045a6d6aeb9c8326840349a1e&hash=8a09996a474ba9dfb775328033f83a0a', OPTIONS)
	.then(res => res.json())
	.catch(err => console.error())
	console.log('Response: ', response.status);
	res.json(response);
};

apiBelvoController.getCatalogBBVA = async (req, res) => {
	console.log('Entrando a servicio BBVA');
	const OPTIONS = {
		"method": "GET", 
		"headers": {
//En el app en el campo urlencode se configura para bd mongo 
			"Content-Type": "application/json",
		}
	};
	const response = await fetch('https://gateway.marvel.com:443/v1/public/comics?ts=1313&apikey=9c3c848045a6d6aeb9c8326840349a1e&hash=8a09996a474ba9dfb775328033f83a0a', OPTIONS)
	.then(res => res.json())
	.catch(err => console.error())
	console.log('Response: ', response.status);
	res.json(response);
};


//Funciones de apiUsers*******************************************
apiBelvoController.getUser = (req, res) => {
	conexion.connect()
	conexion.query('SELECT * FROM ammper_employees')
		.then(response => {
			console.log(response.rows)
			res.json(response.rows)
		})
		.catch(err => {
			conexion.end()
			return res.status(500).send("Error interno al procesar la peticion")
		})
};

apiBelvoController.getUserId = (req, res) => {
	conexion.connect()
	const idReq = parseInt(req.params.id)
	console.log('Valor de id: ', idReq)
	if(!req.params.id){
		return res.status(500).send("El campo no puede estar vacio")
	};
	conexion.query('SELECT name FROM ammper_employees WHERE id = $1', [idReq])
		.then(response => {
			console.log(response.rows)
			res.json(response.rows)
		})
		.catch(err => {
			conexion.end()
			return res.status(500).send("Error interno al procesar la peticion") 
		})
};

apiBelvoController.insertUser = (req, res) => {
	conexion.connect()
	const name = (req.params.name)
	const secondName = (req.params.secondName)
	const permissio = parseInt(req.params.permissio)
	console.log('Valores Post: ', name, secondName, permissio)

	if(!req.params){
		return res.status(500).send("El objeto no puede estar vacio")
	};
	conexion.query('INSERT INTO ammper_employees(name, second_name, permissio) VALUES ( $1, $2, $3)', [name, secondName, permissio])
		.then(response => {
			console.log(response.rows)
			res.json(response.rows)
		})
		.catch(err => {
			conexion.end()
			return res.status(500).send("Error interno al procesar la peticion") 
		})
};

apiBelvoController.alterUsers = (req, res) => {
	conexion.connect()

	const id = parseInt(req.params.id)
	const name = (req.params.name)
	const secondName = (req.params.secondName)
	console.log('Valores Alter: ', id, concatname, concatSecondName)

	if(!req.params){
		return res.status(500).send("El objeto no puede estar vacio")
	};
	conexion.query('UPDATE ammper_employees SET name=$1, second_name=$2 WHERE id=$3', [name, secondName, id])
		.then(response => {
			console.log(response.rows)
			res.json(response.rows)
		})
		.catch(err => {
			conexion.end()
			return res.status(500).send("Error interno al procesar la peticion") 
		})
};

apiBelvoController.deleteUsers = (req, res) => {
	conexion.connect()

	const disableFlag = 0
	const id = parseInt(req.params.id)
	console.log('Valores Alter: ', id)

	if(!req.params){
		return res.status(500).send("El objeto no puede estar vacio")
	};
	conexion.query('UPDATE ammper_employees SET flag=$1 WHERE id=$2', [disableFlag, id])
		.then(response => {
			console.log(response.rows)
			res.json(response.rows)
		})
		.catch(err => {
			conexion.end()
			return res.status(500).send("Error interno al procesar la peticion") 
		})
};
module.exports = apiBelvoController;