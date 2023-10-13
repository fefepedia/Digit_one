import express from 'express';
import { Request, Response } from 'express';
import { requestValidator, SchemaTypes } from '../middlewares/requestValidator';
import loginSchema from '../utils/validation/auth/loginSchema';
import registerSchema from '../utils/validation/auth/signupSchema';
import { register, login } from '../controllers/authController';
import authVerify from '../middlewares/authVerify';

const router = express.Router();

// router.use(authVerify);

router.post(
  '/register',
  requestValidator({ schema: registerSchema, type: SchemaTypes.BODY }),
  (req: Request, res: Response) => {
    register(req, res);
  }
);

router.post(
  '/login',
  requestValidator({ schema: loginSchema, type: SchemaTypes.BODY }),
  (req: Request, res: Response) => {
    login(req, res);
  }
);

export default router;
