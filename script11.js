const reviews = [
    {
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
        text: `"The coffee is amazing and the ambience is so warm. My new favorite place!"`,
        name: "- Ananya Verma"
    },

    {
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop",
        text: `"Best cappuccino in town. Loved the vibe and service!"`,
        name: "- Rahul Sharma"
    },

    {
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop",
        text: `"Beautiful place with premium coffee and great atmosphere."`,
        name: "- Priya Mehta"
    },
     {
        image: "https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg",
        text: `"supercalifraglistiexpialodocious Beautiful place with premium coffee."`,
        name: "- shradha sharma"
    }
];


let current = 0;

const customerImg = document.querySelector(".review-content img");
const message = document.querySelector(".message");
const customerName = document.querySelector(".review-text h4");

const dots = document.querySelectorAll(".dots span");

function showReview(index){

    customerImg.src = reviews[index].image;
    message.innerText = reviews[index].text;
    customerName.innerText = reviews[index].name;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

document.querySelector(".right").addEventListener("click", () => {

    current++;

    if(current >= reviews.length){
        current = 0;
    }

    showReview(current);
});

document.querySelector(".left").addEventListener("click", () => {

    current--;

    if(current < 0){
        current = reviews.length - 1;
    }

    showReview(current);
});