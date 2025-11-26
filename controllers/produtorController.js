const {
    getProdutoresDB,
    addProdutorDB,
    updateProdutorDB,
    deleteProdutorDB,
    getProdutorPorIdDB
} = require('../usecases/produtorUseCases');

const getProdutores = async (request, response) => {
    await getProdutoresDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar produtores: ' + err
        }));
}

const addProdutor = async (request, response) => {
    await addProdutorDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Produtor cadastrado com sucesso!',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateProdutor = async (request, response) => {
    await updateProdutorDB(request.body)
        .then(data => response.status(200).json({
            status: 'success',
            message: 'Produtor atualizado com sucesso!',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteProdutor = async (request, response) => {
    await deleteProdutorDB(request.params.id)
        .then(data => response.status(200).json({
            status: 'success',
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getProdutorPorId = async (request, response) => {
    await getProdutorPorIdDB(request.params.id)
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getProdutores,
    addProdutor,
    updateProdutor,
    deleteProdutor,
    getProdutorPorId
};
