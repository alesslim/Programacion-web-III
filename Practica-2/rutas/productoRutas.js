import express from 'express';
import { muestraCategorias, registrarCategoria, mostratCategoriaProductosId, actualizarDatosCategoria, eliminaCategoria, creaProducto, muestraProductos, obtProductoconId, actualizaProducto, actualizaStock } from '../controladores/productoControlador.js';
// rutas/productoRutas.js
const rutas = express.Router();
    // ejercicio 1
    rutas.post('/categorias', registrarCategoria);
    // ejercicio 2    
    rutas.get('/categorias', muestraCategorias);
    //ejercicio 3
    rutas.get('/categorias/:id', mostratCategoriaProductosId);
    //ejercicio 4
    rutas.put('/categorias/:id', actualizarDatosCategoria);
    //ejercicio 5
    rutas.delete('/categorias/:id', eliminaCategoria);
    //ejercicio 6
    rutas.post('/productos', creaProducto);
    //ejercicio 7
    rutas.get('/productos', muestraProductos);
    //ejercicio 8
    rutas.get('/productos/:id', obtProductoconId);
    //ejrcicio 9
    rutas.put('/productos/:id', actualizaProducto);
    //ejercicio 10
    rutas.patch('/productos/:id/stock', actualizaStock);
export default rutas;

