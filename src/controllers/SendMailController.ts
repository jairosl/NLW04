import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UsersRepository } from '../repositories/UsersRepository';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRespository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

    const userAlreadyExist = await usersRepository.findOne({ email });

    if (!userAlreadyExist) {
      return response.status(400).json({ error: 'User does not exists!' });
    }

    const surveysAlreadyExist = await surveysRespository.findOne({
      id: survey_id,
    });

    if (!surveysAlreadyExist) {
      return response.status(400).json({ error: 'Survey does not exists!' });
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: userAlreadyExist.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);

    return response.status(201).json(surveyUser);
  }
}

export { SendMailController };
