const router = require ('express').Router ();
const payementCtrl = require ('../controllers/payement');
const auth = require ('../middlewares/auth');
const authAdmin = require ('../middlewares/admin');


router.route ('/payement')
    .get (auth, authAdmin, payementCtrl.getPayement)
    .post (auth, payementCtrl.ajoutPayement)


module.exports = router;