async function signupHandler(event) {
    event.preventDefault();
    
    const email = document.querySelector('').value.trim();
    const password = document.querySelector('').value.trim();

    if (email && password ) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            // take you to dashboard
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('').addEventListener('click', signupHandler);