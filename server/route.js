import express from 'express';
import {
  getFeeds
} from './feedController';
import {
  loginValidation,
  registerValidation
} from './validations';
import {
  loginUser,
  registerUser
} from './userController';
import {
  networkDetails
} from './networkDetailsController';

const router = express.Router();

router.route('/feeds')
  .get(getFeeds);

router.route('/customer_details')
  .get(networkDetails);

router.post('/login', loginValidation, loginUser);
router.post('/register', registerValidation, registerUser)

export default router;