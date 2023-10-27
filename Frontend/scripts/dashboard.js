const profileDiv = document.querySelector(".profile");
const userOptions = document.querySelector(".user-options");
const links = document.querySelectorAll(".links a");
const buttons = document.querySelectorAll(".create-blog button");
const publishBtn = document.getElementById("publis-btn");
const draftBtn = document.getElementById("drft-btn");
const publishBlog = document.querySelector(".blog-card");
const draftBlog = document.querySelector(".draf");
const rightUIs = document.querySelectorAll("#blog-ui, #notiy, #writeblog");

profileDiv.addEventListener("click", () => {
  userOptions.classList.toggle("active");
  userOptions.style.display = "block";
});


links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    links.forEach((link) => {
      link.classList.remove("selected");
    });

    link.classList.add("selected");

    rightUIs.forEach((ui) => {
      ui.style.display = "none";
    });

    rightUIs[Array.from(links).indexOf(link)].style.display = "block";
  });
});

buttons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();

    buttons.forEach((btn) => {
      btn.classList.remove("selected");
    });

    btn.classList.add("selected");
  });
});

publishBtn.addEventListener("click", () => {
  draftBlog.style.display = "none";
  publishBlog.style.display = "flex";
});

draftBtn.addEventListener("click", () => {
  draftBlog.style.display = "block";
  publishBlog.style.display = "none";
});


document.addEventListener("DOMContentLoaded", () => {
  const defaultSelectedLink = document.querySelector(".blog-link a");
  defaultSelectedLink.classList.add("selected");

  const index = Array.from(links).indexOf(defaultSelectedLink);
  rightUIs[index].style.display = "block";
});