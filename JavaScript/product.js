var param = new URL(document.location).searchParams.get("id");

sendRequest("GET", "http://localhost:3000/api/cameras/"+param)
    .then(data => {
        var request = JSON.parse(data);
        nbProductCart();
        addBlocsViews(request);
        addProduct(request,"control");
        let order = document.getElementById("card");
        order.addEventListener("click", function() {
            addProduct(request,"add");
        });
    })
    .catch(error => {
        alert(error);
    });


function addBlocsViews(responseRequest) {
        let addBlocs = [
            ["articles-list__content","aside","content-product-customize__picture","<img class=\"content-product-customize__picture--product\"src=\""+responseRequest.imageUrl+"\" alt=\"product view\">"],
            ["articles-list__content","section","content-product-customize__feature","<h3>"+responseRequest.name+"</h3><p>"+responseRequest.description+
            "</p><label for=\"lentilles\">Lentille sélectionnée</label><select id=\"lentilles\" required></select><p>Prix: "
            +responseRequest.price/100+"€</p><div><button id=\"card\" type=\"button\">Ajouter au panier</button><button type=\"button\"><a href = \"../index.html\">Revenir liste produits</a></button></div>"]
        ];
        for (let i = 0; i < addBlocs.length; i++) 
        {
            blockListProduct = document.getElementsByClassName(addBlocs[i][0]);
            let sectionProduct = document.createElement(addBlocs[i][1]);
            sectionProduct.classList.add(addBlocs[i][2]);
            sectionProduct.innerHTML = addBlocs[i][3];
            blockListProduct[0].appendChild(sectionProduct);
        }
        let area = document.getElementById("lentilles");
        for (let i = 0; i < responseRequest.lenses.length; i++)
        {
            area.innerHTML += "<option>"+responseRequest.lenses[i]+"</option>"
        }
    
} 





