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
