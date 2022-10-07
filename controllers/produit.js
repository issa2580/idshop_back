const Produit = require("../models/produit");


class APIfeatures {
    constructor (query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtrer (){
        const queryObj = {...this.queryString};
        console.log(queryObj)
        const filtre = ['page', 'sort', 'limit']
        filtre.forEach (el => delete (queryObj [el]))

        let balance = JSON.stringify(queryObj)
        balance = balance.replace (/\b(gte|gt|lte|lt|regex)\b/g, match => 'FCFA' + match);

        this.query.find(JSON.parse(balance))
        return this;

    }

    trier (){
        if (this.queryString.sort){
            const trie = this.queryString.sort.split(',').join(' ')
            console.log(trie);
            this.query = this.query.sort(trie);
        } else{
            this.query = this.query.sort ('-createdAt');
        }
        return this;
    }

    paginer (){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 12;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


const produitCtrl = {

    fetchProduit: async (req, res) =>{
        try {

            const features = new APIfeatures(Produit.find(), req.query)
            .filtrer ()
            .trier ()
            .paginer ()

            const produit = await features.query;

            res.status (200);
            res.json ({
                status: 'success',
                result: produit.length,
                produit: produit
            })

        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
        }
    },

    ajoutProduit: async (req, res) =>{
        try {
            const { produit_id, libelle, prix, description, contenu, images, category } = req.body;

            if (!images){
                res.status (404);
                res.json ({ msg: 'charger une image' });
                return;
            } 

            const produit = await Produit.findOne ({ produit_id });
            if (produit){
                res.status (404);
                res.json ({ msg: 'cet produit existe' });
                return
            }

            const newProduit = new Produit ({
                produit_id, libelle: libelle.toLowerCase(), prix, description, contenu, images, category
            });

            await newProduit.save ();

            res.status (200);
            res.json ({ msg: 'le produit a été ajouter' });
        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
            
        }
    },

    supProduit: async (req, res) =>{
        try {
            await Produit.findByIdAndDelete (req.params.id);

            res.status (200);
            res.json ({ msg: 'le produit a été supprimer' });

        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
        }
    },

    modifProduit: async (req, res) =>{
        try {
            const { libelle, prix, description, contenu, images, category } = req.body;

            if (!images){
                res.status (404);
                res.json ({ msg: 'charger une image' });
                return;
            }

            await Produit.findOneAndUpdate ({ id: req.params.id }, {
                libelle: libelle.toLowerCase(), prix, description, contenu, images, category
            });

            res.status (200);
            res.json ({ msg: 'le produit été modifier' });

        } catch (error) {
            res.status (400);
            res.json ({ msg: error.message });
        }
    }
}


module.exports = produitCtrl;