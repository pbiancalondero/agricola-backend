const { pool } = require('../config');
const Produtor = require('../entities/produtor');

const getProdutoresDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM produtores ORDER BY nome');
        return rows.map((p) => new Produtor(p.id, p.nome, p.propriedade, p.municipio, p.email, p.tipo, p.senha));
    } catch (err) {
        throw "Erro ao buscar produtores: " + err;
    }
}

const addProdutorDB = async (body) => {
    try {
        const { nome, propriedade, municipio, email, tipo, senha } = body;
        const results = await pool.query(
            `INSERT INTO produtores (nome, propriedade, municipio, email, tipo, senha)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nome, propriedade, municipio, email, tipo, senha`,
            [nome, propriedade, municipio, email, tipo, senha]
        );
        const p = results.rows[0];
        return new Produtor(p.id, p.nome, p.propriedade, p.municipio, p.email, p.tipo, p.senha);
    } catch (err) {
        throw "Erro ao inserir produtor: " + err;
    }
}

const updateProdutorDB = async (body) => {
    try {
        const { id, nome, propriedade, municipio, email, tipo, senha } = body;
        const results = await pool.query(
            `UPDATE produtores SET nome = $1, propriedade = $2, municipio = $3, email = $4, tipo = $5, senha = $6
             WHERE id = $7 RETURNING id, nome, propriedade, municipio, email, tipo, senha`,
            [nome, propriedade, municipio, email, tipo, senha, id]
        );
        if (results.rowCount == 0) {
            throw `Nenhum produtor encontrado com o ID ${id}`;
        }
        const p = results.rows[0];
        return new Produtor(p.id, p.nome, p.propriedade, p.municipio, p.email, p.tipo, p.senha);
    } catch (err) {
        throw "Erro ao atualizar produtor: " + err;
    }
}

const deleteProdutorDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM produtores WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum produtor encontrado com o ID ${id}`;
        }
        return "Produtor removido com sucesso.";
    } catch (err) {
        throw "Erro ao remover produtor: " + err;
    }
}

const getProdutorPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM produtores WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum produtor encontrado com o ID ${id}`;
        }
        const p = results.rows[0];
        return new Produtor(p.id, p.nome, p.propriedade, p.municipio, p.email, p.tipo, p.senha);
    } catch (err) {
        throw "Erro ao buscar produtor: " + err;
    }
}

module.exports = {
    getProdutoresDB,
    addProdutorDB,
    updateProdutorDB,
    deleteProdutorDB,
    getProdutorPorIdDB
};
