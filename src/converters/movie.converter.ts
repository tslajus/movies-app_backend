const IMG_MOVIE_PREFIX = 'https://image.tmdb.org/t/p/w500';
const IMG_MOVIE_DETAILS_PREFIX = 'https://image.tmdb.org/t/p/original';

const movieConverter = (tmdbMovie: TmdbMovie): Movie => {
  const {
    id,
    release_date: releaseDate,
    backdrop_path: backdropPath,
    poster_path: posterPath,
    vote_average: voteAverage,
    ...rest
  } = tmdbMovie;

  const movie: Movie = {
    movieId: id,
    releaseDate,
    backdropPath: `${IMG_MOVIE_PREFIX}${backdropPath}`,
    posterPath: `${IMG_MOVIE_PREFIX}${posterPath}`,
    voteAverage,
    ...rest,
  };

  return movie;
};

const productionCompanyConverter = (company: TmdbProductionCompany): ProductionCompany => {
  const { origin_country: originCountry, logo_path: logoPath, ...rest } = company;

  const productionCompany: ProductionCompany = {
    originCountry,
    logoPath,
    ...rest,
  };

  return productionCompany;
};

const productionCountryConverter = (country: TmdbProductionCountry): ProductionCountry => {
  const { iso_3166_1: iso, ...rest } = country;

  const productionCountry: ProductionCountry = {
    iso,
    ...rest,
  };

  return productionCountry;
};

const spokenLanguageConverter = (language: TmdbSpokenLanguage): SpokenLanguage => {
  const { english_name: englishName, iso_639_1: iso, ...rest } = language;

  const spokenLanguage: SpokenLanguage = {
    englishName,
    iso,
    ...rest,
  };

  return spokenLanguage;
};

const movieDetailsConverter = (tmbdMovieDetails: TmdbMovieDetails): MovieDetails => {
  const {
    id,
    release_date: releaseDate,
    backdrop_path: backdropPath,
    poster_path: posterPath,
    vote_average: voteAverage,
    original_language: originalLanguage,
    original_title: originalTitle,
    production_companies: productionCompanies,
    production_countries: productionCountries,
    spoken_languages: spokenLanguages,
    vote_count: voteCount,
    ...rest
  } = tmbdMovieDetails;

  const convertedProductionCompanies = productionCompanies.map(productionCompanyConverter);
  const convertedProductionCountries = productionCountries.map(productionCountryConverter);
  const convertedSpokenLanguages = spokenLanguages.map(spokenLanguageConverter);

  const movieDetails: MovieDetails = {
    movieId: id,
    releaseDate,
    backdropPath: `${IMG_MOVIE_DETAILS_PREFIX}${backdropPath}`,
    posterPath: `${IMG_MOVIE_DETAILS_PREFIX}${posterPath}`,
    voteAverage,
    originalLanguage,
    originalTitle,
    productionCompanies: convertedProductionCompanies,
    productionCountries: convertedProductionCountries,
    spokenLanguages: convertedSpokenLanguages,
    voteCount,
    ...rest,
  };

  return movieDetails;
};

export { movieConverter, movieDetailsConverter };
