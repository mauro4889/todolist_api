import { Request, Response, NextFunction } from "express"


export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = req.body

        if (role !== "ADMIN") {
            throw "No tienes los permisos"
        }

        next()
    } catch (error) {
        next(error)
    }
}

export const isUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = req.body
        console.log(role)
        if (role !== "USER" || role !== "ADMIN") {
            throw "No tienes los permisos"
        }

        next()
    } catch (error) {
        next(error)
    }
}