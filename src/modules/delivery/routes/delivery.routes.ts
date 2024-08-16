/* 
==============
DELIVERY ROUTES
==============
*/

import express from 'express';
import * as deliveryController from '../controllers/delivery.controller'

export const router = express.Router();

router.get('/', deliveryController.findAll);

router.get('/:id', deliveryController.findById);

router.post('/', deliveryController.create);

router.put('/:id', deliveryController.update);

router.delete('/:id', deliveryController.remove);


