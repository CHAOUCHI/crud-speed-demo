import { DataTypes, Sequelize } from "sequelize";

/**
 * INIt BDD
 */
const login = {
    database : "shop",
    username : "root",
    password : "root",
};
export  const sequelize = new Sequelize(login.database,login.username,login.password,{
    dialect:"mysql"
});

/**
 * CREATE TABLE
 */

const Product =  sequelize.define("Product",{
    title : DataTypes.STRING,
    price : DataTypes.INTEGER
});


/**
 * CRUD fonctions
 */

export async function getAllProducts(){
    const products = await Product.findAll();
    
    return products;
}

/**
 * Ajoute un produit à la bdd
 * @param {string} title 
 * @param {number} price 
 */
export async function newProduct(title,price){
    const newProduct = await Product.create({
        title : title,
        price : price
    });

    return newProduct;
}