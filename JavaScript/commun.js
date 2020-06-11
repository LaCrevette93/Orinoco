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
                errorView("Page introuvable");
                break;
            case 500:
                errorView("Erreur serveur");
                break;
            }     
        }
        request.onerror = function() {
            if(request.status===0) {
                errorView("Le backend n'est pas allumé");
            } else {
                errorView("Problème de communication avec le serveur");
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

           //Declaration of permanent storage interface: LocalStorage

const orderStorage = localStorage;

            //Declaration of temporary storage interface: SessionStorage

const tempoData = sessionStorage;

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
            Parameters: error => message to display in span object the page
*/

function errorView(error) {
    let span = document.getElementById("error");
    span.innerHTML+= error+"<br>";
}