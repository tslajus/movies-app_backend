import sortOptions from '../../dist/src/data/sortOptions.json';

const sortOptionService = (): SortOption[] => {
  return sortOptions;
};

export default sortOptionService;
