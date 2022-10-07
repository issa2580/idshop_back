/* Chargement des modules suivants */
const Client = require("../models/client");
const Payements = require ("../models/payement")
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const { response } = require("express");


/* Les chemins d'access du client */
const clientCtrl = {
    register: async (req, res) =>{
        try {
            const { name, email, password } = req.body;

            const clientExist = await Client.findOne({ email: email });
            /* Controler email */
            if (clientExist) {
                res.status (401);
                res.json ({ msg: 'cet client existe' });
                return;
            }
            if (password.length < 6){
                res.status (401);
                res.json ({ msg: 'mot de passe imcomplet' });
                return;
            }
            const passwordHash = await bcrypt.hash (password, 10);
            const newClient = new Client({
                name, email, password: passwordHash,
            });
            /* Enregistrer nouveau client */
            await newClient.save ();

            res.status (200);
            /*
            console.log (newClient); 
            res.json (newClient);
            */
            res.json ({ msg: 'inscription avec succes' });
            return;
            
            
            /* Authentification JWT */
            const token = genToken ({ id: newClient._id});
            const refresh = genRefresh ({ id: newClient._id});

            res.cookie ('refresh', refresh, {
                httpOnly: true,
                path: '/client/refresh_token',
            });

            res.status (200);
            res.json ({ token });

 
        } catch (error) {
            /* Message d'erreur */
            res.status (400);
            res.json (error);
        }
    },

    login: async (req, res) =>{
        try {
            const { email, password } = req.body;

        const client = await Client.findOne ({ email });
        if (!client){
            res.status (401);
            res.json({ msg: 'client inexistant' });
            return;
        }

        const isMatch = await bcrypt.compare (password, client.password);
        if (!isMatch){
            res.status (401);
            res.json({ msg: 'mot de passe incorrecte' });
            return;
        }

        const token = genToken ({ id: client._id});
        const refresh = genRefresh ({ id: client._id});

        res.cookie ('refresh', refresh, {
            httpOnly: true,
            path: '/client/refresh_token',
        });

        res.status (200);
        res.json ({ token });

        } catch (error) {
            res.status (400);
            res.json (error);
            
        }
    },

    logout: async (req, res) =>{
        try {
            res.clearCookie ('refresh', { path: '/client/refresh_token' });
            res.status (200);
            res.json ({ msg: 'Au revoir' });
            return;

        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
        }
    },

    refreshToken: async (req, res) =>{
        try {
            const rf_token = req.cookies.refresh;
            
            if (!rf_token){
                res.status (401);
                res.json ({ msg: 'Veuillez vous inscrire' });
                return;
            }
           

            jwt.verify (rf_token, process.env.REFRESH, (err, client) =>{
                if(err){
                    res.status (401);
                    res.json ({ msg: 'Veuillez vous inscrire' });
                    return;

                }

                const token = genToken ({id: client.id});
                res.json ({ token });
                return;
              
            });    
            
        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message});
        }  
        
    },

    getClient: async (req, res) =>{
        try {
            const client = await Client.findById (req.client.id).select ('-password');

            if (!client){
                res.status (401);
                res.json ('client inexistant');
                return;
            }
            response.status (200);
            res.json (client);
        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
        }
    },

    addPanier: async (req, res) =>{
        try {
            const client = await Client.findById (req.client.id)
            if (!client) return res.status (404).json ({ msg: 'client inexistant' });

            await Client.findOneAndUpdate ({ _id: req.client.id}, {
                panier: req.body.panier
            })

            res.status (200);
            res.json ({ msg: 'panier ajouté' })
        
        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });

        }
    },

    history: async (req, res) =>{
        try {
            const history = await Payements.find({id_client: req.client.id});

            res.status (200);
            res.json (history)
        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
        }
    }
    
}

/* Fonction de generation de token */
const genToken = (client) =>{
    return jwt.sign (client, process.env.TOKEN, {
        expiresIn: '60d',
    });
};
/* Rafrechir le token */
const genRefresh = (client) =>{
    return jwt.sign (client, process.env.REFRESH, {
        expiresIn: '60d',
    });
};

module.exports = clientCtrl;