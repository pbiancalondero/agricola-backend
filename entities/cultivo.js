class Cultivo {
    constructor(id, tipo_cultura, area, data_plantio, data_colheita, id_produtor) {
        this.id = id;
        this.tipo_cultura = tipo_cultura;
        this.area = area;
        this.data_plantio = data_plantio;
        this.data_colheita = data_colheita;
        this.id_produtor = id_produtor;
    }
}

module.exports = Cultivo;
