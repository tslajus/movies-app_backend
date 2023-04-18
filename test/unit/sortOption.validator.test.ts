import { sortOptionValidator } from '../../src/validators';
import { sortOptionService } from '../../src/services';

describe('validateSortOption function', () => {
  it('returns true for a valid sort option code', () => {
    const sortOptions = sortOptionService();
    const validSortOption = sortOptions[0].code;
    const result = sortOptionValidator(validSortOption);
    expect(result).toBe(true);
  });

  it('returns false for an invalid sort option code', () => {
    const invalidSortOption = 'invalid_code';
    const result = sortOptionValidator(invalidSortOption);
    expect(result).toBe(false);
  });
});
