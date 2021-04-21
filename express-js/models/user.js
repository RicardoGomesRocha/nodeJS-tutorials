const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    cart: {
        items: [{ 
                productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true}, 
                quantity: {type: Number, required: true}
            }]
    }
});

userSchema.methods.addToCart = async function(product) {
    const index = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString());
    let quantity = 1;
    const items = [...this.cart.items];
    
    if (index > -1) {
        quantity = ++this.cart.items[index].quantity;
        items[index].quantity = quantity;
    } else {
        items.push({
            productId: product._id,
            quantity
        });
    }
    this.cart = {items};
    return this.save()
}


userSchema.methods.removeFromCart = async function(productId) {
    this.cart.items = this.cart.items.filter((item) => productId !== item.productId.toString());
    return this.save();
}

module.exports = mongoose.model('User', userSchema);




// const {ObjectId} = require('mongodb');
// const { getDb } = require('../util/database');

// class User { 
//     constructor(username, email, id, cart) {
//         this.username = username;
//         this.email = email;
//         this._id = ObjectId(id);
//         this.cart = cart;
//     }

//     async addOrder() {
//         const products = await this.getCartItems();
//         const order = {
//             items: products,
//             userId: this._id
//         };
//         const db = getDb();
//         await db.collection('orders').insertOne(order);
//         this.cart = {items: []}
//         await db.collection('users').updateOne({_id: this._id }, {$set: {cart: this.cart}});
//     }

//     async getOrders() {
//         const db = getDb();
//         const orders =  db.collection('orders').findOne({userId: this._id});
//         return orders;
//     }

//     async getCartItems() {
//         const db = getDb();
//         const productIds = this.cart.items.map((item => item.productId))
//         const products = await db.collection('products').find({_id: {$in: productIds}}).toArray();
//         return products.map((product) => {
//             return {
//             ...product, 
//             quantity: this.cart.items.find(i => i.productId.toString() === product._id.toString()).quantity
//             }
//         });
//     }

//     async deleteItemFromCart(productId) {
//         const items = this.cart.items.filter((item) => productId !== item.productId.toString());
//         const db = getDb();
//         return db.collection('users')
//             .updateOne({_id: this._id }, {$set: { cart: {items}}})
//     }

//     async save() {
//         const db = getDb();
//         let user;
//         if (this._id) {
//             user = await db.collection('users').updateOne({_id: this._id }, {$set: this});
//         } else {
//             user = await db.collection('users').insertOne(this);
//         }
//         return product;
//     }

//     async addToCart(product) {
//         const index = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString());
        
//         let quantity = 1;
//         const items = [...this.cart.items];
        
//         if (index > -1) {
//             quantity = ++this.cart.items[index].quantity;
//             items[index].quantity = quantity;
//         } else {
//             items.push({
//                 productId: ObjectId(product._id),
//                 quantity
//             })
//         }

//         const cart = {items};
//         const db = getDb();
//         await db.collection('users').updateOne({_id: this._id }, {$set: {cart}});
//     }

//     static async findById(id) {
//         const db = getDb();
//         return db.collection('users').find({_id: ObjectId(id)}).next();
//     }
    
// }

// module.exports = User;