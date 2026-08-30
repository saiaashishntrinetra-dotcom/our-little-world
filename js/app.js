/* =========================================
   OUR LITTLE WORLD — V3
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const intro =
        document.getElementById("intro");

    const reveal =
        document.getElementById("reveal");

    const world =
        document.getElementById("world");

    const enterButton =
        document.getElementById("enter-world");

    const modal =
        document.getElementById("section-modal");

    const closeModal =
        document.getElementById("close-modal");

    const modalTitle =
        document.getElementById("modal-title");

    const modalEyebrow =
        document.getElementById("modal-eyebrow");

    const modalText =
        document.getElementById("modal-text");


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
       REVEAL → UNIVERSE
    ====================================== */

    enterButton.addEventListener("click", () => {

        reveal.classList.add("screen-exit");

        setTimeout(() => {

            reveal.classList.add("hidden");

            world.classList.remove("hidden");

        }, 1800);

    });


    /* =====================================
       CONSTELLATION CONTENT
    ====================================== */

    const sections = {

        letter: {
            eyebrow: "A LETTER",
            title: "For Trinetra",
            text:
                "Some things are easier to write than say. This space will hold the words I want you to keep."
        },

        memories: {
            eyebrow: "OUR MEMORIES",
            title: "The Moments",
            text:
                "Every little moment that became part of our story will have a place here."
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
       OPEN CONSTELLATION
    ====================================== */

    document
        .querySelectorAll(".constellation")
        .forEach(button => {

            button.addEventListener("click", () => {

                const section =
                    button.dataset.section;

                const content =
                    sections[section];

                if (!content) return;

                modalEyebrow.textContent =
                    content.eyebrow;

                modalTitle.textContent =
                    content.title;

                modalText.textContent =
                    content.text;

                modal.classList.remove("hidden");

                modal.setAttribute(
                    "aria-hidden",
                    "false"
                );

            });

        });


    /* =====================================
       CLOSE MODAL
    ====================================== */

    function closeSection() {

        modal.classList.add("hidden");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

    }

    closeModal.addEventListener(
        "click",
        closeSection
    );


    document
        .querySelector(".modal-backdrop")
        .addEventListener(
            "click",
            closeSection
        );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeSection();

            }

        }
    );

});
