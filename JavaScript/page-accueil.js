sendRequest("GET", "http://localhost:3000/api/cameras/")
    .then(data => {
        var request = JSON.parse(data);
        nbProductCart();
        addBlocsViews(request);
    })
    .catch(error => {
        alert(error);
    });
  
    function addBlocsViews(responseRequest) {
        for (let i = 0; i < responseRequest.length; i++) 
        {
            let blockRacine = ["articles-list__content","a","content-product-link"];
            let addBlocs = [
                ["content-product-link","article","content-product","done"],
                ["content-product","aside","content-product__picture","<img class=\"content-product__picture--accueil\" src=\""+responseRequest[i].imageUrl+"\" alt=\"product view\">"],
                ["content-product","div","content-product__feature","<h3>"+responseRequest[i].name+"</h3><p>"+responseRequest[i].description+"</p><p>Prix: "+responseRequest[i].price/100+"€</p>"]
            ];
            let blockListProduct = document.getElementsByClassName(blockRacine[0]);
            let sectionProduct = document.createElement(blockRacine[1]);
            sectionProduct.classList.add(blockRacine[2]);
            sectionProduct.setAttribute("href","./Pages/produit.html?id="+responseRequest[i]._id);
            blockListProduct[0].appendChild(sectionProduct);
            for (let j = 0; j < addBlocs.length; j++) 
            {
                blockListProduct = document.getElementsByClassName(addBlocs[j][0]);
                let sectionProduct = document.createElement(addBlocs[j][1]);
                sectionProduct.classList.add(addBlocs[j][2]);
                if (addBlocs[j][3] != "done") {
                    sectionProduct.innerHTML = addBlocs[j][3];
                }
                blockListProduct[i].appendChild(sectionProduct);
            }
        }
    } 
