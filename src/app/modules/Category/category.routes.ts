import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { categoryController } from './category.controller';
const router = express.Router();

router.get('/', categoryController.getAllCategory);
router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.createCategory
);

router.get('/:id', categoryController.getSingleCategory);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.deleteCategory
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.updateCategory
);

export const categoryRoutes = router;
