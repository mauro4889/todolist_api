import { Router } from "express";
import { TasksController } from "../controller/tasks.controller";
import { authenticate } from "../middlewares/authentication";
import {havePermission} from "../middlewares/authorization"
import { isUser } from "../middlewares/roles";



const router = Router()
router.use(authenticate, isUser)

router.post('/', havePermission(['TASK/CREATE']), TasksController.create)
router.get('/', havePermission(['TASK/GET']), TasksController.getAll)
router.get('/:id', havePermission(['TASK/GET']), TasksController.getOneById)
router.patch('/:id', havePermission(['TASK/UPDATE']), TasksController.update)
router.delete('/:id', havePermission(['TASK/DELETE']), TasksController.delete)

export default router