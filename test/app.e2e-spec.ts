import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // main.ts에 있는 아래 코드를 test에도 작성해서 똑같은 환경을 만들어줘야함
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    // it('GET', async () => {
    //   return await request(app.getHttpServer())
    //     .get('/movies')
    //     .expect(200)
    //     .expect([]);
    // });

    it('POST 201', async () => {
      return await request(app.getHttpServer())
        .post('/movies')
        .send({
          name: 'Test',
          age: 2002,
          password: 'test',
        })
        .expect(201);
    });
    // 예외처리별로 작성 필요
    it('POST 400', async () => {
      return await request(app.getHttpServer())
        .post('/movies')
        .send({
          name: 'Test',
          age: 2002,
          password: 'test',
          other: 'thing',
        })
        .expect(400);
    });

    // it('DELETE', async () => {
    //   return await request(app.getHttpServer()).delete('/movies').expect(404);
    // });
  });

  describe('/movies/:id', () => {
    it('GET 200', async () => {
      return await request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', async () => {
      return await request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it('PATCH 200', async () => {
      return await request(app.getHttpServer())
        .patch('/movies/12')
        .send({ name: 'Jeonghoon', age: 20, password: 'test' })
        .expect(200);
    });
    it('DELETE 200', async () => {
      return await request(app.getHttpServer())
        .delete('/movies/12')
        .send({ password: 'test' })
        .expect(200);
    });
  });
});
