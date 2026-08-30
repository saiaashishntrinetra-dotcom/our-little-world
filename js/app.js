/* =========================================
   OUR LITTLE WORLD — V2
   CINEMATIC EXPERIENCE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const reveal = document.getElementById("reveal");
    const world = document.getElementById("world");

    const enterButton =
        document.getElementById("enter-world");


    /* =====================================
       INTRO → REVEAL
    ====================================== */

    setTimeout(() => {

        intro.classList.add("screen-exit");

        setTimeout(() => {

            intro.classList.add("hidden");

            reveal.classList.remove("hidden");

        }, 1800);

    }, 6000);


    /* =====================================
       REVEAL → WORLD
    ====================================== */

    enterButton.addEventListener("click", () => {

        reveal.classList.add("screen-exit");

        setTimeout(() => {

            reveal.classList.add("hidden");

            world.classList.remove("hidden");

        }, 1800);

    });

});
