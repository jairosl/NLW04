import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class NpsController {
  /**
   *
   * 1 2 3 4 5 6 7 8 9 10
   * Detratores => 1 - 6
   * Passivos => 7 - 8
   * Promotores => 9 - 10
   * Calculo
   * (n° Promotores - n° Deratores) / n° respondentes * 100
   *
   */
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractor = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswer = surveysUsers.length;

    const calculate = Number(
      (((promoters - detractor) / totalAnswer) * 100).toFixed(2)
    );

    return response.json({
      detractor,
      promoters,
      passive,
      totalAnswer,
      nps: calculate,
    });
  }
}

export { NpsController };
