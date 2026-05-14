import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js';

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { subject, description, priority } = req.body;

  if (!subject || !description) {
    res.status(400);
    throw new Error('Please add a subject and description');
  }

  const ticket = await Ticket.create({
    user: req.user._id,
    subject,
    description,
    priority: priority || 'Low',
    status: 'Open',
  });

  res.status(201).json(ticket);
});

// @desc    Get user tickets
// @route   GET /api/tickets/my
// @access  Private
const getMyTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tickets);
});

export { createTicket, getMyTickets };
