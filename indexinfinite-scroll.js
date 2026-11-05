
document.addEventListener("DOMContentLoaded", function () {

    const container = document.querySelector(
        ".main .container"
    );

    if (!container) return;

    // Original product cards
    const originalCards = Array.from(
        container.querySelectorAll(".card")
    );

    if (originalCards.length < 2) return;

    // Calculate width of one complete set
    const gap = parseFloat(
        getComputedStyle(container).columnGap
    ) || 0;

    const groupWidth =
        originalCards.reduce(
            (total, card) =>
                total + card.getBoundingClientRect().width,
            0
        ) + gap * (originalCards.length - 1);

    // Clone cards for left side
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);

        clone.removeAttribute("id");
        clone.querySelectorAll("[id]").forEach(el =>
            el.removeAttribute("id")
        );

        container.insertBefore(
            clone,
            container.firstChild
        );
    });

    // Clone cards for right side
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);

        clone.removeAttribute("id");
        clone.querySelectorAll("[id]").forEach(el =>
            el.removeAttribute("id")
        );

        container.appendChild(clone);
    });

    // Start from original products
    container.scrollLeft = groupWidth;

    // Infinite scrolling
    container.addEventListener("scroll", function () {

        if (container.scrollLeft <= groupWidth) {

            container.scrollLeft += groupWidth;

        } 
        else if (
            container.scrollLeft >= groupWidth * 2
        ) {

            container.scrollLeft -= groupWidth;

        }

    });

});
