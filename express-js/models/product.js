const fs = require('fs');
const path = require('path');
const Cart = require('../models/cart');

module.exports = class Product {
     
    static #productsPath = path.join(require.main.path, 'data', 'products.json');

    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        const products = Product.fetchAll();
        let product;
        if(this.id) {
           const index = products.findIndex(product => product.id === this.id);
           if(index > -1) {
               products[index] = this;
           } else {
               product = this;
                fs.writeFileSync(Product.#productsPath, JSON.stringify(products));
           }
        } else {
            this.id = Math.random().toString();
            product = this;
            products.push(product);
        }
        fs.writeFileSync(Product.#productsPath, JSON.stringify(products));
    }

    delete() {
        Product.deleteById(this.id);
    }

    static fetchAll() {

        let data;
        try {
            data = fs.readFileSync(this.#productsPath);
        }catch(ex) {
            console.error(ex);
        }
        if(!data) data = '[]';
        const products = JSON.parse(data);
        return products;
    }

    static findById(id) {
        const products = this.fetchAll();
        return products.find((product) => product.id === id);
    }    

    static deleteById(id) {
        let products = Product.fetchAll();
        products = products.filter(product => product.id !== id);
        fs.writeFileSync(Product.#productsPath, JSON.stringify(products));
        Cart.deleteProduct(this.id);
    }
}

