async function editPet (event) {

    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length -1];
  
    const name = document.querySelector('').value;
    const description = document.querySelector('').value;
    const careLevel = document.querySelector('').value;

   // const image = document.querySelector('').value;
    
   //route needs to be fixed
    const repsonse = await fetch(`/api/pets/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        description,
        careLevel,
        //image
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
      if(repsonse.ok) {
        document.location.replace('/profile')
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('').addEventListener('click', editPet);