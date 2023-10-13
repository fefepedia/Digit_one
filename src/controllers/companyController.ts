import { Request, Response } from 'express';
import Company from '../models/Company';
import User from '../models/User';

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    console.log('Received company creation request with name:', name);

    const newCompany = new Company({ name });
    console.log('Creating a new company:', newCompany);

    const savedCompany = await newCompany.save();
    console.log('Company saved:', savedCompany);

    return res.status(201).json(savedCompany);
  } catch (error) {
    console.error('Error occurred while creating the company:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while creating the company.' });
  }
};

export const removeCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.findByIdAndRemove(req.params.id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found.' });
    }

    return res.status(200).json({ message: 'Company removed successfully.' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An error occurred while removing the company.' });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found.' });
    }

    return res.status(200).json(company);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching the company.' });
  }
};

export const addUserToCompany = async (req: Request, res: Response) => {
  try {
    const { companyId, userId } = req.body;
    const company = await Company.findById(companyId);
    const user = await User.findById(userId);

    if (!company || !user) {
      return res.status(400).json({ error: 'Company or user not found.' });
    }

    user.company = companyId;
    await user.save();

    return res
      .status(200)
      .json({ message: 'User added to company successfully.' });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: 'An error occurred while adding the user to the company.'
      });
  }
};

export const getUsersByCompany = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.id;
    const users = await User.find({ company: companyId });

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching users by company.' });
  }
};

export const getAllCompanies = async (_req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    return res.status(200).json(companies);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching all companies.' });
  }
};
