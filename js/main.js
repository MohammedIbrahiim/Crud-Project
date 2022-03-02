let productNameInput = document.getElementById("productName");
let Count = document.getElementById("Count");

let productPriceInput = document.getElementById("productPrice");
let producttaxesInput = document.getElementById("producttaxes");
let productadsInput = document.getElementById("productads");
let productdiscountInput = document.getElementById("productdiscount");
let totalpricee = document.getElementById("total");
let prices = document.querySelectorAll('input[type="number"]');


let productCategoryInput = document.getElementById("productCategory");
let productDescInput = document.getElementById("productDesc");
let productSerchInput = document.getElementById("Searchinput");
let mainbutton =  document.getElementById("btn");
let indexglobal;
let productContanier ;

//localStorage to store data into ur browser
if(localStorage.getItem('products')==null){
    productContanier = [];
}else{
    productContanier =JSON.parse(localStorage.getItem('products'));
    displayProduct(productContanier);
}


//addProduct if mainbutton = add => add new product else update
function addProduct(){
    if(mainbutton.innerHTML=="add product" ){
        var product = 
        {
            name:productNameInput.value,
            Count:Count.value,
            price:totalpricee.innerHTML,
            category:productCategoryInput.value,
            desc:productDescInput.value
        }
    if(product.name!=''&& product.Count!=''&&product.price!=''&&product.category!=''&&product.desc!=''){
        productContanier.push(product);
        localStorage.setItem('products', JSON.stringify(productContanier));
        displayProduct(productContanier);
        clearForm();
    }

    } else {
        var newProduct = {
            name:productNameInput.value,
            Count:Count.value,
            price:totalpricee.innerHTML,
            category:productCategoryInput.value,
            desc:productDescInput.value
        }
            productContanier.splice(indexglobal,1, newProduct);
            localStorage.setItem('products', JSON.stringify(productContanier));

            displayProduct(productContanier);
            mainbutton.innerHTML= "add product"
        

}
}

//dispaly data in table
function displayProduct(productlist){

    var cartona = ``;
    for(var i=0 ; i<productlist.length ; i++){
        cartona += `
        <tr>
            <td>${i}</td>
            <td>${productlist[i].name}</td>
            <td>${productlist[i].Count}</td>
            <td> <button onclick = "counting(${i}, ${1})" class="btn"><i   style="color: #0B5ED7;"class="fas fa-plus-circle fa-2xl mt-2"></i></button>  </td>
            <td> <button onclick = "counting(${i}, ${-1})" class="btn"><i   style="color: #BB2D3B;" class="fas fa-minus-circle fa-2xl mt-2"></i></button>  </td>    
            <td>${productlist[i].price}</td>
            <td>${productlist[i].category}</td>
            <td>${productlist[i].desc}</td>
            <td> <button onclick="updateProduct(${i} )" class="btn btn-primary">update</button> </td>
            <td>  <button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button> </td>
        </tr>
        `
    }
    document.getElementById("tableRow").innerHTML = cartona;
}

//for delete row 
function deleteProduct(productindex){
    productContanier.splice(productindex,1);
    localStorage.setItem('products', JSON.stringify(productContanier));
    displayProduct(productContanier);
}

//to clear input after add data
function clearForm(){
    productNameInput.value= " ";
    productPriceInput.value= " ";
    productCategoryInput.value= " ";
    productDescInput.value=" ";
    Count.value=" ";
    producttaxesInput.value=" ";
    productadsInput.value = " ";
    productdiscountInput.value = " ";
}

//search by name 
function searchProduct(productSerchInput){
    let searchProduct =[];
    for(var i=0 ; i<productContanier.length ; i++)
    {
        if(productContanier[i].name.toLowerCase().includes(productSerchInput.toLocaleLowerCase())==true){
            searchProduct.push(productContanier[i])
        }
    }
    displayProduct(searchProduct)
}

//search by category
function searchProductCategory(x){
    let searchProduct =[];
    for(var i=0 ; i<productContanier.length ; i++){
        if(productContanier[i].category.toLowerCase().includes(x.toLocaleLowerCase())==true){
            searchProduct.push(productContanier[i])
        }
    }
    displayProduct(searchProduct)
}

//ubdate product
function updateProduct(productIndex){
    
    productNameInput.value = productContanier[productIndex].name;
    productPriceInput.value = Number (productContanier[productIndex].price);  
    productCategoryInput.value = productContanier[productIndex].category;
    productDescInput.value = productContanier[productIndex].desc ;
    Count.value = productContanier[productIndex].Count ;
    mainbutton.innerHTML= "update product"

    var localvar = productIndex;
    indexglobal=localvar;
}

//total price after adding ads and taxes
function totalprice(){
    if(productPriceInput.value != '' &&  producttaxesInput.value!='' &&productadsInput.value !=''){
        let Total = (Number (productPriceInput.value) + Number( producttaxesInput.value) + Number (productadsInput.value)) - Number(productdiscountInput.value)
        totalpricee.innerHTML = ` ${Total}`
    }
}

//to fire and display total price after key up all field
prices.forEach(function(e) {
    e.addEventListener("keyup", function() {
        totalprice()
        });
});


//to increase and decrease
function counting(index , counter){
        if(counter==-1 && productContanier[index].Count>=1){
            productContanier[index].Count = Number (productContanier[index].Count ) + Number (counter)
            displayProduct(productContanier) ;
        }else if(counter==1){
            productContanier[index].Count = Number (productContanier[index].Count ) + Number (counter)
            displayProduct(productContanier) ;
        }
}