const { autenticaProdutorDB } = require('../usecases/segurancaUseCases');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    try {
        const produtor = await autenticaProdutorDB(request.body);

        const token = jwt.sign({ produtor }, process.env.SECRET, {
            expiresIn: 300
        });

        response.json({ auth: true, token });
    } catch (err) {
        response.status(401).json({ auth: false, message: err });
    }
};


// verificação do token
function verificarJWT(request, response, next) {
    let token = request.headers['authorization'];

    if (!token) {
        return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return response.status(401).json({ auth: false, message: 'Erro ao autenticar o token: ' + err });
        }

        request.produtor = decoded.produtor;
        next();
    });
}

module.exports = {
    login, verificarJWT
}
