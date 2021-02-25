import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe('Send Email', () => {
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

  it('Should be able to create a new registre in Table SurveyUser', async () => {
    const user = await request(app).post('/users').send({
      email: 'jairo@exemple.com',
      name: 'User Example',
    });

    const surveys = await request(app).post('/surveys').send({
      title: 'rocket',
      description: 'Description Example',
    });

    const response = await request(app).post('/sendMail').send({
      email: user.body.email,
      survey_id: surveys.body.id,
    });

    expect(response.status).toBe(201);
  });
});
