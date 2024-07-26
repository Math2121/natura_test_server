import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from './mock/prismaMock';


describe('CartService', () => {
  let service: CartService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, {
         provide: PrismaService, useValue: prismaMock 
      }],
    }).compile();

    service = module.get<CartService>(CartService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new cart', async () => {

    jest.spyOn(prisma.cart, 'create')
    .mockResolvedValue({
      id: 1,
      productId: 1,
      quantity: 1
    });
    const input = { items: [{ productId: 1, quantity: 1 }] };
    await service.storeCart(input);
    expect(prisma.cart.create).toHaveBeenCalled();

  })

  it('should throw an error when creating a new cart', async () => {
    jest.spyOn(prisma.cart, 'create')
    .mockRejectedValue(new Error('Test error'));
    const input = { items: [{ productId: 1, quantity: 1 }] };
    await expect(service.storeCart(input)).rejects.toThrow('Test error');
    expect(prisma.cart.create).toHaveBeenCalled();
  })

  it('should throw an error when trying to create a cart with non-existent product', async () => {
    jest.spyOn(prisma.product, 'findUnique')
    .mockResolvedValue(null);
    jest.spyOn(prisma.cart, 'create')
    .mockResolvedValue({
      id: 1,
      productId: 1,
      quantity: 1
    });
    const input = { items: [{ productId: 1, quantity: 1 }] };
    await expect(service.storeCart(input)).rejects.toThrow('Product with id 1 not found.');
    expect(prisma.product.findUnique).toHaveBeenCalled();
    
  })

  it('should throw an error when trying to create a cart with insufficient product quantity', async () => {
    jest.spyOn(prisma.product, 'findUnique')
    .mockResolvedValue({ id: 1, quantity: 5, description: 'teste', image: 'teste.png', price:55, name: 'teste' });
    jest.spyOn(prisma.cart, 'create')
    .mockResolvedValue({
      id: 1,
      productId: 1,
      quantity: 1
    });
    const input = { items: [{ productId: 1, quantity: 6 }] };
    await expect(service.storeCart(input)).rejects.toThrow('Insufficient quantity for product with id 1. Available: 5');
    expect(prisma.product.findUnique).toHaveBeenCalled();
  })
  
});
