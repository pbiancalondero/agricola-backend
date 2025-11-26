const {
    getCultivosDB,
    addCultivoDB,
    updateCultivoDB,
    deleteCultivoDB,
    getCultivoPorIdDB
} = require('../usecases/cultivoUseCases');

const getCultivos = async (request, response) => {
    await getCultivosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar cultivos: ' + err
        }));
}

const addCultivo = async (request, response) => {
    await addCultivoDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Cultivo cadastrado com sucesso!',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateCultivo = async (request, response) => {
    await updateCultivoDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Cultivo atualizado com sucesso!',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteCultivo = async (request, response) => {
    await deleteCultivoDB(request.params.id)
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getCultivoPorId = async (request, response) => {
    await getCultivoPorIdDB(request.params.id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getCultivos,
    addCultivo,
    updateCultivo,
    deleteCultivo,
    getCultivoPorId
};
