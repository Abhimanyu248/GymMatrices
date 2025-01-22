import express from 'express';
import auth from '../Auth/auth.js';
import * as memberController from '../Controllers/member.js';


const router = express.Router();

router.post('/register-member',auth, memberController.registermember);
router.get('/get-members',auth, memberController.getmembers);
router.delete('/delete-member/:id',auth, memberController.deletemember);
router.get('/get-member/:id',auth, memberController.getmemberbyid);
router.put('/update-member/:id',auth, memberController.updatemember);
router.put('/renew-membership/:id',auth, memberController.renewmembership);

export default router;