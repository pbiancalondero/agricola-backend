const { Router } = require('express');

const {
    getProdutores,
    addProdutor,
    updateProdutor,
    deleteProdutor,
    getProdutorPorId
} = require('../controllers/produtorController');

const rotasProdutores = new Router();

rotasProdutores.route('/produtor')
    .get(getProdutores)
    .post(addProdutor)
    .put(updateProdutor);

rotasProdutores.route('/produtor/:id')
    .get(getProdutorPorId)
    .delete(deleteProdutor);

module.exports = { rotasProdutores };
