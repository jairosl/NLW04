import { getConnection } from 'typeorm';
import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });
  beforeEach(async () => {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  });
  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    connection.close();
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@exemple.com',
      name: 'User Example',
    });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a user with exists email', async () => {
    await request(app).post('/users').send({
      email: 'user@exemple.com',
      name: 'User Example',
    });

    const response = await request(app).post('/users').send({
      email: 'user@exemple.com',
      name: 'User Example',
    });

    expect(response.status).toBe(400);
  });
});
