
document.querySelectorAll(
    ".main .container .card button"
).forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".card");

        const product = {
            img: card.querySelector("img").getAttribute("src"),
            title: card.querySelector("h3").innerText.trim(),
            price: Number(
                card.querySelector("p").innerText.replace(/[^\d.]/g, "")
            ),
            qty: 1
        };

        // Existing cart read
        let cart = JSON.parse(
            localStorage.getItem("cart")
        ) || [];

        // Check same product
        let existing = cart.find(
            item => item.title.toLowerCase() ===
                    product.title.toLowerCase()
        );

        if (existing) {
            existing.qty++;
        } else {
            cart.push(product);
        }

        // Save cart
        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert(product.title + " added to cart!");

    });

});
