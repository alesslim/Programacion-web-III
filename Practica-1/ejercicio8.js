//8. Realizar un código para ejecutar una función callback después 2 segundos.
let saludo = (y) =>{
    console.log(`hola ${y}`);
}

let saludo2 = (x,callback) =>{
    callback(x);
}

setTimeout(() => {
    saludo2('juan',saludo)
},2000);
