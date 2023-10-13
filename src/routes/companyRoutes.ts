import express from 'express';
//import { Request, Response } from 'express';
import {
  createCompany,
  removeCompany,
  getCompanyById,
  getAllCompanies,
  addUserToCompany,
  getUsersByCompany
} from '../controllers/companyController';
//import { SchemaTypes,requestValidator } from '../middlewares/requestValidator';
//import createCompanySchema from '../utils/validation/companySchema'
const router = express.Router();

router.post('/create-company', createCompany);

router.delete('/remove-company/:id', removeCompany);

router.get('/company/:id', getCompanyById);

router.get('/companies', getAllCompanies);

router.get('/users/company/:id', getUsersByCompany);

router.post('/add-user-to-company', addUserToCompany);
export default router;
