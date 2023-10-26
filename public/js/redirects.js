//redirects
document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-pet-button");
  if (addButton) {
    addButton.addEventListener("click", function () {
      // Redirect the user to new-pet.handlebars
      window.location.href = "/dashboard/new-pet";
    });
  }
});

function goBack() {
  console.log("Button clicked");
  window.location.href = "/dashboard";
}

function redirectToEditPage() {
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  window.location.href = `/api/pets/edit-pet/${id}`;
}
