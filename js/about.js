// about.js — image hover interaction

const images = document.querySelectorAll(".about-image img");

images.forEach((img) => {
  img.addEventListener("mouseenter", () => {
    img.classList.add("image-glow");
  });

  img.addEventListener("mouseleave", () => {
    img.classList.remove("image-glow");
  });
});