import mongoose from 'mongoose';

const actorSchema = mongoose.Schema(
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

const Actor = mongoose.model('Actor', actorSchema);

export default Actor;
