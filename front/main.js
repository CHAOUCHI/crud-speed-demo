async function main(){

    const formulaire = document.querySelector("form");

    formulaire.addEventListener("submit",(event)=>{
        event.preventDefault();
        const formData = new FormData(formulaire);
        
        addProduct({
            title : formData.get("title"),
            price : formData.get("price"),
        });

    });



}

main();

async function addProduct(nouveauProduit){
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