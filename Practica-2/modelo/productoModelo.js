import {db} from '../config/db.js';
// ejercicio 1
// Crea un endpoint POST /categorias que permita registrar una nueva categoría
// enviando nombre y descripcion en el body de la petición.
export const creaCategoria = async (nombre, descripcion) => {
    const [resultado] = await db.query('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
     const [categoriaCreada] = await db.query(
        'SELECT * FROM categorias WHERE id = ?',
        [resultado.insertId]
    );
    
    return categoriaCreada[0];
};
// ejercicio 2
// modelo/productoModelo.js
export const obtCategorias = async () => {
    const [resultado] = await db.query('SELECT id, nombre, descripcion, fecha_act FROM categorias');
    return resultado;
};
// ejercicio 3
// Crea un endpoint GET /categorias/:id que devuelva la categoría con el ID
// especificado y además, incluya todos los productos que pertenecen a esa
// categoría.
export const obtCategoriasIdProductos = async (id) => {
    const [datos] = await db.query('SELECT c.id, c.nombre, c.fecha_act, p.id as producto_id, p.nombre as producto_nombre FROM categorias c LEFT JOIN productos p ON c.id = p.categoria_id WHERE c.id = ?', [id]);
    return datos;
};

//ejercicio 4
// Crea un endpoint PUT /categorias/:id que permita actualizar todos los datos 
// de la categoría con el ID especificado. 
export const actualizarCategoria = async (id, nombre, descripcion) => {
    const [resultado] = await db.query('UPDATE categorias SET nombre = ?, descripcion = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?', [nombre, descripcion, id]);
return resultado;
};
//ejercicio 5
// Crea un endpoint DELETE /categorias/:id que elimine la categoría indicada
// y, al mismo tiempo, elimine automáticamente todos los productos que
// pertenecen a esa categoría.
export const eliminarCategoria = async (id) => {
    const [resultado] = await db.query( 'DELETE FROM categorias WHERE id = ?',[id]);
    return {
        eliminado: resultado.affectedRows > 0,
        fecha_eliminacion: new Date().toISOString()
    };
};
//ejercicio 6
// Crea un endpoint POST /productos que permita registrar un nuevo producto
// enviando nombre, precio, stock y categoria_id para asociarlo a una
// categoría existente.
export const crearProducto = async (nombre, precio, stock, categoria_id) => {
    const [resultado] = await db.query(
        'INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)',
        [nombre, precio, stock, categoria_id]
    );
    const [productoCreado] = await db.query(
        'SELECT * FROM productos WHERE id = ?',
        [resultado.insertId]
    );
    return productoCreado[0]; 
};
//ejercicio 7
// Crea un endpoint GET /productos que devuelva todos los productos y muestre
// el nombre de la categoría a la que pertenece cada uno.
export const obtProductosConCategoria = async () => {
    const [datos] = await db.query(
        `SELECT p.*, c.nombre as categoria_nombre 
         FROM productos p 
         INNER JOIN categorias c ON p.categoria_id = c.id`
    );
    return datos;
};

// ejercicio 8
// Crea un endpoint GET /productos/:id que devuelva la información de un
// producto por su ID, incluyendo el nombre de la categoría asociada.
export const obtProductoId = async (id) => {
    const [datos] = await db.query(
        `SELECT p.*, c.nombre as categoria_nombre 
         FROM productos p 
         INNER JOIN categorias c ON p.categoria_id = c.id 
         WHERE p.id = ?`,
        [id]
    );
    return datos[0];
};

// ejercicio 9
// Crea un endpoint PUT /productos/:id que permita actualizar todos los datos
// de un producto, incluyendo la opción de cambiar la categoría a la que
// pertenece mediante categoria_id.
export const actualizarProducto = async (id, nombre, precio, stock, categoria_id) => {
    const [resultado] = await db.query(
        'UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?',
        [nombre, precio, stock, categoria_id, id]
    );
    return resultado;
};
// ejercicio 10
// Crea un endpoint PATCH /productos/:id/stock que permita incrementar o
// decrementar el stock de un producto enviando al body la cantidad que se
// desea sumar o restar.
export const actualizarStock = async (id, cantidad) => {
    const [resultado] = await db.query(
        'UPDATE productos SET stock = stock + ?, fecha_act = CURRENT_TIMESTAMP WHERE id = ?',
        [cantidad, id]
    );
    return resultado;
};

