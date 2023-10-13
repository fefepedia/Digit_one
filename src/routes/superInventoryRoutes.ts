import express from 'express';
import { requestValidator, SchemaTypes } from '../middlewares/requestValidator';
import { createSuperInventory, addInventoryToSuperInventory, removeInventoryFromSuperInventory, getAllSuperInventories, getSuperInventoryById,addSuperInventoryToCompany } from '../controllers/SuperInventoryController';
import { checkUserRole } from '../middlewares/rbac';
import { superInventorySchema } from '../utils/validation/inventoriesSchema'; 


const router = express.Router();


router.post('/create-super-inventory', requestValidator({ schema: superInventorySchema, type: SchemaTypes.BODY }), createSuperInventory);
router.post('/add-inventory-to-super', checkUserRole('admin'), requestValidator({ schema: superInventorySchema, type: SchemaTypes.BODY }), addInventoryToSuperInventory);

router.post('/add_super-to-company',addSuperInventoryToCompany);
router.get('/super-inventory/:id', checkUserRole('admin'), getSuperInventoryById);
router.get('/super-inventories', checkUserRole('admin'), getAllSuperInventories);
router.delete('/remove-inventory-from-super/:id/:inventoryId', checkUserRole('admin'), requestValidator({ schema: superInventorySchema, type: SchemaTypes.PARAMS }), removeInventoryFromSuperInventory);

export default router;
