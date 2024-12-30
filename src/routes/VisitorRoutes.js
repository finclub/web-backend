import express from 'express';
import { getAllUsers } from '../controllers/UserController.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/', getAllUsers);

export default router;


// adding visitor
// https://fitness.fytrack.com/#/gym/enquiry/add-enquiry/8176814309
// https://fitness.fytrack.com/#/gym/members/add-member/8176814309
