# API Rest CRUD :  Faire un client

## Résumé des routes de l'api

- l'url de l'api : http://localhost:3000

### Routes : 
- GET /all-product

- POST /create-product

### Détail des requêtes possibles de notre API
```http
GET /all-product
Host: localhost:3000
```

```http
POST /create-product
Host: localhost:3000
Content-type: application/json

{
    "title" : "Air max"
    "price" : 39
}
```

## Structure du front

1. Créer un nouveau projet nommé `front`.

2. Ajoutez deux fichiers :

- `index.html`
- `main.js`


*index.html*
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shop</title>
</head>
<body>
    <h1>Shop</h1>
</body>
<!-- J'importe le script main.js -->
<script type="module" src="main.js"></script>
</html>
```

*main.js*
```js

async function main(){
    console.log("Mon front !");
}

main();
```

1. Lancez votre site web avec un serveur web sur un autre port que celui de l'api REST :

```bash
php -S localhost:4000
```

## fetch - GET /all-product : Récupérer les produits

Pour récupérer les produits je dois donc effectuer une requête HTTP vers mon API REST.

La fonction `fetch()` est faite pour ça.

*main.js*
```js

async function main(){
    // Je fais une requete HTTP
    const response = await fetch("http://localhost:3000");

    // Je converti le body JSON de la réponse en un tableau de produit (le même que j'ai envoyé dans le back)
    const products = await response.json();

    // Je m'en sert, ici je l'affiche dans la console.
    console.log(products);
}

main();
```

Normalement si vous avez des produits dans la table Product (vérifez dans phpmyadmin) vous devriez avoir un tableau de produit qui s'affiche dans la console du navigateur.

> Si la table est vide vous avec un tableau vide `[]`.
> Ce n'ai pas grâve il suffit de rajouter des produits avec la route `POST /create-product`.

Je peux même me servir des produits pour les afficher dans la page.

*main.js*
```js

async function main(){
    // Je fais une requete HTTP
    const response = await fetch("http://localhost:3000");

    // Je converti le body JSON de la réponse en un tableau de produit (le même que j'ai envoyé dans le back)
    const products = await response.json();

    // Je m'en sert, ici je l'affiche dans la console.
    products.forEach(product=>{
        const titleP = document.createElement("p");
        titleP.innerText = product.title;
        document.body.appendChild(titleP);
    })
}

main();
```

## fetch - POST /create-product : Créer un produit

Je veux rajouter un produit depuis mon front-end.

Tout à l'heure j'utilisais Postman pour ajouter un produit.

La requete HTTP produite par postman est comme ceci :

```http
POST localhost:3000/create-product
Content-type: application/json

{
    "title" : "Air max",
    "price" : 39
}
```
Les informations importantes sont : 

- `POST` : la méthode d'accès HTTP
- `/create-product` : la route
- `Content-type : application/json` - En tete (header) http qui indique que nous envoyont du JSON et que express doit donc fabrique l'objet `req.body`.
- Le body JSON :
```json
{
    "title" : "Air max",
    "price" : 39
}
```

je dois donc préciser ces informations à `fetch()`.

*main.js*
```js

async function main(){

    const nouveauProduit = {
        title : "Airmax",
        price : 60
    };


    // Je crée mon header
    const headers = new Headers();
    headers.append("Content-type","application/json");

    const options = {
        body : JSON.stringify(nouveauProduit),
        method : "POST",
        headers : headers
    };

    // Je fais une requete HTTP
    fetch("http://localhost:3000",options).then(response=>{
        console.log("Produit ajouté !");
    });
}

main();
```

## Encapsuler addProduct

