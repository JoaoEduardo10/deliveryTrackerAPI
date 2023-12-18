interface DeliveryDTO {
  id: string;
  deliveredByName: string;
  deliveredByEmail: string;
  recipient: {
    cpf_cnpj: string;
    boletus_id: number;
    email?: string;
    number?: string;
    someoneAtHome?: boolean; //alguém em casa
  };
  latitude: number;
  longitude: number;
  imageReference: string;
  deliveryDate?: Date;
}

export { DeliveryDTO };
