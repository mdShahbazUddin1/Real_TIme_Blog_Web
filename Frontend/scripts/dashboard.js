const profileDiv = document.querySelector(".profile");
const userOptions = document.querySelector(".user-options");
const links = document.querySelectorAll(".links a");
const buttons = document.querySelectorAll(".create-blog button");
const publishBtn = document.getElementById("publis-btn");
const draftBtn = document.getElementById("drft-btn");
const publishBlog = document.querySelector(".blog-card");
const draftBlog = document.querySelector(".draf");
const rightUIs = document.querySelectorAll("#blog-ui, #notiy, #writeblog, #blog-create");
const imageInput = document.getElementById("image-input");
const previewImage = document.getElementById("preview-image");
const savePublish = document.getElementById("save-pub");
const imageText = document.getElementById("img-txt");
const titleParagraph = document.querySelector(".blg-title p");
const storyParagraph = document.querySelector(".blg-story span");


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

imageInput.addEventListener("change", (event) => {
  // Check if a file was selected
  if (event.target.files.length > 0) {
    const selectedFile = event.target.files[0];
    previewImage.style.display = "inline"
    imageText.style.display = "none"

    // Create a URL for the selected file and set it as the image source
    const imageUrl = URL.createObjectURL(selectedFile);
    previewImage.src = imageUrl;
  } else {
    // If no file is selected, clear the image source
    previewImage.src = "";
    imageText.style.display = "block";
  }
});


 titleParagraph.addEventListener("click", function () {
   // Clear the text when the paragraph is clicked
   this.textContent = "";
   this.style.color = "black";
 });

function saveToLocalStorage() {
  const title = titleParagraph.textContent;
  const banner = previewImage.src;
  const description = storyParagraph.textContent;

  if (title === "" || description === "") {
    alert("Please fill in all fields before saving.");
    return; // Exit the function if any field is empty
  }

  // Check if the selected image is the default image
  const isDefaultImage = banner.includes("default-image.jpg");

  if (!isDefaultImage) {
    // Include the "banner" field only if a valid image is selected
    const dataToPublish = {
      title: title,
      banner: banner,
      description: description,
    };

    const dataString = JSON.stringify(dataToPublish);
    localStorage.setItem("blog", dataString);
    window.location.href="../pages/publish.html"
  } else {
    // Handle the case when a default image is selected (you can alert or ignore it)
    alert("Please select an image before saving.");
  }
}

 savePublish.addEventListener("click",saveToLocalStorage)

 

