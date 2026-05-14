import express from 'express';
import { getAllTickets, updateTicketStatus, adminLogin } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public admin login
router.post('/login', adminLogin);

// Protected admin routes
router.use(protectAdmin);

router.get('/tickets', getAllTickets);
router.put('/tickets/:id', updateTicketStatus);

export default router;
