import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidation } from './order.validation';
import { orderController } from './order.controller';
const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), orderController.getAllOrders);
router.post(
  '/create-order',
  validateRequest(orderValidation.createOrder),
  auth(ENUM_USER_ROLE.CUSTOMER),
  orderController.createOrder
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  orderController.getSingleOrder
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  orderController.getSingleOrder
);

export const orderRoutes = router;
