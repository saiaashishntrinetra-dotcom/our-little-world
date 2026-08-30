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

    chaseMessage:
        "Some words are worth finding.",

    finalMessage:
        "And some are worth keeping.",

    /*
       Delay between the chase ending
       and the actual letter reveal.
    */
    chaseFinishDelay: 1000,

    /*
       Delay between the chase fading
       and restoring the letter.
    */
    letterRevealDelay: 650,

    /*
       Paragraph reveal timing.
    */
    paragraphDelay: 750,

    paragraphAnimationDelay: 500

};


/* =========================================
   STATE
========================================= */

const letterState = {

    active: false,

    chasing: false,

    revealing: false,

    currentStep: 0,

    starElement: null,

    chaseElement: null

};


/* =========================================
   ELEMENT HELPERS
========================================= */

function getLetterChapter() {

    return document.getElementById(
        "letter-chapter"
    );

}


function getWorld() {

    return document.getElementById(
        "world"
    );

}


/* =========================================
   OPEN LETTER
========================================= */

function openLetter() {

    const chapter =
        getLetterChapter();

    if (!chapter) return;


    /*
       If the letter is already open,
       don't create another experience.
    */

    if (letterState.active) {
        return;
    }


    letterState.active = true;

    letterState.chasing = false;

    letterState.revealing = false;

    letterState.currentStep = 0;


    /*
       Make sure the previous experience
       is completely reset.
    */

    resetLetter();


    /*
       Show the Letter chapter.
    */

    chapter.classList.remove(
        "hidden"
    );


    document.body.classList.add(
        "letter-active"
    );


    /*
       Start the V5 letter chase.
    */

    startLetterChase();

}


/* =========================================
   CLOSE LETTER
========================================= */

function closeLetter() {

    const chapter =
        getLetterChapter();

    stopLetterChase();


    /*
       Hide chapter.
    */

    if (chapter) {

        chapter.classList.add(
            "hidden"
        );

    }


    document.body.classList.remove(
        "letter-active"
    );


    letterState.active = false;

    letterState.chasing = false;

    letterState.revealing = false;

    letterState.currentStep = 0;

    letterState.starElement = null;

    letterState.chaseElement = null;

}


/* =========================================
   START LETTER CHASE
========================================= */

function startLetterChase() {

    const chapter =
        getLetterChapter();

    if (!chapter) return;


    /*
       Always clean an old chase first.
    */

    removeLetterChase();


    letterState.chasing = true;

    letterState.revealing = false;

    letterState.currentStep = 0;


    /*
       Restore the original letter
       before hiding it again.
    */

    restoreOriginalLetter();


    /*
       Build the interactive chase.
    */

    buildLetterChase();

}


/* =========================================
   BUILD CHASE
========================================= */

function buildLetterChase() {

    const chapter =
        getLetterChapter();

    if (!chapter) return;


    const content =
        chapter.querySelector(
            ".letter-content"
        );

    if (!content) return;


    /*
       Hide the original Letter content
       while the chase is active.
    */

    hideOriginalLetter(
        content
    );


    /*
       Create chase container.
    */

    const chase =
        document.createElement(
            "div"
        );

    chase.className =
        "letter-chase";


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

        <p
            class="letter-chase-progress"
            aria-live="polite"
        >
            0 / ${LETTER_CONFIG.chaseSteps}
        </p>

    `;


    content.prepend(chase);


    /*
       Store references.
    */

    letterState.chaseElement =
        chase;


    letterState.starElement =
        chase.querySelector(
            ".letter-chase-star"
        );


    /*
       Position first star.
    */

    positionChaseStar();


    /*
       Animate chase entrance.
    */

    requestAnimationFrame(() => {

        chase.classList.add(
            "letter-chase-visible"
        );

    });


    /*
       Attach listener.
    */

    if (letterState.starElement) {

        letterState.starElement.addEventListener(
            "click",
            handleChaseStar
        );

    }

}


/* =========================================
   HIDE ORIGINAL LETTER
========================================= */

function hideOriginalLetter(
    content
) {

    [
        ...content.children
    ].forEach(element => {

        if (
            element.classList.contains(
                "letter-chase"
            )
        ) {
            return;
        }


        /*
           Save the original display
           value only once.
        */

        if (
            !Object.prototype.hasOwnProperty.call(
                element.dataset,
                "letterOriginalDisplay"
            )
        ) {

            element.dataset
                .letterOriginalDisplay =
                element.style.display;

        }


        element.style.display =
            "none";

    });

}


/* =========================================
   RESTORE ORIGINAL LETTER
========================================= */

function restoreOriginalLetter() {

    const chapter =
        getLetterChapter();

    if (!chapter) return;


    const content =
        chapter.querySelector(
            ".letter-content"
        );

    if (!content) return;


    [
        ...content.children
    ].forEach(element => {

        if (
            Object.prototype.hasOwnProperty.call(
                element.dataset,
                "letterOriginalDisplay"
            )
        ) {

            element.style.display =
                element.dataset
                    .letterOriginalDisplay;


            delete element.dataset
                .letterOriginalDisplay;

        }

    });

}


/* =========================================
   REMOVE CHASE
========================================= */

function removeLetterChase() {

    const chapter =
        getLetterChapter();

    if (!chapter) return;


    const chase =
        chapter.querySelector(
            ".letter-chase"
        );


    if (chase) {

        const star =
            chase.querySelector(
                ".letter-chase-star"
            );


        /*
           Remove listener before removing
           the element.
        */

        if (star) {

            star.removeEventListener(
                "click",
                handleChaseStar
            );

        }


        chase.remove();

    }


    letterState.chaseElement = null;

    letterState.starElement = null;

}


/* =========================================
   CHASE STAR CLICK
========================================= */

function handleChaseStar() {

    if (
        !letterState.active ||
        !letterState.chasing ||
        letterState.revealing
    ) {
        return;
    }


    letterState.currentStep++;


    updateChaseProgress();


    /*
       Five successful clicks complete
       the chase.
    */

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


    /*
       Restart movement animation.
    */

    star.classList.remove(
        "letter-star-moving"
    );


    /*
       Force layout so the browser
       recognizes the animation restart.
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


    /*
       Carefully chosen positions.

       The final position is intentionally
       different from the starting position.
    */

    const positions = [

        {
            left: "50%",
            top: "28%"
        },

        {
            left: "25%",
            top: "48%"
        },

        {
            left: "72%",
            top: "34%"
        },

        {
            left: "38%",
            top: "70%"
        },

        {
            left: "65%",
            top: "67%"
        }

    ];


    const index =
        Math.min(
            letterState.currentStep,
            positions.length - 1
        );


    const position =
        positions[index];


    star.style.left =
        position.left;

    star.style.top =
        position.top;

}


/* =========================================
   UPDATE CHASE PROGRESS
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

    if (
        !letterState.chasing
    ) {
        return;
    }


    letterState.chasing = false;

    letterState.revealing = true;


    const chase =
        letterState.chaseElement ||
        document.querySelector(
            ".letter-chase"
        );


    if (!chase) {

        revealLetter();

        return;

    }


    /*
       Change the message.
    */

    const message =
        chase.querySelector(
            ".letter-chase-message"
        );


    if (message) {

        message.textContent =
            LETTER_CONFIG.finalMessage;

    }


    /*
       Update progress.
    */

    const progress =
        chase.querySelector(
            ".letter-chase-progress"
        );


    if (progress) {

        progress.textContent =
            `${LETTER_CONFIG.chaseSteps} / ${LETTER_CONFIG.chaseSteps}`;

    }


    /*
       Disable the star.
    */

    if (letterState.starElement) {

        letterState.starElement.disabled =
            true;

        letterState.starElement.classList.add(
            "letter-chase-complete"
        );

    }


    /*
       Let the final message breathe
       before revealing the actual letter.
    */

    setTimeout(() => {

        if (!letterState.active) {
            return;
        }


        revealLetter();

    }, LETTER_CONFIG.chaseFinishDelay);

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


    /*
       Begin chase exit.
    */

    if (chase) {

        chase.classList.add(
            "letter-chase-finished"
        );

    }


    /*
       Wait for chase exit before
       restoring the actual letter.
    */

    setTimeout(() => {

        if (!letterState.active) {
            return;
        }


        removeLetterChase();


        restoreOriginalLetter();


        letterState.revealing = false;


        animateLetterReveal();


    }, LETTER_CONFIG.letterRevealDelay);

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


    const elements = [

        eyebrow,
        title,
        divider,
        paper

    ];


    /*
       Remove old reveal states first.
       This makes reopening the letter
       animate correctly.
    */

    elements.forEach(
        element => {

            if (!element) return;

            element.classList.remove(
                "letter-reveal-element",
                "letter-reveal-visible"
            );

        }
    );


    /*
       Force a fresh animation cycle.
    */

    void chapter.offsetWidth;


    elements.forEach(
        element => {

            if (!element) return;

            element.classList.add(
                "letter-reveal-element"
            );

        }
    );


    requestAnimationFrame(() => {

        elements.forEach(
            element => {

                if (!element) return;

                element.classList.add(
                    "letter-reveal-visible"
                );

            }
        );

    });


    /*
       Reveal the actual letter text
       separately.
    */

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
        [
            ...letterText.querySelectorAll(
                "p"
            )
        ];


    /*
       Reset paragraph states.
    */

    paragraphs.forEach(
        paragraph => {

            paragraph.classList.remove(
                "letter-text-reveal"
            );

            paragraph.classList.remove(
                "letter-text-visible"
            );

        }
    );


    /*
       Force animation restart.
    */

    void letterText.offsetWidth;


    /*
       Reveal each paragraph one after
       another.
    */

    paragraphs.forEach(
        (
            paragraph,
            paragraphIndex
        ) => {

            paragraph.classList.add(
                "letter-text-reveal"
            );


            setTimeout(() => {

                if (!letterState.active) {
                    return;
                }


                paragraph.classList.add(
                    "letter-text-visible"
                );


            },
            LETTER_CONFIG
                .paragraphAnimationDelay +
            paragraphIndex *
                LETTER_CONFIG
                    .paragraphDelay);

        }
    );


    /*
       Signature appears after all
       paragraphs have been revealed.
    */

    const signature =
        document.querySelector(
            ".letter-signature"
        );


    if (signature) {

        signature.classList.remove(
            "letter-signature-reveal"
        );

        signature.classList.remove(
            "letter-signature-visible"
        );


        void signature.offsetWidth;


        signature.classList.add(
            "letter-signature-reveal"
        );


        setTimeout(() => {

            if (!letterState.active) {
                return;
            }


            signature.classList.add(
                "letter-signature-visible"
            );


        },
        LETTER_CONFIG
            .paragraphAnimationDelay +
        paragraphs.length *
            LETTER_CONFIG.paragraphDelay +
        450);

    }

}


/* =========================================
   STOP CHASE
========================================= */

function stopLetterChase() {

    letterState.chasing = false;

    letterState.revealing = false;

}


/* =========================================
   RESET LETTER
========================================= */

function resetLetter() {

    stopLetterChase();


    letterState.currentStep = 0;

    letterState.starElement = null;

    letterState.chaseElement = null;


    /*
       Remove any existing chase.
    */

    removeLetterChase();


    /*
       Restore original letter.
    */

    restoreOriginalLetter();


    /*
       Reset reveal classes.
    */

    const chapter =
        getLetterChapter();

    if (!chapter) return;


    const revealElements =
        chapter.querySelectorAll(
            ".letter-reveal-element, " +
            ".letter-reveal-visible, " +
            ".letter-text-reveal, " +
            ".letter-text-visible, " +
            ".letter-signature-reveal, " +
            ".letter-signature-visible"
        );


    revealElements.forEach(
        element => {

            element.classList.remove(
                "letter-reveal-element",
                "letter-reveal-visible",
                "letter-text-reveal",
                "letter-text-visible",
                "letter-signature-reveal",
                "letter-signature-visible"
            );

        }
    );

}


/* =========================================
   NAVIGATION — LETTER STAR
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


        if (
            section !== "letter"
        ) {
            return;
        }


        event.preventDefault();


        openLetter();

    }
);


/* =========================================
   NAVIGATION — BACK BUTTON
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

            /*
               Only close the Letter if
               the Letter chapter is active.
            */

            if (
                letterState.active
            ) {

                event.preventDefault();

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


        if (
            !letterState.active
        ) {
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


/* =========================================
   END — V5 THE LETTER
========================================= */
