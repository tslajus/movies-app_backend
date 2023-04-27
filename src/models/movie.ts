import mongoose, { Document, PaginateModel } from 'mongoose';
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

interface IMovie extends Document {
  email: string;
  movieId: number;
  title: string;
  releaseDate: Date;
  backdropPath?: string;
  posterPath?: string;
  voteAverage?: number;
}

type MovieModel = PaginateModel<IMovie>;

export const Movie: MovieModel = mongoose.model<IMovie, MovieModel>('Movie', MovieSchema);
