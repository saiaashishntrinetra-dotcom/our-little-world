/* =========================================
   OUR LITTLE WORLD
   APPLICATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const world = document.getElementById("world");

    const title = document.getElementById("intro-title");
    const subtitle = document.getElementById("intro-subtitle");
    const line = document.querySelector(".intro-line");

    const enterButton = document.getElementById("enter-world");


    /* -------------------------------
       INTRO SEQUENCE
    -------------------------------- */

    setTimeout(() => {
        line.classList.add("line-grow");
    }, 500);


    setTimeout(() => {
        subtitle.classList.add("subtitle-reveal");
    }, 1800);


    /* -------------------------------
       ENTER WORLD
    -------------------------------- */

    enterButton.addEventListener("click", () => {

        intro.classList.add("fade-out");

        setTimeout(() => {

            intro.classList.add("hidden");

            world.classList.remove("hidden");

            world.classList.add("world-enter");

        }, 1500);

    });

});
