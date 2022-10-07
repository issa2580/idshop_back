/* Chargement des modules suivants */
const categoryCtrl = require('../controllers/category');
const authAdmin = require('../middlewares/admin');
const auth = require('../middlewares/auth');
const authVender = require('../middlewares/vender');



const router = require ('express').Router ();



router.route ('/category')
    .get (categoryCtrl.getCategory)
    .post (auth, authAdmin, authVender, categoryCtrl.createCategory)

router.route ('/category/:id')
    .delete (auth, authAdmin, authVender, categoryCtrl.deleteCategory)
    .put (auth, authAdmin, authVender, categoryCtrl.updateCategory)


module.exports = router;
