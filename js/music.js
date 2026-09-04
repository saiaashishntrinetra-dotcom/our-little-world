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
        list: null,

        title: null,
        artist: null,

        progress: null,
        currentTime: null,
        duration: null,

        play: null,
        previous: null,
        next: null
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

        elements.chapter =
            document.getElementById("music-chapter");

        elements.list =
            document.getElementById("soundtrack-list");

        elements.title =
            document.getElementById("music-track-title");

        elements.artist =
            document.getElementById("music-track-artist");

        elements.progress =
            document.getElementById("music-progress");

        elements.currentTime =
            document.getElementById("music-current-time");

        elements.duration =
            document.getElementById("music-duration");

        elements.play =
            document.getElementById("music-play");

        elements.previous =
            document.getElementById("music-previous");

        elements.next =
            document.getElementById("music-next");

        if (!elements.chapter || !elements.list) {
            console.warn(
                "V6 Music: soundtrack elements not found."
            );
            return;
        }

        state.audio = new Audio();
        state.audio.preload = "metadata";

        bindControls();

        state.audio.addEventListener(
            "ended",
            next
        );

        state.audio.addEventListener(
            "timeupdate",
            updateProgress
        );

        state.audio.addEventListener(
            "loadedmetadata",
            updateDuration
        );

        state.audio.addEventListener(
            "play",
            () => {
                state.isPlaying = true;
                updatePlayButton();
                updateActiveTrack();
            }
        );

        state.audio.addEventListener(
            "pause",
            () => {
                state.isPlaying = false;
                updatePlayButton();
                updateActiveTrack();
            }
        );

        renderPlaylist();

        console.log(
            "V6 Music Engine initialized."
        );
    }

    function bindControls() {

        elements.play?.addEventListener(
            "click",
            togglePlay
        );

        elements.previous?.addEventListener(
            "click",
            previous
        );

        elements.next?.addEventListener(
            "click",
            next
        );

        elements.progress?.addEventListener(
            "input",
            seek
        );
    }

    function open() {

        if (!elements.chapter) return;

        state.isOpen = true;

        document
            .getElementById("world")
            ?.classList.add("hidden");

        elements.chapter.classList.remove(
            "hidden"
        );

        requestAnimationFrame(() => {
            elements.chapter.classList.add(
                "music-active"
            );
        });
    }

    function close() {

        if (!elements.chapter) return;

        state.isOpen = false;

        stop();

        elements.chapter.classList.remove(
            "music-active"
        );

        setTimeout(() => {

            elements.chapter.classList.add(
                "hidden"
            );

            document
                .getElementById("world")
                ?.classList.remove("hidden");

        }, 500);
    }

    function loadTrack(
        index,
        autoplay = false
    ) {

        if (!state.audio || !tracks[index]) {
            return;
        }

        state.currentTrack = index;
        state.isPlaying = false;

        state.audio.pause();
        state.audio.currentTime = 0;

        state.audio.src =
            tracks[index].file;

        state.audio.load();

        updateTrackInfo();
        resetProgress();
        updateActiveTrack();
        updatePlayButton();

        if (autoplay) {
            play();
        }
    }

    function play() {

        if (!state.audio) return;

        state.audio
            .play()
            .then(() => {

                state.isPlaying = true;

                updatePlayButton();
                updateActiveTrack();

            })
            .catch(error => {

                state.isPlaying = false;

                updatePlayButton();
                updateActiveTrack();

                console.warn(
                    "V6 Music: playback could not start.",
                    error
                );
            });
    }

    function pause() {

        if (!state.audio) return;

        state.audio.pause();

        state.isPlaying = false;

        updatePlayButton();
        updateActiveTrack();
    }

    function togglePlay() {

        if (!state.audio) return;

        if (state.audio.paused) {
            play();
        } else {
            pause();
        }
    }

    function stop() {

        if (!state.audio) return;

        state.audio.pause();

        state.audio.currentTime = 0;

        state.isPlaying = false;

        resetProgress();
        updatePlayButton();
        updateActiveTrack();
    }

    function next() {

        if (!tracks.length) return;

        const nextIndex =
            (state.currentTrack + 1) %
            tracks.length;

        loadTrack(
            nextIndex,
            true
        );
    }

    function previous() {

        if (!tracks.length) return;

        const previousIndex =
            (state.currentTrack - 1 +
                tracks.length) %
            tracks.length;

        loadTrack(
            previousIndex,
            true
        );
    }

    function selectTrack(index) {

        if (!tracks[index]) return;

        loadTrack(
            index,
            true
        );
    }

    function renderPlaylist() {

        elements.list.innerHTML = "";

        tracks.forEach(
            (track, index) => {

                const card =
                    document.createElement(
                        "button"
                    );

                card.type = "button";

                card.className =
                    "soundtrack-track";

                card.dataset.track =
                    index;

                card.innerHTML = `
                    <span
                        class="track-star"
                        aria-hidden="true"
                    >
                        ✦
                    </span>

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

                card.addEventListener(
                    "click",
                    () => {
                        selectTrack(index);
                    }
                );

                elements.list.appendChild(
                    card
                );
            }
        );

        loadTrack(
            0,
            false
        );
    }

    function updateTrackInfo() {

        const track =
            tracks[state.currentTrack];

        if (!track) return;

        if (elements.title) {
            elements.title.textContent =
                track.title;
        }

        if (elements.artist) {
            elements.artist.textContent =
                track.artist;
        }
    }

    function updateProgress() {

        if (
            !state.audio ||
            !elements.progress
        ) {
            return;
        }

        const current =
            state.audio.currentTime || 0;

        const duration =
            state.audio.duration || 0;

        if (duration > 0) {

            elements.progress.value =
                (current / duration) * 100;

        } else {

            elements.progress.value = 0;
        }

        if (elements.currentTime) {

            elements.currentTime.textContent =
                formatTime(current);
        }
    }

    function updateDuration() {

        if (
            !state.audio ||
            !elements.duration
        ) {
            return;
        }

        const duration =
            state.audio.duration;

        elements.duration.textContent =
            Number.isFinite(duration)
                ? formatTime(duration)
                : "0:00";
    }

    function seek() {

        if (
            !state.audio ||
            !elements.progress ||
            !Number.isFinite(
                state.audio.duration
            )
        ) {
            return;
        }

        const percentage =
            Number(elements.progress.value) / 100;

        state.audio.currentTime =
            percentage *
            state.audio.duration;
    }

    function resetProgress() {

        if (elements.progress) {
            elements.progress.value = 0;
        }

        if (elements.currentTime) {
            elements.currentTime.textContent =
                "0:00";
        }

        if (elements.duration) {
            elements.duration.textContent =
                "0:00";
        }
    }

    function formatTime(seconds) {

        if (
            !Number.isFinite(seconds) ||
            seconds < 0
        ) {
            return "0:00";
        }

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            Math.floor(seconds % 60);

        return `${minutes}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    }

    function updatePlayButton() {

        if (!elements.play) return;

        elements.play.textContent =
            state.isPlaying
                ? "❚❚"
                : "▶";

        elements.play.setAttribute(
            "aria-label",
            state.isPlaying
                ? "Pause"
                : "Play"
        );
    }

    function updateActiveTrack() {

        const cards =
            elements.list?.querySelectorAll(
                ".soundtrack-track"
            );

        if (!cards) return;

        cards.forEach(
            (card, index) => {

                const active =
                    index ===
                    state.currentTrack;

                card.classList.toggle(
                    "active",
                    active
                );

                card.classList.toggle(
                    "playing",
                    active &&
                    state.isPlaying
                );
            }
        );
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

window.Music = Music;

document.addEventListener(
    "DOMContentLoaded",
    () => {
        Music.init();
    }
);
