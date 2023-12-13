import { describe, expect, it } from 'vitest';
import { Validate } from '../../src/app/helpers/validateCpfCnpj';

describe('validateCpfCnpf', () => {
  it('should validate the CPF', async () => {
    const validate = new Validate();

    const cpf = '091.931.143-11';

    const validated_cpf = validate.cpf_or_cnpj(cpf);

    expect(validated_cpf).toBeTruthy();
  });

  it('should return invalid cpf', async () => {
    const validate = new Validate();

    const cpf = '091.901.143-11';

    try {
      const validated_cpf = validate.cpf_or_cnpj(cpf);

      expect(validated_cpf).not.toBeTruthy();
    } catch (error) {
      expect((error as Error).message).toBe('cpf invalido!');
    }
  });

  it('should validate the CNPF', async () => {
    const validate = new Validate();

    const cnpj = '01.926.251/0001-64';

    const validated_cnpj = validate.cpf_or_cnpj(cnpj);

    expect(validated_cnpj).toBeTruthy();
  });

  it('should invalided the CNPF', async () => {
    const validate = new Validate();

    const cnpj = '01.906.251/0001-64';

    try {
      const validated_cnpj = validate.cpf_or_cnpj(cnpj);

      expect(validated_cnpj).not.toBeTruthy();
    } catch (error) {
      expect((error as Error).message).toBe('cnpj invalido!');
    }
  });

  it('should return an incorrect CPF size', async () => {
    const validate = new Validate();

    const cnpj = '091.901.143-111';

    try {
      const validated_cnpj = validate.cpf_or_cnpj(cnpj);

      expect(validated_cnpj).not.toBeTruthy();
    } catch (error) {
      expect((error as Error).message).toBe('cpf ou cnpj invalido!');
    }
  });

  it('should return an incorrect CNPJ size', async () => {
    const validate = new Validate();

    const cnpj = '01.906.251/0001-640';

    try {
      const validated_cnpj = validate.cpf_or_cnpj(cnpj);

      expect(validated_cnpj).not.toBeTruthy();
    } catch (error) {
      expect((error as Error).message).toBe('cpf ou cnpj invalido!');
    }
  });
});
