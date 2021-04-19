const fs = require('fs');
const path = require('path');

module.exports = class Product {
     
    static #productsPath = path.join(require.main.path, 'data', 'products.json');

    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        const products = Product.fetchAll();
        products.push(this);
        fs.writeFileSync(Product.#productsPath, JSON.stringify(products));
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
    
}