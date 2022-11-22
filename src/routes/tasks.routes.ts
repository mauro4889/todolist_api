import { Router } from "express";
import { TasksController } from "../controller/tasks.controller";



const router = Router()

router.post('/', TasksController.create)
router.get('/', TasksController.getAll)
router.get('/:id', TasksController.getOneById)
router.patch('/:id', TasksController.update)
router.delete('/:id', TasksController.delete)

export default router