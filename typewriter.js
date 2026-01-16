const SPEED = 45;

function typeText(el) {
  const text = el.dataset.text;
  let i = 0;

  el.textContent = "";
  el.classList.add("cursor");

  function step() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(step, SPEED);
    } else {
      el.classList.remove("cursor");

      const buttons = el.querySelector(".buttons");
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
