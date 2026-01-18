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

let audioStarted = false;
const audio = document.getElementById("bg-audio");

function startAudio() {
  if (audioStarted) return;
  audioStarted = true;

  audio.volume = 0;
  audio.play().then(() => {
    // fade in gently
    let v = 0;
    const fade = setInterval(() => {
      v += 0.02;
      audio.volume = Math.min(v, 0.6);
      if (v >= 0.6) clearInterval(fade);
    }, 50);
  }).catch(() => {
    // autoplay blocked — ignore silently
  });
}

// first scroll OR touch triggers audio
window.addEventListener("scroll", startAudio, { once: true });
window.addEventListener("touchstart", startAudio, { once: true });
