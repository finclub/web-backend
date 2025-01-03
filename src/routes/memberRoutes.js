import express from 'express';
import {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  blockMember,
  unblockMember,
} from '../controllers/memberController.js';

const router = express.Router();

router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.post('/', createMember);
router.patch('/:id', updateMember);
router.delete('/:id', deleteMember);
router.patch('/:id/block', blockMember);
router.patch('/:id/unblock', unblockMember);


export default router;
