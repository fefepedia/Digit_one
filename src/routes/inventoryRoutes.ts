import express from 'express';
import { removeInventory, addInventory, addInventoryItem, getInventory, removeInventoryItem, updateInventory, updateInventoryItem, getAllItemsForInventory } from '../controllers/inventoryController';

const router = express.Router();

router.post('/add-inventory', addInventory);
router.put('/update-inventory/:id', updateInventory);
router.put('/update-inventory-item/:id', updateInventoryItem);
//router.patch('/patch-inventory');
router.delete('/remove-inventory/:id', removeInventory);
//router.get('/inventories');
router.get('/inventory/:id/items', getAllItemsForInventory);
router.get('/inventory/:id',getInventory);
router.delete('/remove-inventory-item/:id', removeInventoryItem);
router.post('/add-inventory-item', addInventoryItem);


export default router;
