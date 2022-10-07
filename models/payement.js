const mongoose = require ('mongoose');

const payementSchema = new mongoose.Schema ({
    id_client: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    adresse: {
        type: String,
        required: true,
    },

    tel: {
        type: Number,
        required: true,
    },

    panier: {
        type: Array,
        required: true,
    },

    total: {
        type: Number,
        required: true,
    },

    status: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})


const Payements = mongoose.model ('Payments', payementSchema);
module.exports = Payements;