import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
app.use(express.json());

const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'practica2'
});

//ejercicio 1 
// Crea un endpoint POST /categorias que permita registrar una nueva categoría
// enviando nombre y descripcion en el body de la petición.
app.post('/categorias', async (req, res) => {
    try{
        const q = 'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)';
        const {nombre, descripcion} = req.body;
        const [resultado] = await db.query(q, [nombre, descripcion]);
        res.status(201).json({
            mensaje: 'categoria creada',
            id: resultado.insertId
        });
    }catch(error){
        res.status(500).json({ error: error.menssage })
    }
});
//ejercicio 2 
// Crea un endpoint GET /categorias que devuelva todas las categorías
// registradas en la base de datos.
app.get('/categorias', async (req, res) => {
    try{0
        const q = 'SELECT * FROM categorias';
        const [datos] = await db.query(q);
        res.json(datos);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});
//ejercicio 3
// Crea un endpoint GET /categorias/:id que devuelva la categoría con el ID
// especificado y además, incluya todos los productos que pertenecen a esa
// categoría.
app.get('/categorias/:id', async (req, res) => {
    try{
        const {id}  = req.params;
        const q = 'SELECT c.id, c.nombre, p.id as producto_id, p.nombre as producto_nombre FROM categorias c LEFT JOIN productos p ON c.id = p.categoria_id WHERE c.id = ?';
        const [datos] = await db.query(q, [id]);
        if(datos.length === 0 ){
            return res.status(404).json({error: 'categoria no encontrada'});
        }
        res.json(datos);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});
// Ejercicio 4
// Crea un endpoint PUT /categorias/:id que permita actualizar todos los datos
// de la categoría con el ID especificado.
app.put('/categorias/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const {nombre, descripcion} = req.body;
        const q = 'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?'
        const [ resultado ] = await db.query(q, [ nombre, descripcion, id]);
        res.json(resultado);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

//ejercicio 5
// Crea un endpoint DELETE /categorias/:id que elimine la categoría indicada
// y, al mismo tiempo, elimine automáticamente todos los productos que
// pertenecen a esa categoría.
app.delete('/categorias/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const q = 'DELETE FROM categorias WHERE id = ?';
        const[ resultado ] = await db.query(q, [id]);
        res.json(resultado);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});

//ejercicio 6 
// Crea un endpoint POST /productos que permita registrar un nuevo producto
// enviando nombre, precio, stock y categoria_id para asociarlo a una
// categoría existente.
app.post('/productos', async (req, res) => {
    try{
        const {nombre, precio, stock, categoria_id} = req.body;
        const [categoria] = await db.query('SELECT id FROM categorias WHERE id = ? ', [categoria_id]
        );
         if (categoria.length === 0) {
            return res.status(400).json({error: "La categoría no existe" });
        }
        const q = 'INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?,?,?,?)';
        //const {nombre, precio, stock, categoria_id} = req.body;
        const [resultado] = await db.query(q, [nombre,precio,stock,categoria_id]);
        res.json(resultado);
        
    }catch(error){
        res.status(500).json({error: error.message});
    }
});
//ejercicio7
// Crea un endpoint GET /productos que devuelva todos los productos y muestre
// el nombre de la categoría a la que pertenece cada uno.
app.get('/productos', async (req, res)=>{
    try{
        const q = 'SELECT c.id, c.nombre, p.nombre as producto_nombre, p.precio, p.stock, p.categoria_id, c.nombre as categoria_nombre FROM productos p JOIN categorias c ON p.categoria_id = c.id';
        const [resultado] = await db.query(q)
        res.json(resultado);
    }catch(error){
        res.status(500).json({error:error.message});
    }
});
// ejercicio8 
// Crea un endpoint GET /productos/:id que devuelva la información de un
// producto por su ID, incluyendo el nombre de la categoría asociada.
app.get('/productos/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const q = 'SELECT p.id, p.nombre as producto_nombre, p.precio,p.stock, p.categoria_id, c.nombre as categoria_nombre FROM productos p JOIN categorias c ON p.categoria_id = c.id WHERE p.id = ?';
        const [resultado]= await db.query(q, [id]);
        res.json(resultado);
    }catch(error){
        res.status(500).json({error: error.message});
    }
});
//ejercicio 9
// Crea un endpoint PUT /productos/:id que permita actualizar todos los datos
// de un producto, incluyendo la opción de cambiar la categoría a la que
// pertenece mediante categoria_id.
app.put('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock, categoria_id } = req.body;
        
        if (categoria_id) {
            const [categoria] = await db.query('SELECT id FROM categorias WHERE id = ?',[categoria_id]);
            
            if (categoria.length === 0) {
                return res.status(400).json({ error: "La categoría no existe" });
            }
        }
        
        const q = 'UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ? WHERE id = ?';
        
        const [resultado] = await db.query(q, [nombre, precio, stock, categoria_id, id]);
        
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        
        res.json(resultado);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Ejercicio10
// Crea un endpoint PATCH /productos/:id/stock que permita incrementar o
// decrementar el stock de un producto enviando al body la cantidad que se
// desea sumar o restar.
app.patch('/productos/:id/stock', async (req, res) => {
    try{
        const { id } = req.params;
        const { cantidad } = req.body;
        const q = 'UPDATE productos SET stock = stock + ? WHERE id = ?';
        const [resultado] = await db.query(q, [cantidad, id]);
        res.json(resultado)
    }catch(error){
        res.status(500).json({ error : error.message});
    }
        
});
const puerto = 3001;
app.listen(puerto, () => { 
    console.log(`Servidor en http://localhost:${puerto}`);
});