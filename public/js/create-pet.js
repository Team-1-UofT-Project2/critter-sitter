// Function to handle the submission of a new pet form
async function newPetForm(event) {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const owner = document.querySelector("#owner").value.trim();
  const address = document.querySelector("#address").value.trim();
  const description = document.querySelector("#description").value.trim();
  const careLevel = document.querySelector(
    'input[name="care-level"]:checked'
  ).value;
  const image = document.querySelector("#image").files[0]; // Get the selected file

  if (name && description && careLevel && owner && address && image) {
    const formData = new FormData(); // Create a FormData object
    formData.append("pet_name", name);
    formData.append("owner", owner);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("care_level", careLevel);
    formData.append("image", image); // Append the image file

    const response = await fetch("/api/pets/new-pet", {
      method: "POST",
      body: formData, // Send the FormData object
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Please fill out the fields");
  }
}

// Add a submit event listener to the pet form
document.querySelector(".pet-form").addEventListener("submit", newPetForm);
