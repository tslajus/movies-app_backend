import { genreValidator } from '../../src/validators';
import { validationResult } from 'express-validator';

describe('genreValidator', () => {
  it('should pass validation for valid genres query parameter', async () => {
    const req = {
      query: {
        genres: '28,80,53',
      },
    };
    await Promise.all(genreValidator.map((validator) => validator.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  it('should fail validation for missing genres query parameter', async () => {
    const req = {
      query: {},
    };
    await Promise.all(genreValidator.map((validator) => validator.run(req)));
    const errors = validationResult(req);
    expect(errors.array()).toHaveLength(3);
    expect(errors.array()[0].msg).toBe('genres parameter is required');
    expect(errors.array()[1].msg).toBe('genres must be a string');
    expect(errors.array()[2].msg).toBe('genres must be comma-separated numbers');
  });

  it('should fail validation for non-string genres query parameter', async () => {
    const req = {
      query: {
        genres: 123,
      },
    };
    await Promise.all(genreValidator.map((validator) => validator.run(req)));
    const errors = validationResult(req);
    expect(errors.array()).toHaveLength(1);
    expect(errors.array()[0].msg).toBe('genres must be a string');
  });

  it('should fail validation for invalid comma-separated genres query parameter', async () => {
    const req = {
      query: {
        genres: '28,80,invalid',
      },
    };
    await Promise.all(genreValidator.map((validator) => validator.run(req)));
    const errors = validationResult(req);
    expect(errors.array()).toHaveLength(1);
    expect(errors.array()[0].msg).toBe('genres must be comma-separated numbers');
  });
});
