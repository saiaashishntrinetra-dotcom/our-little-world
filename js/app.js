/* =========================================
   OUR LITTLE WORLD
   V4 — MAIN APPLICATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MAIN SCREENS
    ====================================== */

    const intro =
        document.getElementById("intro");

    const reveal =
        document.getElementById("reveal");

    const world =
        document.getElementById("world");


    /* =====================================
       V2 → REVEAL
    ====================================== */

    setTimeout(() => {

        if (!intro || !reveal) return;

        intro.classList.add("screen-exit");

        setTimeout(() => {

            intro.classList.add("hidden");

            reveal.classList.remove("hidden");

        }, 1800);

    }, 6000);


    /* =====================================
       ENTER OUR WORLD
    ====================================== */

    const enterButton =
        document.getElementById("enter-world");


    if (enterButton) {

        enterButton.addEventListener(
            "click",
            () => {

                if (!reveal || !world) return;

                reveal.classList.add(
                    "screen-exit"
                );

                setTimeout(() => {

                    reveal.classList.add(
                        "hidden"
                    );

                    reveal.classList.remove(
                        "screen-exit"
                    );

                    world.classList.remove(
                        "hidden"
                    );

                }, 1800);

            }
        );

    }


    /* =====================================
       MODAL ELEMENTS
    ====================================== */

    const modal =
        document.getElementById(
            "section-modal"
        );

    const closeModal =
        document.getElementById(
            "close-modal"
        );

    const modalTitle =
        document.getElementById(
            "modal-title"
        );

    const modalEyebrow =
        document.getElementById(
            "modal-eyebrow"
        );

    const modalText =
        document.getElementById(
            "modal-text"
        );

    const modalBackdrop =
        document.querySelector(
            ".modal-backdrop"
        );


    /* =====================================
       OTHER UNIVERSE SECTIONS
    ====================================== */

    const sections = {

        letter: {

            eyebrow: "A LETTER",

            title: "For Trinetra",

            text:
                "Some things are easier to write than say. This space will hold the words I want you to keep."

        },


        music: {

            eyebrow: "OUR SOUNDTRACK",

            title: "Songs",

            text:
                "Some songs become attached to people. This will be the soundtrack of our little world."

        },


        future: {

            eyebrow: "THE FUTURE",

            title: "Next Chapters",

            text:
                "We haven't written these chapters yet. That's what makes them exciting."

        }

    };


    /* =====================================
       OPEN NORMAL MODAL
    ====================================== */

    function openModal(section) {

        const content =
            sections[section];

        if (
            !content ||
            !modal ||
            !modalTitle ||
            !modalEyebrow ||
            !modalText
        ) {
            return;
        }


        modalEyebrow.textContent =
            content.eyebrow;

        modalTitle.textContent =
            content.title;

        modalText.textContent =
            content.text;


        modal.classList.remove(
            "hidden"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* =====================================
       CLOSE NORMAL MODAL
    ====================================== */

    function closeSectionModal() {

        if (!modal) return;

        modal.classList.add(
            "hidden"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeSectionModal
        );

    }


    if (modalBackdrop) {

        modalBackdrop.addEventListener(
            "click",
            closeSectionModal
        );

    }


    /* =====================================
       CONSTELLATION NAVIGATION
    ====================================== */

    const constellationButtons =
        document.querySelectorAll(
            ".constellation"
        );


    constellationButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const section =
                        button.dataset.section;


                    /* =========================
                       MEMORIES
                    ========================= */

                    if (
                        section === "memories"
                    ) {

                        openMemoryGalaxy();

                        return;

                    }


                    /* =========================
                       LETTER / MUSIC / FUTURE
                    ========================= */

                    openModal(section);

                }
            );

        }
    );


    /* =====================================
       MEMORY GALAXY
    ====================================== */

    const memoryGalaxy =
        document.getElementById(
            "memory-galaxy"
        );

    const closeMemories =
        document.getElementById(
            "close-memories"
        );


    function openMemoryGalaxy() {

        if (
            !world ||
            !memoryGalaxy
        ) {
            return;
        }


        /*
         * Fade out the main universe
         */

        world.classList.add(
            "screen-exit"
        );


        setTimeout(() => {

            world.classList.add(
                "hidden"
            );

            world.classList.remove(
                "screen-exit"
            );


            /*
             * Show Memory Galaxy
             */

            memoryGalaxy.classList.remove(
                "hidden"
            );


            /*
             * Scroll back to top
             */

            const memoryUniverse =
                memoryGalaxy.querySelector(
                    ".memory-universe"
                );

            if (memoryUniverse) {

                memoryUniverse.scrollTop = 0;

            }

        }, 900);

    }


    /* =====================================
       CLOSE MEMORY GALAXY
    ====================================== */

    function closeMemoryGalaxy() {

        if (
            !memoryGalaxy ||
            !world
        ) {
            return;
        }


        /*
         * Fade Memory Galaxy out
         */

        memoryGalaxy.classList.add(
            "screen-exit"
        );


        setTimeout(() => {

            memoryGalaxy.classList.add(
                "hidden"
            );

            memoryGalaxy.classList.remove(
                "screen-exit"
            );


            /*
             * Return to Universe
             */

            world.classList.remove(
                "hidden"
            );

        }, 900);

    }


    if (closeMemories) {

        closeMemories.addEventListener(
            "click",
            closeMemoryGalaxy
        );

    }


    /* =====================================
       KEYBOARD CONTROLS
    ====================================== */

    document.addEventListener(
        "keydown",
        event => {

            /*
             * ESC closes normal modal
             */

            if (
                event.key === "Escape"
            ) {

                closeSectionModal();

            }

        }
    );


    /* =====================================
       PREVENT DOUBLE-TAP ZOOM
       ON INTERACTIVE ELEMENTS
    ====================================== */

    document
        .querySelectorAll(
            "button"
        )
        .forEach(button => {

            button.addEventListener(
                "dblclick",
                event => {

                    event.preventDefault();

                }
            );

        });


    /* =====================================
       PAGE VISIBILITY
    ====================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            /*
             * If the user leaves the page,
             * don't reset the experience.
             *
             * This keeps the current screen
             * when they return.
             */

            if (
                document.visibilityState ===
                "visible"
            ) {

                console.log(
                    "Welcome back to Our Little World."
                );

            }

        }
    );


    /* =====================================
       DEBUG MESSAGE
    ====================================== */

    console.log(
        "🌌 Our Little World — V4 loaded."
    );

});
