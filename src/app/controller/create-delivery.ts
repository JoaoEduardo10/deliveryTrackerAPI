import { DeliveryDTO } from '../../interface/delivery';
import { Internal_Server_Error } from '../errors/api-error';
import {
  CreateDeliveryParams,
  CreateDeliveryRepository,
} from '../repositories/create-delivery/protocols';
import { ImageUploaderRepository } from '../repositories/upload-image-storege';
import { IApiRequest, IApiResponse, IController } from './protocols';

class CreateDeliveryController implements IController {
  private imageUploaderRepository: ImageUploaderRepository;

  constructor(
    private readonly createDeliveryRespository: CreateDeliveryRepository,
  ) {
    this.imageUploaderRepository = new ImageUploaderRepository(
      `${process.env.AZURE_STORAGE_URL_CONNECTIONS}`,
    );
  }

  async handle(
    req: IApiRequest<CreateDeliveryParams>,
  ): Promise<IApiResponse<DeliveryDTO>> {
    if (!req.body) {
      throw new Internal_Server_Error('Não foi possivel registra a entrega');
    }

    const {
      deliveredByEmail,
      deliveredByName,
      imageReference,
      latitude,
      longitude,
      recipient,
    } = req.body;

    const conteiner_storage = `${process.env.AZURE_CONTEINER_NAME}`;
    const storageName = `${process.env.AZURE_STORAGE_NAME}`;

    const { imageUrl } = await this.imageUploaderRepository.processAndSaveImage(
      {
        image: imageReference,
        conteiner_storage,
        storageName,
      },
    );

    const delivery = await this.createDeliveryRespository.create({
      deliveredByEmail,
      deliveredByName,
      imageReference: imageUrl,
      latitude,
      longitude,
      recipient,
    });

    return {
      body: delivery,
      statusCode: 201,
    };
  }
}

export { CreateDeliveryController };
