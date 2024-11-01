document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById('fecha');
    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'
    fechaInput.setAttribute('min', today); // Establece la fecha mínima en el campo de fecha

    actualizarTablaReservas(); // Cargar y mostrar las reservas al cargar la página
});

const form = document.getElementById('reserva-form');
const reservasTbody = document.getElementById('reservas-tbody');
let reservas = [];

// Enviar datos del formulario al servidor con AJAX
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    // Enviar datos al archivo reservar.php
    fetch('/reservar.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Mensaje de éxito o error de PHP
        actualizarTablaReservas(); // Actualizar la tabla después de enviar los datos
        form.reset(); // Limpiar el formulario
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Función para obtener y actualizar la tabla de reservas
function actualizarTablaReservas() {
    fetch('/obtener_reservas.php')
    .then(response => response.json())
    .then(reservas => {
        reservasTbody.innerHTML = '';
        reservas.forEach(reserva => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${reserva.nombre}</td>
                <td>${reserva.email}</td>
                <td>${reserva.telefono}</td>
                <td>${reserva.visitantes}</td>
                <td>${reserva.idioma}</td>
                <td>${reserva.fecha}</td>
                <td>${reserva.bodegas}</td>
                <td>
                    <button onclick="editarReserva(${reserva.id})">Editar</button>
                    <button onclick="eliminarReserva(${reserva.id})">Eliminar</button>
                </td>
            `;
            reservasTbody.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));
}

function editarReserva(id) {
    const reserva = reservas.find(r => r.id === id);

    // Llenar el formulario con los datos de la reserva seleccionada
    form.nombre.value = reserva.nombre;
    form.telefono.value = reserva.telefono;
    form.visitantes.value = reserva.visitantes;
    form.idioma.value = reserva.idioma;
    form.fecha.value = reserva.fecha;

    // Eliminar la reserva para actualizarla después
    eliminarReserva(id);
}

function eliminarReserva(id) {
    reservas = reservas.filter(r => r.id !== id);
    actualizarTablaReservas();
}
