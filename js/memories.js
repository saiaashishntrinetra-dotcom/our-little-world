/* =========================================
   OUR LITTLE WORLD
   V4 — MEMORY GALAXY
========================================= */

let memories = [];


/* =========================================
   LOAD MEMORIES
========================================= */

async function loadMemories() {

    try {

        const response =
            await fetch("data/memories.json");

        memories =
            await response.json();

        renderMemories();

    } catch (error) {

        console.error(
            "Could not load memories:",
            error
        );

    }

}


/* =========================================
   RENDER MEMORY CARDS
========================================= */

function renderMemories() {

    const grid =
        document.getElementById("memory-grid");

    if (!grid) return;

    grid.innerHTML = "";


    memories.forEach(
        (memory, index) => {

            const card =
                document.createElement("article");

            card.className =
                "memory-card";

            card.dataset.index =
                index;


            const image =
                document.createElement("div");

            image.className =
                "memory-image";


            if (memory.image) {

                image.style.backgroundImage =
                    `url("${memory.image}")`;

            } else {

                image.innerHTML =
                    `<span class="memory-image-placeholder">✦</span>`;

            }


            const date =
                document.createElement("div");

            date.className =
                "memory-date";

            date.textContent =
                memory.date;


            const title =
                document.createElement("h2");

            title.textContent =
                memory.title;


            const description =
                document.createElement("p");

            description.textContent =
                memory.description;


            card.appendChild(image);

            card.appendChild(date);

            card.appendChild(title);

            card.appendChild(description);


            card.addEventListener(
                "click",
                () => openMemory(index)
            );


            grid.appendChild(card);

        }
    );

}


/* =========================================
   OPEN MEMORY
========================================= */

function openMemory(index) {

    const memory =
        memories[index];

    if (!memory) return;


    const viewer =
        document.getElementById(
            "memory-viewer"
        );

    const image =
        document.getElementById(
            "viewer-image"
        );

    const date =
        document.getElementById(
            "viewer-date"
        );

    const title =
        document.getElementById(
            "viewer-title"
        );

    const description =
        document.getElementById(
            "viewer-description"
        );


    date.textContent =
        memory.date;

    title.textContent =
        memory.title;

    description.textContent =
        memory.description;


    if (memory.image) {

        image.style.backgroundImage =
            `url("${memory.image}")`;

        image.innerHTML = "";

    } else {

        image.style.backgroundImage =
            "";

        image.innerHTML =
            `<span class="memory-image-placeholder">✦</span>`;

    }


    viewer.classList.remove("hidden");

}


/* =========================================
   CLOSE MEMORY
========================================= */

function closeMemoryViewer() {

    const viewer =
        document.getElementById(
            "memory-viewer"
        );

    viewer.classList.add("hidden");

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadMemories();


        const closeButton =
            document.getElementById(
                "close-viewer"
            );

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeMemoryViewer
            );

        }


        const backdrop =
            document.querySelector(
                ".viewer-backdrop"
            );

        if (backdrop) {

            backdrop.addEventListener(
                "click",
                closeMemoryViewer
            );

        }


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    closeMemoryViewer();

                }

            }
        );

    }
);
