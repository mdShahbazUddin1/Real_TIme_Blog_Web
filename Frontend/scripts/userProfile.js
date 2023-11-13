let BASEURL = `http://localhost:8080`;
const mainProfile = document.getElementById("main-pic");
const userImage = document.querySelector(".main-image");
const userFullname = document.querySelector(".comment-username");

async function getUserById() {
  try {
    const response = await fetch(`${BASEURL}/blog/author`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      const data = await response.json();
      mainProfile.src = data.personal_info.profile_img;

      // Check if the current page is blog.html
      if (window.location.pathname.includes("/pages/blog.html")) {
        mainProfile.src = data.personal_info.profile_img;
        userImage.src = data.personal_info.profile_img;
        userFullname.textContent = `${data.personal_info.fullname}@${data.personal_info.username}`;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

getUserById();
