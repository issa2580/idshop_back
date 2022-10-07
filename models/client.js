/* Chargement des modules suivants */
const mongoose = require ('mongoose');

const clientSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: Number,
        default: 0,
    }, 

    panier: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
});

const Client = mongoose.model ('Client', clientSchema)

module.exports = Client;
