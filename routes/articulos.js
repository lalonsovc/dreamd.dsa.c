const express =require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

/** 
 * @swagger
 * components:
 *   schemas:
 *     Articulos:
 *       type: object
 *       required:
 *         - nombre
 *         - precio
 *         - marca
 *         - stock 
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado para el articulo
 *         nombre:
 *           type: string
 *           description: El nombre del articulo
 *         precio:
 *           type: decimal
 *           description: El precio del articulo
 *         marca:
 *           type: string
 *           description: La marca del articulo
 *         stock:
 *           type: decimal
 *           description: El stock existente del articulo
 *       example:
 *           id: cf4qaB9I
 *           nombre: Lavadora
 *           precio: cf4qaB9I
 *           marca: LG
 *           stock: 15
 */ 

/** 
 * @swagger
 * tags:
 *   name: Articulos
 *   description: API Lista de Articulos
 */

/** 
 * @swagger
 * /articulos:
 *   get:
 *     summary: Devuelve la lista de articulos
 *     tags: [Articulos]
 *     responses:
 *       200:
 *         description: Lista de las Ventas
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               Items:
 *                 $ref: '#/components/schemas/Articulos'
*/
//obtener la lista de articulos
router.get("/", (req, res) =>{
    const articulos = req.app.db.get("articulos");

    res.send(articulos);
});

//obtener un articulo desde la ID
router.get("/:id", (req, res) => {
    const articulo = req.app.db.get("articulos").find({ id: req.params.id }).value();

    if(!articulo){
        res.sendStatus(404)
    }

        req.send(articulo);
});

//crear un nuevo articulo
router.post("/", (req, res) =>{
    try{
        const articulo = {
            id: nanoid(idLength),
            ...req.body,
        };

    req.app.db.get("articulos").push(articulo).write();

    res.send(articulo)
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Actualiza un articulo
router.put("/:id", (req, res) => {
    try{
        req.app.db 
            .get("articulos")
            .find({ id: req.params.id})
            .assign(req.body)
            .write();

        res.send(req.app.db.get("articulos").find({ id: req.params.id}));
    } catch (error) {
        return res.status(500).send(error);
    }
});

//Elimina un articulo con su ID
router.delete("/:id", (req, res) => {
    req.app.db
    .get("articulos")
    .remove({ id: req.params.id})
    .write();

    res.sendStatus(200);
});

module.exports = router;



