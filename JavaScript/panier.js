listProductOrder(orderStorage);
ClickToPrepareData(orderStorage,tempoData);

/*
            Function to generate products list according products added in cart in product page 
            Parameter: dataMemory => storage interface that contains the data from the browser cache in which all the products added to the cart are located (not parsed)
*/

function listProductOrder(dataMemory) {
    const tab = ["imageUrl","name","lenses","price","delete"];
    var cost = 0;
    for (let i = 0 ; i < dataMemory.length; i++) {
        let memoryDataParse = JSON.parse(dataMemory.getItem(dataMemory.key(i)));
        createObject("order__products-order__products-list","tr","order__products-order__products-list__product",null,0);
        for (let j = 0 ; j < tab.length; j++) {
            for (const key in memoryDataParse) {
                if (key == tab[j]) {
                    switch (key) {
                    case "imageUrl":
                        createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__image--cart","<img src=\""+memoryDataParse[key]+"\" alt=\"product view\">",i);
                        break;
                    case "name":
                        createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__name--cart",memoryDataParse[key],i);
                        break;
                    case "lenses":
                        createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__lenses--cart","Personnalisation: "+ memoryDataParse[key],i);
                        break;
                    case "price":
                        createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__price--cart",memoryDataParse[key]/100+"€",i);
                        cost += memoryDataParse[key]/100;
                        break;
                    }
                }
            }
            if (tab[j] == "delete") {
                createObject("order__products-order__products-list__product","td","order__products-order__products-list__product__delete--cart","<img src=\"../Images/corbeille.png\" alt=\"product to delete icon\">",i);
                activeFunctionDelete(orderStorage,memoryDataParse,i);
            }
        }
    } 
    createObject("order__products-order__cost-order","tr","order__products-order__cost-order__label","<td>Coût total de la commande: </td><td>"+cost+" €</td>" ,0);
}

/*
            Function to active on corbeil icon delete action one product 
            Parameters: dataMemory => storage interface that contains the data from the browser cache in which all the products added to the cart are located
                        dataParse => parsed data corresponding to a product of products list from the listproductorder function
                        level => if object to create is in same parent value is 0 else value is a variable
*/

function activeFunctionDelete(dataMemory,dataParse,level) {
    let deleteObject = document.getElementsByClassName("order__products-order__products-list__product__delete--cart");
    deleteObject[level].setAttribute("id",""+dataParse._id+"");
    deleteObject[level].addEventListener("click", function() {
        removeProduct(dataMemory,deleteObject[level].getAttribute("id"));
        location.reload();
    });
}

/*
            Function to remove one product in cart and delete it on browser cache  
            Parameters: dataMemory => storage interface that contains the data from the browser cache in which all the products added to the cart are located
                        removeObject => product to delete on browser cache and cart
*/

function removeProduct(dataMemory,removeObject) {
    if (dataMemory.getItem(removeObject) != null) {
            dataMemory.removeItem(removeObject);
    }
}

/*
            Function to verify the information entered in the fields according to the specific Regex rules associated for each field defined in object expRegex
            return: true if all the fields of the form respect the defined Regex rules                        
*/

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
            errorView("Erreur de saisie dans le champ "+i);
            bool = false;
        }
        i++;
    }
    return bool;
}

/*
            Function that prepares the data to be sent to the API. This function create contact object and Ids array and send it to sendDataServer function
            Parameters: dataMemory => storage interface that contains the data from the browser cache in which all the products added to the cart are located (not parsed when called on argument)
                        dataTemp => storage interface that contains temporary data necessary to transfert data on this function to resum page
*/
  
function ClickToPrepareData(dataMemory,dataTemp) {
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
            for (let i = 0 ; i < dataMemory.length; i++) {
                let memoryNav = JSON.parse(dataMemory.getItem(dataMemory.key(i)));
                productTab.push(memoryNav._id);
            }
            if (productTab.length > 0) {
                sendDataServer(contact,productTab,dataMemory,dataTemp);
            } else {
                errorView("Vous devez choisir au moins un produit pour effectuer une commande!");
            }
        }  
    });
}

/*
            Function to send data to the API in the format indicated in the documentation: object + product table composed of Ids and delete browser cache
            Parameters: dataMemory => storage interface that contains the data from the browser cache in which all the products added to the cart are located 
                        dataTemp => storage interface that contains temporary data necessary to transfert data on this function to resum page
                        contactObject => contact object create in ClickToPrepareData function 
                        productsTab => array of Ids products create in ClickToPrepareData function 
*/

function sendDataServer(contactObject,productsTab,dataMemory,dataTemp) {
    var requestOrder = '{"contact": '+ JSON.stringify(contactObject)+ ', "products": '+ JSON.stringify(productsTab)+'}';
    dataTemp.setItem("toSend",requestOrder);
    document.location.href = "../pages/validation.html";
    dataMemory.clear();
}
