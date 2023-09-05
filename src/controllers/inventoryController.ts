import { Request, Response } from 'express';
import Inventory, { IInventory } from '../models/Inventory';
import InventoryItem, { IInventoryItem } from '../models/InventoryItem';

// Add new Inventory
export const addInventory = async (req: Request, res: Response) => {
    const newInventory: IInventory = new Inventory(req.body);
    const result = await newInventory.save();
    res.json(result);
};

// Add Inventory Item
export const addInventoryItem = async (req: Request, res: Response) => {
    const newInventoryItem: IInventoryItem = new InventoryItem(req.body);
    const result = await newInventoryItem.save();
    res.json(result);
};
