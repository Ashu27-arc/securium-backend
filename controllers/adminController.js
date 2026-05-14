import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';
import Admin from '../models/adminModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Get all tickets
// @route   GET /api/admin/tickets
// @access  Private/Admin
const getAllTickets = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  
  const tickets = await Ticket.find(filter)
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
    
  res.json(tickets);
});

// @desc    Update ticket status
// @route   PUT /api/admin/tickets/:id
// @access  Private/Admin
const updateTicketStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  ticket.status = status || ticket.status;
  const updatedTicket = await ticket.save();

  res.json(updatedTicket);
});

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export { getAllTickets, updateTicketStatus, adminLogin };
