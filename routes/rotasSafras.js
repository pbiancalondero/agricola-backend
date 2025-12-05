const { Router } = require('express');

const {
    getSafras,
    addSafra,
    updateSafra,
    deleteSafra,
    getSafraPorId
} = require('../controllers/safraController');

const { verificarJWT } = require('../controllers/segurancaController')

const rotasSafras = new Router();

rotasSafras.route('/safra')
    .get(verificarJWT,getSafras)
    .post(verificarJWT,addSafra)
    .put(verificarJWT,updateSafra);

rotasSafras.route('/safra/:id')
    .get(verificarJWT,getSafraPorId)
    .delete(verificarJWT,deleteSafra);

module.exports = { rotasSafras };
