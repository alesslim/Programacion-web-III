import { obtCategorias, creaCategoria, obtCategoriasIdProductos, actualizarCategoria, eliminarCategoria, crearProducto, obtProductosConCategoria, obtProductoId, actualizarProducto, actualizarStock } from "../modelo/productoModelo.js";

// ejercicio 1
// Crea un endpoint POST /categorias que permita registrar una nueva categoría
// enviando nombre y descripcion en el body de la petición.
export const registrarCategoria = async (req, res) => {
    try{
        const {nombre, descripcion} = req.body;
        const categoriaCreada = await creaCategoria(nombre, descripcion);
        res.status(201).json({
            success: true,
            message: 'Categoría creada exitosamente',
            data: {
                id: categoriaCreada.id,
                nombre: categoriaCreada.nombre,
                descripcion: categoriaCreada.descripcion,
                fecha_alta: categoriaCreada.fecha_alta, 
                fecha_act: categoriaCreada.fecha_act     
            }
        });
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
// ejercicio 2
// Crea un endpoint GET /categorias que devuelva todas las categorías
// registradas en la base de datos.
export const muestraCategorias = async (req,res) => {
    try{
        const resultado = await obtCategorias();
        res.json(resultado)
    }catch(error){
        res.status(500).json({error: error.message});
    }
};
// ejercicio 3
// Crea un endpoint GET /categorias/:id que devuelva la categoría con el ID
// especificado y además, incluya todos los productos que pertenecen a esa
// categoría.
export const mostratCategoriaProductosId = async (req, res) =>{
    try{
        const {id} = req.params;
        const datos = await obtCategoriasIdProductos(id);
        res.json(datos);       
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
//ejercicio 4
// Crea un endpoint PUT /categorias/:id que permita actualizar todos los datos
// de la categoría con el ID especificado.
export const actualizarDatosCategoria = async (req, res) => {
    try{
        const {id} = req.params;
        const {nombre, descripcion} = req.body;
        const resultado = await actualizarCategoria(id, nombre, descripcion);
        res.status(201).json(resultado);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
//ejercicio 5
// Crea un endpoint DELETE /categorias/:id que elimine la categoría indicada
// y, al mismo tiempo, elimine automáticamente todos los productos que
// pertenecen a esa categoría.
export const eliminaCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await eliminarCategoria(id);
        if (!resultado.eliminado) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }
        res.json({
            success: true,
            message: 'Categoría eliminada exitosamente',
            fecha_eliminacion: resultado.fecha_eliminacion
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar categoría',
            error: error.message
        });
    };
};
//ejercicio 6
// Crea un endpoint POST /productos que permita registrar un nuevo producto
// enviando nombre, precio, stock y categoria_id para asociarlo a una
// categoría existente.
export const creaProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, categoria_id } = req.body;        
        if (!nombre || !precio || !stock || !categoria_id) {
            return res.status(400).json({ 
                success: false,
                message: 'Todos los campos son requeridos: nombre, precio, stock, categoria_id' 
            });
        }
        const productoCreado = await crearProducto(nombre, precio, stock, categoria_id);
        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente',
            data: {
                id: productoCreado.id,
                nombre: productoCreado.nombre,
                precio: productoCreado.precio,
                stock: productoCreado.stock,
                categoria_id: productoCreado.categoria_id,
                fecha_alta: productoCreado.fecha_alta,
                fecha_act: productoCreado.fecha_act
            }
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
//ejercicio 7
// Crea un endpoint GET /productos que devuelva todos los productos y muestre
// el nombre de la categoría a la que pertenece cada uno.
export const muestraProductos = async (req, res) => {
    try {
        const productos = await obtProductosConCategoria();
        res.json({
            success: true,
            data: productos,
            message: 'Productos obtenidos exitosamente'
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
// ejercicio 8
// Crea un endpoint GET /productos/:id que devuelva la información de un
// producto por su ID, incluyendo el nombre de la categoría asociada.
export const obtProductoconId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await obtProductoId(id);
        
        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: producto,
            message: 'Producto obtenido exitosamente'
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
// Ejercicio 9.
// Crea un endpoint PUT /productos/:id que permita actualizar todos los datos
// de un producto, incluyendo la opción de cambiar la categoría a la que
// pertenece mediante categoria_id. 
export const actualizaProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock, categoria_id } = req.body;
        
        const resultado = await actualizarProducto(id, nombre, precio, stock, categoria_id);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
    
        res.json({
            success: true,
            message: 'Producto actualizado exitosamente',
            affectedRows: resultado.affectedRows
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// ejercicio 10
// Crea un endpoint PATCH /productos/:id/stock que permita incrementar o
// decrementar el stock de un producto enviando al body la cantidad que se
// desea sumar o restar.
export const actualizaStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        const resultado = await actualizarStock(id, cantidad);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
    
        res.json(resultado);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}