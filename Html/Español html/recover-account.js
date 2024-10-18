// Función para redirigir a login.html
function goBack() {
    window.location.href = 'login.html';
}

// Función para mostrar el mensaje de éxito
function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (userInput) {
        document.getElementById('successMessage').style.display = 'block';
    } else {
        alert('Por favor, ingrese su correo electrónico o número de celular.');
    }
}
