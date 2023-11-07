const profileDiv = document.querySelector(".profile");
const userOptions = document.querySelector(".user-options");
const links = document.querySelectorAll(".links a");
const buttons = document.querySelectorAll(".create-blog button");
const publishBtn = document.getElementById("publis-btn");
const draftBtn = document.getElementById("drft-btn");
const saveAsDraftBtn = document.getElementById("sava-draft");
const publishBlog = document.querySelector(".blog-card");
const draftBlog = document.querySelector(".draf");
const rightUIs = document.querySelectorAll(
  "#blog-ui, #notiy, #writeblog, #blog-create, #edit, #change-pass"
);
const imageInput = document.getElementById("image-input");
const previewImage = document.getElementById("preview-image");
const savePublish = document.getElementById("save-pub");
const imageText = document.getElementById("img-txt");
const titleParagraph = document.getElementById("Title");
const storyParagraph = document.getElementById("storyP");
const youtubelink = document.getElementById("youtube");
const instalink = document.getElementById("instagram");
const twitterlink = document.getElementById("twitter");
const facebooklink = document.getElementById("facebook");
const githublink = document.getElementById("github");
const websitelink = document.getElementById("website");
const loader = document.getElementById("loader");
// -----------------------------------
const BASEURL = `http://localhost:8080`;
//------------------------------------

let data = null;

const fethcDisplay = async () => {
  loader.style.display = "block";
  try {
    const resposne = await fetch(`${BASEURL}/blog/authorblog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await resposne.json();
    loader.style.display = "none";
    displayBlog(data);
  } catch (error) {
    console.log(error);
  }
};

fethcDisplay();

const displayBlog = async (data) => {
  const blogContainer = document.querySelector(".blog-card");
  blogContainer.innerHTML = ""; // Clear the existing content

  data.forEach((blog, index) => {
    const mainProfileImage = document.getElementById("main-pic");

    // Check if the blog has a valid user's profile image URL
    if (
      blog.author &&
      blog.author.personal_info &&
      blog.author.personal_info.profile_img
    ) {
      // Update the src attribute of the main-profile image with the user's profile image URL
      mainProfileImage.src = blog.author.personal_info.profile_img;
    }
    const cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "blog-card-container");
    const leftCard = document.createElement("div");
    leftCard.setAttribute("class", "left-details");

    const leftBlogImg = document.createElement("div");
    leftBlogImg.setAttribute("class", "blog-img");

    const leftimg = document.createElement("img");
    leftimg.src = blog.banner;

    leftBlogImg.appendChild(leftimg);
    leftCard.appendChild(leftBlogImg);

    const blogCustom = document.createElement("div");
    blogCustom.setAttribute("class", "blog-custom");

    const textBlg = document.createElement("div");
    textBlg.setAttribute("class", "text-blg");

    const textHead = document.createElement("p");
    textHead.setAttribute("class", "text-head");
    textHead.textContent = blog.title; // Set your title here

    const blgSmall = document.createElement("p");
    blgSmall.setAttribute("class", "blg-small");
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    blgSmall.textContent = `Published on ${formattedDate}`;

    textBlg.appendChild(textHead);
    textBlg.appendChild(blgSmall);
    blogCustom.appendChild(textBlg);

    leftCard.appendChild(blogCustom);

    const optBtn = document.createElement("div");
    optBtn.setAttribute("class", "opt-btn");

    const editBtn = document.createElement("button");
    editBtn.setAttribute("id", "edit-btn");
    editBtn.textContent = "Edit";

    const dltBtn = document.createElement("button");
    dltBtn.setAttribute("id", "dlt-btn");
    dltBtn.textContent = "Delete";

    dltBtn.addEventListener("click", async () => {
      const response = await fetch(`${BASEURL}/blog/deleteblog/${blog._id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (response.ok) {
        fethcDisplay();
        loader.style.display = "none";
        console.log("blog deleted");
      } else {
        console.log("failed to delte");
      }
    });

    optBtn.appendChild(editBtn);
    optBtn.appendChild(dltBtn);

    blogCustom.appendChild(optBtn);

    const rightCard = document.createElement("div");
    rightCard.setAttribute("class", "right-details");

    // Likes
    const likesDiv = document.createElement("div");
    const likesCount = document.createElement("h5");
    likesCount.innerText = blog.activity.total_likes;
    const likesLabel = document.createElement("h5");
    likesLabel.innerText = "Likes";

    likesDiv.appendChild(likesCount);
    likesDiv.appendChild(likesLabel);

    // Comments
    const commentsDiv = document.createElement("div");
    const commentsCount = document.createElement("h5");
    commentsCount.innerText = blog.activity.total_comments;
    const commentsLabel = document.createElement("h5");
    commentsLabel.innerText = "Comments";
    commentsDiv.appendChild(commentsCount);
    commentsDiv.appendChild(commentsLabel);

    // Views
    const viewsDiv = document.createElement("div");
    const viewsCount = document.createElement("h5");
    viewsCount.innerText = blog.activity.total_reads;
    const viewsLabel = document.createElement("h5");
    viewsLabel.innerText = "Views";
    viewsDiv.appendChild(viewsCount);
    viewsDiv.appendChild(viewsLabel);

    rightCard.appendChild(likesDiv);
    rightCard.appendChild(commentsDiv);
    rightCard.appendChild(viewsDiv);

    cardContainer.append(leftCard, rightCard);
    blogContainer.append(cardContainer);
  });
};




const getAuthor = async () => {
  try {
    const response = await fetch(`${BASEURL}/blog/author`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    data = await response.json();
    userImg.src = data.personal_info.profile_img;
    userFullname.innerText = data.personal_info.fullname;
    bioText.innerText = data.personal_info.bio;
    userEmail.innerText = data.personal_info.email;
    userName.innerText = `${data.personal_info.username}`;
    // link text will be here
    youtubelink.innerText = data.social_links.youtube;
    instalink.innerText = data.social_links.instagram;
    facebooklink.innerText = data.social_links.facebook;
    twitterlink.innerText = data.social_links.twitter;
    githublink.innerText = data.social_links.github;
    websitelink.innerText = data.social_links.website;
    // console.log("author",data)
  } catch (error) {
    console.log(error);
  }
};
getAuthor();

async function appendNotificationToUI(notifications) {
  const notificationList = document.getElementById("notifications-list");
  notificationList.innerHTML = null;

  // Reverse the order of notifications so that the newest ones come on top
  notifications.reverse();

  // Get only the latest 10 notifications
  const latestNotifications = notifications.slice(0, 5);

  latestNotifications.forEach((notification) => {
    const notificationItem = document.createElement("li");
    notificationItem.setAttribute("class", "noti-li");

    const createdAt = new Date(notification.createdAt);

    // Format the timestamps as 'YYYY-MM-DD HH:MM:SS'
    const formattedCreatedAt = formatDate(createdAt);

    if (notification.type === "like") {
      const username = notification.user.personal_info.username;

      // Check if the 'blog' object exists in the notification
      if (notification.blog && notification.blog.title) {
        const blogTitle = notification.blog.title;
        notificationItem.textContent = `${username} liked your blog '${blogTitle}' at ${formattedCreatedAt}`;
      } else {
        // Handle the case where 'blog' or 'title' is missing
        notificationItem.textContent = `${username} liked your blog (Title not available) at ${formattedCreatedAt}`;
      }
    } else {
      notificationItem.textContent = `${notification.message} at ${formattedCreatedAt}`;
    }

    if (notification.seen === false) {
      notificationItem.style.listStyle = "outside";
    }

    notificationList.appendChild(notificationItem);
  });
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function getNotifi() {
  try {
    loader.style.display = "block"
    const response = await fetch(`${BASEURL}/noti/getnotification`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      appendNotificationToUI(data);
    } else {
      console.error("Failed to fetch notifications");
    }
  } catch (error) {
    console.error(error);
  }
}

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
  publishBlog.style.display = "block";
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
titleParagraph.addEventListener("click", function () {
  // Clear the text when the paragraph is clicked
  this.textContent = "";
  this.style.color = "black";
});

imageInput.addEventListener("change", (event) => {
  // Check if a file was selected
  if (event.target.files.length > 0) {
    const selectedFile = event.target.files[0];
    previewImage.style.display = "inline";
    imageText.style.display = "none";

    // Create a URL for the selected file and set it as the image source
    const imageUrl = URL.createObjectURL(selectedFile);
    previewImage.src = imageUrl;
    if (selectedFile instanceof Blob) {
      // If the selected file is a blob, convert it to a data URL
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImage.src = e.target.result;
        // Save the data URL in localStorage or wherever you need it
        const dataURL = e.target.result;
        localStorage.setItem("blogImage", dataURL);
      };

      reader.readAsDataURL(selectedFile);
    }
  } else {
    // If no file is selected, clear the image source
    previewImage.src = "";
    imageText.style.display = "block";
  }
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
    window.location.href = "../pages/publish.html";
  } else {
    // Handle the case when a default image is selected (you can alert or ignore it)
    alert("Please select an image before saving.");
  }
}

savePublish.addEventListener("click", saveToLocalStorage);

const bioText = document.getElementById("bio");
const charCount = document.querySelector(".updt-count");

const maxCharCount = 200; // Define your character limit here

// Function to update the character count
function updateCharCount(event) {
  const updatedText = event.target.textContent;
  const charRemaining = maxCharCount - updatedText.length;

  charCount.textContent = `${charRemaining} character${
    charRemaining !== 1 ? "s" : ""
  } left`;

  if (charRemaining < 0) {
    charCount.style.color = "red";
  } else {
    charCount.style.color = "initial";
  }
}

// Add an input event listener to the bioText element
bioText.addEventListener("input", updateCharCount);

const fileInput = document.getElementById("fileInput");
const userImg = document.querySelector(".user-img img");
// edit
const userFullname = document.getElementById("fullname")
const userEmail = document.getElementById("usergmail")
const userName = document.getElementById("username")

// Add an event listener to the file input
fileInput.addEventListener("change", function () {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile);
    userImg.src = imageUrl;
  }
});




const fecthSaveDraft = async () => {
  try {
    const response = await fetch(`${BASEURL}/blog/getdraft`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    displaySaveDraft(data);
  } catch (error) {
    console.log(error);
  }
};

fecthSaveDraft();

const displaySaveDraft = async (data) => {
  const draftContainer = document.querySelector(".draf");
  draftContainer.innerHTML = null;

  data.forEach((saveDraft, index) => {
    const draftCard = document.createElement("div");
    draftCard.setAttribute("class", "draftcard");
    const draftCardImgdiv = document.createElement("div");
    draftCardImgdiv.setAttribute("class", "draft-img");
    const draftCardImg = document.createElement("img");
    draftCardImg.src = saveDraft.banner;
    draftCardImg.alt = "image";

    const draftTitleDiv = document.createElement("div");
    draftTitleDiv.setAttribute("class", "draft-title");
    const draftBlog = document.createElement("div");
    draftBlog.setAttribute("class", "drft-blg");
    const draftBlogPara = document.createElement("p");
    draftBlogPara.setAttribute("class", "draft-head");
    draftBlogPara.innerText = saveDraft.title;
    const draftBlogPara2 = document.createElement("p");
    draftBlogPara2.setAttribute("class", "draft-small");
    const publishedAtDate = new Date(saveDraft.publishedAt); // Assuming that saveDraft.publishedAt is a valid date
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = publishedAtDate.toLocaleDateString("en-US", options);
    draftBlogPara2.innerText = `Saved in Draft ${formattedDate}`;

    const draftBlogPublis = document.createElement("div");
    draftBlogPublis.setAttribute("class", "drat-publis");
    const draftBlogPublisBtn = document.createElement("button");
    draftBlogPublisBtn.setAttribute("id", "drftpublishbtn");
    draftBlogPublisBtn.innerText = "Publish Draft";
    draftBlogPublisBtn.addEventListener("click", () => {
      const blogId = saveDraft._id;
      window.location.href = `publish.html?id=${blogId}`;
    });
    draftBlogPublis.append(draftBlogPublisBtn);
    draftBlog.append(draftBlogPara, draftBlogPara2, draftBlogPublis);
    draftTitleDiv.append(draftBlog);
    draftCardImgdiv.append(draftCardImg);
    draftCard.append(draftCardImgdiv, draftTitleDiv);
    draftContainer.append(draftCard);
  });
};

saveAsDraftBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const title = titleParagraph.innerText;
  const banner = previewImage.src;
  const description = storyParagraph.innerText;
  const image = imageInput.files[0];

  try {
    if (title === "" || description === "") {
      alert("Please fill in all fields before saving.");
      return; // Exit the function if any field is empty
    }

    // Check if the selected image is the default image
    const isDefaultImage = banner.includes("default-image.jpg");

    if (!isDefaultImage) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      formData.append("content", description);
      const response = await fetch(`${BASEURL}/blog/savedraft`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      const data = await response.json();
      fecthSaveDraft()
      alert("draft saved");
    } else {
      alert("Please select an image before saving.");
    }
  } catch (error) {
    console.log(error);
  }
});



const profileUpdateBtn = document.getElementById("update").addEventListener("click",(e)=>{
  e.preventDefault()
  updateProfile()
})

const updateProfile = async()=>{
  const username = userName.innerText

  const userImage = fileInput.files[0];
  const userProfileUpdate = new FormData()
  userProfileUpdate.append("username", username);
  userProfileUpdate.append("bio", bioText.innerText);
  userProfileUpdate.append("youtube", youtubelink.innerText);
  userProfileUpdate.append("instagram", instalink.innerText);
  userProfileUpdate.append("twitter", twitterlink.innerText);
  userProfileUpdate.append("facebook", facebooklink.innerText);
  userProfileUpdate.append("github", githublink.innerText);
  userProfileUpdate.append("website", websitelink.innerText);

  if (userImage) {
    userProfileUpdate.append("image", userImage);
  }
  try {
    const response = await fetch(`${BASEURL}/blog/editprofile`,{
      method:"PUT",
      headers:{
        Authorization:localStorage.getItem("token")
      },
      body:userProfileUpdate
    });

 if (response.ok) {
  fethcDisplay()
   console.log("Profile update")
 } else {
   console.log("something went wrong")
 }
  } catch (error) {
    console.log(error)
  }
}


getNotifi()
setInterval(getNotifi, 20000);







