import 'reflect-metadata';
import request from 'supertest';
import { app } from '../../../../index'; // Certifique-se de que o app está exportado corretamente
import { container } from 'tsyringe';
import UploadImageService from '../../services/UploadImageService';
import GetImageByNameService from '../../services/GetImageByNameService';
import DeleteImageByNameService from '../../services/DeleteImageByNameService';

// Mock do repositório de imagens
const mockImageRepository = {
  create: jest.fn(),
  findByName: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
};

// Mock dos serviços
const mockUploadImageService = new UploadImageService(
  mockImageRepository,
);
const mockGetImageByNameService = new GetImageByNameService(
  mockImageRepository,
);
const mockDeleteImageByNameService = new DeleteImageByNameService(
  mockImageRepository,
);

beforeEach(() => {
  jest.clearAllMocks();

  container.registerInstance(
    UploadImageService,
    mockUploadImageService,
  );
  container.registerInstance(
    GetImageByNameService,
    mockGetImageByNameService,
  );
  container.registerInstance(
    DeleteImageByNameService,
    mockDeleteImageByNameService,
  );
});

describe('ImageController Integration Tests', () => {
  it('should upload an image', async () => {
    const fakeImage = {
      name: 'test-image.jpg',
      mimetype: 'image/jpeg',
      data: Buffer.from('fake image data'),
    };

    // Mock do serviço de upload de imagem
    (mockImageRepository.create as jest.Mock).mockResolvedValue(
      fakeImage,
    );

    const response = await request(app)
      .post('/images')
      .attach(
        'file',
        Buffer.from('fake image data'),
        'test-image.jpg',
      );

    // expect(response.status).toBe(200);
    expect(response.body).toMatchObject(fakeImage);
    expect(mockImageRepository.create).toHaveBeenCalledWith({
      name: 'test-image.jpg',
      mimetype: 'image/jpeg',
      data: expect.any(Buffer),
    });
  });

  it('should retrieve an image by name', async () => {
    const fakeImage = {
      name: 'test-image.jpg',
      mimetype: 'image/jpeg',
      data: 'fake image data',
    };

    // Mock do serviço de busca de imagem
    (mockImageRepository.findByName as jest.Mock).mockResolvedValue(
      fakeImage,
    );

    const response = await request(app).get('/images/test-image.jpg');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(fakeImage);
    expect(mockImageRepository.findByName).toHaveBeenCalledWith(
      'test-image.jpg',
    );
  });

  it('should delete an image by name', async () => {
    // Mock do serviço de exclusão de imagem
    (mockImageRepository.delete as jest.Mock).mockResolvedValue({
      message: 'Image deleted',
    });

    const response = await request(app).delete(
      '/images/test-image.jpg',
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Image deleted' });
    expect(mockImageRepository.delete).toHaveBeenCalledWith(
      'test-image.jpg',
    );
  });
});
