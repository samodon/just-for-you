/* ===============================
   TYPEWRITER ANIMATION
================================ */

const SPEED = 45;

function typeText(container) {
  const text = container.dataset.text;
  const output = container.querySelector(".typed");
  let i = 0;

  container.classList.add("cursor");

  function step() {
    if (i < text.length) {
      output.textContent += text[i];
      i++;
      setTimeout(step, SPEED);
    } else {
      container.classList.remove("cursor");


const buttons = container.querySelector(".buttons");
if (buttons) buttons.classList.add("visible");

    }
  }

  step();
}

/* ===============================
   TYPEWRITER OBSERVER
================================ */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.typed) {
      entry.target.dataset.typed = "true";
      entry.target.closest("section").classList.add("visible");
      typeText(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll(".typewriter").forEach(el => {
  observer.observe(el);
});

/* ===============================
   REVEAL-ONLY SECTIONS
   (for word stack, no typing)
================================ */

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.closest("section").classList.add("visible");
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll(".reveal").forEach(el => {
  revealObserver.observe(el);
});

/* ===============================
   WORD STACK ANIMATION
================================ */

const words = [
  "gorgeous",
  "beautiful",
  "sexy",
  "funny",
  "amazing",
  "adorable"
];

const stack = document.querySelector(".word-stack");
let wordIndex = 0;

function addWord() {
  if (!stack || wordIndex >= words.length) return;

  const el = document.createElement("div");
  el.className = "word";
  el.textContent = words[wordIndex];
  stack.appendChild(el);

  // force transition
  requestAnimationFrame(() => {
    el.classList.add("visible");
  });

  wordIndex++;
}

if (stack) {
  const wordObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        addWord();

        const interval = setInterval(() => {
          if (wordIndex >= words.length) {
            clearInterval(interval);
          } else {
            addWord();
          }
        }, 800);

        wordObserver.disconnect();
      }
    });
  }, { threshold: 0.6 });

  wordObserver.observe(stack);
}

/* ===============================
   AUDIO UNLOCK (iOS + Android)
================================ */

const audio = document.getElementById("bg-audio");
let audioStarted = false;

function unlockAudio() {
  if (audioStarted || !audio) return;
  audioStarted = true;

  audio.volume = 0.5;
  audio.play().catch(() => {
    // silently fail if blocked
  });
}

document.addEventListener("touchstart", unlockAudio, { once: true, passive: true });
document.addEventListener("mousedown", unlockAudio, { once: true });

/* ===============================
   YES BUTTON SEAL KISS
================================ */

const yesButton = document.querySelector(".buttons button");
const sealKiss = document.getElementById("sealKiss");

if (yesButton && sealKiss) {
  yesButton.addEventListener("click", () => {
    sealKiss.classList.add("visible");
  });
}
