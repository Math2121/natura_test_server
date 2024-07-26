import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products (POST)', () => {
    return request(app.getHttpServer())
      .post('/products')
      .send({ name: 'Test Product', price: 10, quantity: 10, description: 'Test', image: 'test' })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toEqual({
          message: "Product created successfully"
        });
      });


  })
  it('/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(({ body }) => {
        expect(Array.isArray(body.data)).toBeTruthy();
      });

  })

  it('/products?name=product (GET)', () => {
    return request(app.getHttpServer())
      .get('/products?name=Test Product')
      .expect(200)
      .expect(({ body }) => {
        expect(Array.isArray(body.data)).toBeTruthy();
        expect(body.data.length).toBeGreaterThan(0);
      });

  })

  afterAll(async () => {
    await app.close();
  });

});
