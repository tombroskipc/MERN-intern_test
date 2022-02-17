import express from 'express';
import { getUsers, postUser } from '../controllers/users.js';

const router = express.Router();

// localhost:5000/

router.get('/', getUsers)
router.post('/', postUser)

export default router;