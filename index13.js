
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

        let cart = JSON.parse(
            localStorage.getItem("cart")
        ) || [];

        let existing = cart.find(
            item => item.title.toLowerCase() ===
                    product.title.toLowerCase()
        );

        if (existing) {
            existing.qty++;
        } else {
            cart.push(product);
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        // Show popup
        showToast(product.title + " added to cart", "success");

    });

});

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");
    const text = document.getElementById("toastText");
    const icon = document.getElementById("toastIcon");

    if (!toast || !text || !icon) {
        console.error("Toast HTML elements not found!");
        return;
    }

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
