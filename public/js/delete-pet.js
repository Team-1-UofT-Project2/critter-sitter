// Function to handle the deletion of a pet
async function deletePetForm(event) {
  console.log("Delete button clicked");
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/pets/${id}`, {
    method: "DELETE",
  });
  console.log(response);

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete pet");
  }
}

// Add a click event listener to the "pet-cancel-btn" element
document
  .querySelector(".pet-cancel-btn")
  .addEventListener("click", deletePetForm);
