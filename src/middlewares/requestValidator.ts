import Joi, { Schema, ObjectSchema, ArraySchema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export enum SchemaTypes {
  BODY = 'body',
  QUERY = 'query',
  PARAMS = 'params'
}

interface RequestValidatorProps {
  schema: ObjectSchema | ArraySchema;
  type: SchemaTypes;
}

export const requestValidator =
  ({ schema, type = SchemaTypes.BODY }: RequestValidatorProps) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], { abortEarly: false });

    if (error) {
      const { details } = error;
      const message = details.map((d) => d.message).join('; ');

      return res.status(400).json({ error: message });
    }

    next();
  };
