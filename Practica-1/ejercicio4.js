// ===================================================
// Caratula
// Nombre Completo: Limachi Colque Felipe Alessandro
// C.I.: 9120895
// Carrera: Informatica
// Materia: Programacion web 3
// Fecha: 20/09/2025
// ===================================================

//4. Crear una función que reciba un arreglo de números y devuelva el número mayor y el menor, en un objeto. let obj = miFuncion([3,1,5,4,2]) console.log(obj) // { mayor: 5, menor: 1 } 

let miFuncion = x =>{
    let objMayMen = {
        mayor: x[0],
        menor: x[0]
    };
    for(let i=1; i<=x.length-1; i++){
        if(x[i] > objMayMen.mayor){
            objMayMen.mayor = x[i];
        }
        if(x[i] < objMayMen.menor){
            objMayMen.menor = x[i];
        }        
    }
    return objMayMen;
};

let obj = miFuncion([3,1,5,4,2]);
console.log(obj);