listProductOrder(orderStorage);
ClickToPrepareData(orderStorage);

function listProductOrder(data) {
    const tab = ["imageUrl","name","lenses","price","delete"];
    var cost = 0;
    for (let i = 0 ; i < data.length; i++) {
        let memoryData = JSON.parse(data.getItem(data.key(i)));
        createObject("order__products-order__products-list","tr","order__products-order__products-list__product",null,0);
        for (let j = 0 ; j < tab.length; j++) {
            for (const key in memoryData) {
                if (key == tab[j]) {
                    switch (key) {
                    case "imageUrl":
                        createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__image--cart","<img src=\""+memoryData[key]+"\" alt=\"product view\">",i);
                        break;
                    case "name":
                        createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__name--cart",memoryData[key],i);
                        break;
                    case "lenses":
                        createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__lenses--cart","Personnalisation: "+ memoryData[key],i);
                        break;
                    case "price":
                        createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__price--cart",memoryData[key]/100+"€",i);
                        cost += memoryData[key]/100;
                        break;
                    }
                }
            }
            if (tab[j] == "delete") {
                createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__delete--cart","<img src=\"../Images/corbeille.png\" alt=\"product to delete icon\">",i);
                activeFunctionDelete(memoryData,i);
            }
        }
    } 
    createObject("order__products-order__cost-order","tr","order__products-order__cost-order__label","<td>Coût total de la commande: </td><td>"+cost+" €</td>" ,0);
}

function activeFunctionDelete(data,level) {
    let deleteObject = document.getElementsByClassName("order__products-order__products-list__product__delete--cart");
    deleteObject[level].setAttribute("id",""+data._id+"");
    deleteObject[level].addEventListener("click", function() {
        removeProduct(deleteObject[level].getAttribute("id"));
        location.reload();
    });
}

function removeProduct(removeObject) {
    if (orderStorage.getItem(removeObject) != null) {
            orderStorage.removeItem(removeObject);
    }
}

function controlForm() {
    let bool = true;
    let expRegex = {
        firstName: "^[^\\s][a-zA-Zéèàêûçàôë\\s-]{2,25}$",
        lastName: "^[^\\s][a-zA-Zéèàêûçàôë\\s-]{2,25}$",
        address: "^[^\\s][0-9]{0,2}[\\s][a-zA-Zéèàêûçàôë-\\s]{3,25}$",
        city: "^[^\s][a-zA-Zéèàêûçàôë\\s-]{2,25}$",
        email: "^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$"
    }
    for (let i in expRegex) {
        const pattern = new RegExp(expRegex[i]);
        const string = document.getElementById(i).value;
        if (pattern.test(string) == false) {
            alert("erreur de saisie dans le champ "+ i);
            bool = false;
        }
        i++;
    }
    return bool;
}
  
function ClickToPrepareData(data) {
    sendRequestOrder = document.getElementById("sendOrder");
    sendRequestOrder.addEventListener("click", function(event) {
        event.preventDefault();
        if (controlForm()) {
            var productTab = [];
            let contact = {
                firstName: document.getElementById("lastName").value,
                lastName: document.getElementById("firstName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value
            }
            for (let i = 0 ; i < data.length; i++) {
                let memoryNav = JSON.parse(data.getItem(data.key(i)));
                productTab.push(memoryNav._id);
            }
            sendDataServer(contact,productTab);
        }  
    });
}

function sendDataServer(contactObject,productsTab) {
    var requestOrder = '{"contact": '+ JSON.stringify(contactObject)+ ', "products": '+ JSON.stringify(productsTab)+'}';
    tempoData.setItem("toSend",requestOrder);
    document.location.href = "../pages/validation.html";
    orderStorage.clear();
}
