
const BASEURL = `http://localhost:8080`
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
      window.location.href = "../index.html";
    }
  } catch (error) {
    console.log(error);
  }
};
const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", () => {
  logout();
});
