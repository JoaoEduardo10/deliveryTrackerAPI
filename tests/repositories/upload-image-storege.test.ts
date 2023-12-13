import { describe, expect, it, vi } from 'vitest';
import { ImageUploaderRepository } from '../../src/app/repositories/upload-image-storege';

describe('upload-image-storege', () => {
  it('should seve image in azure storage', async () => {
    const imageUploaderRepository = new ImageUploaderRepository('test');

    vi.spyOn(imageUploaderRepository, 'processAndSaveImage').mockReturnValue(
      Promise.resolve({ imageUrl: 'um test' }),
    );

    const image = await imageUploaderRepository.processAndSaveImage({
      conteiner_storage: 'test_conteiner',
      image:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAA',
      storageName: 'test_staorage',
    });

    expect(image.imageUrl).toBe('um test');
  });
});
