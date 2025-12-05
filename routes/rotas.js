const { Router } = require('express');

const { rotasProdutores } = require('./rotasProdutores');
const { rotasCultivos } = require('./rotasCultivos');
const { rotasSafras } = require('./rotasSafras');
const { login } = require('../controllers/segurancaController');

const rotas = new Router();

rotas.use(rotasProdutores);
rotas.use(rotasCultivos);
rotas.use(rotasSafras);

rotas.route("/login")
   .post(login)  
   
module.exports = rotas;
