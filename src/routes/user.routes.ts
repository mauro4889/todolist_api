import { Router } from "express";
import { UsersController } from "../controller/users.controller";



const router = Router()

router.post('/create', UsersController.create)
router.get('/', UsersController.getAll)

export { router as userRouter }