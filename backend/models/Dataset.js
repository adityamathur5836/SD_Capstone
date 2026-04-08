class Dataset {
    constructor(id, name, type, userId) {
        this._id = id;
        this._name = name;
        this._type = type;
        this._userId = userId;
        this._uploadedAt = new Date();
    }

    getId() { return this._id; }
    getName() { return this._name; }
    getType() { return this._type; }
    
    validate() {
        if (!this._name || !this._type) {
            throw new Error("Dataset is missing critical properties for GAN synthesis.");
        }
        return true;
    }

    save() {
        this.validate();
        return {
            success: true,
            message: `Dataset '${this._name}' (Type: ${this._type}) handled successfully.`,
            dataset_id: this._id
        };
    }
}

module.exports = { Dataset };