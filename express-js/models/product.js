const Cart = require('../models/cart');
const database = require('../util/database');

module.exports = class Product {
     
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        
    }

    delete() {
       
    }

    static async fetchAll() {
        try{
            const [rows, fieldData] = await database.execute('SELECT * FROM products');
            return rows;
        } catch(ex) {
            console.error(ex);
            return [];
        }
    }

    static findById(id) {
    }    

    static deleteById(id) {
    }
}

