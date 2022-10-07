
/* Chargement des modules suivants */
const router = require ('express').Router ();
const produitCtrl = require('../controllers/produit');


router.route ('/produit')
    .get (produitCtrl.fetchProduit)
    .post (produitCtrl.ajoutProduit)


router.route ('/produit/:id')
    .put (produitCtrl.modifProduit)
    .delete (produitCtrl.supProduit)



module.exports = router;

