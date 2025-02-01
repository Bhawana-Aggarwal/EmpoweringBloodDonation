console.log(document.querySelector(".animation-LR"));
document.addEventListener("DOMContentLoaded", function () {
    gsap.to(".animation-LR", {
        duration: 2,
        delay: 1,
        x: 1000,
        rotation: 360,
    });
});
