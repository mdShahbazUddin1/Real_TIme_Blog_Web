
const BASEURL = `http://localhost:8080`

const title1 = document.getElementById("title1");
const blogTitle = document.getElementById("title2");

function updateTitles(event) {
  const updatedText = event.target.textContent;
  title1.textContent = updatedText;
  blogTitle.textContent = updatedText;
}

title1.addEventListener("input", updateTitles);
blogTitle.addEventListener("input", updateTitles);

const bioDescription = document.getElementById("bio");
const emptyP = document.getElementById("emptyP");

function updateBioDescription(event) {
  const updatedText = event.target.textContent;
  bioDescription.textContent = updatedText;
  emptyP.textContent = updatedText;
}

bioDescription.addEventListener("input", updateBioDescription);
emptyP.addEventListener("input", updateBioDescription);

const charCount = document.querySelector(".char");
const maxCharCount = 160;

bioDescription.addEventListener("input", updateCharCount);

function updateCharCount(event) {
  const updatedText = event.target.textContent;
  const charRemaining = maxCharCount - updatedText.length;
  charCount.textContent = `${charRemaining} character left`;

   if (charRemaining < 0) {
     charCount.style.color = "red";
     // Trim the text to the character limit
     updatedText = updatedText.slice(0, maxCharCount);
     charCount.textContent = "0 character left"; // Character limit exceeded
   } else {
     charCount.style.color = "initial";
     charCount.textContent = charRemaining + " character left";
   }

  bioDescription.textContent = updatedText;
  emptyP.textContent = updatedText;
}

const topicInput = document.querySelector(".topic p");
const topicAdds = document.querySelector(".topic-adds");
const tagsCount = document.querySelector(".tags");

let remainingTags = 7;

tagsCount.textContent = `${remainingTags} tags left`;
const tagsArray = []; // Array to store tags

topicInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();

    if (remainingTags > 0) {
      const tagText = this.textContent.trim(); // Remove leading/trailing spaces

      if (tagText.length > 0) {
        tagsArray.push(tagText); // Add the tag to the array

        const newTopic = document.createElement("span");
        newTopic.innerHTML = `${tagText} <i class="fa-solid fa-x"></i>`;
        topicAdds.appendChild(newTopic);
        this.textContent = "";

        const xIcons = topicAdds.querySelectorAll(".fa-x");
        xIcons.forEach((xIcon) => {
          xIcon.addEventListener("click", function () {
            this.parentNode.remove();
            remainingTags++;
            tagsCount.textContent = `${remainingTags} tags left`;
          });
        });

        remainingTags--;
        tagsCount.textContent = `${remainingTags} tags left`;
      }
    }
  }
});

// Load data from local storage
const LsData = JSON.parse(localStorage.getItem("blog"));
const lsBannerImage = localStorage.getItem("blogImage");

if (LsData) {
  // Update your page elements with LsData
  title1.textContent = LsData.title;
  blogTitle.textContent = LsData.title;

  const previewImage = document.getElementById("preview-image");
  previewImage.src = lsBannerImage;
}

document.getElementById("publisBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const publisBlogData = new FormData();
  publisBlogData.append("title", title1.innerText);
  publisBlogData.append("image", dataURItoBlob(lsBannerImage)); // Convert Data URL to Blob
  publisBlogData.append("des", bioDescription.innerText);
  publisBlogData.append("content", LsData.description);

  tagsArray.forEach((tag, index) => {
    publisBlogData.append(`tags[${index}]`, tag);
  });

  try {
    const response = await fetch(`${BASEURL}/blog/createblog`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: publisBlogData,
    });
    const data = await response.json();
    console.log("blog created", data);
  } catch (error) {
    console.log(error);
  }
});

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}


