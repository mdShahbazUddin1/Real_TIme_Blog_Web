const BASEURL = `https://real-time-bm7c.onrender.com`;

const title1 = document.getElementById("title1");
const blogTitle = document.getElementById("title2");
const previewImage = document.getElementById("preview-image");
const bioDescription = document.getElementById("bio");
const emptyP = document.getElementById("emptyP");
const topicInput = document.querySelector(".topic p");
const topicAdds = document.querySelector(".topic-adds");
const tagsCount = document.querySelector(".tags");
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("id");

iziToast.settings({
  position: "topCenter", // Display notifications at the top center
  timeout: 5000, // Set the timeout (e.g., 5000ms = 5 seconds)
  close: false, // Do not display the close button
  displayMode: 2, // Set the display mode to replace previous toasts
  backgroundColor: "#F44336", // Set your desired background color
  theme: "light", // You can use 'light' or 'dark' theme
  titleColor: "white", // Set the title text color to red
  messageColor: "white", // Set the message text color to red
  iconColor: "white",
});

function updateTitles(event) {
  const updatedText = event.target.textContent;
  title1.textContent = updatedText;
  blogTitle.textContent = updatedText;
}

title1.addEventListener("input", updateTitles);
blogTitle.addEventListener("input", updateTitles);

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

  previewImage.src = lsBannerImage;
}

let draftData = null;

document.getElementById("publisBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const publisBlogData = new FormData(); // Create a new FormData object

  if (!blogId) {
    // Creating a new blog
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
      iziToast.success({
        title: "Success!",
        message: "Blog published successfully 👍",
        position: "topCenter",
        timeout: 5000,
        backgroundColor: "#4CAF50", // Green background color
        titleColor: "white", // White text color for title
        messageColor: "white", // White text color for message
        onClosed: function () {
          // Redirect to the dashboard only after the toast is closed
          window.location.href = "../pages/dashboard.html";
        },
      });
      localStorage.removeItem("blog");
      localStorage.removeItem("blogImage");
    } catch (error) {
      console.log(error);
      iziToast.error({
        title: "Error",
        message: "Failed to publish blog",
        position: "topCenter",
        timeout: 5000,
        backgroundColor: "#FF0000", // Red background color for error
        titleColor: "white", // White text color for title
        messageColor: "white", // White text color for message
      });
    }
  } else {
    if (draftData) {
      const updateData = {
        title: draftData.title,
        banner: draftData.banner, // Assuming it's already a data URL
        des: bioDescription.textContent,
        content: draftData.content,
        tags: tagsArray, // tagsArray is already an array of strings
      };

      try {
        const response = await fetch(
          `${BASEURL}/blog/update/${draftData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify(updateData), // Convert to JSON
          }
        );

        iziToast.success({
          title: "Success!",
          message: "Blog published successfully 👍",
          position: "topCenter",
          timeout: 5000,
          backgroundColor: "#4CAF50", // Green background color
          titleColor: "white", // White text color for title
          messageColor: "white", // White text color for message
          onClosed: function () {
            // Redirect to the dashboard only after the toast is closed
            window.location.href = "../pages/dashboard.html";
          },
        });
        localStorage.removeItem("blog");
        localStorage.removeItem("blogImage");
      } catch (error) {
        console.log(error);
        iziToast.error({
          title: "Error",
          message: "Failed to publish blog",
          position: "topCenter",
          timeout: 5000,
          backgroundColor: "#FF0000", // Red background color for error
          titleColor: "white", // White text color for title
          messageColor: "white", // White text color for message
        });
      }
    }
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

const getDataFrmSaveDraft = async () => {
  if (blogId) {
    try {
      const response = await fetch(`${BASEURL}/blog/draft/${blogId}`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      draftData = await response.json();
      title1.innerText = draftData.title;
      blogTitle.innerText = draftData.title;
      previewImage.src = draftData.banner;
    } catch (error) {
      console.log(error);
    }
  }
};
getDataFrmSaveDraft();
