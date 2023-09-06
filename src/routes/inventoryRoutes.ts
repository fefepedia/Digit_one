import express from 'express';
import {
  addInventory,
  addInventoryItem
} from '../controllers/inventoryController';

const router = express.Router();

router.post('/add-inventory', addInventory);
router.post('/add-inventory-item', addInventoryItem);

export default router;
