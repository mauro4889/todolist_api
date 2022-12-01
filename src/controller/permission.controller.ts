import { Request, Response } from "express";
import { PermissionService } from "../services/permission.service";


export class PermissionController {
    constructor(){}

    static async create(req: Request, res: Response){
        try {
            const {name} = req.body
            const created = await PermissionService.create(name)

            return res.status(201).json({ success: true, permission: created })
        } catch (error) {
            return res.status(500).json({ sucess: false, error: 'Hubo un error' })
        }
    }

    static async getAll(req: Request, res: Response){
        try {
            const getData = await PermissionService.getAll()
            
            res.status(getData?.success ? 200 : 400).send(getData)
        } catch (error) {
            return { success: false, error: 'Hubo un error' }
        }
    }

    static async assingPermission(req: Request, res: Response){
        try {
            const {permission} = req.body
            const {user} = req.params
            const assigned = await PermissionService.assingPermission({permission, user})

            return res.status(201).json({ success: true, assigned });
        } catch (error) {
            return res.status(500).json({ sucess: false, error: 'Hubo un error' })
        }
    }

}