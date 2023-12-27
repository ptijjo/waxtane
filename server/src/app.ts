import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import "dotenv/config";
import { Route } from './routes/index';

export class App{
   private app: express.Application;
   private server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
   private port: string | number

    constructor(routes:Route[]) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = process.env.PORT || 8585;

        this.listen();
        this.initialize();
        this.mongooseConnection();
        this.initializeRoute(routes);
        this.initialiseSocket();
    };

    // Afichage si connection réussi au serveur et sur quel port
    private listen() {
        this.server.listen(this.port, () => {
            console.log(` 🚀 Notre serveur tourne correctement sur le port : ${this.port} !!`);
            
        })
    };

    //On va initialiser morgan cors et les fichiers en json
    private initialize() {
        this.app
            .use(cors())
            .use(express.json())
            .use(morgan("dev"))
    };

    //Connection et config à la Bdd mongoDb
    private mongooseConnection = async () => {
        try {
            await mongoose.connect(`mongodb+srv://${process.env.ID}:${process.env.PASSwORD}@${process.env.SERVER_MONGODB}.mongodb.net/?retryWrites=true&w=majority`);

            console.log(`Connection à mongoDB réussie !!! 👍`);

        } catch (error) {
            console.log(`Connection à mongoDb échouée !!! 🤯 : ${error}`);
        }
    };

    //On applique a toutes les routes un chemin et un router
    private initializeRoute(routes:Route[]) {
        routes.forEach(route => {
            this.app.use("/",route.router)
        })
    };

    //on va initialiser notre socket pour les conversation instantanée

    private initialiseSocket = async () => {
        try {
            
        } catch (error) {
            console.log(`Connection à mongoDb échouée !!! 🤯 : ${error}`);
        }
    }


}