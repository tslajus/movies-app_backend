import { sortOptionService } from '../services/sortOption.service';

const sortOptionValidator = (sortOption: string): boolean => {
  const validSortOptions = sortOptionService().map((option) => option.code);
  return validSortOptions.includes(sortOption);
};

export default sortOptionValidator;
