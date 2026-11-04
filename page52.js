let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartLeft = document.querySelector(".cart-left");
let addBtns = document.querySelectorAll(".card button");

addBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

        let card = btn.parentElement;

        let img = card.querySelector("img").src;
        let title = card.querySelector("h3").innerText;
        let price = Number(card.querySelector("p").innerText.replace("₹", ""));

        // Check if item already exists
        let alreadyItem = [...document.querySelectorAll(".cart-item")].find(item => {
            return item.querySelector("h3").innerText === title;
        });

        // Item already exists
        if (alreadyItem) {

            let qty = alreadyItem.querySelector(".quantity span");
            let total = alreadyItem.querySelector(".total");

            qty.innerText = Number(qty.innerText) + 1;
            let product = cart.find(item => item.title === title);
            
            if(product){
                product.qty++;
                saveCart();
            }
            total.innerText = "₹" + (Number(qty.innerText) * price);

            showToast(title + " quantity updated", "success");
            return;
        }

        // Create new item
        let newItem = document.createElement("div");

        newItem.className = "cart-item";

        newItem.innerHTML = `
            <div class="product">
                <img src="${img}">
                <div>
                    <h3>${title}</h3>
                    <p>Fresh Coffee</p>
                </div>
            </div>

            <h4 class="price">${price}</h4>

            <div class="quantity">
                <button class="minus">-</button>
                <span>1</span>
                <button class="plus">+</button>
            </div>

            <h4 class="total">₹${price}</h4>

            <i class="fa-regular fa-trash-can delete"></i>
        `;

        let couponBox = document.querySelector(".coupon-box");
        cartLeft.insertBefore(newItem, couponBox);

        cart.push({
            img: img,
            title: title,
            price: price,
            qty: 1
        });

saveCart();

        // ✅ Toast for new item
        showToast(title + " added to cart", "success");

    });

});

// Event Delegation
cartLeft.addEventListener("click", function (e) {

    let cartItem = e.target.closest(".cart-item");

    if (!cartItem) return;

    let title = cartItem.querySelector("h3").innerText;

    // PLUS
    if (e.target.classList.contains("plus")) {

        let qty = cartItem.querySelector(".quantity span");
        let price = Number(cartItem.querySelector(".price").innerText);
        let total = cartItem.querySelector(".total");

        qty.innerText++;
        total.innerText = "₹" + (qty.innerText * price);
        let product = cart.find(item => item.title === title);

if (product) {
    product.qty = Number(qty.innerText);
    saveCart();
}

        // ✅ Toast
        showToast(title + " quantity increased", "success");
    }

    // MINUS
    if (e.target.classList.contains("minus")) {

        let qty = cartItem.querySelector(".quantity span");
        let price = Number(cartItem.querySelector(".price").innerText);
        let total = cartItem.querySelector(".total");

        if (qty.innerText > 1) {

            qty.innerText--;
            total.innerText = "₹" + (qty.innerText * price);
            let product = cart.find(item => item.title === title);

if (product) {
    product.qty = Number(qty.innerText);
    saveCart();
}

            // ✅ Toast
            showToast(title + " quantity decreased", "error");
        }
    }

    // DELETE
    if (e.target.classList.contains("delete")) {

        cartItem.remove();
        cart = cart.filter(item => item.title !== title);

saveCart();

        // ✅ Toast
        showToast(title + " removed from cart", "error");
    }

});

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");
    const text = document.getElementById("toastText");
    const icon = document.getElementById("toastIcon");

    text.innerText = message;

    toast.classList.remove("success", "error");

    if (type === "success") {
        toast.classList.add("success");
        icon.className = "fa-solid fa-circle-check";
    } else {
        toast.classList.add("error");
        icon.className = "fa-solid fa-trash";
    }

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {

    let savedCart = JSON.parse(localStorage.getItem("cart"));

    if (!savedCart || savedCart.length === 0) return;

    let couponBox = document.querySelector(".coupon-box");

    // Purane dynamically added items hatao
    document.querySelectorAll(".cart-item").forEach(item => {

        let title = item.querySelector("h3").innerText;

        let defaultItems = [
            "Cappuccino",
            "Brownie",
            "Iced Coffee"
        ];

        if (!defaultItems.includes(title)) {
            item.remove();
        }

    });

    savedCart.forEach(product => {

        // Agar item already HTML me hai
        let alreadyItem =
        [...document.querySelectorAll(".cart-item")]
        .find(item => item.querySelector("h3").innerText === product.title);

        if (alreadyItem) {

            alreadyItem.querySelector(".quantity span").innerText =
            product.qty;

            alreadyItem.querySelector(".total").innerText =
            "₹" + (product.qty * product.price);

            return;

        }

        // New Item
        let newItem = document.createElement("div");

        newItem.className = "cart-item";

        newItem.innerHTML = `
            <div class="product">
                <img src="${product.img}">
                <div>
                    <h3>${product.title}</h3>
                    <p>Fresh Coffee</p>
                </div>
            </div>

            <h4 class="price">${product.price}</h4>

            <div class="quantity">
                <button class="minus">-</button>
                <span>${product.qty}</span>
                <button class="plus">+</button>
            </div>

            <h4 class="total">
                ₹${product.qty * product.price}
            </h4>

            <i class="fa-regular fa-trash-can delete"></i>
        `;

        cartLeft.insertBefore(newItem, couponBox);

    });

}
loadCart();