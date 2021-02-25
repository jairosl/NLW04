import { Repository, EntityRepository } from 'typeorm';
import { SurveyUser } from '../entities/SurveyUser';

@EntityRepository(SurveyUser)
class SurveyUserRepository extends Repository<SurveyUser> {}

export { SurveyUserRepository };
