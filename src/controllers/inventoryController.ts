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


export const getInventory = async (req: Request, res: Response) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found.' });
    }

    return res.status(200).json(inventory);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving the inventory.' });
  }
};


export const updateInventory = async (req: Request, res: Response) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found.' });
    }

    return res.status(200).json(inventory);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the inventory.' });
  }
};

export const updateInventoryItem = async (req: Request, res: Response) => {
  try {
    const inventoryItem = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inventoryItem) {
      return res.status(404).json({ error: 'InventoryItem not found.' });
    }
    return res.status(200).json(inventoryItem);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while updating the inventory item.' });
  }
};



// Add Inventory Item
export const addInventoryItem = async (req: Request, res: Response) => {
  const newInventoryItem: IInventoryItem = new InventoryItem(req.body);
  const result = await newInventoryItem.save();

  return res.json(result);
};


export const removeInventoryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Assuming the ID of the item to be removed is passed as a URL parameter.
    const removedItem = await InventoryItem.findByIdAndRemove(id);

    if (!removedItem) {
      return res.status(404).json({ error: 'InventoryItem not found.' });
    }

    return res.status(200).json({ message: 'Inventory item removed successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while removing the inventory item.' });
  }
};

export const getAllItemsForInventory = async (req: Request, res: Response) => {
  try {
    const inventoryId = req.params.id;

    const inventory = await Inventory.findById(inventoryId);

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found.' });
    }

    return res.status(200).json(inventory.items);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching the items.' });
  }
};
