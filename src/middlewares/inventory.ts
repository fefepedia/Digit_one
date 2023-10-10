import Joi from 'joi';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { IInventory } from '../models/Inventory';
import { IInventoryItem } from '../models/InventoryItem';


export const validateAddInventory = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object<IInventory>({
    name: Joi.string().required(),
    quantityType: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateAddInventoryItem = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object<IInventoryItem>({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    financialValue: Joi.number().required(),
    inventoryId: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateGetInventory = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid inventory ID.' });
  }
  next();
};

export const validateRemoveInventoryItem = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid inventory item ID.' });
  }
  next();
};

export const validateRemoveInventory = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid inventory ID.' });
  }
  next();
};

export const validateUpdateInventory = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object<IInventory>({
    name: Joi.string().required(),
    quantityType: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateUpdateInventoryItem = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object<IInventoryItem>({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    financialValue: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};