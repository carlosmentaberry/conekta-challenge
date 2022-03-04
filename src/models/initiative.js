class Field {
    constructor(prop, ak) {
        this.property = prop;
        this.access_key = ak;
    }
}

class Initiative {
    constructor(initiative, fields) {
        this.initiative = initiative;
        this.fields = fields;
    }
}

module.exports = {
    Field,
    Initiative,
}