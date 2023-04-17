import titleValidator from '../../src/validators/title.validator';
import { validationResult } from 'express-validator';

describe('titleValidator', () => {
  it('should pass validation for a valid title', async () => {
    const req = {
      body: {
        title: 'The Quick Brown Fox 123 - .',
      },
    };
    await Promise.all(titleValidator.map((validator) => validator.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  it('should fail validation for an invalid title with special characters', async () => {
    const req = {
      body: {
        title: 'The Quick $ Brown Fox',
      },
    };
    await Promise.all(titleValidator.map((validator) => validator.run(req)));
    const errors = validationResult(req);
    expect(errors.array()).toHaveLength(1);
    expect(errors.array()[0].msg).toBe('Title can only contain letters, numbers, spaces, dashes, and dots');
  });
});
