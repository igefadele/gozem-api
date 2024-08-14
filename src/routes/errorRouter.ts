import express from 'express';
import { ErrorPageData } from '../models/models';

export const router = express.Router();

router.get('/server', (req, res) => {
  res.render('error-server', {name: 'Server Errror'});
});
  
router.get('/message', (req, res) => {
  const errorPageData: ErrorPageData = (req.session as any).errorPageData;
  res.render('error-message', { name: 'Oops Error!', errorPageData: errorPageData });
});
