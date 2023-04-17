import { pageValidator } from '../../src/validators';
import { validationResult } from 'express-validator';

describe('pageValidator', () => {
  it('should pass validation for valid page query parameter', async () => {
    const req = {
      query: {
        page: '1',
      },
    };
    await Promise.all(pageValidator.map((validator) => validator.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  it('should pass validation for missing page query parameter', async () => {
    const req = {
      query: {},
    };
    await Promise.all(pageValidator.map((validator) => validator.run(req)));
    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  it('should fail validation for non-integer page query parameter', async () => {
    const req = {
      query: {
        page: 'abc',
      },
    };
    await Promise.all(pageValidator.map((validator) => validator.run(req)));
    const errors = validationResult(req);
    expect(errors.array()).toHaveLength(1);
    expect(errors.array()[0].msg).toBe('Invalid value');
  });

  it('should fail validation for negative page query parameter', async () => {
    const req = {
      query: {
        page: '-1',
      },
    };
    await Promise.all(pageValidator.map((validator) => validator.run(req)));
    const errors = validationResult(req);
    expect(errors.array()).toHaveLength(1);
    expect(errors.array()[0].msg).toBe('Invalid value');
  });
});
