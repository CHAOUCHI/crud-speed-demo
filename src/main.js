import express from "express";
import { getAllProducts, newProduct, sequelize } from "./database.js";

sequelize.sync({force : true}).then(()=>{
    // quand la BDD est bien connecté je démarre mon programme
    main();

});

function main(){
    
    const app = express();

    app.use(express.json());

    app.get("/all-products",async (req,res)=>{
        const products = await getAllProducts();
        res.json(products);
    });

    app.post("/create-product",async (req,res)=>{
        console.log(req.body);
        const product = await newProduct(req.body.title,req.body.price);
        res.json(product);
    })

    app.listen(3000,()=>{
        console.log("API listen on port 3000");
    });

}