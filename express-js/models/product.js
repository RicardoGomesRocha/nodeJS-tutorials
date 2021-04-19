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

    async save() {
         try{
            if (this.id) {
                const product = await Product.findById(this.id);
                if (!product) {
                    await database.execute(`INSERT INTO products (id, title, price, description, imageUrl) VALUES ('${this.id}', '${this.title}', '${this.price}', '${this.description}', '${this.imageUrl}')`);
                } else {
                    await database.execute(`UPDATE products SET title='${this.title}', price='${this.price}', description='${this.description}', imageUrl='${this.imageUrl}' WHERE id='${this.id}'`);
                }
               
            } else {
                await database.execute(`INSERT INTO products (title, price, description, imageUrl) VALUES ('${this.title}', '${this.price}', '${this.description}', '${this.imageUrl}')`);
            }
        } catch(ex) {
            console.log(err);
        }
    }

    async delete() {
       await Product.deleteById(this.id);
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

    static async findById(id) {
         try{
            const [rows, fieldData] = await database.execute(`SELECT * FROM products WHERE id='${id}'`);
            if(rows && rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch(ex) {
            console.error(ex);
            return [];
        }
    }    

    static async deleteById(id) {
         try{
            await database.execute(`DELETE FROM products WHERE id='${id}'`);
        } catch(ex) {
            console.error(ex);
        }
    }
}

