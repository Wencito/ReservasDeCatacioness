window.onload = function () {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(response => {
            if (response.status === 200) {
                mostrarMensajeBienvenida();
            } else {
                alert('Error al iniciar sesión');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('Error al iniciar sesión');
        });
    });
};

function mostrarMensajeBienvenida() {
    document.getElementById('welcome-message').style.display = 'block';
    setTimeout(function() {
        window.location.href = 'pagina_principal.html'; // Redirige a la página principal después de 2 segundos
    }, 2000);
}
