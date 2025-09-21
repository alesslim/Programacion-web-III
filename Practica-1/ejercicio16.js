//16. Proporcione un ejemplo para migrar una función con promesas a async/await.
function esperar() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Listo!"), 1000);
    });
}

esperar().then(mensaje => console.log(mensaje));

async function esperar() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Listo!"), 1000);
    });
}

async function funcion() {
    const mensaje = await esperar();
    console.log(mensaje);
}

funcion();S