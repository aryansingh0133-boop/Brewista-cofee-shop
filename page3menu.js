
document.addEventListener("click", function(e) {

    // Plus icon click check
    let button = e.target.closest("#plus");

    if (!button) return;

    // Find product container
    let card = button.closest(
        "#hot-item, #cc1, #bns1, #dee1"
    );

    if (!card) return;

    // Get product details
    let title = card.querySelector("h3, h4").innerText.trim();

    let priceText = card.querySelector(
        "#hot-cart > div:first-child"
    ).innerText;

    let price = Number(priceText.replace(/[^\d.]/g, ""));

    // Get product image from CSS background
    let imageBox = card.querySelector(
        '[id^="hot-img"], [id^="ccimg"], [id^="bnsimg"], [id^="deeimg"]'
    );

    let bg = getComputedStyle(imageBox).backgroundImage;
    let match = bg.match(/url\(["']?(.*?)["']?\)/);
    let img = match ? match[1] : "";

    // Get existing cart
    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];

    // Check existing product
    let existing = cart.find(
        item => item.title.toLowerCase() === title.toLowerCase()
    );

    if (existing) {

        existing.qty++;

    } else {

        cart.push({
            img: img,
            title: title,
            price: price,
            qty: 1
        });

    }

    // Save updated cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    console.log(title + " added to cart");

});
