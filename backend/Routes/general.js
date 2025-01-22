
import express from 'express';
import * as generalController from '../Controllers/general.js';    

const router = express.Router();

router.get('/expiring-member',generalController.expiringmember);
router.get('/monthly-revenue',generalController.monthlyrevenue);
router.get('/total-revenue',generalController.totalrevenue);


export default router;    