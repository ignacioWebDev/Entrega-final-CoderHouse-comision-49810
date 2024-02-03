//API de DolarAPI
// fetch("https://dolarapi.com/v1/dolares")
//     .then(response => response.json())
//     .then(data => console.log(data));

// Conecto con la web de DolarAPI
const ROUTEDOLAR = "https://dolarapi.com/v1/dolares";

// Conecto con mi contenedor
const DOLARCONTAINER = document.getElementById('dolar-container');

fetch(ROUTEDOLAR)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        showDolar(data);
    })
    .catch(error => console.error('Error al obtener el tipo de cambio:', error));

//EURO
fetch("https://dolarapi.com/v1/cotizaciones/eur")
    .then(response => response.json())
    .then(data => {
        const euroContainer = document.getElementById('euro-container');
        euroContainer.innerHTML = `Nombre: ${data.nombre} - Compra: $${data.compra} - Venta: $${data.venta} - Fecha de Actualizacion: ${data.fechaActualizacion}`;
        euroContainer.classList.add("other-container");
        console.log(data);
    })
    .catch(error => {
        console.error('Error al obtener el tipo de cambio del euro:', error);
    });

//REAL BR
fetch("https://dolarapi.com/v1/cotizaciones/brl")
    .then(response => response.json())
    .then(data => {
        const realContainer = document.getElementById('real-container');
        realContainer.innerHTML = `Nombre: ${data.nombre} - Compra: $${data.compra} - Venta: $${data.venta} - Fecha de Actualizacion: ${data.fechaActualizacion}`;
        realContainer.classList.add("other-container");
        console.log(data);
    })
    .catch(error => {
        console.error('Error al obtener el tipo de cambio del real brasileño:', error);
    });

//CHILENOS
fetch("https://dolarapi.com/v1/cotizaciones/clp")
    .then(response => response.json())
    .then(data => {
        const chilenoContainer = document.getElementById('chileno-container');
        chilenoContainer.innerHTML = `Nombre: ${data.nombre} - Compra: $${data.compra} - Venta: $${data.venta} - Fecha de Actualizacion: ${data.fechaActualizacion}`;
        chilenoContainer.classList.add("other-container");
        console.log(data);
    })
    .catch(error => {
        console.error('Error al obtener el tipo de cambio del real brasileño:', error);
    });

//URUGUAYOS
fetch("https://dolarapi.com/v1/cotizaciones/uyu")
    .then(response => response.json())
    .then(data => {
        const uruguayoContainer = document.getElementById('uruguayo-container');
        uruguayoContainer.innerHTML = `Nombre: ${data.nombre} - Compra: $${data.compra} - Venta: $${data.venta} - Fecha de Actualizacion: ${data.fechaActualizacion}`;
        uruguayoContainer.classList.add("other-container");
        console.log(data);
    })
    .catch(error => {
        console.error('Error al obtener el tipo de cambio del real brasileño:', error);
    });



function showDolar(data) {
    data.forEach(dolar => {
        const DOLAR = document.createElement('p');
        DOLAR.classList.add('dolar-container');
        DOLAR.textContent = `Nombre: ${dolar.nombre} - Compra: $${dolar.compra} - Venta: $${dolar.venta} - Fecha de Actualizacion: ${dolar.fechaActualizacion}`;
        DOLARCONTAINER.appendChild(DOLAR);
    });
}

