const chnagePassBtn = document.getElementById("chnage-btn");
const popUp = document.querySelector(".pop-up");


chnagePassBtn.addEventListener("click",(e)=>{
    e.preventDefault() 
    popUp.style.display= "block"
     confetti({
       particleCount: 500, // Number of confetti particles
       spread: 400, // Spread of confetti
       origin: { y: 0.6 }, // Where the confetti originates (top of the button)
     });
     setTimeout(() => {
        popUp.style.display = "none";
     }, 2000);
})