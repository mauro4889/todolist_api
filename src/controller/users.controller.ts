import { Request, Response } from "express";
import { userInfo } from "os";
import { UsersService } from "../services/user.service";



export class UsersController{
    constructor(){}


    static async create(req: Request, res: Response){
        const {email, profile}= req.body
        const { firstname, lastname}= profile

        const created = await UsersService.create({
            email,
            profile:{
                firstname,
                lastname
            }
        })
        res.status(created.success ? 200 : 400).send(created)
    }

    static async getAll(req: Request, res: Response){
        const getData = await UsersService.getAll()

        res.status(getData.success ? 200 : 400).send(getData)
    }

    static async getOneById (req: Request, res: Response){
        const {id} = req.params
        const getData = await UsersService.getOneById(id)

        res.status(getData.success ? 200: 400).send(getData)
    }

    static async update (req: Request, res: Response){
        const {id} = req.params
        const update = await UsersService.update(id, req.body)

        res.status(update.success ? 200 : 400).send(update)
    }

    static async delete (req: Request, res: Response){
        const {id} = req.params
        const deleted = await UsersService.delete(id)

        res.status(deleted.success ? 200 : 400).send(deleted)
    }
}