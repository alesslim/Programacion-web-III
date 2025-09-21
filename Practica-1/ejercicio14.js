//14. Proporcione un ejemplo para convertir una promesa en un callback. 
function saludarPromesa(nombre) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`Hola ${nombre}`), 500);
    });
}

// convertir a callback
function saludarCallback(nombre, callback) {
    setTimeout(() => {
        callback(null, `Hola ${nombre}`);
    }, 500);
}

saludarCallback("Mundo", (error, mensaje) => {
    if (error) {
        console.error(error);
    } else {
        console.log(mensaje); 
    }
});