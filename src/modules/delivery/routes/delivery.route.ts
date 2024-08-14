/* 
==============
DELIVERY ROUTES
==============
*/

import express from 'express';
import * as deliveryController from '../controllers/delivery.controller'

export const router = express.Router();

router.get('/', deliveryController.findAll);

router.get('/', deliveryController.findByUid);

router.post('/', deliveryController.createOne);

router.put('/', deliveryController.updateByUid);

router.delete('/', deliveryController.deleteByUid);


