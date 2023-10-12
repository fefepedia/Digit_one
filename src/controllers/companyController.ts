import { Request, Response } from 'express';
import Company from '../models/Company';

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCompany = new Company({ name });
    const savedCompany = await newCompany.save();
    return res.status(201).json(savedCompany);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while creating the company.' });
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
    return res.status(500).json({ error: 'An error occurred while removing the company.' });
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
    return res.status(500).json({ error: 'An error occurred while fetching the company.' });
  }
};

export const getAllCompanies = async (_req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    return res.status(200).json(companies);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while fetching all companies.' });
  }
};
