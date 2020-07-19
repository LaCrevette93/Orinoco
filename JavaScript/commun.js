            //Declaration of targets (classes for DOM element) for createObject function for cart and resum pages

const listProductOrderTarget = "order__products-order__products-list";
const listProductOrderProductTarget = "order__products-order__products-list__product";
const imageProductCartTarget = "order__products-order__products-list__product__image--cart";
const nameProductCartTarget = "order__products-order__products-list__product__name--cart";
const lensesProductCartTarget = "order__products-order__products-list__product__lenses--cart";
const priceProductCartTarget = "order__products-order__products-list__product__price--cart";
const deleteProductCartTarget = "order__products-order__products-list__product__delete--cart";
const imageProductResumTarget = "order__products-order__products-list__product__image--resum";
const nameProductResumTarget = "order__products-order__products-list__product__name--resum";
const lensesProductResumTarget = "order__products-order__products-list__product__lenses--resum";
const priceProductResumTarget = "order__products-order__products-list__product__price--resum";
const productOrderCostTarget = "order__products-order__cost-order";
const labelProductOrderCostTarget = "order__products-order__cost-order__label";

            //Declaration of DOM element that displays error message

let span = document.getElementById("error");


            //Declaration of temporary storage interface: SessionStorage

const tempoData = sessionStorage;    

            //Declaration of permanent storage interface: LocalStorage

const orderStorage = localStorage;

/*
            Function to send data to server and receive data from server
            Parameters: verb => GET to receive or POST to send with associated format (see API documentation)
                        url => API address 
                        data => request to send to server
            Return: 'json' type
*/

const sendRequest = (verb,url,data) => {                    
    return new Promise((resolve,reject) => {                
        const request = new XMLHttpRequest();               
        request.responseType = 'json';
        request.open(verb,url);
        if (verb == "GET") {                                
            request.send();
        }
        else if (verb == "POST") {
            request.setRequestHeader("Content-Type", "application/json");
            request.send(data);
        }
        request.onload = function() {
        switch (request.status) {
            case 200:
                resolve(request.response);
                break;
            case 201:
                resolve(request.response);
                break;
            case 404:
                reject("Page introuvable");
                break;
            case 500:
                reject("Erreur serveur");
                break;
            default:
                reject("Une erreur inconnue est survenue");
                break;
            } 
        }
        request.onerror = function() {
            if(request.status===0) {
                reject("Le serveur n'est pas joignable!");
            } else {
                reject("Problème de communication avec le serveur");
            }
        }
    });
}

/*
            Function to create object in DOM with 5 parameters
            Parameters: target => DOM node where create new object 
                        balise => type of object HTML to create 
                        classe => class to add for this object
                        content => content to add in this object 
                        level => if object to create is in same parent value is 0 else value is a variable
*/

function createObject(target,balise,classe,content,level) {            
    let blockListProduct = document.getElementsByClassName(target);     
    let sectionProduct = document.createElement(balise); 
    if (classe != null) {
        sectionProduct.classList.add(classe);  
    }               
    blockListProduct[level].appendChild(sectionProduct);
    if (content != null) {
        sectionProduct.innerHTML = content;
    }
}

/*
            Function to check number of products in cart when page loading
            Parameters: dataMemory => storage interface that contains the data (products in cart) stored in the browser cache
*/

function nbProductCart(dataMemory) {
    input = document.getElementsByClassName("header__nbProduct");
    input[0].innerHTML = dataMemory.length;
}

/*
            Function to display error
            Parameters: error => message to display in span object in the page
*/

function errorView(error) {
    span.innerHTML+= error+"<br>";
}