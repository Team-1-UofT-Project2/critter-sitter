// handler to edit pets
document.querySelector(".pet-save-btn").addEventListener("click", async () => {
  const petId = document.querySelector(".pet-save-btn").dataset.petid;
  const name = document.querySelector("#name").value;
  const owner = document.querySelector("#owner").value;
  const address = document.querySelector("#address").value;
  const description = document.querySelector("#description").value;
  const careLevel = document.querySelector(
    'input[name="care-level"]:checked'
  ).value;

  // Inside your event listener for the "Save Changes" button
  try {
    const response = await fetch(`/api/pets/edit/${petId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pet_name: name,
        owner,
        address,
        description,
        care_level: careLevel,
      }),
    });
    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Error:", error);
  }
});
