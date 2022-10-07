/* Chargement des modules suivants */
const Category = require ('../models/category');


const categoryCtrl = {
    getCategory: async (req, res) =>{
        try {
            const categories = await Category.find ();
            res.status (200);
            res.json (categories);
        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
        }
    },

    createCategory: async (req, res) =>{
        try {
            const { name } = req.body;
            const category = await Category.findOne ({ name });
            if (category){
                res.status (401);
                res.json ({ msg: 'cet categorie existe' });
            }

            const newCategory = new Category ({ name });
            await newCategory.save ();
            res.status (200);
            res.json ({ msg: 'categorie creer avec succes '});
        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
        }
    },

    deleteCategory: async (req, res) =>{
       try {
            await Category.findByIdAndDelete (req.params.id);
            res.status (200);
            res.json ({ msg: 'categorie supprimer'});
       } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
       }
    },

    updateCategory: async (req, res) =>{
        try {
            const { name } = req.body;
            await Category.findByIdAndUpdate ({ _id: req.params.id }, { name });
            res.status (200);
            res.json ({ msg: 'categorie modifié '});
        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
        }
    }
}


module.exports = categoryCtrl;