const loginForm = document.querySelector(".login-form");
const email = document.getElementById("email1");
const password = document.getElementById("password1");
const BASEURL = `http://localhost:8080`;

iziToast.settings({
  position: "topCenter", // Display notifications at the top center
  timeout: 5000, // Set the timeout (e.g., 5000ms = 5 seconds)
  close: false, // Do not display the close button
  displayMode: 2, // Set the display mode to replace previous toasts
  backgroundColor: "#E57373", // Set your desired background color
  theme: "dark", // You can use 'light' or 'dark' theme
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginUser();
});

const loginUser = async () => {
  try {
    let obj = {
      email: email.value,
      password: password.value,
    };
    if (!validateEmail(obj.email)) {
      iziToast.error({
        title: "Validation Error",
        message: "Email is invalid.",
      });
    } else {
      const response = await fetch(`${BASEURL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      if (response.status === 403) {
        iziToast.error({
          title: "Login Error",
          message: "Wrong Credential",
        });
      } else {
        const data = await response.json();
        iziToast.success({
          title: "Success",
          message: "You have successfully registered.",
          backgroundColor: "#4CAF50", // Green background for success
          timeout: 2000, // Display for 5 seconds (adjust as needed)
          titleColor: "white",
        });
        setTimeout(() => {
          window.location.href = "/dashboard.html";
        }, 2000);
        
      }
    }
  } catch (error) {
    iziToast.error({
      title: "Internal Error",
      message: error,
    });
  }
};

function validateEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}
