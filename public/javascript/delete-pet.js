async function deletePetForm (event) {

    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length -1];
    
      //route is placeholder
    const repsonse = await fetch(`/api/pets/${id}`, {
      method: 'DELETE'
    });
      if(repsonse.ok) {
        document.location.replace('/profile')
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('').addEventListener('click', deletePetForm);