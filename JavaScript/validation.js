sendRequest("POST","http://localhost:3000/api/cameras/order",tempoData.getItem("toSend"))
.then(data => {
    numberOrderView(data);
    listProductOrder(data);
    customerInfos(data);
    tempoData.clear();
})
    .catch(error => {
        alert(error);
});

function numberOrderView(data) {
    let numberOrder = document.getElementsByClassName("order__products-order__reference");
    numberOrder[0].innerText = "Réf. "+data.orderId;
}

function listProductOrder(data) {
    const tab = ["imageUrl","name","lenses","price"];
    var cost = 0;
    for (let i = 0 ; i < data.products.length; i++) {
        createObject("order__products-order__products-list","tr","order__products-order__products-list__product",null,0);
        const product = data.products[i];
        for (let j = 0 ; j < tab.length; j++) {
            for (let key in product) {
                if (key == tab[j]) {
                    switch (key) {
                    case "imageUrl":
                        createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__image--resum","<img src=\""+product[key]+"\" alt=\"product view\">",i);
                        break;
                    case "name":
                        createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__name--resum",product[key],i);
                        break;
                    case "lenses":
                        createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__lenses--resum","Possibilités offertes: "+ product[key],i);
                        break;
                    case "price":
                        createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__price--resum",product[key]/100+"€",i);
                        cost += product[key]/100;
                        break;
                    }
                }   
            }           
        }
    }
    createObject("order__products-order__cost-order","tr","order__products-order__cost-order__label","<td>Coût total de la commande: </td><td>"+cost+" €</td>" ,0);
}

function customerInfos(data) {
    let infosTarget = ["firstName","lastName","address","city","email"];
    for ( let info of infosTarget) {
        for ( let key in data.contact) {
            if ( info == key) {
                createObject(info,"span",null,data.contact[key],0);
            }
        }
    }
}