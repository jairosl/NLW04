import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class AnswersController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { id } = request.query;

    console.log(value, id);

    const surveyUsersRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUsersRepository.findOne({
      id: String(id),
    });

    if (!surveyUser) {
      return response
        .status(400)
        .json({ error: 'SurveyUser does not exists!' });
    }

    surveyUser.value = Number(value);

    await surveyUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswersController };
