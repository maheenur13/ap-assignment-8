import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { categoryController } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { categoryValidation } from './category.validation';
const router = express.Router();

router.get('/', categoryController.getAllCategory);
router.post(
  '/create-category',
  validateRequest(categoryValidation.createCategory),
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
  validateRequest(categoryValidation.updateCategory),
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.updateCategory
);

export const categoryRoutes = router;
