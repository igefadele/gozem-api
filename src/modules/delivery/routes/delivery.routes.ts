/* 
==============
DELIVERY ROUTES
==============
*/

import express from 'express';
import * as deliveryController from '../controllers/delivery.controller'

export const router = express.Router();

router.get('/', deliveryController.findAll);

router.get('/:id', deliveryController.findOne);

router.post('/:id', deliveryController.create);

router.put('/:id', deliveryController.updateOne);

router.delete('/:id', deliveryController.deleteOne);


