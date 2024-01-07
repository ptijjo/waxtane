import { Router } from "express";
import { Route } from ".";
import { userController } from '../controllers/user.controller';
import { auth } from '../middleware/auth';



export class UserRoute implements Route{
    path = "/users";
    router = Router();
    userCtrl = new userController();


    constructor() {
        this.router
            .get(`${this.path}`,auth,this.userCtrl.findAll)
            .get(`${this.path}/:id`,auth,this.userCtrl.findById)
            .post(`${this.path}`, this.userCtrl.newUser)
            .post(`${this.path}/connection`,this.userCtrl.connection)
            .get(`${this.path}-userConnected`,auth,this.userCtrl.userConnected)
            .put(`${this.path}/:id`,auth)
            .delete(`${this.path}/:id`,auth)
    }

}