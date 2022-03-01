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

if(localStorage.getItem('products')==null)
{
    productContanier = [];
}
else
{
    productContanier =JSON.parse(localStorage.getItem('products'));
    displayProduct(productContanier);
}
function addProduct(){

    if(mainbutton.innerHTML=="add product" )
    {
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

    } 
    else 
    {
        var newProduct = {
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            desc:productDescInput.value
        }

            productContanier.splice(indexglobal,1, newProduct);
            localStorage.setItem('products', JSON.stringify(productContanier));

            displayProduct(productContanier);
            mainbutton.innerHTML= "add product"
        

}
}

function displayProduct(productlist)
{
    var cartona = ``;

    for(var i=0 ; i<productlist.length ; i++)
    {
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


function deleteProduct(productindex)
{
    productContanier.splice(productindex,1);
    localStorage.setItem('products', JSON.stringify(productContanier));
    displayProduct(productContanier);
}


function clearForm()
{
    productNameInput.value= " ";
    productPriceInput.value= " ";
    productCategoryInput.value= " ";
    productDescInput.value=" ";
    Count.value=" ";
    producttaxesInput.value=" ";
    productadsInput = " ";
    productdiscountInput = " ";
}

function searchProduct(productSerchInput)
{

    let searchProduct =[];

    for(var i=0 ; i<productContanier.length ; i++)
    {
        if(productContanier[i].name.toLowerCase().includes(productSerchInput.toLocaleLowerCase())==true)
        {
            searchProduct.push(productContanier[i])
        }

    }
    displayProduct(searchProduct)

}

function searchProductCategory(x)
{
    let searchProduct =[];
    for(var i=0 ; i<productContanier.length ; i++)
    {
        if(productContanier[i].category.toLowerCase().includes(x.toLocaleLowerCase())==true)
        {
            searchProduct.push(productContanier[i])
        }

    }
    displayProduct(searchProduct)

}

function updateProduct(productIndex)
{
    productNameInput.value = productContanier[productIndex].name;
    productPriceInput.value =  productContanier[productIndex].price;  
    productCategoryInput.value = productContanier[productIndex].category;
    productDescInput.value = productContanier[productIndex].desc ;

    mainbutton.innerHTML= "update product"

    var localvar = productIndex;
    indexglobal=localvar;

}

function totalprice(){
    if(productPriceInput.value != '' &&  producttaxesInput.value!='' &&productadsInput.value !='')
    {
        let x = (Number (productPriceInput.value) + Number( producttaxesInput.value) + Number (productadsInput.value)) - Number(productdiscountInput.value)
        totalpricee.innerHTML = ` ${x}`
    }
}


prices.forEach(function(e) {
    e.addEventListener("keyup", function() {
        totalprice()
        });
});

function counting(index , counter)
{
        if(counter==-1 && productContanier[index].Count>=1)
        {
            productContanier[index].Count = Number (productContanier[index].Count ) + Number (counter)
            console.log(productContanier[index].Count);
            displayProduct(productContanier) ;
        }
        else if(counter==1)
        {
            productContanier[index].Count = Number (productContanier[index].Count ) + Number (counter)
            console.log(productContanier[index].Count);
            displayProduct(productContanier) ;
        }
}