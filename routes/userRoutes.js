import express from 'express';
import { allUsers, logout, signin, signup, userDetail } from '../controllers/user/userController.js';


const router = express.Router();

router.post('signup', signup);
router.post('signin', signin);
router.post('logout', logout);
router.get('userdetail', userDetail);
router.get('allusers', allUsers);


export default router;