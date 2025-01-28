// Variables
const mobile_media_query = window.matchMedia("(max-width: 400px)");
const tablet_media_query = window.matchMedia("(min-width: 400px) and (max-width: 600px)");
const notes = document.querySelectorAll(".js-note");

// Helper function to calculate note height
function getActiveNoteHeight(mediaType, index) {
  const heightValues = {
    mobile: 125 + 40 * index,
    tablet: 80 + 21 * index,
    desktop: 70 + 20 * index
  };
  return `${heightValues[mediaType]}%`;
}

// Function that resets all notes to default state
function resetNotes() {
  notes.forEach(note => {
    if (note.classList.contains("active")) {
      note.classList.remove("active");
      gsap.to(note, {
        height: "30%",
        duration: 0.3,
        clearProps: "all"
      });
    }
  });
}

// Unified note click handler
function handleNoteClick(note, index) {
  let mediaType = 'desktop';
  if (mobile_media_query.matches) mediaType = 'mobile';
  else if (tablet_media_query.matches) mediaType = 'tablet';

  if (note.classList.contains("active")) {
    note.classList.remove("active");
    gsap.to(note, {
      height: "30%",
      duration: 0.3,
      clearProps: "all"
    });
  } else {
    resetNotes();
    note.classList.add("active");
    gsap.to(note, {
      height: getActiveNoteHeight(mediaType, index),
      duration: 0.3,
      zIndex: 10
    });
  }
}

// Main initialization function
function notesReady() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5
  });

  notes.forEach((note, index) => {
    note.addEventListener("click", () => handleNoteClick(note, index));
  });
}

// Envelope animation functions
function setUpPaper() {
  const clipPathValues = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath: `polygon(${clipPathValues.join("% ")}%)`,
    onComplete: notesReady
  });
}

function envelopTransition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: setUpPaper
  });
  document.querySelector(".js-up-paper").removeEventListener("click", envelopTransition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

function stickerHandler() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", stickerHandler);
  document.querySelector(".js-up-paper").addEventListener("click", envelopTransition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

// Event Listeners
document.querySelector(".js-sticker").addEventListener("click", stickerHandler);
window.addEventListener("resize", resetNotes);