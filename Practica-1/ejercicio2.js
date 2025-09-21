// ===================================================
// Caratula
// Nombre Completo: Limachi Colque Felipe Alessandro
// C.I.: 9120895
// Carrera: Informatica
// Materia: Programacion web 3
// Fecha: 20/09/2025
// ===================================================

//2. Crear una función que invierta el orden de las palabras en una frase. let cad = miFuncion(“abcd”) console.log(cad) // dcba  

let invertir = x => {
    let palabraInvertida = '';
    for(let i = x.length-1; i>=0; i--){
        palabraInvertida = palabraInvertida + x[i];
    }
    return palabraInvertida;
};
let cad = invertir('abcd');
console.log(cad);

