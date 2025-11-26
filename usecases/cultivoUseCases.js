const { pool } = require('../config');
const Cultivo = require('../entities/cultivo');

const getCultivosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM cultivos ORDER BY id');
        return rows.map((c) => new Cultivo(c.id, c.tipo_cultura, c.area, c.data_plantio, c.data_colheita, c.id_produtor));
    } catch (err) {
        throw "Erro ao buscar cultivos: " + err;
    }
}

const addCultivoDB = async (body) => {
    try {
        const { tipo_cultura, area, data_plantio, data_colheita, id_produtor } = body;
        const results = await pool.query(
            `INSERT INTO cultivos (tipo_cultura, area, data_plantio, data_colheita, id_produtor)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, tipo_cultura, area, data_plantio, data_colheita, id_produtor`,
            [tipo_cultura, area, data_plantio, data_colheita, id_produtor]
        );
        const c = results.rows[0];
        return new Cultivo(c.id, c.tipo_cultura, c.area, c.data_plantio, c.data_colheita, c.id_produtor);
    } catch (err) {
        throw "Erro ao inserir cultivo: " + err;
    }
}

const updateCultivoDB = async (body) => {
    try {
        const { id, tipo_cultura, area, data_plantio, data_colheita, id_produtor } = body;
        const results = await pool.query(
            `UPDATE cultivos 
             SET tipo_cultura = $1, area = $2, data_plantio = $3, data_colheita = $4, id_produtor = $5
             WHERE id = $6
             RETURNING id, tipo_cultura, area, data_plantio, data_colheita, id_produtor`,
            [tipo_cultura, area, data_plantio, data_colheita, id_produtor, id]
        );
        if (results.rowCount == 0) {
            throw `Nenhum cultivo encontrado com o ID ${id}`;
        }
        const c = results.rows[0];
        return new Cultivo(c.id, c.tipo_cultura, c.area, c.data_plantio, c.data_colheita, c.id_produtor);
    } catch (err) {
        throw "Erro ao atualizar cultivo: " + err;
    }
}

const deleteCultivoDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM cultivos WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum cultivo encontrado com o ID ${id}`;
        }
        return "Cultivo removido com sucesso.";
    } catch (err) {
        throw "Erro ao remover cultivo: " + err;
    }
}

const getCultivoPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM cultivos WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum cultivo encontrado com o ID ${id}`;
        }
        const c = results.rows[0];
        return new Cultivo(c.id, c.tipo_cultura, c.area, c.data_plantio, c.data_colheita, c.id_produtor);
    } catch (err) {
        throw "Erro ao buscar cultivo: " + err;
    }
}

module.exports = {
    getCultivosDB,
    addCultivoDB,
    updateCultivoDB,
    deleteCultivoDB,
    getCultivoPorIdDB
};
