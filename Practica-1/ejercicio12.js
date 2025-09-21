//12. Proporcione un ejemplo concreto donde el anidamiento de callbacks se puede reescribir mejor con async/await haciendo el código más limpio y mantenible.

// Tres operaciones simples anidadas
function paso1(callback) {
    setTimeout(() => {
        callback(10);
    }, 1000);
}

function paso2(numero, callback) {
    setTimeout(() => {
        callback(numero * 2);
    }, 500);
}

function paso3(numero, callback) {
    setTimeout(() => {
        callback(numero + 5);
    }, 300);
}

function ejecutarProceso() {
    paso1((resultado1) => {
        paso2(resultado1, (resultado2) => {
            paso3(resultado2, (resultadoFinal) => {
                console.log(resultadoFinal);
            });
        });
    });
}
ejecutarProceso();

// Convertimos a promesas
function paso1Promesa() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(10);
        }, 1000);
    });
}

function paso2Promesa(numero) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(numero * 2);
        }, 500);
    });
}

function paso3Promesa(numero) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(numero + 5);
        }, 300);
    });
}

// async / await
async function ejecutarProcesoAsync() {
    const resultado1 = await paso1Promesa();
    const resultado2 = await paso2Promesa(resultado1);
    const resultadoFinal = await paso3Promesa(resultado2);
    console.log(resultadoFinal);
}

ejecutarProcesoAsync();