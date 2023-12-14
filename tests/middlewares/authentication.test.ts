import { describe, expect, it } from 'vitest';
import { serverTest } from '../setup';

describe('authentication', () => {
  it('should return an error for not adding an authorization', async () => {
    const { body, statusCode } = await serverTest.post(
      `${process.env.VERSION}/delivery`,
    );

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: 'Voçê não esta altenticado!' });
  });

  it('should return an error for not adding a correct type', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', 'test');

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: 'Voçê não esta altenticado!' });
  });

  it('should return an error for not adding a correct type', async () => {
    const { body, statusCode } = await serverTest
      .post(`${process.env.VERSION}/delivery`)
      .set('Authorization', `${process.env.TYPE_JWT} INTERATIVA`);

    expect(statusCode).toBe(401);
    expect(body).toEqual({ error: 'Voçê não esta altenticado!' });
  });
});
