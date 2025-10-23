const { Router } = require('express');

const {
    getSafras,
    addSafra,
    updateSafra,
    deleteSafra,
    getSafraPorId
} = require('../controllers/safraController');

const rotasSafras = new Router();

rotasSafras.route('/safra')
    .get(getSafras)
    .post(addSafra)
    .put(updateSafra);

rotasSafras.route('/safra/:id')
    .get(getSafraPorId)
    .delete(deleteSafra);

module.exports = { rotasSafras };
