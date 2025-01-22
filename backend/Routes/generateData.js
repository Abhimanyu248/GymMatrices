import express from 'express';
import auth from '../Auth/auth.js';
import * as generateDataController from '../Controllers/generateData.js';    

const router = express.Router();

router.get('/excel',auth,generateDataController.gexcel);

export default router;  