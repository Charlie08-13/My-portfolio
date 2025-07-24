// You can add animations or scroll effects here later

  const text = "ASHWINI KASHYAP";
  const typewriter = document.getElementById("typewriter");
  let index = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!isDeleting) {
      typewriter.textContent = text.slice(0, index++);
      if (index > text.length) {
        isDeleting = true;
        setTimeout(typeEffect, 900); // Pause before deleting
        return;
      }
    } else {
      typewriter.textContent = text.slice(0, index--);
      if (index < 0) {
        isDeleting = false;
      }
    }
    setTimeout(typeEffect, isDeleting ? 100 : 200);
  }

  typeEffect();

