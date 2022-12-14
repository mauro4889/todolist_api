import { Router } from "express";
import { UsersController } from "../controller/users.controller";
import { authenticate } from "../middlewares/authentication";



const router = Router()
router.use(authenticate)
router.post('/', UsersController.create)
router.get('/', UsersController.getAll)
router.get('/:id', UsersController.getOneById)
router.patch('/:id', UsersController.update)
router.delete('/:id', UsersController.delete)

export default router