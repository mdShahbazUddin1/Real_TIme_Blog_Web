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

topicInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();

    if (remainingTags > 0) {
      const newTopic = document.createElement("span");
      newTopic.innerHTML = `${this.textContent} <i class="fa-solid fa-x"></i>`;
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
});

// Load data from local storage
const LsData = JSON.parse(localStorage.getItem("blog"));
if (LsData) {
  // Update your page elements with LsData
  title1.textContent = LsData.title;
  blogTitle.textContent = LsData.title;
//   bioDescription.textContent = LsData.description;
//   emptyP.textContent = LsData.description;

  // Display the image
  const previewImage = document.getElementById("preview-image");
  previewImage.src = LsData.banner;
}
