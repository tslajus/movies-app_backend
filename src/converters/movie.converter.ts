const IMG_PREFIX = 'https://image.tmdb.org/t/p/w500';

const movieConverter = (tmdbMovie: TmdbMovie): Movie => {
  const {
    id,
    title,
    release_date: releaseDate,
    backdrop_path: backdropPath,
    poster_path: posterPath,
    vote_average: voteAverage,
    ...rest
  } = tmdbMovie;

  const movie: Movie = {
    movieId: id,
    title,
    releaseDate,
    backdropPath: `${IMG_PREFIX}${backdropPath}`,
    posterPath: `${IMG_PREFIX}${posterPath}`,
    voteAverage,
    ...rest,
  };

  return movie;
};

export default movieConverter;
