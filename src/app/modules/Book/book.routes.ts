import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { bookController } from './book.controller';
import validateRequest from '../../middlewares/validateRequest';
import { bookValidation } from './book.validation';
const router = express.Router();

router.get('/', bookController.getAllBooks);
router.post(
  '/create-book',
  validateRequest(bookValidation.createBook),
  auth(ENUM_USER_ROLE.ADMIN),
  bookController.createBook
);

router.get('/:id', bookController.getSingleBook);

router.get('/:id/category', bookController.getBooksByCategoryId);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), bookController.deleteBook);
router.patch(
  '/:id',
  validateRequest(bookValidation.updateBook),
  auth(ENUM_USER_ROLE.ADMIN),
  bookController.updateBook
);

export const bookRoutes = router;
