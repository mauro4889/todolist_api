import { NextFunction, Request, Response } from "express";
import {JWTService} from '../services/jwt.service'
import { UsersService } from "../services/user.service";


export const authenticate = async (req: any, res: Response, next: NextFunction)=>{

    try {

        const {authorization} = req.headers

        if(!authorization || !authorization.startsWith('Bearer')){
            throw 'No tenes Bearer'
        }

        const {1: token} = authorization.split(' ')

        if(!token){
            throw 'Token incorrecto'
        }

        const {id} = JWTService.verify(token)

        const {data} = await UsersService.getOneById(id)
        req.user = data
        console.log(data)
        next()
        
    } catch (error) {
        next(error)
    }

}