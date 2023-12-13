/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import { BlobServiceClient } from '@azure/storage-blob';
import { IImageUploaderRepository, ImageUploaderParams } from './protocols';
import { v1 } from 'uuid';
import { Internal_Server_Error } from '../../errors/api-error';

class ImageUploaderRepository implements IImageUploaderRepository {
  private uuid: typeof v1;
  private urlConnections: string;

  constructor(urlConnections: string) {
    this.uuid = v1;
    this.urlConnections = urlConnections;
  }

  async processAndSaveImage({
    image,
    storageName,
    conteiner_storage,
  }: ImageUploaderParams): Promise<{ imageUrl: string }> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      this.urlConnections,
    );
    const filename = this.uuid().toString() + '.jpg';

    const [, image_type, image_content_base64] = image.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/,
    ) as RegExpMatchArray;

    const image_content = Buffer.from(image_content_base64, 'base64');

    const containerClient =
      blobServiceClient.getContainerClient(conteiner_storage);

    const blockBlobClient = containerClient.getBlockBlobClient(filename);

    try {
      await blockBlobClient.upload(image_content, image_content.length, {
        blobHTTPHeaders: {
          blobContentType: image_type,
          blobContentLanguage: 'pt-br',
        },
      });
    } catch (error: any) {
      throw new Internal_Server_Error(
        'Não foi possivel salvar a imagem: ' + error.message,
      );
    }

    const imageUrl = `https://${storageName}.blob.core.windows.net/${conteiner_storage}/${filename}`;
    return {
      imageUrl,
    };
  }
}

export { ImageUploaderRepository };
