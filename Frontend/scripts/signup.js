// This is your modified JavaScript code using iziToast


const form = document.getElementById("login");
const BASEURL = `http://localhost:8080`;

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
  backgroundColor: "#E57373", // Set your desired background color
  theme: "dark", // You can use 'light' or 'dark' theme
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
        message: "Password must contain 1 uppercase letter and 1 number.",
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
        timeout: 5000, // Display for 5 seconds (adjust as needed)
        titleColor: "white",
      });
      form.fullname.value = "";
      form.email.value = "";
      form.password.value = "";
    }
  } catch (error) {
     iziToast.error({
        title: "Internal Error",
        message: error,
      })
  }
};

function validateEmail(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // Use a regular expression to check the password format
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
}


