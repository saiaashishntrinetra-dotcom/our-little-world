/* =========================================
   OUR LITTLE WORLD — V3
   INTERACTIVE UNIVERSE
========================================= */

const starContainer =
    document.getElementById("stars");

const universe =
    document.querySelector(".universe");


/* =========================================
   CREATE STARS
========================================= */

function createStars(amount = 220) {

    for (let i = 0; i < amount; i++) {

        const star =
            document.createElement("div");

        const size =
            Math.random() * 2.2 + .5;

        star.style.position =
            "absolute";

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.borderRadius =
            "50%";

        star.style.background =
            "white";

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.opacity =
            `${Math.random() * .65 + .15}`;

        star.style.transform =
            `scale(${Math.random() * 1.4 + .6})`;

        starContainer.appendChild(star);

    }

}

createStars();


/* =========================================
   PARALLAX
========================================= */

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;


function updateParallax(x, y) {

    targetX =
        (x / window.innerWidth - .5) * 12;

    targetY =
        (y / window.innerHeight - .5) * 12;

}


window.addEventListener(
    "mousemove",
    event => {

        updateParallax(
            event.clientX,
            event.clientY
        );

    }
);


window.addEventListener(
    "touchmove",
    event => {

        if (!event.touches.length) return;

        updateParallax(
            event.touches[0].clientX,
            event.touches[0].clientY
        );

    },
    { passive: true }
);


/* =========================================
   SMOOTH MOTION
========================================= */

function animateUniverse() {

    currentX +=
        (targetX - currentX) * .04;

    currentY +=
        (targetY - currentY) * .04;


    if (universe) {

        universe.style.transform =
            `translate3d(
                ${currentX}px,
                ${currentY}px,
                0
            )`;

    }


    requestAnimationFrame(
        animateUniverse
    );

}

animateUniverse();
