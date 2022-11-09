import { Request, Response } from "express";
import { UsersService } from "../services/user.service";



export class UsersController{
    constructor(){}


    static async create(req: Request, res: Response){
        const {email, firstname, lastname, password}= req.body

        const created = await UsersService.create({
            email,
            firstname,
            lastname,
            password
        })
        res.status(created.success ? 200 : 400).send(created)
    }

    static async getAll(req: Request, res: Response){
        const getData = await UsersService.getAll()
        res.status(getData.success ? 200 : 400).send(getData)
    }
    
}