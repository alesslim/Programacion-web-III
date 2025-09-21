//11. Proporcione un ejemplo concreto de encadenamiento de promesas. 
function calentarAgua() {
    return new Promise((resolve) => {
            console.log('agua caliente');
            resolve('agua caliente');
    });
}

function agregarCafe(agua){
    return new Promise((resolve) => {
            console.log('cafe agre  gado');
            resolve(agua + 'con cafe ');
    });
}

function servir(bebida) {
    return new Promise((resolve) => {
            console.log('bebida servida');
            resolve(bebida + 'lista');
    });
}

//Encadenamiento de Promesas
calentarAgua()
    .then(agua => agregarCafe(agua))
    .then(bebida => servir(bebida))
    .then(resultado => console.log(resultado))
    .catch(error => console.error(error));