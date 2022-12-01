import { NextFunction, Response } from "express";


export const havePermission = (permission: string[]) =>(req: any, res: Response, next: NextFunction)=>{
    try {
        const {user} = req

        const userPermissions = user.permission.map((permission: any)=> permission.name)

        const canContinue = permission.every((permission)=>{
            return userPermissions.include(permission)
        })

        if(!canContinue){
            throw 'error'
        }

        next()
    } catch (error) {
        next(error)
    }
}