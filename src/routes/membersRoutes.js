import express from 'express';
import {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} from '../controllers/membersController.js';

const router = express.Router();

// Route to get all members
router.get('/', getAllMembers);

// Route to get a single member by ID
router.get('/:id', getMemberById);

// Route to create a new member
router.post('/', createMember);

// Route to update an existing member
router.put('/:id', updateMember);

// Route to delete a member
router.delete('/:id', deleteMember);

export default router;
