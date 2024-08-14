import express from 'express';

export const router = express.Router();

router.get('/contact', (req, res) => {
  res.render('success-contact', {name: 'Contact'});
});
  
router.get('/newsletter', (req, res) => {
  res.render('success-newsletter', {name: 'Newsletter'});
});