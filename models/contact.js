import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Please enter a valid email"]
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
        trim: true,
        maxlength: [200, "Subject cannot exceed 100 characters"],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true,
        maxlength: [1000, "Message cannot exceed 100 characters"],
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied'],
        default:'new'
    },
  },
  {
    timestamps: true, // this will automatically add createdAt and updatedAt fields
  }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;