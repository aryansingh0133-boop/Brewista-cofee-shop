/* PRODUCT SCROLL */

const scrollContainer =
document.getElementById("productScroll");

function scrollLeftFun(){

    scrollContainer.scrollBy({
        left:-300,
        behavior:"smooth"
    });

}

function scrollRightFun(){

    scrollContainer.scrollBy({
        left:300,
        behavior:"smooth"
    });

}

/* QUANTITY */

function bindCartEvents() {

const cartItems =
document.querySelectorAll(".cart-item");

cartItems.forEach((item)=>{

    const minus =
    item.querySelector(".minus");

    const plus =
    item.querySelector(".plus");

    const quantity =
    item.querySelector(".quantity span");

    const total =
    item.querySelector(".total");

    const price =
    parseInt(
    item.querySelector(".price").innerText
    );

    let qty =
    parseInt(quantity.innerText);

    plus.addEventListener("click",()=>{

        

        qty++;

        quantity.innerText = qty;

        total.innerText =
        "₹" + (qty * price);

        updateSummary();

        let title = item.querySelector("h3").innerText;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let product = cart.find(p => p.title === title);

if(product){
    product.qty = qty;
    localStorage.setItem("cart", JSON.stringify(cart));
}

    });

    minus.addEventListener("click",()=>{

        if(qty > 0){

            qty--;

            quantity.innerText = qty;

            total.innerText =
            "₹" + (qty * price);

            updateSummary();

            let title = item.querySelector("h3").innerText;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let product = cart.find(p => p.title === title);

if(product){
    product.qty = qty;
    localStorage.setItem("cart", JSON.stringify(cart));
}

        }

    });

});}
bindCartEvents();

/* UPDATE TOTAL */

function updateSummary(){

    const totals =
    document.querySelectorAll(".total");

    let subtotal = 0;

    totals.forEach((item)=>{

        subtotal +=
        parseInt(
        item.innerText.replace("₹","")
        );

    });
    let delivery;
    note.classList.remove("note", "notei");
    if(subtotal<200){
        let dly=document.querySelector("#dly");
        let note=document.querySelector("#note");
        dly.innerText=40;
        delivery = 40;
        note.classList.add("notei");
    }else{
         let dly=document.querySelector("#dly");
         let note=document.querySelector("#note");
        dly.innerText=0;
        delivery = 0;
        note.classList.add("note");
    }

    let discount =
    parseInt(
    document.getElementById("discount")
    .innerText.replace("₹","")
    );

    document.getElementById("subtotal")
    .innerText = "₹" + subtotal;

    document.getElementById("finalTotal")
    .innerText =
    "₹" + ((subtotal + delivery) - discount);

}

/* COUPON */

function applyCoupon(){
    

    let coupon =
    document.getElementById("coupon")
    .value;

    let discount = 0;

    if(coupon === "COFFEE50"){

        discount = 50;

        alert("Coupon Applied!");

    }else{

        alert("Invalid Coupon");

    }

    document.getElementById("discount")
    .innerText = "₹" + discount;

    updateSummary();

}

/* POPUP */

function openPopup(){

    document.getElementById("popup")
    .style.display = "flex";

}

/* NEXT STEP */

function nextStep(){

    let name =
    document.getElementById("fullName").value;

    let phone =
    document.getElementById("phone").value;

    let address =
    document.getElementById("address").value;

    if(name === "" ||
       phone === "" ||
       address === ""){

        alert("Please Fill All Details");

        return;

    }

    document.getElementById("step1")
    .style.display = "none";

    document.getElementById("step2")
    .style.display = "block";

}

/* PAYMENT */

function selectPayment(type){

    let qr =
    document.getElementById("qrBox");

    let card =
    document.getElementById("cardBox");

    qr.style.display = "none";

    card.style.display = "none";

    if(type === "qr"){

        qr.style.display = "block";

    }

    if(type === "card"){

        card.style.display = "block";

    }

}

/* PLACE ORDER */

function placeOrder(){

    document.getElementById("popup")
    .style.display = "none";

    document.getElementById("celebration")
    .style.display = "block";

    setTimeout(() => {

    alert("Order Placed Successfully!");

    // Hide celebration
    document.getElementById("celebration").style.display = "none";

    // Clear Local Storage
    localStorage.removeItem("cart");

    // Remove all cart items
    document.querySelectorAll(".cart-item").forEach(item => {
        item.remove();
    });

   // Update Summary
updateSummary();

// Refresh Page
location.reload();

}, 3000);

}


function goContact(){

    document.querySelector(".a77n")
    .scrollIntoView({
        behavior:"smooth"
    });

}