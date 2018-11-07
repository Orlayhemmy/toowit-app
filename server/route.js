import express from 'express';
import { getFeeds } from './feedController';

const router = express.Router();

router.route('/feeds')
  .get(getFeeds);

export default router;
