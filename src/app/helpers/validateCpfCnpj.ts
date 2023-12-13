import { cpf, cnpj } from 'cpf-cnpj-validator';
import { Bad_Request } from '../errors/api-error';

class Validate {
  private cpf: typeof cpf;
  private cnpj: typeof cnpj;

  constructor() {
    this.cpf = cpf;
    this.cnpj = cnpj;
  }

  cpf_or_cnpj(cpf_cnpf: string) {
    const onlyDigits = cpf_cnpf.replace(/\D/g, '');

    if (onlyDigits.length == 11) {
      return this.validateCpf(onlyDigits);
    } else if (onlyDigits.length == 14) {
      return this.validateCnpj(onlyDigits);
    }

    throw new Bad_Request('cpf ou cnpj invalido!');
  }

  private validateCpf(cpf: string) {
    const validcpf = this.cpf.isValid(cpf);

    if (validcpf) {
      return this.cpf.format(cpf);
    }

    throw new Bad_Request('cpf invalido!');
  }

  private validateCnpj(cnpj: string) {
    const validCnpf = this.cnpj.isValid(cnpj);

    if (validCnpf) {
      return this.cnpj.format(cnpj);
    }

    throw new Bad_Request('cnpj invalido!');
  }
}

export { Validate };
