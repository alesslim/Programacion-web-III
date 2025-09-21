//13. Proporcione un ejemplo concreto donde el anidamiento de promesas se puede reescribir mejor con async/await haciendo el código más limpio y mantenible.
function obtenerNumero() {
    return new Promise(resolve => {
        setTimeout(() => resolve(10), 1000);
    });
}

function duplicar(numero) {
    return new Promise(resolve => {
        setTimeout(() => resolve(numero * 2), 500);
    });
}

function sumarCinco(numero) {
    return new Promise(resolve => {
        setTimeout(() => resolve(numero + 5), 300);
    });
}

//Promesas anidadas
obtenerNumero()
    .then(resultado => {
        duplicar(resultado)
            .then(resultadoDuplicado => {
                sumarCinco(resultadoDuplicado)
                    .then(resultadoFinal => {
                        console.log("Resultado final:", resultadoFinal);
                    })
                    .catch(error => console.error("Error en suma:", error));
            })
            .catch(error => console.error("Error en duplicar:", error));
    })
    .catch(error => console.error("Error en obtener número:", error));
    // Las mismas funciones de promesas...
function obtenerNumero() {
    return new Promise(resolve => {
        setTimeout(() => resolve(10), 1000);
    });
}

function duplicar(numero) {
    return new Promise(resolve => {
        setTimeout(() => resolve(numero * 2), 500);
    });
}

function sumarCinco(numero) {
    return new Promise(resolve => {
        setTimeout(() => resolve(numero + 5), 300);
    });
}

// async/await
async function calcularResultado() {
    try {
        const numero = await obtenerNumero();
        const duplicado = await duplicar(numero);
        const resultadoFinal = await sumarCinco(duplicado);
        console.log("Resultado final:", resultadoFinal);
    } catch (error) {
        console.error("Error:", error);
    }
}

calcularResultado();