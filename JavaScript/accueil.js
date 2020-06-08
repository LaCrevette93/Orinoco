
            //Main function => promise of sendRequest function


sendRequest("GET", "http://localhost:3000/api/cameras/", null)
.then(responseRequest => {
    nbProductCart();
    addBlocsViews(responseRequest);
})
.catch(error => {
    alert(error);
});

/*
            Function to generate contents blocs according products in the database from Orinoco 
            Parameters: data => database from Orinoco
*/

function addBlocsViews(data) {                                          
    for (let i = 0; i < data.length; i++) 
    {
        let blockRacine = ["articles-list__content","a","articles-list__content--link"];
        let addBlocs = [
            ["articles-list__content--link","article","articles-list__content__product",null],
            ["articles-list__content__product","aside","articles-list__content__product__picture","<img src=\""+data[i].imageUrl+"\" alt=\"product view\">"],
            ["articles-list__content__product","div","articles-list__content__product__feature","<h3>"+data[i].name+"</h3><p>"+data[i].description+"</p><p>Prix: "+data[i].price/100+"€</p>"]
        ];
        createObject(blockRacine[0],blockRacine[1],blockRacine[2],null,0);
        generateLinkProduct(blockRacine[2],i,data);
        for (let j = 0; j < addBlocs.length; j++) 
        {
            createObject(addBlocs[j][0],addBlocs[j][1],addBlocs[j][2],addBlocs[j][3],i);
        }
    }
} 

/*
            Function to generate web page link according to product's id
            Parameters: target => DOM element that will have a link ; level => number for each element that will have a link ; data => data for recover product id
*/

function generateLinkProduct(target,level,data) {                                               
    let blockListProduct = document.getElementsByClassName(target);                             
    blockListProduct[level].setAttribute("href","./Pages/produit.html?id="+data[level]._id);
}