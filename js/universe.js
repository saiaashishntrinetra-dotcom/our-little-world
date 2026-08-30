/* =========================================
   OUR LITTLE WORLD
   V5 — THE LIVING UNIVERSE
   UNIVERSE.JS
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const starContainer =
    document.getElementById("stars");

const universe =
    document.querySelector(".universe");

const world =
    document.getElementById("world");


/* =========================================
   CONFIGURATION
========================================= */

const UNIVERSE_CONFIG = {

    desktopStars: 240,

    mobileStars: 130,

    parallaxStrength: 14,

    parallaxSmoothing: 0.035,

    starParallaxStrength: 0.35,

    burstParticles: 8,

    shootingStarMinDelay: 7000,

    shootingStarMaxDelay: 16000

};


/* =========================================
   STATE
========================================= */

const universeState = {

    targetX: 0,

    targetY: 0,

    currentX: 0,

    currentY: 0,

    shootingStarTimer: null

};


/* =========================================
   SAFETY CHECK
========================================= */

if (!starContainer) {

    console.warn(
        "V5 Universe: #stars container not found."
    );

} else {


    /* =====================================
       STAR COUNT
    ====================================== */

    const isMobile =
        window.innerWidth <= 700;

    const starAmount =
        isMobile
            ? UNIVERSE_CONFIG.mobileStars
            : UNIVERSE_CONFIG.desktopStars;


    /* =====================================
       CREATE STAR FIELD
    ====================================== */

    function createStars(amount) {

        const fragment =
            document.createDocumentFragment();


        for (
            let i = 0;
            i < amount;
            i++
        ) {

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


            /*
             * Store the base transform
             * separately so parallax does
             * not destroy the star scale.
             */

            star.dataset.scale =
                (
                    0.7 +
                    depth * 0.8
                ).toFixed(3);


            star.style.transform =
                `translate3d(0, 0, 0) scale(${star.dataset.scale})`;


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
                depth > 0.75
                    ? "1"
                    : "2";


            fragment.appendChild(
                star
            );

        }


        starContainer.appendChild(
            fragment
        );

    }


    createStars(
        starAmount
    );


    /* =====================================
       PARALLAX INPUT
    ====================================== */

    function updateParallax(x, y) {

        if (
            !window.innerWidth ||
            !window.innerHeight
        ) {
            return;
        }


        universeState.targetX =
            (
                x /
                window.innerWidth -
                0.5
            ) *
            UNIVERSE_CONFIG.parallaxStrength;


        universeState.targetY =
            (
                y /
                window.innerHeight -
                0.5
            ) *
            UNIVERSE_CONFIG.parallaxStrength;

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
        {
            passive: true
        }
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
        {
            passive: true
        }
    );


    /* =====================================
       SMOOTH UNIVERSE MOTION
    ====================================== */

    function animateUniverse() {

        universeState.currentX +=
            (
                universeState.targetX -
                universeState.currentX
            ) *
            UNIVERSE_CONFIG.parallaxSmoothing;


        universeState.currentY +=
            (
                universeState.targetY -
                universeState.currentY
            ) *
            UNIVERSE_CONFIG.parallaxSmoothing;


        /*
         * Only apply parallax when the
         * universe element exists.
         */

        if (universe) {

            universe.style.transform =
                `translate3d(
                    ${universeState.currentX}px,
                    ${universeState.currentY}px,
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
                    star.dataset.depth ||
                    "0.5"
                );


            const scale =
                star.dataset.scale ||
                "1";


            const movementX =
                universeState.currentX *
                depth *
                UNIVERSE_CONFIG.starParallaxStrength;


            const movementY =
                universeState.currentY *
                depth *
                UNIVERSE_CONFIG.starParallaxStrength;


            /*
             * Use transform instead of
             * margin movement.
             *
             * This is smoother and avoids
             * layout recalculation.
             */

            star.style.transform =
                `translate3d(
                    ${movementX}px,
                    ${movementY}px,
                    0
                ) scale(${scale})`;

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
            document.createElement(
                "div"
            );


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

        for (
            let i = 0;
            i < UNIVERSE_CONFIG.burstParticles;
            i++
        ) {

            const particle =
                document.createElement(
                    "span"
                );


            particle.className =
                "burst-particle";


            const angle =
                (
                    Math.PI * 2 /
                    UNIVERSE_CONFIG.burstParticles
                ) *
                i;


            const distance =
                20 +
                Math.random() * 25;


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

            if (burst.parentNode) {

                burst.remove();

            }

        }, 900);

    }


    /* =====================================
       BACKGROUND CLICK BURSTS
    ====================================== */

    window.addEventListener(
        "click",
        event => {

            /*
             * Never create a burst when
             * clicking buttons or controls.
             */

            if (
                event.target.closest(
                    "button"
                )
            ) {
                return;
            }


            /*
             * Don't create background
             * bursts inside the Letter,
             * Memory Viewer, or modal.
             */

            if (
                event.target.closest(
                    "#letter-chapter"
                ) ||
                event.target.closest(
                    "#memory-viewer"
                ) ||
                event.target.closest(
                    "#section-modal"
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

        if (!document.body) {
            return;
        }


        const shootingStar =
            document.createElement(
                "div"
            );


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

            if (
                shootingStar.parentNode
            ) {

                shootingStar.remove();

            }

        }, 2500);

    }


    /* =====================================
       CHECK WORLD VISIBILITY
    ====================================== */

    function isWorldActive() {

        if (!world) {
            return false;
        }


        return !world.classList.contains(
            "hidden"
        );

    }


    /* =====================================
       RANDOM SHOOTING STARS
    ====================================== */

    function scheduleShootingStar() {

        const delay =
            UNIVERSE_CONFIG.shootingStarMinDelay +
            Math.random() *
            (
                UNIVERSE_CONFIG.shootingStarMaxDelay -
                UNIVERSE_CONFIG.shootingStarMinDelay
            );


        universeState.shootingStarTimer =
            setTimeout(() => {

                /*
                 * Shooting stars belong to
                 * the main universe only.
                 */

                if (
                    isWorldActive()
                ) {

                    createShootingStar();

                }


                scheduleShootingStar();

            }, delay);

    }


    scheduleShootingStar();


    /* =====================================
       CONSTELLATION STAR BURSTS
    ====================================== */

    const nodes =
        document.querySelectorAll(
            ".constellation"
        );


    nodes.forEach(node => {

        node.addEventListener(
            "click",
            () => {

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
       RESET PARALLAX
    ====================================== */

    function resetParallax() {

        universeState.targetX = 0;
        universeState.targetY = 0;

    }


    /* =====================================
       PAGE VISIBILITY
    ====================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState ===
                "hidden"
            ) {

                resetParallax();

            }

        }
    );


    /* =====================================
       RESIZE
    ====================================== */

    window.addEventListener(
        "resize",
        () => {

            resetParallax();

        },
        {
            passive: true
        }
    );


    /* =====================================
       PUBLIC API
    ====================================== */

    window.Universe = {

        createStarBurst,

        createShootingStar,

        resetParallax,

        isWorldActive

    };


    /* =====================================
       V5 READY
    ====================================== */

    console.log(
        "🌌 Our Little World — V5 Living Universe loaded."
    );

}
