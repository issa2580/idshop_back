/* Chargement des modules suivants */
const mongoose = require ('mongoose');


/* La structure d'un produit */
const produitSchema = new mongoose.Schema ({
    produit_id: {
        type: String,
        unique: true,
        trim: true,
        require: true,
    },

    libelle: {
        type: String,
        trim: true,
        require: true,
    },

    prix: {
        type: Number,
        trim: true,
        require: true,
    },

    description: {
        type: String,
        require: true,
    },

    contenu: {
        type: String,
        require: true,
    },

    images: {
        type: Object,
        require: true,
    },

    category: {
        type: String,
        require: true,
    },

    checked: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true
});

const Produit = mongoose.model ('Produit', produitSchema);

module.exports = Produit;
