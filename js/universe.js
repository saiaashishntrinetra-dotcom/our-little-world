/* =========================================
   OUR LITTLE WORLD — V5
   THE LIVING UNIVERSE
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const starContainer =
    document.getElementById("stars");

const universe =
    document.querySelector(".universe");


/* =========================================
   SAFETY CHECK
========================================= */

if (!starContainer) {

    console.warn(
        "V5 Universe: #stars container not found."
    );

} else {


    /* =====================================
       STAR CONFIGURATION
    ====================================== */

    const isMobile =
        window.innerWidth <= 700;

    const starAmount =
        isMobile ? 130 : 240;


    /* =====================================
       CREATE STAR FIELD
    ====================================== */

    function createStars(amount) {

        const fragment =
            document.createDocumentFragment();


        for (let i = 0; i < amount; i++) {

            const star =
                document.createElement("span");


            /* -----------------------------
               RANDOM DEPTH
            ------------------------------ */

            const depth =
                Math.random();


            /*
             * Deeper stars are smaller
             * and dimmer.
             */

            const size =
                depth > 0.7
                    ? Math.random() * 1.2 + 0.4
                    : Math.random() * 2 + 0.6;


            const opacity =
                depth > 0.7
                    ? Math.random() * 0.35 + 0.1
                    : Math.random() * 0.6 + 0.15;


            /* -----------------------------
               BASIC STYLE
            ------------------------------ */

            star.className =
                "universe-star";


            star.style.position =
                "absolute";

            star.style.width =
                `${size}px`;

            star.style.height =
                `${size}px`;

            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;

            star.style.borderRadius =
                "50%";

            star.style.background =
                "#ffffff";

            star.style.opacity =
                opacity;


            /* -----------------------------
               DEPTH
            ------------------------------ */

            star.dataset.depth =
                depth.toFixed(2);


            star.style.transform =
                `scale(${0.7 + depth * 0.8})`;


            /* -----------------------------
               TWINKLE
            ------------------------------ */

            const duration =
                Math.random() * 4 + 3;

            const delay =
                Math.random() * -6;


            star.style.animation =
                `starTwinkle ${duration}s ease-in-out ${delay}s infinite`;


            /* -----------------------------
               RANDOM Z-INDEX
            ------------------------------ */

            star.style.zIndex =
                depth > 0.75 ? "1" : "2";


            fragment.appendChild(star);

        }


        starContainer.appendChild(
            fragment
        );

    }


    createStars(starAmount);


    /* =====================================
       PARALLAX SYSTEM
    ====================================== */

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    function updateParallax(x, y) {

        if (
            !window.innerWidth ||
            !window.innerHeight
        ) {
            return;
        }


        targetX =
            (x / window.innerWidth - 0.5) * 14;

        targetY =
            (y / window.innerHeight - 0.5) * 14;

    }


    /* =====================================
       MOUSE MOVEMENT
    ====================================== */

    window.addEventListener(
        "mousemove",
        event => {

            updateParallax(
                event.clientX,
                event.clientY
            );

        },
        { passive: true }
    );


    /* =====================================
       TOUCH MOVEMENT
    ====================================== */

    window.addEventListener(
        "touchmove",
        event => {

            if (
                !event.touches ||
                !event.touches.length
            ) {
                return;
            }


            const touch =
                event.touches[0];


            updateParallax(
                touch.clientX,
                touch.clientY
            );

        },
        { passive: true }
    );


    /* =====================================
       SMOOTH UNIVERSE MOTION
    ====================================== */

    function animateUniverse() {

        currentX +=
            (targetX - currentX) * 0.035;

        currentY +=
            (targetY - currentY) * 0.035;


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


    /* =====================================
       STAR PARALLAX
    ====================================== */

    function animateStars() {

        const stars =
            document.querySelectorAll(
                ".universe-star"
            );


        stars.forEach(star => {

            const depth =
                parseFloat(
                    star.dataset.depth || "0.5"
                );


            const movementX =
                currentX * depth * 0.35;

            const movementY =
                currentY * depth * 0.35;


            star.style.marginLeft =
                `${movementX}px`;

            star.style.marginTop =
                `${movementY}px`;

        });


        requestAnimationFrame(
            animateStars
        );

    }


    animateStars();


    /* =====================================
       STAR BURST
    ====================================== */

    function createStarBurst(x, y) {

        const burst =
            document.createElement("div");


        burst.className =
            "star-burst";


        burst.style.left =
            `${x}px`;

        burst.style.top =
            `${y}px`;


        document.body.appendChild(
            burst
        );


        /* -----------------------------
           PARTICLES
        ------------------------------ */

        const particleCount =
            8;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement("span");


            particle.className =
                "burst-particle";


            const angle =
                (Math.PI * 2 / particleCount)
                * i;


            const distance =
                20 + Math.random() * 25;


            particle.style.setProperty(
                "--x",
                `${Math.cos(angle) * distance}px`
            );


            particle.style.setProperty(
                "--y",
                `${Math.sin(angle) * distance}px`
            );


            burst.appendChild(
                particle
            );

        }


        setTimeout(() => {

            burst.remove();

        }, 900);

    }


    /* =====================================
       CLICK / TAP BURSTS
    ====================================== */

    window.addEventListener(
        "click",
        event => {

            /*
             * Don't create bursts when
             * clicking UI buttons.
             */

            if (
                event.target.closest(
                    "button"
                )
            ) {
                return;
            }


            createStarBurst(
                event.clientX,
                event.clientY
            );

        }
    );


    /* =====================================
       SHOOTING STAR
    ====================================== */

    function createShootingStar() {

        if (!document.body) return;


        const shootingStar =
            document.createElement("div");


        shootingStar.className =
            "shooting-star";


        shootingStar.style.top =
            `${Math.random() * 45}%`;

        shootingStar.style.left =
            `${Math.random() * 85 + 5}%`;


        shootingStar.style.animationDuration =
            `${1.2 + Math.random() * 0.8}s`;


        document.body.appendChild(
            shootingStar
        );


        setTimeout(() => {

            shootingStar.remove();

        }, 2500);

    }


    /* =====================================
       RANDOM SHOOTING STARS
    ====================================== */

    function scheduleShootingStar() {

        const delay =
            7000 +
            Math.random() * 9000;


        setTimeout(() => {

            /*
             * Only create them when
             * the World screen is active.
             */

            if (
                universe &&
                !document
                    .getElementById("world")
                    ?.classList
                    .contains("hidden")
            ) {

                createShootingStar();

            }


            scheduleShootingStar();

        }, delay);

    }


    scheduleShootingStar();


    /* =====================================
       CONSTELLATION NODE EFFECT
    ====================================== */

    const nodes =
        document.querySelectorAll(
            ".constellation"
        );


    nodes.forEach(node => {

        node.addEventListener(
            "click",
            event => {

                const rect =
                    node.getBoundingClientRect();


                createStarBurst(
                    rect.left +
                    rect.width / 2,

                    rect.top +
                    rect.height / 2
                );

            }
        );

    });


    /* =====================================
       RESET PARALLAX WHEN LEAVING
    ====================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "hidden"
            ) {

                targetX = 0;
                targetY = 0;

            }

        }
    );


    /* =====================================
       RESIZE
    ====================================== */

    window.addEventListener(
        "resize",
        () => {

            /*
             * Keep the universe stable
             * when rotating the phone.
             */

            targetX = 0;
            targetY = 0;

        },
        { passive: true }
    );


    /* =====================================
       V5 READY
    ====================================== */

    console.log(
        "🌌 Our Little World — V5 Living Universe loaded."
    );

}
