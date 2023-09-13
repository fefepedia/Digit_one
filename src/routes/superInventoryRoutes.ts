import express from 'express';
import { createSuperInventory, addInventoryToSuperInventory } from '../controllers/SuperInventoryController';

const router = express.Router();

router.post('/create-super-inventory', createSuperInventory);

router.post('/add-inventory-to-super', addInventoryToSuperInventory);

export default router;
