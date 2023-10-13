import SuperInventory from '../models/SuperInventory';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Company from '../models/Company';

export const createSuperInventory = async (req: Request, res: Response) => {
  try {
    console.log('User:', req.user);
    console.log('Company:', req.user?.company);
    //console.log('usercompany:', req.user?.company.id);
    if (!req.user || !req.user.company  /* || !req.user.company.id */ ) {
      return res.status(400).json({ error: 'User does not have a company.' });
    }

    const companyId = req.user.company.id;
    const { name, company } = req.body;

  //  if (!company || company.toString() !== companyId.toString()) {
    //  return res.status(400).json({ error: 'Company in request does not match user company.' });
    //}

    const updatedCompany = await Company.findById(companyId).exec();

    if (!updatedCompany) {
      return res.status(404).json({ error: 'Company not found.' });
    }

    updatedCompany.superinventories.push(company);
    await updatedCompany.save();

    const newSuperInventory = new SuperInventory({ name, company });
    const savedSuperInventory = await newSuperInventory.save();

    return res.status(201).json(savedSuperInventory);
  } catch (error) {
    console.error(error);
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
export const addSuperInventoryToCompany = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.companyId;
    const { name } = req.body;
    console.log('Received request to add SuperInventory to company with ID:', companyId);

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ error: 'Company not found.' });
    }

    const superInventory = new SuperInventory({ name, company: companyId });
    const savedSuperInventory = await superInventory.save();
    console.log('SuperInventory saved:', savedSuperInventory);

    company.superinventories.push(savedSuperInventory._id);
    await company.save();

    return res.status(201).json(savedSuperInventory);
  } catch (error) {
    console.error('Error occurred while adding SuperInventory to the company:', error);
    return res.status(500).json({ error: 'An error occurred while adding SuperInventory to the company.' });
  }
};