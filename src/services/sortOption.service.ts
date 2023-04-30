const sortOptions = [
  {
    code: 'popularity.desc',
    name: 'Popularity ↓',
  },
  {
    code: 'popularity.asc',
    name: 'Popularity ↑',
  },
  {
    code: 'vote_average.desc',
    name: 'Rating ↓',
  },
  {
    code: 'vote_average.asc',
    name: 'Rating ↑',
  },
  {
    code: 'release_date.desc',
    name: 'Release date ↓',
  },
  {
    code: 'release_date.asc',
    name: 'Release date ↑',
  },
  {
    code: 'revenue.desc',
    name: 'Revenue ↓',
  },
  {
    code: 'revenue.asc',
    name: 'Revenue ↑',
  },
];

const sortOptionService = (): SortOption[] => {
  return sortOptions;
};

export default sortOptionService;
