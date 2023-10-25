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

/*async function newPetForm(event) {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const owner = document.querySelector("#owner").value.trim(); // declared owner here
  const address = document.querySelector("#address").value.trim(); // declared address here
  const description = document.querySelector("#description").value.trim();
  const careLevel = document.querySelector(
    'input[name="care-level"]:checked'
  ).value;

  if (name && description && careLevel && owner && address) {
    // added owner and address to the check
    const response = await fetch("/api/pets/new-pet", {
      method: "POST",
      body: JSON.stringify({
        pet_name: name,
        owner, // used shorthand property
        address, // used shorthand property
        description,
        care_level: careLevel,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  } else {
    alert("Please fill out the fields");
  }
}*/

document.querySelector(".pet-form").addEventListener("submit", newPetForm);
