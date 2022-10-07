/* Chargement des modules suivants */
const router = require('express').Router ();
const cloudinary = require ('cloudinary');
const authAdmin = require('../middlewares/admin');
const auth = require('../middlewares/auth');
const fs = require ('fs');
const path = require('path');


cloudinary.config ({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET 
});

/* Charger une image */
router.post ('/upload', auth, authAdmin, (req, res) =>{
    try {
        console.log (req.files);
        if (!req.files || Object.keys(req.files).length === 0 ){
            res.status (404);
            res.json ({ msg: 'Pas de fichier'});
            return;
        }

        const file = req.files.file;
        if (file.size > 1024*1024){
            supTmp (file.tempFilePath);
            res.status (404);
            res.json ({ msg: 'Fichier volumineux '});
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/webp'){
            supTmp (file.tempFilePath);
            res.status (404);
            res.json ({ msg: 'Format non autorisé '});
        }

        cloudinary.v2.uploader.upload (file.tempFilePath, { folder: "test" }, async (err, result) =>{
            if (err){
                res.status (404);
                throw err;
            } else{
                supTmp (file.tempFilePath);
                res.status (200);
                res.json ({ public_id: result.public_id, url: result.secure_url });
            }
               
        });
        
    } catch (error) {
        res.status (400);
        res.json ({ msg: error.message });
    }
})

/* Supprimer une image */
router.post ('/destroy', auth, authAdmin, (req, res) =>{
    try {
        const { public_id } = req.body;

        if (!public_id){
            res.status (404);
            res.json ({ msg: 'Aucune image trouvé' });
            return;
        }

        cloudinary.v2.uploader.destroy (public_id, async (err, result) =>{
            if (err){
                throw err
            } else{
                res.status (200);
                res.json ({ msg: 'image supprimer' });
            }
        });
    } catch (error) {
        res.status (400);
        res.json ({ msg: error.message });
    }
})


const supTmp = (path) =>{
    fs.unlink (path, err =>{
        if (err){
            throw err;
        }
    });
}

module.exports = router;