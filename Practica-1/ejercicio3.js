// ===================================================
// Caratula
// Nombre Completo: Limachi Colque Felipe Alessandro
// C.I.: 9120895
// Carrera: Informatica
// Materia: Programacion web 3
// Fecha: 20/09/2025
// ===================================================

//3. Crear una función que reciba un arreglo de números y devuelva en un objeto a los pares e impares: let obj = miFuncion([1,2,3,4,5]) console.log(obj) // { pares: [2,4], impares: [1,3,5]} 

let miFuncion = x =>{
    let objParesImpares = {
        pares:[],
        impares:[]
    };
    for(let i = 0; i<= x.length-1; i++){
        if(x[i] % 2 === 0){
            objParesImpares.pares.push(x[i]); 
        }else{
            objParesImpares.impares.push(x[i]);
        }
    }   
    return objParesImpares;
};

let obj = miFuncion([1,2,3,4,5]); 
console.log(obj);