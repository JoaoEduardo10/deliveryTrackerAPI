import { Bad_Request } from '../errors/api-error';

const formatPhoneNumber = (number: string) => {
  const cleaned = number.replace(/\D/g, '');

  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);

  if (match) {
    const formatted = `(${match[1]}) ${match[2]}-${match[3]}`;
    return formatted;
  } else {
    throw new Bad_Request('Numero invalido');
  }
};

export { formatPhoneNumber };
