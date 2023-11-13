
let BASEURL = `http://localhost:8080`;

async function getNotifications() {
  // console.log("getNotifications function called");
  try {
    const response = await fetch(`${BASEURL}/noti/getnotification`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      const notificationAlert = document.getElementById("notialert");
      const data = await response.json();

      if (data.filter((notification) => !notification.seen).length > 0) {
        notificationAlert.style.visibility = "visible";
      }
    } else {
      console.error("Failed to fetch notifications");
    }
  } catch (error) {
    console.error(error);
  }
}

// // Function to hide the notification when the user clicks on it
async function hideNotification() {
  const notificationAlert = document.getElementById("notialert");
  notificationAlert.style.visibility = "hidden";
}

const notificationSpan = document.querySelector(".notification");
notificationSpan.addEventListener("click", () => {
  hideNotification();
  markSeen();
});

async function markSeen() {
  try {
    const response = await fetch(`${BASEURL}/noti/markasseen`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.ok) {
      console.log("Notifications marked as seen");
    } else {
      console.log("No new notifications found");
    }
  } catch (error) {
    console.log(data);
  }
}

getNotifications();
setInterval(getNotifications, 10000);