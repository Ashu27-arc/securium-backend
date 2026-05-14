import express from 'express';
import { createTicket, getMyTickets } from '../controllers/ticketController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createTicket);

router.get('/my', protect, getMyTickets);

export default router;
