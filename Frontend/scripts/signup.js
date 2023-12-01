import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"; // Include Firebase auth from CDN
import { firebaseApp, googleAuthProvider } from "./firebase.js"; // Import your Firebase setup
const loginWithGoogle = document.getElementById("googleLogin");
const form = document.getElementById("login");
const nofiDiv = document.querySelector(".notification");
const profileDiv = document.querySelector(".profile");
const signinDiv = document.querySelector(".signin");
const signupDiv = document.querySelector(".signup");
const rightNavDiv = document.querySelector(".rightNav");
const BASEURL = `https://real-time-bm7c.onrender.com`;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  register();
});

// Configuration options for iziToast
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

const register = async () => {
  try {
    let user = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
    };

    if (user.fullname.length < 3) {
      iziToast.error({
        title: "Validation Error",
        message: "Fullname must be at least 3 characters.",
      });
    } else if (!validateEmail(user.email)) {
      iziToast.error({
        title: "Validation Error",
        message: "Email is invalid.",
      });
    } else if (!validatePassword(user.password)) {
      iziToast.error({
        title: "Validation Error",
        message: "Password must contain 8 letter , 1 number , 1 Uppercase",
      });
    } else {
      const response = await fetch(`${BASEURL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      iziToast.success({
        title: "Success",
        message: "You have successfully registered.",
        backgroundColor: "#4CAF50", // Green background for success
        timeout: 2000, // Display for 5 seconds (adjust as needed)
        titleColor: "white",
      });
      form.fullname.value = "";
      form.email.value = "";
      form.password.value = "";
      setTimeout(() => {
        window.location.href = "../pages/signin.html";
      }, 2000);
    }
  } catch (error) {
    iziToast.error({
      title: "Internal Error",
      message: error,
    });
  }
};
loginWithGoogle.addEventListener("click", async () => {
  try {
    const auth = getAuth(firebaseApp); // Initialize the auth service

    // Configure GoogleAuthProvider with the prompt option
    const googleAuthProvider = new GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({
      prompt: "select_account",
    });

    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;

    // You can now use the 'user' object, which contains information about the authenticated user
    // console.log("Google login successful. User:", user);
    const access_token = user.stsTokenManager.accessToken;
    const response = await fetch(`${BASEURL}/user/googleAuth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });
    const data = await response.json();

    // Handle the response from your API here
    if (response.status === 200) {
      (nofiDiv.style.display = "block"), (profileDiv.style.display = "block");
      signinDiv.style.display = "none";
      signupDiv.style.display = "none";
      rightNavDiv.style.width = "18%";
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("token", data.token);
      window.location.href = "../index.html";
      // console.log("Login with your API successful.");
    } else {
      console.error("API login error:", response.status);
    }
  } catch (error) {
    console.error("Google login error:", error);
  }
});

function validateEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // Use a regular expression to check the password format
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
}
