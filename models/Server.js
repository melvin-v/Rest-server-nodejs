import cors from 'cors'
import express from 'express';
import * as dotenv from 'dotenv'
import {router} from '../routes/user.js'
import { dbConnection } from '../database/config.js';

dotenv.config()

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use( express.static('public') );
    }
    
    routes(){
        this.app.use(this.usuariosPath, router);
    }

    listen(){
        this.app.listen( this.port );
    }
}

export {Server}