const { pool } = require('../config');
const Produtor = require('../entities/produtor');

const getProdutoresDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM produtores ORDER BY nome');
        return rows.map((p) => new Produtor(p.id, p.nome, p.propriedade, p.municipio));
    } catch (err) {
        throw "Erro ao buscar produtores: " + err;
    }
}

const addProdutorDB = async (body) => {
    try {
        const { nome, propriedade, municipio } = body;
        const results = await pool.query(
            `INSERT INTO produtores (nome, propriedade, municipio)
             VALUES ($1, $2, $3) RETURNING id, nome, propriedade, municipio`,
            [nome, propriedade, municipio]
        );
        const p = results.rows[0];
        return new Produtor(p.id, p.nome, p.propriedade, p.municipio);
    } catch (err) {
        throw "Erro ao inserir produtor: " + err;
    }
}

const updateProdutorDB = async (body) => {
    try {
        const { id, nome, propriedade, municipio } = body;
        const results = await pool.query(
            `UPDATE produtores SET nome = $1, propriedade = $2, municipio = $3 
             WHERE id = $4 RETURNING id, nome, propriedade, municipio`,
            [nome, propriedade, municipio, id]
        );
        if (results.rowCount == 0) {
            throw `Nenhum produtor encontrado com o ID ${id}`;
        }
        const p = results.rows[0];
        return new Produtor(p.id, p.nome, p.propriedade, p.municipio);
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
        return new Produtor(p.id, p.nome, p.propriedade, p.municipio);
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
