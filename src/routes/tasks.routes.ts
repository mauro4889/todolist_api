import { Router } from "express";
import { TasksController } from "../controller/tasks.controller";
import { authenticate } from "../middlewares/authentication";



const router = Router()
router.use(authenticate)

router.post('/', TasksController.create)
router.get('/', TasksController.getAll)
router.get('/:id', TasksController.getOneById)
router.patch('/:id', TasksController.update)
router.delete('/:id', TasksController.delete)

export default router