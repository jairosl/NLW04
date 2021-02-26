import { Router } from 'express';
import { AnswersController } from './controllers/AnswersController';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answersController = new AnswersController();
/**
 * GET
 * POST
 * PUT
 * DELETE
 * PATCH
 */
router.post('/users', userController.create);
router.post('/surveys', surveysController.create);
router.get('/surveys', surveysController.show);
router.post('/sendMail', sendMailController.execute);
router.get('/answers/:value', answersController.execute);

export { router };
