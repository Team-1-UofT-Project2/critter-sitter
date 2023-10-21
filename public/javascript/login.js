async function loginHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-sign-in").value.trim();
  const password = document.querySelector("#password-sign-in").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // take you to dashboard
      document.location.replace("/dashboard");
    } else {
      const errorData = await response.json();
      alert(errorData.message);
    }
  }
}

document.querySelector(".login-btn").addEventListener("click", loginHandler);
