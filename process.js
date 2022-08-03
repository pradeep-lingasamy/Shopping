let prods= JSON.parse(jsonproducts);
let maindiv= document.getElementById("products");
let bk= JSON.parse(localStorage.getItem("basket")) || [];


function generate(sitem='null'){
    maindiv.innerHTML= prods.products.map((x)=>
        {
            let {id,img,title,detail,star,price,cat,size}=x;
            let search= bk.find((k)=> k.id==id) || [];
            let tes=new RegExp("^"+sitem+'', 'i')
            console.log(tes.test(cat))
            if( (tes.test(cat)) || sitem=='null'){
            return `
                <div onmouseenter="change(this)" onmouseleave="backchange(this)"  class="product-container" id="${id}">
                    <div class="imgs">
                        <img src=${img}>
                    </div>
                    <div class="product-detail">
                        <h3>${title}</h3>
                        <p>${detail}</p>
                        <p>
                            <span class="material-icons">
                                star_rate
                            </span>
                            <span class="material-icons">
                            star_rate
                            </span>
                            <span class="material-icons">
                            star_rate
                            </span>
                            <span class="material-icons">
                                star_rate
                            </span>
                        </p>
                        <h4><span class="material-icons"> currency_rupee</span>${price}</h4>
                        <h5>Size: ${size}</h5>
                    </div>
                    <div class="cart">

                        <button class="cart-button ${search.length == 0? "" : "red"}" onclick="addtocart(this)" value=${search.length == 0? 0 : 1}>${search.length == 0? "Add to cart" : "Remove from cart"}</button>
                        <button class="buy-button"><a href="cart.html">Buy</a></button>
                    </div>
                </div>
            `
            }
        }
    ).join("");
}
generate();

//hover effect
function change(x){
    let hov=x.querySelector(".product-detail");
    hov.style.height= '160px';
}
function backchange(x){
    let hov=x.querySelector(".product-detail");
    hov.style.height= '130px';
}
//------------------------------------------------

//change the button text and add/remove to cart
function addtocart(x){
    if(x.value==0){
        x.textContent="Remove from cart";
        x.style.backgroundColor="red";
        x.value=1;
        bk.push({"id":x.parentNode.parentNode.id,"value":1});
    }
    else{
        x.textContent="Add to cart";
        x.style.backgroundColor="green";
        x.value=0;
        bk=bk.filter((y)=> y.id!=x.parentNode.parentNode.id)
    }
    cartcount();
}
function cartcount(){
    let c=document.getElementsByClassName("count")[0];
    c.textContent= bk.length;
    let str= JSON.stringify(bk);
    localStorage.setItem("basket",str);
}
cartcount();
//-------------------------------

//search------------------------
function searchitem(){
    let searchitem=document.getElementsByClassName("radioclass");
    for(let i=0;i<searchitem.length;i++){
        if(searchitem[i].checked==true){
            generate(searchitem[i].value);
        }
    }
}
function uncheck(){
    let searchitem=document.getElementsByClassName("radioclass");
    for(let i=0;i<searchitem.length;i++){
        if(searchitem[i].checked==true){
            searchitem[i].checked=false
            generate();
        }
    }
}
const searchbox=()=>{
    let textsearch=document.getElementById("textsearch").value;
    generate(textsearch);
}