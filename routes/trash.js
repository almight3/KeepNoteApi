import express  from 'express'
const router = express.Router();
import {authenticateUser} from "../middleware/auth.js";
import {getAllNoteFromTrash,deleteNotesFromTrash,restoreNotesFromTrash} from "../controller/trashController.js";


router.route("/trash").get(authenticateUser,getAllNoteFromTrash);
router.route("/trash/restore").post(authenticateUser,restoreNotesFromTrash);
router.route("/trash/:id").delete(authenticateUser,deleteNotesFromTrash);
export default router