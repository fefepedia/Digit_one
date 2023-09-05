"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventoryController_1 = require("../controllers/inventoryController");
const router = express_1.default.Router();
router.post('/add-inventory', inventoryController_1.addInventory);
router.post('/add-inventory-item', inventoryController_1.addInventoryItem);
exports.default = router;
