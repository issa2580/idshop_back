/* Chargement des modules suivants */
require ('dotenv') .config ();
const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');
const fileupload = require ('express-fileupload');
const cookie = require ('cookie-parser');
const path = require ("path")


/* Chargement des serveur suivants */
const app = express ();
app.use (express.json ());
app.use (cors ());
app.use (cookie ());
app.use (fileupload ({
    useTempFiles: true,
}))

/* Chargement des routes */
app.use ('/client', require ('./routes/client'));
app.use ('/api', require ('./routes/category'));
app.use ('/api', require ('./routes/upload'));
app.use ('/api', require ('./routes/produit'));
app.use ('/api', require ('./routes/payement'));



/* Connexion au base de données de mongodb */
const URL = process.env.MONGODB_URL
    mongoose
    .connect(URL, {
    
    /*
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
    */
    
    })
    .then (() => console.log('Connexion établie')) 
    .catch (err => console.log('connexion échouée')); 
    


/* Envoyer un message au console de la navigation */
app.get ('/', (req, res) =>{
    res.json ({ msg: "Hello MERN "});
})


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

/* Chargement du port de navigation */
const PORT = process.env.PORT || 5000;
app.listen (PORT, () =>{
    console.log ('Le server tourne au port', PORT);
})