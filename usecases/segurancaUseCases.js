const { pool } = require('../config')
const Produtor = require('../entities/produtor')

const autenticaProdutorDB = async (body) => {
    try {           
        const { email, senha } = body
        const results = await pool.query(`SELECT * FROM produtores WHERE email = $1 AND senha = $2`,
        [email, senha]);
        
        if (results.rowCount == 0) {
            throw "Usuário ou tenha inválidos";
        }
        const produtor = results.rows[0];
        return new Produtor(produtor.id, produtor.nome, produtor.propriedade, produtor.municipio, produtor.email, produtor.tipo, produtor.senha);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }    
}


module.exports = {
    autenticaProdutorDB
}