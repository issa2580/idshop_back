/* Chargement des modules suivants */
const Client = require("../models/client");

const authAdmin = async (req, res, next) =>{
    try {
        const client = await Client.findOne ({ _id: req.client.id});

        if (client.role === 0){
            res.status (401);
            res.json ({ msg: 'Access non autorisé' });
            return;
        
        }

        res.status (200);
        next ();
    } catch (error) {
        res.status (400);
        res.json ({ msg: error.message });
    }

}


module.exports = authAdmin;

