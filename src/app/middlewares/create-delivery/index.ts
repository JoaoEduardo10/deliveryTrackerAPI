/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from 'express';
import { CreateDeliveryParams } from '../../repositories/create-delivery/protocols';
import { DeliveryValidator } from '../../helpers/deliveryValidator';
import { Validate } from '../../helpers/validateCpfCnpj';
import { formatPhoneNumber } from '../../helpers/formatPhoneNumber';
import validator from 'validator';
import { Bad_Request } from '../../errors/api-error';

class CreateDeliveryMiddleware {
  static async middleware(
    req: Request<{}, {}, CreateDeliveryParams>,
    res: Response,
    next: NextFunction,
  ) {
    const { recipient } = req.body;

    DeliveryValidator.validateDeliveryRegistration(req.body);

    const cpf_cnpf = new Validate();

    cpf_cnpf.cpf_or_cnpj(recipient.cpf_cnpj);

    if (recipient.number) {
      const new_number = formatPhoneNumber(recipient.number);

      req.body.recipient.number = new_number;
    }

    if (recipient.email) {
      const isEmail = validator.isEmail(recipient.email);

      if (!isEmail) {
        throw new Bad_Request('formato de email invalido');
      }
    }

    next();
  }
}

export { CreateDeliveryMiddleware };
