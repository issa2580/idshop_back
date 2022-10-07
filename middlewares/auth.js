/* Chargement des modules suivants */
const jwt = require ('jsonwebtoken');

/* Fonction d'autorisation */
const auth = (req, res, next) =>{
    try {
        const token = req.header ('Authorization');
        if (!token){
            res.status (401);
            res.json ({ msg: 'authentification invalide'});
            return;
        }

        jwt.verify (token, process.env.TOKEN, (error, client) =>{
            if (error){
                res.status (401);
                res.json ({ msg: 'authentification invalide' });   
            } else{
                res.status (200);
                req.client = client;
                next ();
            }
        });
    } catch (error) {
        res.json ({ msg: error.message });
    }
}



module.exports = auth;
