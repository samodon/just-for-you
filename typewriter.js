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
      if (buttons) buttons.style.display = "flex";
    }
  }

  step();
}

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


const audio = document.getElementById("bg-audio");
let audioStarted = false;

function unlockAudio() {
  if (audioStarted) return;
  audioStarted = true;

  audio.volume = 0.5; // set immediately
  audio.play().catch(() => {
    // iOS will silently block if gesture is invalid
  });
}

// MUST be direct
document.addEventListener("touchstart", unlockAudio, { once: true, passive: true });
document.addEventListener("mousedown", unlockAudio, { once: true });

