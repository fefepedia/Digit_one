import express from 'express';
import { requestValidator } from '../middlewares/requestValidator';
import { createSuperInventory, addInventoryToSuperInventory ,removeInventoryFromSuperInventory, getAllSuperInventories, getSuperInventoryById } from '../controllers/SuperInventoryController';
import SuperInventory from '../models/SuperInventory';
import { checkUserRole } from '../middlewares/rbac';
import verify from '../middlewares/authVerify';

const router = express.Router();

router.use(verify);

router.post('/create-super-inventory', checkUserRole('admin'),createSuperInventory);
router.post('/add-inventory-to-super', checkUserRole('admin'),addInventoryToSuperInventory);
router.get('/super-inventory/:id', checkUserRole('admin'),getSuperInventoryById);
router.get('/super-inventories',checkUserRole('admin'), getAllSuperInventories);
router.delete('/remove-inventory-from-super/:id/:inventoryId', checkUserRole('admin'),removeInventoryFromSuperInventory);

export default router;
