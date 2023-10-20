async function newPetForm (event) {
    event.preventDefault();

    const name = document.querySelector('').value;
    const description = document.querySelector('').value;
    const  careLevel = document.querySelector('').value;

    if( name &&  description &&  careLevel ) {
        const response = await fetch('/api/pets', {
            method: 'POST',
            body: json.stringify({
                name,
                description,
                careLevel
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        });


        if (response.ok) {
            //path can either point you back to profile/ dashboard
            document.location.replace('');
        } else {
            alert(response.statusText)
        }
    } else {
        alert('please fill out the fields')
    }
}

document.querySelector('').addEventListener('submit', newPetForm)