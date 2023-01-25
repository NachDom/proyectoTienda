'use strict'

var express = require('express');
var clienteController = require('../controllers/ClienteController');

var api = express.Router();

api.post('/registro_cliente',clienteController.registro_cliente); //es una URL
api.post('/login_cliente',clienteController.login_cliente); // otra URL

module.exports = api;