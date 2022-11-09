import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";



export class AuthController {
    constructor() { }

    static async register(req: Request, res: Response) {
        const { email, firstname, lastname, password } = req.body

        const created = await AuthService.register({
            email,
            firstname,
            lastname,
            password
        })

        res.status(200).send({
            success: true,
            created
        })

    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body

        const { token, data } = await AuthService.login({ email, password })

        res.status(200).send({
            success: true,
            token,
            data,
        })

    }

}