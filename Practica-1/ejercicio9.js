//Crear una promesa que devuelva un mensaje de éxito después de 3 segundos. 
let promesa = new Promise((resolver)=>{
    setTimeout(()=> resolver('exito'),3000)
});

promesa.then((valor) => console.log(valor));