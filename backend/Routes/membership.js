import express from 'express';
import * as membershipcontroller from '../Controllers/membership.js';
import auth from '../Auth/auth.js';

const router = express.Router();

router.post('/addmembership', auth, membershipcontroller.addmembership);
router.get('/getmembership', auth, membershipcontroller.getmembership);
router.delete('/deletemembership/:id', auth, membershipcontroller.deletemembership);

export default router;