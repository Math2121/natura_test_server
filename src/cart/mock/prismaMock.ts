

const fakeCart = [
    { id: 1, productId: 1, quantity: 1 },
    { id: 2, productId: 2, quantity: 2 },
  ];

export const prismaMock = {
    cart: {
      create: jest.fn().mockReturnValue(fakeCart[0]),
      findMany: jest.fn().mockResolvedValue(fakeCart),
      findUnique: jest.fn().mockResolvedValue(fakeCart[0]),
      update: jest.fn().mockResolvedValue(fakeCart[0]),
      delete: jest.fn(), 
    },
  };