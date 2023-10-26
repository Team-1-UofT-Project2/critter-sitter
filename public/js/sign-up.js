// handler to sign up
const signupHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-sign-up").value.trim();
  const email = document.querySelector("#email-sign-up").value.trim();
  const password = document.querySelector("#password-sign-up").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // take you to dashboard
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupHandler);
