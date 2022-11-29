import express  from 'express'
const router = express.Router();
import {authenticateUser} from "../middleware/auth.js";
import {getAllNoteFromTrash} from "../controller/trashController.js";


router.route("/trash").get(authenticateUser,getAllNoteFromTrash);
// router.route("/trash/restore")

export default router