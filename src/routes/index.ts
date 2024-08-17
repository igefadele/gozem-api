/* 
==============
CENTRAL ROUTES
Route Setup which brings together all entity routes within the application
*/

import express, { NextFunction, Request, Response } from 'express';
import { router as deliveryRouter } from '../modules/delivery/routes/delivery.routes';
import { router as packageRouter } from '../modules/package/routes/package.routes';
import { dirname, join } from 'path';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: "Server works" });
});

router.get('/ws', (req, res) => {
  res.sendFile(join(__dirname, '../ws_test.html'));
});

router.use('/delivery', deliveryRouter);
router.use('/package', packageRouter);

export default router;
