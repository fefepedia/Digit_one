import express from 'express';
import { Request, Response } from 'express';
import { requestValidator, SchemaTypes } from '../middlewares/requestValidator';
import { registerSchema, loginSchema } from '../models/joi_schemas/auth_schema';
import { register, login } from '../controllers/authController';
const router = express.Router();

// Register route
router.post(
  '/register',
  requestValidator({ schema: registerSchema, type: SchemaTypes.BODY }),
  (req: Request, res: Response) => {
    register(req, res);
  }
);

// Login route
router.post('/login',requestValidator({ schema: loginSchema, type: SchemaTypes.BODY }),
  (req: Request, res: Response) => {
    login(req, res);
  }
);

export default router;