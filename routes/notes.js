import express  from 'express'
const router = express.Router();
import {createNote,getAllNotes,getNoteDetail,updateNotes,deleteNote} from "../controller/notesController.js";
import {authenticateUser} from "../middleware/auth.js";
router.route('/notes').get(authenticateUser,getAllNotes)
router.route('/new/note').post(authenticateUser,createNote)
router.route('/notes/:id').get(authenticateUser,getNoteDetail)
router.route('/notes/:id').put(authenticateUser,updateNotes)
router.route('/notes/:id').delete(authenticateUser,deleteNote)


export default router;