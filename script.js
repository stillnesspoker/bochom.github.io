// Variables
const mobile_media_query = window.matchMedia("(max-width: 400px)");
const tablet_media_query = window.matchMedia("(min-width: 400px) and (max-width: 600px)");
const notes = document.querySelectorAll(".js-note");

// Reset notes to default state
function resetNotes() {
  notes.forEach(note => {
    if (note.classList.contains("active")) {
      note.classList.remove("active");
      gsap.set(note, { height: "30%", clearProps: "all" });
    }
  });
}

// Handle note clicks
function handleNoteClick(note, index) {
  if (note.classList.contains("active")) {
    note.classList.remove("active");
    gsap.set(note, { height: "30%", clearProps: "all" });
  } else {
    resetNotes();
    note.classList.add("active");
    let height;
    if (mobile_media_query.matches) height = 125 + 40 * index + "%";
    else if (tablet_media_query.matches) height = 80 + 21 * index + "%";
    else height = 70 + 20 * index + "%";
    gsap.set(note, { height, zIndex: 10 });
  }
}

// Initialize notes
function notesReady() {
  gsap.to(".js-envelop-content", { height: "110%", duration: 0.5 });
  notes.forEach((note, index) => {
    note.addEventListener("click", () => handleNoteClick(note, index));
  });
}

// Set up envelope flap
function setUpPaper() {
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath: "polygon(0% 0%, 100% 0%, 50% 61%)",
    onComplete: notesReady
  });
}

// Animate envelope flap
function envelopTransition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: setUpPaper
  });
  document.querySelector(".js-up-paper").removeEventListener("click", envelopTransition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

// Handle sticker click
function sticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", sticker);
  document.querySelector(".js-up-paper").addEventListener("click", envelopTransition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

// Attach sticker click event
document.querySelector(".js-sticker").addEventListener("click", sticker);

// Reset notes on window resize
window.addEventListener("resize", resetNotes);