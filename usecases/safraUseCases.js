const { pool } = require('../config');
const Safra = require('../entities/safra');

const getSafrasDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM safras ORDER BY ano');
        return rows.map((s) => new Safra(s.id, s.ano, s.quantidade_colhida, s.id_cultivo));
    } catch (err) {
        throw "Erro ao buscar safras: " + err;
    }
}

const addSafraDB = async (body) => {
    try {
        const { ano, quantidade_colhida, id_cultivo } = body;
        const results = await pool.query(
            `INSERT INTO safras (ano, quantidade_colhida, id_cultivo)
             VALUES ($1, $2, $3)
             RETURNING id, ano, quantidade_colhida, id_cultivo`,
            [ano, quantidade_colhida, id_cultivo]
        );
        const s = results.rows[0];
        return new Safra(s.id, s.ano, s.quantidade_colhida, s.id_cultivo);
    } catch (err) {
        throw "Erro ao inserir safra: " + err;
    }
}

const updateSafraDB = async (body) => {
    try {
        const { id, ano, quantidade_colhida, id_cultivo } = body;
        const results = await pool.query(
            `UPDATE safras SET ano = $1, quantidade_colhida = $2, id_cultivo = $3
             WHERE id = $4 RETURNING id, ano, quantidade_colhida, id_cultivo`,
            [ano, quantidade_colhida, id_cultivo, id]
        );
        if (results.rowCount == 0) {
            throw `Nenhuma safra encontrada com o ID ${id}`;
        }
        const s = results.rows[0];
        return new Safra(s.id, s.ano, s.quantidade_colhida, s.id_cultivo);
    } catch (err) {
        throw "Erro ao atualizar safra: " + err;
    }
}

const deleteSafraDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM safras WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhuma safra encontrada com o ID ${id}`;
        }
        return "Safra removida com sucesso.";
    } catch (err) {
        throw "Erro ao remover safra: " + err;
    }
}

const getSafraPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM safras WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhuma safra encontrada com o ID ${id}`;
        }
        const s = results.rows[0];
        return new Safra(s.id, s.ano, s.quantidade_colhida, s.id_cultivo);
    } catch (err) {
        throw "Erro ao buscar safra: " + err;
    }
}

module.exports = {
    getSafrasDB,
    addSafraDB,
    updateSafraDB,
    deleteSafraDB,
    getSafraPorIdDB
};
