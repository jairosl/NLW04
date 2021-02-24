import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRespository = getCustomRepository(SurveysRepository);

    const surveys = surveysRespository.create({ title, description });

    await surveysRespository.save(surveys);

    return response.status(201).json(surveys);
  }

  async show(request: Request, response: Response) {
    const surveysRespository = getCustomRepository(SurveysRepository);

    const allSurveys = await surveysRespository.find();

    response.json({ allSurveys });
  }
}

export { SurveysController };
