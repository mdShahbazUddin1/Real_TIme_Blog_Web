const mainContainer = document.querySelector(".blog-main");
const mainProfile = document.getElementById("main-profile");

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query");

const BASEURL = `https://real-time-bm7c.onrender.com`;

async function display(data) {
  mainContainer.innerHTML = null;

  let blogSection = document.createElement("div");
  blogSection.setAttribute("class", "blog-section");
  let leftBlog = document.createElement("div");
  leftBlog.setAttribute("class", "left-blog-details");
  let ul = document.createElement("ul");
  let li = document.createElement("li");
  li.innerHTML = "Search Result";
  ul.append(li);
  leftBlog.append(ul);
  data.forEach((blog, index) => {
    let userBlog = document.createElement("div");
    userBlog.setAttribute("class", "user-blog-info");
    let userCard = document.createElement("div");
    userCard.setAttribute("class", "user-card");
    let userDetails = document.createElement("div");
    userDetails.setAttribute("class", "user-details");
    let userImg = document.createElement("div");
    userImg.setAttribute("class", "user-image");
    let Img = document.createElement("img");
    Img.src = blog.author.personal_info.profile_img;
    Img.alt = "user-pic";
    let userName = document.createElement("span");
    userName.innerText = blog.author.personal_info.username;
    let userDate = document.createElement("span");
    const publishedDate = new Date(blog.publishedAt);
    const options = { day: "numeric", month: "short" }; // Format options

    userDate.innerText = `@ ${publishedDate.toLocaleDateString(
      "en-US",
      options
    )}`;

    userDetails.addEventListener("click", () => {
      window.location.href = `profile.html?id=${blog.author._id}`;
    });

    let blogDetails = document.createElement("div");
    blogDetails.setAttribute("class", "blog-details");
    let blogTextDiv = document.createElement("div");
    blogTextDiv.setAttribute("class", "blog-text");
    let blogTextPara = document.createElement("p");
    let blogTextPara2 = document.createElement("p");
    blogTextPara.innerText = blog.title;
    blogTextPara2.innerText = blog.des;

    let blogDetailsImag = document.createElement("div");
    blogDetailsImag.setAttribute("class", "blog-image");
    let blogBanner = document.createElement("img");
    blogBanner.src = blog.banner;

    let catergory = document.createElement("div");
    catergory.setAttribute("class", "category-like");
    let catergoryDiv = document.createElement("div");
    let catergoryPara = document.createElement("p");
    catergoryPara.innerText = blog.tags[0];

    let catergoryHeart = document.createElement("div");
    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-solid", "fa-heart");

    // console.log(blog.author);
    if (blog.likedBlogs.includes(blog.author._id)) {
      heartIcon.style.color = "red";
    }

    heartIcon.addEventListener("click", async () => {
      if (!heartIcon.classList.contains("liked")) {
        try {
          const response = await fetch(`${BASEURL}/like/likeblog/${blog._id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          });

          if (response.ok) {
            heartIcon.classList.add("liked"); // Add the 'liked' class to change the color
            likeCount.textContent = parseInt(likeCount.textContent) + 1;

            // Call fetchBlog to refresh the blog data
            fetchBlog();
            loader.style.display = "none";
          } else if (response.status === 400) {
            console.log("Blog is already liked");
          } else {
            console.log("Failed to like the blog");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });

    // Append catergoryHeart and heartIcon to your document

    const likeCount = document.createElement("span");
    likeCount.classList.add("like");
    likeCount.textContent = blog.activity.total_likes;

    blogDetails.addEventListener("click", () => {
      window.location.href = `../pages/blog.html?id=${blog._id}`;
    });
    catergoryHeart.append(heartIcon, likeCount);
    catergoryDiv.append(catergoryPara);
    catergory.append(catergoryDiv, catergoryHeart);
    blogDetailsImag.append(blogBanner);
    blogTextDiv.append(blogTextPara, blogTextPara2);
    blogDetails.append(blogTextDiv, blogDetailsImag);
    userImg.append(Img);
    userDetails.append(userImg, userName, userDate);
    userCard.append(userDetails, catergory);
    userBlog.append(userCard);
    leftBlog.append(userBlog, blogDetails, catergory);
  });
  blogSection.append(leftBlog);
  mainContainer.append(blogSection);
}

const getSearchBlog = async () => {
  try {
    const response = await fetch(`${BASEURL}/blog/search?query=${query}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      const data = await response.json();
      display(data);
    }
  } catch (error) {
    console.log(error);
  }
};
getSearchBlog();
