document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-pet-button");
  if (addButton) {
    addButton.addEventListener("click", function () {
      // Redirect the user to new-pet.handlebars
      window.location.href = "/dashboard/new-pet";
    });
  }
});
