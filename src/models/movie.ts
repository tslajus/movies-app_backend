import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const MovieSchema = new mongoose.Schema({
  email: { type: String, required: true },
  movieId: { type: Number, required: true },
  title: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  backdropPath: { type: String },
  posterPath: { type: String },
  voteAverage: { type: Number },
});

MovieSchema.plugin(mongoosePaginate);

export const Movie = mongoose.model('Movie', MovieSchema);
