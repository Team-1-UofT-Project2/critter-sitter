async function editPet(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const name = document.querySelector('#name').value.trim();
  const owner = document.querySelector('#owner').value.trim();
  const address = document.querySelector('#address').value.trim();
  const description = document.querySelector('#description').value.trim();
  // const careLevel = document.querySelector('input[name="care-level"]:checked').value;

  const response = await fetch(`/api/pets/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      pet_name: name,
      owner,
      address,
      description,
      // care_level: careLevel,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to edit pet');
  }
}

document.querySelector('.pet-save-btn').addEventListener('click', editPet);
