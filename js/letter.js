/* =========================================
   OUR LITTLE WORLD
   V5 — THE LETTER
   LETTER.JS
========================================= */


/* =========================================
   CONFIGURATION
========================================= */

const LETTER_CONFIG = {

    chaseSteps: 5,

    chaseDuration: 5200,

    chaseMessage:
        "Some words are worth finding.",

    finalMessage:
        "And some are worth keeping.",

    typingSpeed: 28

};


/* =========================================
   STATE
========================================= */

const letterState = {

    active: false,

    chasing: false,

    currentStep: 0,

    chaseTimer: null,

    starElement: null

};


/* =========================================
   ELEMENT HELPERS
========================================= */

function getLetterChapter() {
    return document.getElementById("letter-chapter");
}

function getWorld() {
    return document.getElementById("world");
}


/* =========================================
   OPEN LETTER
========================================= */

function openLetter() {

    const chapter = getLetterChapter();

    if (!chapter) return;

    letterState.active = true;
    letterState.currentStep = 0;

    chapter.classList.remove("hidden");

    document.body.classList.add("letter-active");

    startLetterChase();

}


/* =========================================
   CLOSE LETTER
========================================= */

function closeLetter() {

    stopLetterChase();

    const chapter = getLetterChapter();

    if (chapter) {
        chapter.classList.add("hidden");
    }

    document.body.classList.remove("letter-active");

    letterState.active = false;
    letterState.chasing = false;
    letterState.currentStep = 0;

}


/* =========================================
   START LETTER CHASE
========================================= */

function startLetterChase() {

    const chapter = getLetterChapter();

    if (!chapter) return;

    letterState.chasing = true;
    letterState.currentStep = 0;

    buildLetterChase();

}


/* =========================================
   BUILD CHASE
========================================= */

function buildLetterChase() {

    const chapter = getLetterChapter();

    if (!chapter) return;

    const content =
        chapter.querySelector(".letter-content");

    if (!content) return;


    /*
       Preserve the original letter.

       We hide it temporarily while
       the chase is happening.
    */

    const originalChildren = [
        ...content.children
    ];

    originalChildren.forEach(element => {

        if (
            !element.classList.contains(
                "letter-chase"
            )
        ) {
            element.dataset.letterOriginal =
                element.style.display;

            element.style.display = "none";
        }

    });


    const chase = document.createElement("div");

    chase.className = "letter-chase";

    chase.innerHTML = `
        <p class="letter-chase-eyebrow">
            BEFORE THE WORDS
        </p>

        <div class="letter-chase-space">

            <button
                class="letter-chase-star"
                type="button"
                aria-label="Follow the star"
            >
                ✦
            </button>

        </div>

        <p class="letter-chase-message">
            ${LETTER_CONFIG.chaseMessage}
        </p>

        <p class="letter-chase-progress">
            0 / ${LETTER_CONFIG.chaseSteps}
        </p>
    `;


    content.prepend(chase);


    letterState.starElement =
        chase.querySelector(
            ".letter-chase-star"
        );


    positionChaseStar();

    requestAnimationFrame(() => {

        chase.classList.add(
            "letter-chase-visible"
        );

    });


    letterState.starElement.addEventListener(
        "click",
        handleChaseStar
    );

}


/* =========================================
   CHASE STAR CLICK
========================================= */

function handleChaseStar() {

    if (!letterState.chasing) return;

    letterState.currentStep++;


    updateChaseProgress();


    if (
        letterState.currentStep >=
        LETTER_CONFIG.chaseSteps
    ) {

        finishLetterChase();

        return;

    }


    moveChaseStar();

}


/* =========================================
   MOVE STAR
========================================= */

function moveChaseStar() {

    const star =
        letterState.starElement;

    if (!star) return;


    star.classList.remove(
        "letter-star-moving"
    );


    /*
       Force browser reflow so the
       animation can restart.
    */

    void star.offsetWidth;


    positionChaseStar();


    star.classList.add(
        "letter-star-moving"
    );

}


/* =========================================
   POSITION STAR
========================================= */

function positionChaseStar() {

    const space =
        document.querySelector(
            ".letter-chase-space"
        );

    const star =
        letterState.starElement;

    if (!space || !star) return;


    const positions = [

        { left: "50%", top: "28%" },

        { left: "25%", top: "48%" },

        { left: "72%", top: "34%" },

        { left: "38%", top: "70%" },

        { left: "65%", top: "67%" }

    ];


    const position =
        positions[
            Math.min(
                letterState.currentStep,
                positions.length - 1
            )
        ];


    star.style.left =
        position.left;

    star.style.top =
        position.top;

}


/* =========================================
   UPDATE PROGRESS
========================================= */

function updateChaseProgress() {

    const progress =
        document.querySelector(
            ".letter-chase-progress"
        );

    if (!progress) return;


    progress.textContent =
        `${letterState.currentStep} / ${LETTER_CONFIG.chaseSteps}`;

}


/* =========================================
   FINISH CHASE
========================================= */

function finishLetterChase() {

    letterState.chasing = false;

    const chase =
        document.querySelector(
            ".letter-chase"
        );

    if (!chase) return;


    const message =
        chase.querySelector(
            ".letter-chase-message"
        );

    if (message) {

        message.textContent =
            LETTER_CONFIG.finalMessage;

    }


    if (letterState.starElement) {

        letterState.starElement.disabled =
            true;

        letterState.starElement.classList.add(
            "letter-chase-complete"
        );

    }


    setTimeout(() => {

        revealLetter();

    }, 1000);

}


/* =========================================
   REVEAL LETTER
========================================= */

function revealLetter() {

    const chapter =
        getLetterChapter();

    if (!chapter) return;


    const chase =
        chapter.querySelector(
            ".letter-chase"
        );

    if (chase) {

        chase.classList.add(
            "letter-chase-finished"
        );

    }


    setTimeout(() => {

        if (chase) {
            chase.remove();
        }


        const content =
            chapter.querySelector(
                ".letter-content"
            );

        if (!content) return;


        /*
           Restore the original
           Letter elements.
        */

        [
            ...content.children
        ].forEach(element => {

            if (
                element.dataset &&
                element.dataset.letterOriginal
                !== undefined
            ) {

                element.style.display =
                    element.dataset.letterOriginal;

                delete element.dataset
                    .letterOriginal;

            }

        });


        animateLetterReveal();

    }, 650);

}


/* =========================================
   LETTER REVEAL ANIMATION
========================================= */

function animateLetterReveal() {

    const chapter =
        getLetterChapter();

    if (!chapter) return;


    const eyebrow =
        chapter.querySelector(
            ".chapter-eyebrow"
        );

    const title =
        chapter.querySelector(
            ".letter-content h1"
        );

    const divider =
        chapter.querySelector(
            ".chapter-divider"
        );

    const paper =
        chapter.querySelector(
            ".letter-paper"
        );


    [
        eyebrow,
        title,
        divider,
        paper
    ].forEach(element => {

        if (!element) return;

        element.classList.add(
            "letter-reveal-element"
        );

    });


    requestAnimationFrame(() => {

        [
            eyebrow,
            title,
            divider,
            paper
        ].forEach(element => {

            if (!element) return;

            element.classList.add(
                "letter-reveal-visible"
            );

        });

    });


    startLetterTextReveal();

}


/* =========================================
   LETTER TEXT REVEAL
========================================= */

function startLetterTextReveal() {

    const letterText =
        document.getElementById(
            "letter-text"
        );

    if (!letterText) return;


    const paragraphs =
        [...letterText.querySelectorAll("p")];


    paragraphs.forEach(
        (paragraph, paragraphIndex) => {

            paragraph.style.opacity = "0";

            paragraph.style.transform =
                "translateY(12px)";


            setTimeout(() => {

                paragraph.style.transition =
                    "opacity 0.8s ease, transform 0.8s ease";

                paragraph.style.opacity =
                    "1";

                paragraph.style.transform =
                    "translateY(0)";

            },
            500 +
            paragraphIndex * 750);

        }
    );


    const signature =
        document.querySelector(
            ".letter-signature"
        );


    if (signature) {

        signature.style.opacity = "0";

        signature.style.transform =
            "translateY(12px)";


        setTimeout(() => {

            signature.style.transition =
                "opacity 1s ease, transform 1s ease";

            signature.style.opacity =
                "0.65";

            signature.style.transform =
                "translateY(0)";

        },
        500 +
        paragraphs.length * 750 +
        500);

    }

}


/* =========================================
   STOP CHASE
========================================= */

function stopLetterChase() {

    if (letterState.chaseTimer) {

        clearTimeout(
            letterState.chaseTimer
        );

        letterState.chaseTimer = null;

    }


    letterState.chasing = false;

}


/* =========================================
   RESET LETTER
========================================= */

function resetLetter() {

    stopLetterChase();

    letterState.currentStep = 0;

    letterState.starElement = null;


    const chapter =
        getLetterChapter();

    if (!chapter) return;


    const chase =
        chapter.querySelector(
            ".letter-chase"
        );

    if (chase) {
        chase.remove();
    }


    const content =
        chapter.querySelector(
            ".letter-content"
        );

    if (!content) return;


    [
        ...content.children
    ].forEach(element => {

        if (
            element.dataset &&
            element.dataset.letterOriginal
            !== undefined
        ) {

            element.style.display =
                element.dataset.letterOriginal;

            delete element.dataset
                .letterOriginal;

        }

    });

}


/* =========================================
   NAVIGATION LISTENER
========================================= */

document.addEventListener(
    "click",
    event => {

        const target =
            event.target.closest(
                "[data-section]"
            );


        if (!target) return;


        const section =
            target.dataset.section;


        if (section === "letter") {

            event.preventDefault();

            openLetter();

        }

    }
);


/* =========================================
   BACK BUTTON
========================================= */

document.addEventListener(
    "click",
    event => {

        const backButton =
            event.target.closest(
                "[data-back]"
            );


        if (!backButton) return;


        if (
            backButton.dataset.back ===
            "world"
        ) {

            if (letterState.active) {

                closeLetter();

            }

        }

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        if (!letterState.active) {
            return;
        }


        closeLetter();

    }
);


/* =========================================
   INITIALIZATION
========================================= */

function initLetter() {

    resetLetter();

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initLetter
    );

} else {

    initLetter();

}


/* =========================================
   PUBLIC API
========================================= */

window.Letter = {

    open: openLetter,

    close: closeLetter,

    reset: resetLetter

};
