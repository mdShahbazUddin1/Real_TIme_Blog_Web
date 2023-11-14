
const BASEURL = `https://real-time-bm7c.onrender.com`;
const logout = async () => {
  try {
    const response = await fetch(`${BASEURL}/user/logout`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      localStorage.clear()
      window.location.href = "./pages/signin.html";
    }
  } catch (error) {
    console.log(error);
  }
};
const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", () => {
  logout();
});
