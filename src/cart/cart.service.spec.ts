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
    await expect(service.storeCart(input)).rejects.toThrow('An error occurred');
    expect(prisma.cart.create).toHaveBeenCalled();
  })
});
