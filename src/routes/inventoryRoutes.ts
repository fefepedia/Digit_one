import express from 'express';
import { addInventory, addInventoryItem } from '../controllers/inventoryController';

const router = express.Router();

router.post('/add-inventory', addInventory);
//router.put('/update-inventory');
//router.patch('/patch-inventory');
//router.delete('/delete-inventory/:id');
//router.get('/inventories');
//router.get('/inventory/:id');

router.post('/add-inventory-item', addInventoryItem);

export default router;
