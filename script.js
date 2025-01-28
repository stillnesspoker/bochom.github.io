// Variables
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia(
  "(min-width: 400px) and (max-width: 600px)"
);
const notes = document.querySelectorAll(".js-note");

// Function to reset the size of notes
function recize_notes() {
  notes.forEach((note) => {
    note.classList.remove("active");
    gsap.set(note, {
      height: "30%",
      clearProps: "all",
    });
  });
}

// Function to enable all notes
function notes_ready() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5,
  });

  notes.forEach((note) => {
    note.addEventListener("click", function () {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        gsap.set(this, {
          height: "30%",
          clearProps: "all",
        });
      } else {
        recize_notes();
        this.classList.add("active");
        gsap.set(this, {
          height: this.scrollHeight + "px", // Dynamic height
        });
      }
    });
  });
}

// Function to set up the paper
function set_up_paper() {
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath: "polygon(0 0, 100% 0, 50% 61%)",
    onComplete: notes_ready,
  });
}

// Function to handle envelope transition
function envelop_transition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: set_up_paper,
  });
  document
    .querySelector(".js-up-paper")
    .removeEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

// Function for sticker interaction
function sticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", sticker);
  document
    .querySelector(".js-up-paper")
    .addEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

document.querySelector(".js-sticker").addEventListener("click", sticker);

window.onresize = function () {
  recize_notes();
};
