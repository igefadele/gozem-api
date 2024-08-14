/* 
==============
CENTRAL ROUTES
Route Setup which brings together all entity routes within the application
*/

import express from 'express';
import { router as deliveryRouter } from '../modules/delivery/routes/delivery.routes';
import { router as packageRouter } from '../modules/package/routes/package.routes';

const router = express.Router();

router.use('/delivery', deliveryRouter);
router.use('/package', packageRouter);

export default router;
