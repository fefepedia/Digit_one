import Joi from 'joi';
import { NujRequest } from '../types/global';
import { NextFunction, Response } from 'express';

export enum SchemaTypes {
  BODY = 'BODY',
  QUERY = 'QUERY',
  PARAMS = 'PARAMS'
}

interface RequestValidatorProps {
  schema: Joi.Schema;
  type: SchemaTypes;
}

export const requestValidator = (
  req: NujRequest,
  res: Response,
  next: NextFunction,
  { schema }: RequestValidatorProps
) => {
  const { error } = schema.validate(req, { abortEarly: false });

  if (error) {
    const { details } = error;
    const message = details.map((d) => d.message).join('; ');

    return res.status(400).json({ error: message });
  }

  next();
};
