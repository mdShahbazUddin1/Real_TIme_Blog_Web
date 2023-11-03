const passForm = document.getElementById("change-form");
const currPass = document.getElementById("curr");
const newPass = document.getElementById("new");
const BASEURL = `http://localhost:8080`;

// Regular expression to enforce password pattern
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

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

passForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const currentPassword = currPass.value;
  const newPassword = newPass.value;

  if (!currentPassword || !newPassword) {
    // Display an error message if either field is empty
    iziToast.error({
      title: "Error",
      message: "Both fields are required",
      position: "topCenter",
    });
  } else if (!passwordRegex.test(newPassword)) {
    // Check if the new password matches the pattern
    iziToast.error({
      title: "Error",
      message:
        "New password should contain at least one uppercase letter, one digit, and be at least 6 characters long",
      position: "topCenter",
    });
  } else {
    const userPass = {
      currentPass: currentPassword,
      newPass: newPassword,
    };
    changePassword(userPass);
  }
});

const changePassword = async (pass) => {
  try {
    const response = await fetch(`${BASEURL}/user/changepassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(pass),
    });

    if (response.ok) {
      iziToast.success({
        title: "Success",
        backgroundColor: "#4CAF50",
        message: "Hurray! Password changed",
        position: "topCenter",
      });

      confetti({
        particleCount: 500,
        spread: 400,
        origin: { y: 0.6 },
      });

    } else {
      iziToast.error({
        title: "Error",
        message: "Password is not correct",
        position: "topCenter",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
