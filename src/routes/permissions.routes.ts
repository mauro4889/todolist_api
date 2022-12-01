
import { Router } from 'express';
import { PermissionController } from '../controller/permission.controller';


const router = Router();

router.post('/', PermissionController.create);
router.post('/user/:user', PermissionController.assingPermission);
router.get('/', PermissionController.getAll)

export default router