import express from 'express';
import {
  createCompany,
  removeCompany,
  getCompanyById,
  getAllCompanies
} from '../controllers/companyController';

const router = express.Router();

router.post('/create-company', createCompany);

router.delete('/remove-company/:id', removeCompany);

router.get('/company/:id', getCompanyById);

router.get('/companies', getAllCompanies);

export default router;
