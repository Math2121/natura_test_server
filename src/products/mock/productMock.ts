
const fakeProducts = [
    { id: 1, name: 'Product 1', price: 10, quantity: 20, description: 'Product', image: 'images/product' },
    { id: 2, name: 'Product 2', price: 20, quantity: 20, description: 'Product', image: 'images/product' },

]

export const productMock = {

    product: {
        findMany: jest.fn().mockResolvedValue(fakeProducts),
        findOne: jest.fn().mockResolvedValue(fakeProducts[0]),
        create: jest.fn().mockResolvedValue(fakeProducts[0]),
        update: jest.fn().mockResolvedValue(fakeProducts[0]),
        delete: jest.fn().mockResolvedValue(true),
        count: jest.fn().mockResolvedValue(fakeProducts.length),

    }

}