/* Chargements des modules suivants */
const router = require ('express').Router();
const clientCtrl = require('../controllers/client');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/admin');
const authVender = require ('../middlewares/vender');




/* Specification des chemins d'acces suivants */
/* Creation de compte */
router.post ('/register', clientCtrl.register);
/* Connexion au compte */
router.post ('/login', clientCtrl.login);
/* Deconnexion au compte */
router.get ('/logout', clientCtrl.logout);
/* Chargement de token */
router.get ('/refresh_token', clientCtrl.refreshToken);
/* Access client */
router.get ('/access', auth, clientCtrl.getClient);
/* Payement panier */
router.patch ('/addpanier', auth, clientCtrl.addPanier);
/* historique commande */
router.get ('/history', auth, clientCtrl.history);


module.exports = router;