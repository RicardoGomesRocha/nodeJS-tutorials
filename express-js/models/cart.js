const { throws } = require('assert');
const fs = require('fs');
const path = require('path');

module.exports = class Cart {
    static #cartPath = path.join(require.main.path, 'data', 'cart.json');

    static addProduct(id, price) {
        price = +price;
        const cart = this.fetchCart();
        const index = cart.products.findIndex((product) => product.id === id);
        let product;
        if (index < 0)
        {
            product = {};
            product.id = id;
            product.quantity = 1;
            product.price = price;
            cart.products.push(product);
            
        } else {
            product = cart.products[index];
            product.id = id;
            product.quantity++;
            product.price = price;
            cart.products[index] = product; 
        }     
        cart.totalPrice += price; 
        this.save(cart);
    }

    static deleteProduct(id) {
        const cart = this.fetchCart();
        cart.products = cart.products.filter(product => product.id !== id);
        if(cart.products.length > 0) {
            cart.totalPrice = cart.products.reduce((accumulator, currentValue) => accumulator + currentValue);
        } else {
            cart.totalPrice = 0;
        }
    
        this.save(cart);
    }

    static fetchCart() {
        let data;
        try {
            data = fs.readFileSync(this.#cartPath);
        } catch(ex) {
            this.save({products:[], totalPrice: 0});
            return this.fetchCart();
        }
        const cart = JSON.parse(data);
        return cart;
    }

    static save(cart) {
        fs.writeFileSync(this.#cartPath, JSON.stringify(cart));
    }
}