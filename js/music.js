/* =========================================
   V6 — THE SOUNDTRACK
   MUSIC ENGINE
========================================= */

const Music = (() => {

    const state = {
        isOpen: false,
        isPlaying: false,
        currentTrack: 0,
        audio: null
    };

    const elements = {
        chapter: null,
        list: null
    };

    const tracks = [
        {
            title: "Our First Song",
            artist: "Our Little World",
            file: "assets/music/song-01.mp3"
        },
        {
            title: "A Little Memory",
            artist: "Our Little World",
            file: "assets/music/song-02.mp3"
        },
        {
            title: "For You",
            artist: "Our Little World",
            file: "assets/music/song-03.mp3"
        }
    ];

    function init() {
        elements.chapter = document.getElementById("music-chapter");
        elements.list = document.getElementById("soundtrack-list");

        if (!elements.chapter || !elements.list) {
            console.warn("V6 Music: soundtrack elements not found.");
            return;
        }

        state.audio = new Audio();
        state.audio.preload = "metadata";

        state.audio.addEventListener("ended", next);

        renderPlaylist();

        console.log("V6 Music Engine initialized.");
    }

    function open() {
        if (!elements.chapter) return;

        state.isOpen = true;

        document.getElementById("world")?.classList.add("hidden");
        elements.chapter.classList.remove("hidden");

        requestAnimationFrame(() => {
            elements.chapter.classList.add("music-active");
        });
    }

    function close() {
        if (!elements.chapter) return;

        state.isOpen = false;

        stop();

        elements.chapter.classList.remove("music-active");

        setTimeout(() => {
            elements.chapter.classList.add("hidden");
            document.getElementById("world")?.classList.remove("hidden");
        }, 500);
    }

    function loadTrack(index, autoplay = false) {
        if (!state.audio || !tracks[index]) return;

        state.currentTrack = index;

        state.audio.src = tracks[index].file;
        state.audio.load();

        updateActiveTrack();

        if (autoplay) {
            play();
        }
    }

    function play() {
        if (!state.audio) return;

        state.audio.play()
            .then(() => {
                state.isPlaying = true;
                updateActiveTrack();
            })
            .catch(error => {
                console.warn("V6 Music: playback could not start.", error);
            });
    }

    function pause() {
        if (!state.audio) return;

        state.audio.pause();
        state.isPlaying = false;

        updateActiveTrack();
    }

    function stop() {
        if (!state.audio) return;

        state.audio.pause();
        state.audio.currentTime = 0;
        state.isPlaying = false;

        updateActiveTrack();
    }

    function next() {
        const nextIndex =
            (state.currentTrack + 1) % tracks.length;

        loadTrack(nextIndex, true);
    }

    function previous() {
        const previousIndex =
            (state.currentTrack - 1 + tracks.length) % tracks.length;

        loadTrack(previousIndex, true);
    }

    function selectTrack(index) {
        if (!tracks[index]) return;

        loadTrack(index, true);
    }

    function renderPlaylist() {
        elements.list.innerHTML = "";

        tracks.forEach((track, index) => {

            const card = document.createElement("button");

            card.type = "button";
            card.className = "soundtrack-track";
            card.dataset.track = index;

            card.innerHTML = `
                <span class="track-star" aria-hidden="true">✦</span>

                <span class="track-info">
                    <span class="track-title">
                        ${track.title}
                    </span>

                    <span class="track-artist">
                        ${track.artist}
                    </span>
                </span>

                <span class="track-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>
            `;

            card.addEventListener("click", () => {
                selectTrack(index);
            });

            elements.list.appendChild(card);
        });

        loadTrack(0, false);
    }

    function updateActiveTrack() {
        const cards =
            elements.list?.querySelectorAll(".soundtrack-track");

        if (!cards) return;

        cards.forEach((card, index) => {
            const active =
                index === state.currentTrack;

            card.classList.toggle("active", active);
            card.classList.toggle(
                "playing",
                active && state.isPlaying
            );
        });
    }

    return {
        init,
        open,
        close,
        play,
        pause,
        next,
        previous,
        selectTrack
    };

})();

document.addEventListener("DOMContentLoaded", () => {
    Music.init();
});
