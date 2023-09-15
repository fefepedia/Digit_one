import { Request, Response } from 'express';
import Inventory, { IInventory } from '../models/Inventory';
import InventoryItem, { IInventoryItem } from '../models/InventoryItem';
import { inventorySanitizer } from '../helpers/sanitizers/inverntorySanitizer';

// Add new Inventory
export const addInventory = async (req: Request, res: Response) => {
  const sanitizedInventoryObject = inventorySanitizer(req.body);

  const newInventory: IInventory = new Inventory(sanitizedInventoryObject);
  const result = await newInventory.save();

  return res.json(result).status(200);
};

// Add Inventory Item
export const addInventoryItem = async (req: Request, res: Response) => {
  const newInventoryItem: IInventoryItem = new InventoryItem(req.body);
  const result = await newInventoryItem.save();

  return res.json(result);
};
