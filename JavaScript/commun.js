const sendRequest = (verb,url) => {
    return new Promise((resolve,reject) => {
        const request = new XMLHttpRequest();
        request.open(verb,url);
        request.send(); 
        request.onload = function() {
            switch (request.status) {
                case 200:
                  resolve(request.responseText);
                  break;
                case 404:
                    reject("Page introuvable");
                    break;
                case 500:
                    reject("Erreur serveur");
                    break;
                default:
                    reject("Erreur non identifiée survenue!");
                    if(request.status===201) {
                        resolve(request.responseText);
                    } 
                    break;
            }     
        },
        request.onerror = function() {
            if(request.status===0) {
                reject("Le backend n'est pas allumé");
            } else {
                reject("Problème de communication avec le serveur");
            }
        }
    });
}

const orderStorage = localStorage;

function addProduct(responseRequest,action) {
    let commentOrder = document.getElementsByClassName("content-product-customize__feature");
    if (action == "control") {
        if (orderStorage.getItem(responseRequest._id) != null) {
            commentOrder[0].innerHTML += "<p>Produit déjà dans le panier!</p>";
            commentOrder = document.getElementById("card").disabled = true;
        }  
    }
    else if (action == "add") {
        let input = document.getElementById("lentilles").value;
        responseRequest.lenses = input;
        commentOrder[0].innerHTML += "<p>Produit ajouté dans le panier!</p>";
        commentOrder = document.getElementById("card").disabled = true;
        orderStorage.setItem(responseRequest._id,JSON.stringify(responseRequest));
        nbProductCart();
    }
}

function nbProductCart () {
    input = document.getElementsByClassName("header__nbProduct");
    input[0].innerHTML = orderStorage.length;
}

