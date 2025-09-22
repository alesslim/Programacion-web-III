// ===================================================
// Caratula
// Nombre Completo: Limachi Colque Felipe Alessandro
// Carrera: Informatica
// Materia: Programacion web 3
// Fecha: 20/09/2025
// ===================================================

//5. Crear una función que determine si una cadena es palíndromo (se lee igual al derecho y al revés). let band = miFuncion(“oruro”) console.log(band) // true let band = miFuncion(“hola”) console.log(band) // false 

let miFuncion = x =>{
    cad = x.toLowerCase();
    inicio = 0;
    fin = x.length-1;
    while(inicio<fin){
        if(cad[inicio] != cad[fin]){
            return false;
        }
        inicio++;
        fin--;
    }
    return true;
};

let band = miFuncion('Oruro');
console.log(band);
let band1 = miFuncion('Hola');

console.log(band1);
