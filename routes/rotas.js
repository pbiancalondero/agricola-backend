const { Router } = require('express');

const { rotasProdutores } = require('./rotasProdutores');
const { rotasCultivos } = require('./rotasCultivos');
const { rotasSafras } = require('./rotasSafras');

const rotas = new Router();

// Registro das rotas principais
rotas.use(rotasProdutores);
rotas.use(rotasCultivos);
rotas.use(rotasSafras);

module.exports = rotas;
