import express from 'express';
import {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  blockMember,
  unblockMember,
  getMemberSubscription,
} from '../controllers/memberController.js';

const router = express.Router();

router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.post('/', createMember);
router.patch('/:id', updateMember);
router.delete('/:id', deleteMember);
router.patch('/:id/block', blockMember);
router.patch('/:id/unblock', unblockMember);
router.get('/check/subscription', getMemberSubscription); // use this get API to check/update automatic memeber subscription expiry time


export default router;
