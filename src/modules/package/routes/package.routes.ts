/* 
==============
PACKAGE ROUTES
==============
*/

import express from 'express';
import * as packageController from '../controllers/package.controller'

export const router = express.Router();

router.get('/', packageController.findAll);

router.get('/:id', packageController.findById);

router.post('/:id', packageController.create);

router.put('/:id', packageController.update);

router.delete('/:id', packageController.remove);


