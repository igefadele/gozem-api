/* 
==============
PACKAGE ROUTES
==============
*/

import express from 'express';
import * as packageController from '../controllers/package.controller'

export const router = express.Router();

router.get('/', packageController.findAll);

router.get('/', packageController.findByUid);

router.post('/', packageController.createOne);

router.put('/', packageController.updateByUid);

router.delete('/', packageController.deleteByUid);


