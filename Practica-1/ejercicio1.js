// ===================================================
// Caratula
// Nombre Completo: Limachi Colque Felipe Alessandro
// Carrera: Informatica
// Materia: Programacion web 3
// Fecha: 20/09/2025
// ===================================================


//1. Crear una función que cuente cuántas veces aparece cada vocal en un texto y devuelva el resultado en un objeto. let obj = miFuncion(“euforia”) console.log(obj) // { a: 1, e: 1, i: 1, o: 1, u: 1 } 


let miFuncion = x =>{
    let obj = {
    a: 0,
    e: 0,
    i: 0,
    o: 0,
    u: 0
    };  
    for(let i = 0; i <= x.length-1; i++){
        if(x[i] === 'a'){
            obj.a++;
        }else if(x[i] === 'e'){
           obj.e++;
        }else if(x[i] === 'i'){
            obj.i++;
        }else if(x[i] === 'o'){
            obj.o++;
        }else if(x[i] === 'u'){
            obj.u++;
        }
    }   
    return obj;
};

let obj = miFuncion("euforia");

console.log(obj);
