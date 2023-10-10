const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
// Número de solicitudes POST que deseas enviar
const numPeticiones = 10;
// URL a la que deseas enviar las solicitudes POST
const url = 'http://localhost:3001/paciente/crear';

// Función para formatear la fecha en "yyyy-MM-dd"
function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Bucle para enviar múltiples solicitudes POST
for (let i = 0; i < numPeticiones; i++) {
    const uniquedni = uuidv4();
    const fechaNacimiento = faker.date.between({from: "1950-01-01", to: "2000-12-31"});
    const fechaNacimientoFormateada = formatDateToYYYYMMDD(fechaNacimiento);
    // Generar datos aleatorios
    const data = {
        nombre: faker.person.firstName(),
        apellido: faker.person.lastName(),
        telefono: faker.phone.number(),
        fechaNac: fechaNacimientoFormateada,
        dni: uniquedni
    };

    // Enviar la solicitud POST con los datos aleatorios
    axios.post(url, data)
        .then(response => {
            console.log(`Respuesta de la solicitud ${i + 1}: ${response.status} - ${response.data}`);
        })
        .catch(error => {
            console.error(`Error en la solicitud ${i + 1}: ${error.message}`);
        });
}