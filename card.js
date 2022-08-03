prods= JSON.parse(jsonproducts);
let cartmain= document.getElementById("cart-products-list");
let bk=JSON.parse(localStorage.getItem("basket")) || [];
 function cartgenerate(){
    if(bk.length!=0){
        cartmain.innerHTML= prods.products.map((z)=>
        {
            let {id,img,title,detail,star,price}=z;
            let search=bk.find((x)=> x.id==id) || []
            if(search.length!= 0){
            return `
            <div class="cart-product" id=${id}>
            <div class="cart-product-image">
                <img src="${img}">
            </div>
            <div class="cart-product-detail">
                <h3>${title}</h3>
                <p>${detail}</p>
                <div>
                    <span class="material-icons"> currency_rupee</span>
                    <h4 class="individualprice">${price}</h4>
                </div>
                <div class="cart-product-quantity">
                    <div class="span">
                        <span onclick="decre(this)" class="material-icons">remove</span>
                    </div>
                    <div>
                        <input class="quan" type="text" value=${search.value}>
                    </div>
                    <div  class="span">
                        <span onclick="incre(this)" class="material-icons">add</span>
                    </div>
                    <div>
                        <h2 onclick="cartremove(this)">Remove</h2>
                    </div>
                </div>
            </div>
        </div>
            `
            }
        }).join("");
    }
    else
    {
        cartmain.innerHTML=``;
        document.getElementById('purchase').style.display="none";
        let empdiv=document.getElementById("card-empty");
        empdiv.innerHTML=`<h1>Cart is Empty</h1>
        <button >
            <a href="products.html">Back to Home</a>
        </button>`
    }

 }
 cartgenerate();

 
function cartcount(){
    let c=document.getElementsByClassName("count")[0];
    c.textContent= bk.length;
    let str= JSON.stringify(bk);
    localStorage.setItem("basket",str);
    cartgenerate();
    calcprice();
}
cartcount();

function cartremove(x){
    let par=x.parentNode.parentNode.parentNode.parentNode;
    bk=bk.filter((x)=> par.id!=x.id);
    cartcount();
}

function incre(x){
    x.parentNode.previousElementSibling.firstElementChild.value++;
    let tempid= x.parentNode.parentNode.parentNode.parentNode.id;
    let tempvalue= x.parentNode.previousElementSibling.firstElementChild.value;
    countvalue(tempid,tempvalue);
    calcprice();
}
function decre(x){
    if(x.parentNode.nextElementSibling.firstElementChild.value >1)
    {
    x.parentNode.nextElementSibling.firstElementChild.value--;
    }
    else{
        cartremove(x)
    }
    let tempid= x.parentNode.parentNode.parentNode.parentNode.id;
    let tempvalue= x.parentNode.nextElementSibling.firstElementChild.value;
    countvalue(tempid,tempvalue);
    calcprice();
}

function countvalue(tempid, tempvalue){
    bk=bk.map((a)=>{
        if(a.id==tempid){
            a.value=tempvalue;
        }
        return a;
    })
    let str= JSON.stringify(bk);
    localStorage.setItem("basket",str);
}


function calcprice(){
    let price=document.getElementById("priceid");
    let individualprice=document.getElementsByClassName("individualprice");
    let totalamount=document.getElementById("totalamount");
    let quan=document.getElementsByClassName("quan");
    let itemcount=document.getElementById("itemcount");
    itemcount.textContent= `Price(${individualprice.length} ${(individualprice.length>1 )? 'items': 'item'})`
    let sum=0;
    let i=0;
    while(i<individualprice.length){
        x=individualprice[i];
        y=quan[i];
        sum += (parseInt(x.textContent) * y.value);
        console.log(sum)
        i++;
    }
    
    
    price.textContent=sum;
    let delivery=document.getElementById("delivery");
    if(sum>499){
        delivery.textContent="FREE";
        totalamount.textContent=sum;
    }
    else{
        delivery.innerHTML= `<span class="material-icons"> currency_rupee</span> <h3>49</h3>`;
        totalamount.textContent=sum + 49;
    }
    
}
calcprice();