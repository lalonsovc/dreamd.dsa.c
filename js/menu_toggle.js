const toggle=document.querySelector(".toggle");
const navVar=document.querySelector(".nav");

toggle.addEventListener("click", () => {
    navVar.classList.toggle("menu_visible");
});