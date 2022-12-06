import { Request, Response } from "express";
import { TasksService } from "../services/tasks.service";


export class TasksController {
    constructor() {}

    static async create(req: any, res: Response){
        const {task, description,  date} = req.body

        const { user } = req;

        const created = await TasksService.create({
            task,
            description,
            date,
            user: user.id
        })

        res.status(created.success ? 200 : 400).send(created)
    }

    static async getAll(req: Request, res: Response){
        const getData = await TasksService.getAll()

        res.status(getData?.success ? 200 : 400).send(getData)
    }

    static async getOneById(req: Request, res: Response){
        const {id} = req.params

        const getData = await TasksService.getOneById(id)

        res.status(getData?.sucess ? 200 : 400).send(getData)
    }

    static async update(req: Request, res: Response){
        const {id} = req.params

        const update = await TasksService.update(+id, req.body)

        res.status(update.success ? 200 : 400).send(update)
    }

    static async delete(req: Request, res: Response){
        const {id} = req.params

        const deleted = await TasksService.delete(+id)

        res.status(deleted.success ? 200: 400).send(deleted)
    }
}