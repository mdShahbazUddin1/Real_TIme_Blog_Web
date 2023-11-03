let BASEURL = `http://localhost:8080`;

const mainContainer = document.querySelector(".blog-main");
const mainProfile = document.getElementById("main-profile")
document.addEventListener("DOMContentLoaded", function () {
  // Get the signin and signup buttons
  const nofiDiv = document.querySelector(".notification");
  const profileDiv = document.querySelector(".profile");
  const signinDiv = document.querySelector(".signin");
  const signupDiv = document.querySelector(".signup");
  const rightNavDiv = document.querySelector(".rightNav");

  // Check if the user is logged in
  const loggedIn = localStorage.getItem("loggedIn");

  // Check if the loggedIn variable is "true"
  if (loggedIn === "true") {
    // User is logged in, hide signin and signup buttons
    signinDiv.style.display = "none";
    signupDiv.style.display = "none";
    nofiDiv.style.display = "block";
    profileDiv.style.display = "block";
    rightNavDiv.style.width = "18%";
  } else {
    // User is not logged in, show signin and signup buttons
    signinDiv.style.display = "inline";
    signupDiv.style.display = "inline";
    nofiDiv.style.display = "none";
    profileDiv.style.display = "none";
    rightNavDiv.style.width = "23%";
  }
});

function display(data) {
  mainContainer.innerHTML = null;

  let blogSection = document.createElement("div");
  blogSection.setAttribute("class", "blog-section");
  let leftBlog = document.createElement("div");
  leftBlog.setAttribute("class", "left-blog-details");
  let ul = document.createElement("ul");
  let li = document.createElement("li");
  li.innerHTML = "Home";
let loadMore = document.createElement("div");
loadMore.setAttribute("class","load-more")
let loadMorebtn = document.createElement("button");
loadMorebtn.innerText = "Load More"
  ul.append(li);
  loadMore.append(loadMorebtn)
  leftBlog.append(ul);

  let rightblog = document.createElement("div");
  rightblog.setAttribute("class", "right-blog-details");
  let rightfilter = document.createElement("div");
  rightfilter.setAttribute("class", "post-filter");
  let rightfilterText = document.createElement("h2");
  rightfilterText.innerText = `Stories From All Interest`;
  let rightfilterOptions = document.createElement("div");
  rightfilterOptions.setAttribute("class", "filter-options");
  let filter = [
    "Programming",
    "Hollywood",
    "Travel",
    "Food",
    "Film Making",
    "Cooking",
    "Social Media",
    "Technology",
    "Social Media",
    "Finance",
  ];
  filter.forEach((item) => {
    const button = document.createElement("button");
    button.textContent = item;
    rightfilterOptions.appendChild(button);
      
 button.addEventListener("click", () => {
   if (button.classList.contains("selected")) {
     // If already selected, deselect it and set li text to "Home"
     button.classList.remove("selected");
     li.innerHTML = "Home";
   } else {
     // Deselect any other selected button
     document
       .querySelectorAll(".filter-options button.selected")
       .forEach((btn) => {
         btn.classList.remove("selected");
       });

     // Select the button and update li text
     button.classList.add("selected");
     li.innerHTML = item;
   }
 });

  });

  const trendingDiv = document.createElement("div");
  trendingDiv.setAttribute("class", "trending");
  const trendingDivIcon = document.createElement("div");
  const trendingDivText = document.createElement("span");
  trendingDivText.innerText = `Trending`;
  const trendingIcon = document.createElement("i");
  trendingIcon.setAttribute("class", "fa-solid fa-arrow-trend-up");

  trendingDivIcon.append(trendingDivText, trendingIcon);
  trendingDiv.append(trendingDivIcon);
  rightfilter.append(rightfilterText, rightfilterOptions);
  rightblog.append(rightfilter, trendingDiv);

  data.forEach((blog, index) => {
    
     const mainProfileImage = document.getElementById("main-profile");

     // Check if the blog has a valid user's profile image URL
     if (
       blog.author &&
       blog.author.personal_info &&
       blog.author.personal_info.profile_img
     ) {
       // Update the src attribute of the main-profile image with the user's profile image URL
       mainProfileImage.src = blog.author.personal_info.profile_img;
     }
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
    heartIcon.classList.add("fa-regular", "fa-heart");
    const likeCount = document.createElement("span");
    likeCount.classList.add("like");
    likeCount.textContent = blog.activity.total_likes;

    blogDetails.addEventListener("click", () => {
      window.location.href = `blog.html?id=${blog._id}`;
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
    leftBlog.append(userBlog, blogDetails, catergory,loadMore);
  });

  // Sort the data array by likes in descending order
  data.sort((a, b) => b.activity.total_likes - a.activity.total_likes);

  // Create the top 5 HTML structures for the most liked blogs
  for (let i = 0; i < 5; i++) {
    const blogLike = data[i];

    const topTrending = document.createElement("div");
    topTrending.setAttribute("class", "top-trending");

    const topLeader = document.createElement("div");
    topLeader.setAttribute("class", "top-leaderboard");

    const topCount = document.createElement("h1");
    topCount.innerText = `0${i + 1}`; // To add leading zeros (e.g., "01", "02")

    const trendingBlog = document.createElement("div");
    trendingBlog.setAttribute("class", "trending-blog");

    const trendingBlogDet = document.createElement("div");
    trendingBlogDet.setAttribute("class", "trend-blog-details");

    const topUserImg = document.createElement("div");
    topUserImg.setAttribute("class", "top-user-image");

    const UserImg = document.createElement("img");
    UserImg.src = blogLike.author.personal_info.profile_img;

    const topUsername = document.createElement("span");
    topUsername.innerText = blogLike.author.personal_info.username;

    const topPublishDate = document.createElement("span");
    const ToppublishedDate = new Date(blogLike.publishedAt);
    const Topoptions = { day: "numeric", month: "short" };
    topPublishDate.innerText = `@ ${ToppublishedDate.toLocaleDateString(
      "en-US",
      Topoptions
    )}`;

    const topBlogTitle = document.createElement("div");
    topBlogTitle.setAttribute("class", "trend-blog-text");

    const topBlogText = document.createElement("p");
    topBlogText.innerText = blogLike.title;

    topTrending.append(topLeader, trendingBlog);
    topLeader.append(topCount);
    topUserImg.append(UserImg)
    trendingBlogDet.append(topUserImg, topUsername, topPublishDate);
    trendingBlog.append(trendingBlogDet, topBlogTitle);
    topBlogTitle.append(topBlogText);
    rightblog.append(topTrending);
  }

  blogSection.append(leftBlog, rightblog);
  mainContainer.append(blogSection);
  // fetchBlog()
}

// Fetch and display the blog dataURL
const loader = document.querySelector(".loader")
const fetchBlog = async () => {
  loader.style.display = "block"
  try {
    const response = await fetch(`${BASEURL}/blog/getallblog`);
    const data = await response.json();
    display(data);
    loader.style.display = "none";
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
fetchBlog();
