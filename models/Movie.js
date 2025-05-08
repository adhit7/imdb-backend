import mongoose from 'mongoose';

const movieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    yearOfRelease: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    producer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Producer',
    },
    actors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
