interface DeliveryDTO {
  id: string;
  deliveredByName: string;
  deliveredByEmail: string;
  recipient: {
    cpf: string;
    email?: string;
    number?: string;
    someoneAtHome?: boolean;
  };
  latitude: number;
  longitude: number;
  imageReference: string;
  deliveryDate?: Date;
}

export { DeliveryDTO };
