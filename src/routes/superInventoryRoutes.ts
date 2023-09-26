import express from 'express';
import { createSuperInventory, addInventoryToSuperInventory ,removeInventoryFromSuperInventory, getAllSuperInventories, getSuperInventoryById } from '../controllers/SuperInventoryController';

const router = express.Router();

router.post('/create-super-inventory', createSuperInventory);
router.post('/add-inventory-to-super', addInventoryToSuperInventory);
router.get('/super-inventory/:id', getSuperInventoryById);
router.get('/super-inventories', getAllSuperInventories);
router.delete('/remove-inventory-from-super/:id/:inventoryId', removeInventoryFromSuperInventory);

export default router;
