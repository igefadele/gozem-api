/* 
==============
PACKAGE ROUTES
==============
*/

import express from 'express';
import * as packageController from '../controllers/package.controller'

export const router = express.Router();

router.get('/', packageController.findAll);

router.get('/:id', packageController.findOne);

router.post('/:id', packageController.create);

router.put('/:id', packageController.updateOne);

router.delete('/:id', packageController.deleteOne);


