//15. Proporcione un ejemplo para convertir un callback en una promesa. 
function saludarCallback(nombre, callback) {
    setTimeout(() => {
        callback(`Hola ${nombre}`);
    }, 1000);
}

function saludarPromesa(nombre) {
    return new Promise((resolve) => {
        saludarCallback(nombre, (mensaje) => {
            resolve(mensaje);
        });
    });
}

saludarPromesa("Mundo")
    .then(mensaje => console.log(mensaje))
    .catch(error => console.error(error));
    