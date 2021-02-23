import { Router } from 'express';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();

/**
 * GET
 * POST
 * PUT
 * DELETE
 * PATCH
 */
router.post('/users', userController.create);

export { router };
