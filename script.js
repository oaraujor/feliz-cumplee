document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".button");

    button.addEventListener("click", function (event) {
        event.preventDefault();

        const newParagraph = document.createElement("p");
        newParagraph.textContent = "You clicked the button! This is dynamic content.";
        newParagraph.style.color = "#007a3d";
        newParagraph.style.fontWeight = "bold";

        const container = document.querySelector(".container");
        container.appendChild(newParagraph);
    });
});
