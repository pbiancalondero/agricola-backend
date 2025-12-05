const { Router } = require('express');

const {
    getProdutores,
    addProdutor,
    updateProdutor,
    deleteProdutor,
    getProdutorPorId
} = require('../controllers/produtorController');

const { verificarJWT } = require('../controllers/segurancaController')

const rotasProdutores = new Router();

rotasProdutores.route('/produtor')
    .get(verificarJWT,getProdutores)
    .post(addProdutor)
    .put(verificarJWT,updateProdutor);

rotasProdutores.route('/produtor/:id')
    .get(verificarJWT,getProdutorPorId)
    .delete(verificarJWT,deleteProdutor);

module.exports = { rotasProdutores };
