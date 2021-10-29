const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const Database = require('./src/models/database');
const apiRoutes = require('./src/routes');
const MongoClient = require('mongodb').MongoClient;
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const users = require('./src/routes/users');
const {
    log
} = require("./middlewares/logs");


if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}

const port = process.env.PORT;

let database;

app.use(express.static(path.join(__dirname, 'public')));

const swaggerOptions ={
    swaggerDefinition: {
        info: {
            title: 'Práctica 3', 
            version: '1.0.0',
            description: 'Documentación de API', 
            server: ['http://localhost:'+ port],
            contact:{
                name:'Carlos Romo',
                email: 'is721056@iteso.mx'
            }
        },
        basePath: "/",
        components: {
            securitySchemes: {
                bearerAuth: {
                type: "apiKey",
                in: "header",
                bearerFormat: "JWT",
                name: 'x-auth'
                }
            }
        },
        openapi: "3.0.0",
        },
    apis: ['app.js', 'src/routes/index.js',  'src/routes/users.js', 'src/routes/rooms.js', 'src/routes/messages.js'],
    };


app.use(log);
app.use(express.json());
app.use(router);
app.use('/api', apiRoutes);

/**
 * @swagger
 * /:
 *   get:
 *     description: api landing endpoint
 *     responses:
 *       200:
 *         description: sucess response
 *       400:
 *         description: error response  
 */
app.get('/',(req, res)=>{
    res.send('Api works!');
});

const swaggerDocs= swaggerJsDoc(swaggerOptions);
app.use('/swagger-ui',swaggerUI.serve, swaggerUI.setup(swaggerDocs));


//Connect Mongo
MongoClient.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true
}, function (err, client) {
    if (err) {
        console.log('Failed to connect');
    } else {
        console.log('Se conectó a la base de datos');
    
        database = client.db();
        Database.setDatabase(database);

        app.listen(port, () => {
            console.log('App is listening in port ' + port);
        });
    }
});