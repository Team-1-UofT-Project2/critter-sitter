// handler to logout
const logoutButton = document.querySelector("#logout");

if (logoutButton) {
  const logout = async () => {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  };

  logoutButton.addEventListener("click", logout);
}
