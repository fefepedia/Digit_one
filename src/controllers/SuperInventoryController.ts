import SuperInventory from '../models/SuperInventory';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Company from '../models/Company'; // Adjust the path to match the actual location of your Company model

export const createSuperInventory = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.company) {
      return res.status(400).json({ error: 'User does not have a company.' });
    }

    const companyId = req.user.company;

    const newSuperInventory = new SuperInventory({ company: companyId });
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



export const removeInventoryFromSuperInventory = async (req: Request, res: Response) => {
  try {
    const superInventory = await SuperInventory.findById(req.params.id);
    
    if (!superInventory) {
      return res.status(404).json({ error: 'SuperInventory not found.' });
    }

    const objectId = new mongoose.Types.ObjectId(req.params.inventoryId);

    const index = superInventory.inventories.indexOf(objectId);
    
    if (index > -1) {
      superInventory.inventories.splice(index, 1);
      await superInventory.save();

      const company = await Company.findById(superInventory.company);

      if (company) {
        
        const companyIndex = company.superinventories.indexOf(objectId);

        if (companyIndex > -1) {
          company.superinventories.splice(companyIndex, 1);
          await company.save();
        }
      }
    }

    return res.status(200).json(superInventory);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while removing an inventory from the super inventory.' });
  }
};


export const getSuperInventoryById = async (req: Request, res: Response) => {
  try {
    const superInventory = await SuperInventory.findById(req.params.id).populate('inventories');

    if (!superInventory) {
      return res.status(404).json({ error: 'SuperInventory not found.' });
    }

    return res.status(200).json(superInventory);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching the super inventory.' });
  }
};

export const getAllSuperInventories = async (req: Request, res: Response) => {
  try {
    const superInventories = await SuperInventory.find().populate('inventories');

    return res.status(200).json(superInventories);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching all super inventories.' });
  }
};
