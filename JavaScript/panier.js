listProductOrder();
let target = document.getElementsByClassName("products-list__delete");
for (let i = 0 ; i < target.length; i++) {
    target[i].addEventListener("click", function() {
        addProduct("done","done",target[i].getAttribute("id"));
        location.reload();
    });
}

function listProductOrder() {
    let data;
    let target;
    let newElt;
    var cost = 0;
    const tab = ["imageUrl","name","lenses","price","delete"];
    for (let i = 0 ; i < orderStorage.length; i++) {
        data = JSON.parse(orderStorage.getItem(orderStorage.key(i)));
        target = document.getElementsByClassName("table-order__products-list");
        newElt = document.createElement("tr");
        newElt.classList.add("products-list");
        target[0].appendChild(newElt);
        for (let j = 0 ; j < tab.length; j++) {
            target = document.getElementsByClassName("products-list");
            newElt = document.createElement("td");
            for (const key in data) {
                if (key == tab[j]) {
                    switch (key) {
                    case "imageUrl":
                        newElt.classList.add("products-list__image");
                        newElt.innerHTML = "<img src=\""+data[key]+"\" alt=\"product view\">"
                        break;
                    case "name":
                        newElt.classList.add("products-list__name");
                        newElt.innerHTML = data[key];
                        break;
                    case "lenses":
                        newElt.classList.add("products-list__lenses");
                        newElt.innerHTML = "Personnalisation: "+ data[key];
                        break;
                    case "price":
                        newElt.classList.add("products-list__price");
                        newElt.innerHTML = data[key]/100+"€";
                        cost += data[key]/100;
                        break;
                    }
                    target[i].appendChild(newElt);   
                }
            }
            if (tab[j] == "delete") {
                newElt.classList.add("products-list__delete");
                newElt.setAttribute("id",""+data._id+"");
                newElt.innerHTML = "<img src=\"../Images/corbeille.png\" alt=\"product to delete icon\">";
                target[i].appendChild(newElt);
            }
        }
    } 
    target = document.getElementsByClassName("table-order__cost-order");
    newElt = document.createElement("tr");
    newElt.classList.add("cost-order");  
    newElt.innerHTML = "<td class =\"cost-order__label-tx\">Coût total de la commande: </td><td class=\"products-list__cost\">"+cost+" €"   
    target[0].appendChild(newElt); 
}

