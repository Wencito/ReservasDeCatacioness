document.getElementById('age-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const dob = new Date(document.getElementById('dob').value);
    const today = new Date();
    
    let age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth() - dob.getMonth();
    const day = today.getDate() - dob.getDate();

    if (month < 0 || (month === 0 && day < 0)) {
        age--;
    }

    if (age >= 18) {
        window.location.href = 'index.html';
    } else {
        alert('Debes tener al menos 18 años para acceder a este sitio.');
    }
});
