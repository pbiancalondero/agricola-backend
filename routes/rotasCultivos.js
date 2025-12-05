const { Router } = require('express');

const {
    getCultivos,
    addCultivo,
    updateCultivo,
    deleteCultivo,
    getCultivoPorId
} = require('../controllers/cultivoController');

const { verificarJWT } = require('../controllers/segurancaController')

const rotasCultivos = new Router();

rotasCultivos.route('/cultivo')
    .get(verificarJWT,getCultivos)
    .post(verificarJWT,addCultivo)
    .put(verificarJWT,updateCultivo);

rotasCultivos.route('/cultivo/:id')
    .get(verificarJWT,getCultivoPorId)
    .delete(verificarJWT,deleteCultivo);

module.exports = { rotasCultivos };
