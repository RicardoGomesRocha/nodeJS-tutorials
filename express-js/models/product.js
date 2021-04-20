const { getDb } = require('../util/database');
const {ObjectId} = require('mongodb');

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    async save() {
        const db = getDb();
        const product = await db.collection('products').insertOne(this);
        console.log(product);
    }

    static async findAll() {
        const db = getDb();
        return db.collection('products').find().toArray();
    }

    static async findById(id) {
        const db = getDb();
        return db.collection('products').find({_id: ObjectId(id)}).next();
    }
}

module.exports = Product;