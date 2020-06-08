
    //Main function => promise of sendRequest function with Id like parameter

var param = new URL(document.location).searchParams.get("id");
sendRequest("GET", "http://localhost:3000/api/cameras/"+param, null)
.then(responseRequest => {
    nbProductCart();
    addBlocsViews(responseRequest);
    controlProduct(responseRequest);
    clickToAddProduct(responseRequest);
})
.catch(error => {
    alert(error);
});

/*
            Function to call addProduct function when the mouse click on the button
            Parameter: data => database from selectionned product in sendRequest function
*/

function clickToAddProduct(data) {
    let order = document.getElementById("article__validation__cart");
    order.addEventListener("click", function() {
        addProduct(data);
    });
}

/*
            Function to generate contents blocs according product selectionned in  home page 
            Parameter: data => database from selectionned product in sendRequest function
*/

function addBlocsViews(data) {
    let addBlocs = [
        ["article__content","aside","article__content__picture","<img src=\""+data.imageUrl+"\" alt=\"product view\">"],
        ["article__content","section","article__content__feature","<h3>"+data.name+"</h3><p>"+data.description+
        "</p><label for=\"lentilles\">Lentille sélectionnée</label><select id=\"lentilles\" required></select><p>Prix: "+data.price/100+"€</p>"]
    ];
    for (let i = 0; i < addBlocs.length; i++) 
    {
        createObject(addBlocs[i][0],addBlocs[i][1],addBlocs[i][2],addBlocs[i][3],0);
    }
    let choice = document.getElementById("lentilles");
    for (let i = 0; i < data.lenses.length; i++)
    {
        choice.innerHTML += "<option>"+data.lenses[i]+"</option>"
    }
} 

/*
            Function to add product in cart and set it in navigator memory
            Parameter: data => database from selectionned product in sendRequest function
*/

function addProduct(data) {
    let commentOrder = document.getElementsByClassName("article__content__feature");
    let input = document.getElementById("lentilles").value;
    data.lenses = input;
    commentOrder[0].innerHTML += "<p>Produit ajouté dans le panier!</p>";
    commentOrder = document.getElementById("article__validation__cart").disabled = true;
    orderStorage.setItem(data._id,JSON.stringify(data));
    nbProductCart();
}

/*
            Function to check the presence of product in cart and desable cart button
            Parameter: data => database from selectionned product in sendRequest function
*/ 

function controlProduct(data) {
    let commentOrder = document.getElementsByClassName("article__content__feature");
    if (orderStorage.getItem(data._id) != null) {
            commentOrder[0].innerHTML += "<p>Produit déjà dans le panier!</p>";
            commentOrder = document.getElementById("article__validation__cart").disabled = true;
    }
}