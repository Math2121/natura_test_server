import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';
import { productMock } from './mock/productMock';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, {
        provide: PrismaService, useValue: productMock
      }],

    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a product', async () => {
    const createProductSpy = jest.spyOn(prisma.product, 'create');
    await service.createProduct({ name: 'Test', price: 10, quantity: 10, description: 'Test', image: 'test' });
    expect(createProductSpy).toHaveBeenCalled();
  })
  it('should get all products', async () => {
    const findManySpy = jest.spyOn(prisma.product, 'findMany');
    const products = await service.getProducts();
    expect(products).toBeDefined();
    expect(products.data.length).toBeGreaterThan(1)
    expect(findManySpy).toHaveBeenCalled();
  });
  it('should get product by name', async () => {
    const findManySpy = jest.spyOn(prisma.product, 'findMany');
    const products = await service.getProductByName('Test');
    expect(products).toBeDefined();
    expect(products.length).toBeGreaterThan(0)
    expect(findManySpy).toHaveBeenCalled();
  })

  it('should throw an error when creating a product', async () => {
    jest.spyOn(prisma.product, 'create').mockRejectedValueOnce(new Error('Test error'));
    await expect(service.createProduct({ name: 'Test', price: 10, quantity: 10, description: 'Test', image: 'test' })).rejects.toThrow('An error occurred');
  });

  it('should throw an error when fetching products', async () => {
    jest.spyOn(prisma.product, 'findMany').mockRejectedValueOnce(new Error('Test error'));
    await expect(service.getProducts()).rejects.toThrow('An error occurred');
  });
});
