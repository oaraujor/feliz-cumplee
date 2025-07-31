//document.addEventListener("DOMContentLoaded", function () {
    //const button = document.querySelector(".button");

    //button.addEventListener("click", function (event) {
        //event.preventDefault();

        //const newParagraph = document.createElement("p");
        //newParagraph.textContent = "You clicked the button! This is dynamic content.";
        //newParagraph.style.color = "#007a3d";
        //newParagraph.style.fontWeight = "bold";

        //const container = document.querySelector(".container");
        //container.appendChild(newParagraph);
    //});
//});

function createStars() {
    const stars = document.querySelector('.stars');
    stars.innerHTML = '';
    for(let i=0; i<80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = star.style.height = size + 'px';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animationDuration = (Math.random()*2+2) + 's';
        stars.appendChild(star);
    }
}
createStars();
