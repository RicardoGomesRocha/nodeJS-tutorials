const fs = require('fs');
const path = require('path');

module.exports = class Product {
     
    static #productsPath = path.join(require.main.path, 'data', 'products.json');

    constructor(title) {
        this.title = title;
    }

    save() {    
        const products = Product.fetchAll();
        products.push(this);
        fs.writeFileSync(Product.#productsPath, JSON.stringify(products));
    }

    static fetchAll() {

        let data = '[]';
        try {
            data = fs.readFileSync(this.#productsPath);
        }catch(ex) {
            console.err(ex);
        }
        if(!data) data = '[]';
        const products = JSON.parse(data);
        return products;
    }
    
}