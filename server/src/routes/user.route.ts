import { Router } from "express";
import { Route } from ".";
import { userController } from '../controllers/user.controller';


export class UserRoute implements Route{
    path = "/users";
    router = Router();
    userCtrl = new userController();


    constructor() {
        this.router
            .get(`${this.path}`,this.userCtrl.findAll)
            .get(`${this.path}/:id`,this.userCtrl.findById)
            .post(`${this.path}`, this.userCtrl.newUser)
            .post(`${this.path}/connection`,this.userCtrl.connection)
            .put(`${this.path}/:id`)
            .delete(`${this.path}/:id`)
    }

}