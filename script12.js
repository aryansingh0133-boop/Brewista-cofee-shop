 function goContact(){

    document.querySelector(".a77n")
    .scrollIntoView({
        behavior:"smooth"
    });

}
let buttons = document.querySelectorAll(".card button");
let cartsup = document.getElementById("cartsup");
let cartfill= document.querySelector("#cartfill");



buttons.forEach((button) => {
    button.addEventListener("click", () => {
        cartsup.innerText = Number(cartsup.innerText) + 1;
    });
});
