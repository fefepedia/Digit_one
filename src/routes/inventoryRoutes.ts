import express from 'express';
import { removeInventory, addInventory, addInventoryItem, getInventory, removeInventoryItem, updateInventory, updateInventoryItem, getAllItemsForInventory } from '../controllers/inventoryController';
import { checkUserRole } from '../middlewares/rbac';
import authVerify from '../middlewares/authVerify';
import {inventorySchema, inventoryItemSchema} from '../utils/validation/inventoriesSchema'
import { requestValidator } from '../middlewares/requestValidator'; 

import { SchemaTypes } from '../middlewares/requestValidator';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management
 */

/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Create a new inventory.
 *     tags: [Inventory]
 *     parameters:
 *       - name: inventory
 *         in: body
 *         required: true
 *         description: The inventory object to create.
 *         schema:
 *           $ref: '#/definitions/Inventory'
 *     responses:
 *       200:
 *         description: Successfully created an inventory.
 *         schema:
 *           $ref: '#/definitions/Inventory'
 *       400:
 *         description: Bad request.
 */

router.post('/add-inventory', requestValidator({ schema: inventorySchema, type: SchemaTypes.BODY }), addInventory);

router.put('/update-inventory/:id', requestValidator({ schema: inventorySchema, type: SchemaTypes.BODY }), updateInventory);

/**
 * @swagger
 * /api/inventory/update-inventory/{id}:
 *   put:
 *     summary: Update an inventory by ID.
 *     tags: [Inventory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the inventory to update.
 *         schema:
 *           type: string
 *       - name: inventory
 *         in: body
 *         required: true
 *         description: The updated inventory object.
 *         schema:
 *           $ref: '#/definitions/Inventory'
 *     responses:
 *       200:
 *         description: Successfully updated the inventory.
 *         schema:
 *           $ref: '#/definitions/Inventory'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Inventory not found.
 */

router.put('/update-inventory-item/:id', requestValidator({ schema: inventoryItemSchema, type: SchemaTypes.BODY }), updateInventoryItem);

/**
 * @swagger
 * /api/inventory/update-inventory-item/{id}:
 *   put:
 *     summary: Update an inventory item by ID.
 *     tags: [Inventory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the inventory item to update.
 *         schema:
 *           type: string
 *       - name: inventoryItem
 *         in: body
 *         required: true
 *         description: The updated inventory item object.
 *         schema:
 *           $ref: '#/definitions/InventoryItem'
 *     responses:
 *       200:
 *         description: Successfully updated the inventory item.
 *         schema:
 *           $ref: '#/definitions/InventoryItem'
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Inventory item not found.
 */

//router.patch('/patch-inventory');
router.delete('/remove-inventory/:id', removeInventory);
//router.get('/inventories');
router.get('/:id/items', getAllItemsForInventory);

/**
 * @swagger
 * /api/inventory/{id}:
 *   get:
 *     summary: Get an inventory by ID.
 *     tags: [Inventory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the inventory to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the inventory.
 *         schema:
 *           $ref: '#/definitions/Inventory'
 *       404:
 *         description: Inventory not found.
 */

router.get('/:id', getInventory);

router.delete('/remove-inventory-item/:id', removeInventoryItem);
router.post('/add-inventory-item', requestValidator({ schema: inventoryItemSchema, type: SchemaTypes.BODY }), addInventoryItem);

export default router;