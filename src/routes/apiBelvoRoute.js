// Importamos la configuracion de router de la libreria de express
const { Router } = require('express')
const routerBelvo = Router();

//Mandamos a llamar el/los objetos que contienen las funciones 
const apiBelvo = require('../controllers/apiBelvoController.js');

//Creamos los endpoint para consumo de API's Belvo
routerBelvo.get('/apiBelvoBAZ', apiBelvo.getCatalogBAZ);
routerBelvo.get('/apiBelvoBBVA', apiBelvo.getCatalogBBVA);

//Endpoints para alta, modificacion y eliminacion de usuarios
routerBelvo.get('/apiGetUser', apiBelvo.getUser);
routerBelvo.get('/apiGetUserId/:id', apiBelvo.getUserId);
routerBelvo.post('/apiInsertUser/:name/:secondName/:permissio', apiBelvo.insertUser);
routerBelvo.put('/apiAlterUser/:id/:name/:secondName', apiBelvo.alterUsers);
routerBelvo.delete('/apiDeleteUser/:id', apiBelvo.deleteUsers);

module.exports = routerBelvo;