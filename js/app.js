/* =========================================
   OUR LITTLE WORLD
   V5 — MAIN APPLICATION
   APP.JS
========================================= */


/* =========================================
   APPLICATION INITIALIZATION
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


        intro.classList.add(
            "screen-exit"
        );


        setTimeout(() => {

            intro.classList.add(
                "hidden"
            );

            intro.classList.remove(
                "screen-exit"
            );

            reveal.classList.remove(
                "hidden"
            );

        }, 1800);

    }, 6000);


    /* =====================================
       ENTER OUR WORLD
    ====================================== */

    const enterButton =
        document.getElementById(
            "enter-world"
        );


    if (enterButton) {

        enterButton.addEventListener(
            "click",
            () => {

                if (
                    !reveal ||
                    !world
                ) {
                    return;
                }


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
       LEGACY MODAL
       
       Still used temporarily by
       Music / Future.

       LETTER IS NOT handled here.
       letter.js owns the Letter chapter.
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
       LEGACY SECTION DATA
    ====================================== */

    const sections = {

        music: {

            eyebrow:
                "OUR SOUNDTRACK",

            title:
                "Songs",

            text:
                "Some songs become attached to people. This will be the soundtrack of our little world."

        },


        future: {

            eyebrow:
                "THE FUTURE",

            title:
                "Next Chapters",

            text:
                "We haven't written these chapters yet. That's what makes them exciting."

        }

    };


    /* =====================================
       OPEN LEGACY MODAL
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
       CLOSE LEGACY MODAL
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


    /* =====================================
       MODAL CLOSE BUTTON
    ====================================== */

    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeSectionModal
        );

    }


    /* =====================================
       MODAL BACKDROP
    ====================================== */

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
                       LETTER
                       
                       IMPORTANT:
                       Do NOT open the old modal.
                       letter.js handles this.
                    ========================= */

                    if (
                        section === "letter"
                    ) {

                        return;

                    }


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
                       MUSIC / FUTURE
                    ========================= */

                    if (
                        section === "music" ||
                        section === "future"
                    ) {

                        openModal(section);

                        return;

                    }

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


    /* =====================================
       OPEN MEMORY GALAXY
    ====================================== */

    function openMemoryGalaxy() {

        if (
            !world ||
            !memoryGalaxy
        ) {
            return;
        }


        /*
         * Close any legacy modal first.
         */

        closeSectionModal();


        /*
         * Fade out universe.
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
             * Show Memory Galaxy.
             */

            memoryGalaxy.classList.remove(
                "hidden"
            );


            /*
             * Reset scroll position.
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
         * Fade memory screen.
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
             * Return to universe.
             */

            world.classList.remove(
                "hidden"
            );

        }, 900);

    }


    /* =====================================
       MEMORY BACK BUTTON
    ====================================== */

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


            /* =============================
               ESC → CLOSE MODAL
            ============================= */

            if (
                event.key === "Escape"
            ) {

                closeSectionModal();

            }

        }
    );


    /* =====================================
       PREVENT DOUBLE-TAP ZOOM
       ON BUTTONS
    ====================================== */

    document
        .querySelectorAll(
            "button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "dblclick",
                    event => {

                        event.preventDefault();

                    }
                );

            }
        );


    /* =====================================
       PAGE VISIBILITY
    ====================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            /*
             * Keep the current experience
             * when the user returns.
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
       DEBUG / READY
    ====================================== */

    console.log(
        "🌌 Our Little World — V5 Application loaded."
    );

});
