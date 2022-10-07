const Payements = require ('../models/payement');
const Client = require ('../models/client')
const Produit = require ('../models/produit');


const payementCtrl = {

    getPayement: async (req, res) =>{
        try {
            const payements = await Payements.find ();
            res.status (200)
            res.json (payements);
        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
        }
    }, 

    ajoutPayement: async (req, res) =>{
        try {
            const client = await Client.findById(req.client.id).select('name email');
            if (!client) return res.status (404).json ({msg: 'client inexistant'});

            const {panier, adresse, total, tel} = req.body;
            const {_id, name, email} = client;

            const newPayement = new Payements ({
                id_client: _id, name, email, panier, total, adresse, tel
            })

            res.status (200);
            await newPayement.save ();
            res.json (newPayement);
            console.log (newPayement)
        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
        }
    }
}



module.exports = payementCtrl;