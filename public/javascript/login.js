async function loginHandler(event) {
    event.preventDefault();
    
    const username = document.querySelector('').value.trim();
    const email = document.querySelector('').value.trim();
    const password = document.querySelector('').value.trim();

    if (email && password && username) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password,
                username
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            // take you to dashboard
            document.location.replace('/dashboard')
        }
    }
}

document.querySelector('').addEventListener('click', loginHandler);