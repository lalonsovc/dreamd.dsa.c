//Importar todas las librerías necesarias
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const articulosRouter = require("./routes/articulos");

//Determinamos el puerto del EndPoint
const PORT = process.env.PORT || 10802;

//Obtenemos la librería controlador del Archivo
const FileSync = require("lowdb/adapters/FileSync");

//Creamos el archivo db.json
const adapter = new FileSync("db.json");
const db = low(adapter);

//Inicializamos la BD
db.defaults({ articulos: [] }).write();

const options = {
    definition: {
        openapi :"3.0.0",
        info : {
            title: "Librerías APIs - DREAMD",
            version: "1.0.0",
            description: "Demo de Librerías de Ventas API",
        },
        serves: [
            {
                url: "http://localhost:" + PORT,
            },
        ],
    },
    apis: ["./routes/*.js"],
};
const app= express(); // creamos el aplicativo

const specs = swaggerJsDoc(options); //Agregar el formato swagger

app.db = db; //Definimos el BD
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs)); //Se habilita el EndPoint 
//Definimos las variables necesarias
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/articulos", articulosRouter)

//Mostramos el log de ejecución del servidor
app.listen(PORT, () => console.log(`El servidor está corriendo en el puerto ${PORT}`));