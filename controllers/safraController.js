const {
    getSafrasDB,
    addSafraDB,
    updateSafraDB,
    deleteSafraDB,
    getSafraPorIdDB
} = require('../usecases/safraUseCases');

const getSafras = async (request, response) => {
    await getSafrasDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar safras: ' + err
        }));
}

const addSafra = async (request, response) => {
    await addSafraDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Safra cadastrada com sucesso!',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateSafra = async (request, response) => {
    await updateSafraDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Safra atualizada com sucesso!',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteSafra = async (request, response) => {
    await deleteSafraDB(request.params.id)
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getSafraPorId = async (request, response) => {
    await getSafraPorIdDB(request.params.id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getSafras,
    addSafra,
    updateSafra,
    deleteSafra,
    getSafraPorId
};
