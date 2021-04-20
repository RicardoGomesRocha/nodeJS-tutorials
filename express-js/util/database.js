const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

mongoConnect = async() => {
  return await MongoClient.connect('mongodb+srv://admin:admin@cluster0.znfhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
}

module.exports = mongoConnect;