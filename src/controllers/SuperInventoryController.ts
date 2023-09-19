import SuperInventory from '../models/SuperInventory';
import { Request, Response } from 'express';

export const createSuperInventory = async (req: Request, res: Response) => {
  try {
    const newSuperInventory = new SuperInventory();
    const savedSuperInventory = await newSuperInventory.save();

    return res.status(201).json(savedSuperInventory);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while creating the super inventory.' });
  }
};


export const addInventoryToSuperInventory = async (req: Request, res: Response) => {
  try {
    const { superInventoryId, inventoryId } = req.body;
    const superInventory = await SuperInventory.findById(superInventoryId);
    
    if (!superInventory) {
      return res.status(404).json({ error: 'SuperInventory not found.' });
    }

    if (!superInventory.inventories.includes(inventoryId)) {
      superInventory.inventories.push(inventoryId);
      await superInventory.save();
    }

    return res.status(200).json(superInventory);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while adding an inventory to the super inventory.' });
  }
};


