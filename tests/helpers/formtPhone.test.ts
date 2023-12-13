import { describe, expect, it } from 'vitest';
import { formatPhoneNumber } from '../../src/app/helpers/formatPhoneNumber';

describe('formatPhone', () => {
  it('should format number phone', () => {
    const number = '86981320524';

    const new_number = formatPhoneNumber(number);

    expect(new_number).toBe('(86) 98132-0524');
  });

  it('should not format number phone', () => {
    const number = '869981320524';

    try {
      const new_number = formatPhoneNumber(number);

      expect(new_number).not.toBe('(86) 98132-0524');
    } catch (error) {
      expect(error).toBeTruthy();

      expect((error as Error).message).toBe('Numero invalido');
    }
  });
});
