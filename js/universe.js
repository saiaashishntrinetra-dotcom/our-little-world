/* =========================================
   STAR FIELD
========================================= */

const starContainer = document.getElementById("stars");

function createStars(amount = 180) {

    for (let i = 0; i < amount; i++) {

        const star = document.createElement("div");

        star.style.position = "absolute";
        star.style.width = "2px";
        star.style.height = "2px";

        star.style.borderRadius = "50%";

        star.style.background = "white";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.opacity =
            Math.random() * 0.7 + 0.2;

        star.style.transform =
            `scale(${Math.random() * 1.5 + 0.5})`;

        starContainer.appendChild(star);
    }
}

createStars();
