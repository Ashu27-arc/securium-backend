import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: [true, 'Please add a subject'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    priority: {
      type: String,
      required: [true, 'Please select priority'],
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
    },
    status: {
      type: String,
      required: true,
      enum: ['Open', 'In Progress', 'Resolved'],
      default: 'Open',
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
