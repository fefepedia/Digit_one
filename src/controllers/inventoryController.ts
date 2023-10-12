import { Request, Response } from 'express';
import Inventory, { IInventory } from '../models/Inventory';
import InventoryItem, { IInventoryItem } from '../models/InventoryItem';
import { inventorySanitizer } from '../helpers/sanitizers/inverntorySanitizer';
import { Types } from 'mongoose';
import mongoose from 'mongoose';
import SuperInventory from '../models/SuperInventory';

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
    return res
      .status(500)
      .json({ error: 'An error occurred while retrieving the inventory.' });
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found.' });
    }

    return res.status(200).json(inventory);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An error occurred while updating the inventory.' });
  }
};

export const updateInventoryItem = async (req: Request, res: Response) => {
  try {
    const inventoryItem = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!inventoryItem) {
      console.log('ID from request:', req.params.id);

      return res.status(404).json({ error: 'InventoryItem not found.' });
    }
    return res.status(200).json(inventoryItem);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An error occurred while updating the inventory item.' });
  }
};

// Add Inventory Item
export const addInventoryItem = async (req: Request, res: Response) => {
  const newInventoryItem: IInventoryItem = new InventoryItem(req.body);

  const result = await newInventoryItem.save();

  // Push the reference ID to the Inventory's items array
  const inventory = await Inventory.findById(req.body.inventoryId);
  if (inventory) {
    inventory.items.push(newInventoryItem._id);
    await inventory.save();
  }

  return res.json(result);
};

export const removeInventoryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const removedItem = await InventoryItem.findOneAndDelete({ _id: id });

    if (!removedItem) {
      return res.status(404).json({ error: 'InventoryItem not found.' });
    }
    const inventory = await Inventory.findById(removedItem.inventoryId);

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found.' });
    }

    await inventory.save();
    const remainingItems = await InventoryItem.find({
      inventoryId: removedItem.inventoryId
    });
    if (remainingItems.length === 0) {
      // Call a function to reflect this change in the SuperInventory
      await removeFromSuperInventory(inventory._id);
    }

    return res
      .status(200)
      .json({ message: 'Inventory item removed successfully.' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An error occurred while removing the inventory item.' });
  }
};

const removeFromSuperInventory = async (
  inventoryId: mongoose.Types.ObjectId
) => {
  try {
    const superInventory = await SuperInventory.findOne({
      inventories: inventoryId
    });
    if (superInventory) {
      superInventory.inventories = superInventory.inventories.filter(
        (i) => !i.equals(inventoryId)
      );
      await superInventory.save();
    }
  } catch (error) {
    console.log('Error removing inventory from SuperInventory', error);
  }
};




export const removeInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const removedInventory = await Inventory.findByIdAndDelete(id);

    if (!removedInventory) {
      return res.status(404).json({ error: 'Inventory not found.' });
    }

    await InventoryItem.deleteMany({ inventoryId: id });

    const objectId = new mongoose.Types.ObjectId(id);
    await removeFromSuperInventory(objectId);

    return res.status(200).json({ message: 'Inventory removed successfully.' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An error occurred while removing the inventory.' });
  }
};


export const getAllItemsForInventory = async (req: Request, res: Response) => {
  console.log('Inside getAllItemsForInventory');
  try {
    const inventoryId = req.params.id;
    console.log('Trying to fetch items for inventoryId:', inventoryId);
    const inventory = await Inventory.findById(inventoryId).populate('items');

    if (!inventory) {
      console.log('Inventory not found for ID:', inventoryId);
      return res.status(404).json({ error: 'Inventory not found.' });
    }

    console.log('Fetched items:', inventory.items);

    return res.status(200).json(inventory.items);
  } catch (error) {
    console.error('Error while fetching items:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching the items.' });
  }
};

