<?php
$servername = "localhost";
$username = "root";
$password = ""; // Cambia según tu configuración
$dbname = "reservas"; // Asegúrate que el nombre coincida con tu base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $visitantes = $_POST['visitantes'];
    $idioma = $_POST['idioma'];
    $fecha = $_POST['fecha'];
    $bodegas = $_POST['bodegas'];

    $sql = "INSERT INTO reservas (nombre, email, telefono, visitantes, idioma, fecha, bodegas) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $nombre, $email, $telefono, $visitantes, $idioma, $fecha, $bodegas);

    if ($stmt->execute()) {
        echo "Reserva guardada exitosamente.";
    } else {
        echo "Error al guardar la reserva: " . $stmt->error;
    }

    $stmt->close();
}
$conn->close();
?>

