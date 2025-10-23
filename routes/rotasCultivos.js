const { Router } = require('express');

const {
    getCultivos,
    addCultivo,
    updateCultivo,
    deleteCultivo,
    getCultivoPorId
} = require('../controllers/cultivoController');

const rotasCultivos = new Router();

rotasCultivos.route('/cultivo')
    .get(getCultivos)
    .post(addCultivo)
    .put(updateCultivo);

rotasCultivos.route('/cultivo/:id')
    .get(getCultivoPorId)
    .delete(deleteCultivo);

module.exports = { rotasCultivos };
