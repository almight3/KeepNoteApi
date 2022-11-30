import express  from 'express'
const router = express.Router();
import {createNote,getAllNotes,getNoteDetail,updateNotes,deleteNote,pinNote} from "../controller/notesController.js";
import {authenticateUser} from "../middleware/auth.js";
router.route('/notes').get(authenticateUser,getAllNotes)
router.route('/new/note').post(authenticateUser,createNote)
router.route('/notes/:id').get(authenticateUser,getNoteDetail)
router.route('/notes/:id').put(authenticateUser,updateNotes)
router.route('/notes/:id').delete(authenticateUser,deleteNote)
router.route("/notes/pinned").post(authenticateUser,pinNote)

export default router;