import Joi, { Schema, ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export enum SchemaTypes {
  BODY = 'BODY',
  QUERY = 'QUERY',
  PARAMS = 'PARAMS'
}

interface RequestValidatorProps {
  schema: ObjectSchema;
  type: SchemaTypes;
}

export const requestValidator = (props: RequestValidatorProps) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = props.schema.validate(req, { abortEarly: false });

  if (error) {
    const { details } = error;
    const message = details.map((d) => d.message).join('; ');

    return res.status(400).json({ error: message });
  }

  next();
};
