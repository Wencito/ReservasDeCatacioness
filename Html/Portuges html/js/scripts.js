let currentIndex = 0;

function moveSlide(n) {
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    
    currentIndex += n;
    
    if (currentIndex >= totalItems) {
        currentIndex = 0;
    }
    if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    }
    
    const newTransformValue = -currentIndex * 100;
    document.querySelector('.carousel-inner').style.transform = `translateX(${newTransformValue}%)`;
}

// Set the minimum date in the date input field
document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById('fecha');
    const today = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', today);
});

const form = document.getElementById('reserva-form');
const reservasTbody = document.getElementById('reservas-tbody');
let reservas = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = form.nombre.value;
    const telefono = form.telefono.value;
    const visitantes = form.visitantes.value;
    const idioma = form.idioma.value;
    const fecha = form.fecha.value;

    // Crear un objeto de reserva con los datos del formulario
    const nuevaReserva = {
        id: Date.now(),
        nombre: nombre,
        telefono: telefono,
        visitantes: visitantes,
        idioma: idioma,
        fecha: fecha
    };

    // Agregar la reserva al array de reservas
    reservas.push(nuevaReserva);

    // Actualizar la tabla de reservas
    actualizarTablaReservas();

    // Limpiar el formulario
    form.reset();
});

function actualizarTablaReservas() {
    reservasTbody.innerHTML = '';

    reservas.forEach(reserva => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${reserva.nombre}</td>
            <td>${reserva.telefono}</td>
            <td>${reserva.visitantes}</td>
            <td>${reserva.idioma}</td>
            <td>${reserva.fecha}</td>
            <td>
                <button onclick="editarReserva(${reserva.id})">Editar</button>
                <button onclick="eliminarReserva(${reserva.id})">Eliminar</button>
            </td>
        `;

        reservasTbody.appendChild(row);
    });
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
