import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

describe('AppController (e2e)', () => {
  let app: INestApplication
  let agent: request.SuperAgentTest

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication<NestExpressApplication>()
    await app.init()

    agent = request(
      app.getHttpServer(),
    ) as unknown as request.SuperTest<request.Test>
  })

  afterAll(async () => {
    await app.close()
  })

  describe('User', () => {
    it('Should create user', async () => {
      await agent
        .post('/users')
        .send({
          name: 'test1',
          email: 'test1@test.ru',
        })
        .expect(201)
        .then((res) => {
          expect(res.body).toMatchObject({
            name: 'test1',
            email: 'test1@test.ru',
            id: 2,
            balance: 0,
          })
        })
    })

    it('Should dont create user', async () => {
      await agent
        .post('/users')
        .send({
          name: 'test1',
          email: 'test1@test.ru',
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({
            error: 'Bad Request',
            message: 'Пользователь с такой почтой уже зарегестрирован',
            statusCode: 400,
          })
        })
    })

    it('Should find user', async () => {
      await agent
        .get('/users/1')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({
            name: 'test',
            email: 'test@bk.ru',
            id: 1,
            balance: 10000,
          })
        })
    })

    it('Should dont find user', async () => {
      await agent
        .get('/users/3')
        .expect(404)
        .then((res) => {
          expect(res.body).toMatchObject({
            error: 'Not Found',
            message: 'Пользователя не существует',
            statusCode: 404,
          })
        })
    })

    it('Should update user', async () => {
      await agent
        .patch('/users/2')
        .send({
          name: 'testo',
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({
            name: 'testo',
            email: 'test1@test.ru',
            id: 2,
            balance: 0,
          })
        })
    })

    it('Should dont update user', async () => {
      await agent
        .patch('/users/3')
        .send({
          name: 'testo',
        })
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({
            error: 'Bad Request',
            message: 'Обновление не удалось',
            statusCode: 400,
          })
        })
    })

    it('Should added balance user', async () => {
      await agent
        .patch('/users/balance/deposit/2')
        .send({
          balance: 10,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({
            balance: 10,
          })
        })
    })

    it('Should dont added balance user', async () => {
      await agent
        .patch('/users/balance/deposit/3')
        .send({
          balance: 10,
        })
        .expect(404)
        .then((res) => {
          expect(res.body).toMatchObject({
            error: 'Not Found',
            message: 'Пользователя не существует',
            statusCode: 404,
          })
        })
    })

    it('Should write off balance user', async () => {
      await agent
        .patch('/users/balance/deduct/2')
        .send({
          balance: 10,
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({
            balance: 0,
          })
        })
    })

    it('Should dont write off balance user', async () => {
      await agent
        .patch('/users/balance/deduct/2')
        .send({
          balance: 10,
        })
        .expect(402)
        .then((res) => {
          expect(res.body).toMatchObject({
            message: 'Списание не удалось. Деньги кончились',
            statusCode: 402,
          })
        })
    })
  })
})
