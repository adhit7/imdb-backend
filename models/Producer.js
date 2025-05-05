import mongoose from 'mongoose';

const producerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Producer = mongoose.model('Producer', producerSchema);

export default Producer;
