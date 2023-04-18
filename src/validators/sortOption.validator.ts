import { sortOptionService } from '../services';

const sortOptionValidator = (sortOption: string): boolean => {
  const validSortOptions = sortOptionService().map((option) => option.code);
  return validSortOptions.includes(sortOption);
};

export default sortOptionValidator;
