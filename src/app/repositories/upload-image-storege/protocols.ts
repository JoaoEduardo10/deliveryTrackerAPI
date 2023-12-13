export interface ImageUploaderParams {
  image: string;
  storageName: string;
  conteiner_storage: string;
}

export interface IImageUploaderRepository {
  processAndSaveImage({
    image,
  }: ImageUploaderParams): Promise<{ imageUrl: string }>;
}
