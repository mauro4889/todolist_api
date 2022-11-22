import { Router } from "express";
import { UsersController } from "../controller/users.controller";



const router = Router()

router.post('/', UsersController.create)
router.get('/', UsersController.getAll)
router.get('/:id', UsersController.getOneById)
router.patch('/:id', UsersController.update)
router.delete('/:id', UsersController.delete)

export default router