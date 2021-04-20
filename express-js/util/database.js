const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _client; 

const mongoConnect = async() => {
    if(!_client) {
        const client = await MongoClient.connect('mongodb+srv://admin:admin@cluster0.znfhk.mongodb.net/shop?retryWrites=true&w=majority', { useUnifiedTopology: true } );
        _client = client;
    }
    return _client;
}

const getDb = () => {
    return _client.db('shop');
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;