const { getDb } = require('../util/database');
const {ObjectId} = require('mongodb');

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ?? undefined;
        this.userId = Object(userId);
    }

    async save() {
        const db = getDb();
        let product;
        if (this._id) {
            product = await db.collection('products').updateOne({_id: this._id }, {$set: this});
        } else {
            product = await db.collection('products').insertOne(this);
        }
        return product;
    }

    static async findAll() {
        const db = getDb();
        return db.collection('products').find().toArray();
    }

    static async findById(id) {
        const db = getDb();
        return db.collection('products').find({_id: ObjectId(id)}).next();
    }

    static async deleteById(id) {
        const db = getDb();
        return db.collection('products').deleteOne({_id: ObjectId(id)});
    }
}

module.exports = Product;