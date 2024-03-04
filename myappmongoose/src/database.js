let mongoose = require('mongoose') ;
const server = '127.0.0.1:27017' ; // REPLACEZ AVEC VOTRE SERVEUR DE BASE DE DONNEES
const database = 'myDB' ; // REPLACEZ AVEC LE NOM DE VOTRE BASE DE DONNEES
class Database {
  constructor() {
    this._connect()
  }
_connect() {
     mongoose.connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.logging('Connexion à la base de données réussie')
       })
       .catch(err => {
         console.error('Erreur de connexion à la base de données')
       })
  }
}
module.exports = new Database()