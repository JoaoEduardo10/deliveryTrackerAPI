import { Schema, model } from 'mongoose';
import { DeliveryDTO } from '../interface/delivery';

const Delivery = model(
  'Delivery',
  new Schema<Omit<DeliveryDTO, 'id'>>({
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    recipient: {
      cpf_cnpj: {
        type: String,
        required: true,
      },
      boletus_id: {
        type: Number,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: false,
        default: null,
      },
      number: {
        type: String,
        required: false,
        default: null,
      },
      someoneAtHome: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    imageReference: {
      type: String,
      required: true,
    },
    deliveredByName: {
      type: String,
      required: true,
    },
    deliveredByEmail: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: false,
      default: Date.now,
    },
  }),
);

export { Delivery };
