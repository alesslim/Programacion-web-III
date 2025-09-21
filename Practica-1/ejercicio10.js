//10. ¿Cuando es conveniente utilizar un callback, y cuando es necesario utilizar una promesa?
//callbacks en cosas simples como:
function saludar(nombre, callback) {
    console.log(`Hola ${nombre}`);
    callback();
}

saludar("Aless", () => {
    console.log("Fin...");
});
//promesas cuando hay posibilidades de fallar
function lanzarDado() {
    return new Promise((resolve, reject) => {
        const resultado = Math.floor(Math.random() * 6) + 1;
        
        if (resultado > 3) {
            resolve(`Ganaste con ${resultado}!`);
        } else {
            reject(`Perdiste con ${resultado}`);
        }
    });
}
lanzarDado().then(exito => console.log(exito)
).catch(error => console.log(error));