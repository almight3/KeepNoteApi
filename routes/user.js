import express  from 'express'
const router = express.Router();
import { register,login,logout } from '../controller/userController.js';
import {authenticateUser} from "../middleware/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authenticateUser,logout);
export default router