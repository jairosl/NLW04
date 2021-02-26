import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { AppError } from '../errors/AppError';

class AnswersController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { id } = request.query;

    const surveyUsersRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUsersRepository.findOne({
      id: String(id),
    });

    if (!surveyUser) {
      throw new AppError('SurveyUser does not exists!');
    }

    if (surveyUser.value !== null) {
      return response.json(surveyUser);
    }

    surveyUser.value = Number(value);

    await surveyUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswersController };
